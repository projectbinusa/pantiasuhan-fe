import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import idLocale from "date-fns/locale/id";
import { format } from "date-fns";
import "../../../../../css/button.css";

function KontakPanti() {
  const [list, setList] = useState(null);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState(null);
  const [fax, setFax] = useState("");
  const [link_maps, setLinkMaps] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState(0);
  const [createdDate, setCreatedDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const organization_id = localStorage.getItem("organization_id");

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/kontak-organization/organization`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      const res = response.data.data;
      setList(res);
      console.log(res);
      setEmail(res.email);
      setFax(res.fax);
      setLinkMaps(res.link_maps);
      setPhone(res.phone);
      setId(res.id);
      setAddress(res.address);
      setUpdateDate(res.updated_date);
      setCreatedDate(res.created_date);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  const deleteData = async (id) => {
    Swal.fire({
      title: "Apakah Anda Ingin Menghapus?",
      text: "Perubahan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_DUMMY}/api/admin/kontak/` + id, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Dihapus!",
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          });
      }
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`page-wrapper chiller-theme ${
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
            <div className="card shadow w-100">
              <div className="title card-header d-flex justify-content-between">
                <h1 className="fw-bold fs-3">Kontak</h1>
                {list !== null ? (
                  <>
                    <div>
                      <button type="button" className="btn-primary btn-sm mr-2">
                        <a
                          style={{
                            color: "white",
                            textDecoration: "none",
                          }}
                          href={`/edit_kontak/${id}`}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </a>
                      </button>
                      <button
                        onClick={() => deleteData(id)}
                        type="button"
                        className="btn-danger btn-sm">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button className="active btn-focus p-2 rounded">
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="/add_kontak">
                        Tambah Data
                      </a>
                    </button>
                  </>
                )}
              </div>
              <br />
              <div className="card-body">
                <div class="mb-3">
                  <label class="form-label fw-bold">Email</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={email}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">No Telephon</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={phone}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">FAX</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={fax}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Link Maps</label>
                  <textarea
                    type="text"
                    class="form-control"
                    disabled
                    value={link_maps}></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Alamat</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={address}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Dibuat</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    // value={format(
                    //   new Date(createdDate || new Date()),
                    //   "dd MMMM yyyy",
                    //   { locale: idLocale }
                    // )}
                    value={createdDate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KontakPanti;
