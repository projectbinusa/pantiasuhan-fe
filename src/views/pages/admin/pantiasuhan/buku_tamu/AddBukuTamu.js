import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { uploadImageToS3 } from "../../../../../utils/uploadToS3";

function AddBukuTamu() {
  const [idOrangTua, setIdOrangTua] = useState("");
  const [namaOrangTua, setNamaOrangTua] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [noWa, setNoWa] = useState("");
  const [image, setImage] = useState(null);
  const [deskripsi, setDeskripsi] = useState("");
  const [catatan, setCatatan] = useState("");
  const [foster_parent, setListFosterParent] = useState([]);
  const history = useHistory();
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/admin/foster_parent`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        setListFosterParent(response.data.data);
      } catch (error) {
        console.error("Terjadi Kesalahan", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    console.log("nama: ", namaOrangTua);
  }, []);

  //add
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      let imageUrl = image;

      if (image) {
        imageUrl = await uploadImageToS3(image);
      }
      await axios.post(
        `${API_DUMMY}/api/admin/guestbook`,
        {
          foster_parent_id: idOrangTua,
          visit_date: tanggal,
          url_image_donation: imageUrl,
          note: catatan,
          no_wa: noWa,
          description_donation: deskripsi,
        },
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push("/admin_buku_tamu");
      }, 1500);
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
      }`}
    >
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}
      >
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="app-main__outer container mb-3" data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-3 text-center mb-4">Form Tambah Data</h1>
                    <hr />
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label text-center font-weight-bold w-100">
                            Orang Tua Asuh
                          </label>
                          <select
                            value={idOrangTua}
                            className="form-control"
                            onChange={(e) => {
                              const selectedId = e.target.value;
                              setIdOrangTua(selectedId);
                              const selectedParent = foster_parent.find(
                                (data) => String(data.id) === String(selectedId)
                              );
                              setNamaOrangTua(
                                selectedParent ? selectedParent.name : ""
                              );
                            }}
                          >
                            <option value="" disabled>
                              Pilih Orang Tua Asuh
                            </option>
                            {foster_parent.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label text-center font-weight-bold w-100">
                            Tanggal Kunjungan
                          </label>
                          <input
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            type="date"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label text-center font-weight-bold w-100">
                            Nomor Whatsapp
                          </label>
                          <input
                            value={noWa}
                            onChange={(e) => setNoWa(e.target.value)}
                            type="number"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label text-center font-weight-bold w-100">
                            Deskripsi Donasi
                          </label>
                          <textarea
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            className="form-control"
                            rows={3}
                            placeholder="Masukkan Deskripsi Donasi"
                          ></textarea>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label text-center font-weight-bold w-100">
                            Bukti Donasi
                          </label>
                          <input
                            value={image}
                            onChange={(e) => setImage(e.target.files[0])}
                            type="text"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label text-center font-weight-bold w-100">
                            Catatan
                          </label>
                          <textarea
                            value={catatan}
                            onChange={(e) => setCatatan(e.target.value)}
                            className="form-control"
                            rows={3}
                            placeholder="Masukkan Catatan"
                          ></textarea>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin_buku_tamu"
                        >
                          Batal
                        </a>
                      </button>
                      <button type="submit" className="btn-primary mt-3">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBukuTamu;
