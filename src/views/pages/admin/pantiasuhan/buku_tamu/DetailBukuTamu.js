import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";

function DetailBukuTamu() {
    const [image, setFoto] = useState("");
    const [namaortu, setNamaOrtu] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [catatan, setCatatan] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [noWa, setNoWa] = useState("");
    const param = useParams();

    useEffect(() => {
        axios
          .get(`${API_DUMMY_PYTHON}/api/admin/guestbook/` + param.id, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          })
          .then((res) => {
            const response = res.data.data;
            setNamaOrtu(res.data.data.foster_parent_name);
            setDeskripsi(res.data.data.description_donation);
            setCatatan(res.data.data.note);
            setNoWa(res.data.data.no_wa);
            setFoto(res.data.data.url_image_donation);
            setTanggal(res.data.data.visit_date);
        })
        .catch((error) => {
          alert("Terjadi Kesalahan " + error);
        });
    }, [param.id]);

    const [sidebarToggled, setSidebarToggled] = useState(true);

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

   const handleResize = () => {
    if (window.innerWidth < 800) {
      setSidebarToggled(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className={`page-wrapper chiller-theme ${
      sidebarToggled ? "toggled" : ""
    }`}>
    <a
      id="show-sidebar"
      className="btn1 btn-lg"
      onClick={toggleSidebar}
      style={{ color: "white", background: "#3a3f48" }}>
      <i className="fas fa-bars"></i>
    </a>
    <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
    <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="box-tabel">
            <form className="card shadow w-100">
              <h1 className="title card-header fw-bold fs-3">Detail Buku Tamu</h1>
              <br />
              <div className="card-body">
                {image === null ? (
                  <img  className="rounded-circle w-75 mr-auto ml-auto d-block"  src="https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png" />
                ) : (
                  <img style={{ maxWidth: "400px", maxHeight: "400px" }} className="w-75 d-block mr-auto ml-auto" src={image} />
                )}
                <br />
                <br />
                <div class="mb-3">
                  <label class="form-label fw-bold">Orang Tua Asuh</label>
                  <input type="text" class="form-control" disabled value={namaortu} />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Kunjungan</label>
                  <input type="text" class="form-control" disabled value={format(new Date(tanggal || new Date()), "dd MMMM yyyy", { locale: idLocale })} />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Nomor Whatsapp</label>
                  <input type="number" class="form-control" disabled value={noWa} />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Deskripsi Donasi</label>
                  <div className="form-control" style={{ height:"auto", background: "#e9ecef" }} dangerouslySetInnerHTML={{ __html: deskripsi }} />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Catatan</label>
                  <div className="form-control" style={{ height:"auto", background: "#e9ecef" }} dangerouslySetInnerHTML={{ __html: catatan }} />
                </div>
              </div>
              <button style={{width:"12%"}}
                type="submit"
                className="btn-kembali btn-danger mt-3 mr-3">
                <a
                  href="/admin_buku_tamu"
                  style={{ color: "white", textDecoration: "none" }}>
                  Kembali
                </a>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailBukuTamu;
