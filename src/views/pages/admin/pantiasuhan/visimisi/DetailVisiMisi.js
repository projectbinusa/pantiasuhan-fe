import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY_PYTHON } from "../../../../../utils/base_URL";

import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";

function DetailVisiPanti() {
  const [tujuan, setTujuan] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [misi, setMisi] = useState("");
  const [visi, setVisi] = useState("");
  const [datas, setDatas] = useState([]);
  const { id } = useParams(); // Mengambil id dari URL params

  const getAll = async (id) => {
    if (!id) {
      console.warn("ID tidak diberikan untuk fetch data visi-misi.");
      return;
    }

    try {
      const response = await axios.get(
        `${API_DUMMY_PYTHON}/api/admin/visi-misi/${id}`, // Perbaiki URL API dengan menyertakan id
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      const res = response.data.data;
      if (res) {
        setDatas([res]); // Menyimpan data visi-misi dalam state
        setTujuan(res.tujuan);
        setCreatedDate(res.created_date);
        setUpdateDate(res.updated_date);
        setVisi(res.visi);
        setMisi(res.misi);
      } else {
        console.warn("Data visi-misi tidak ditemukan.");
        setDatas([]); // Jika tidak ada data, set state ke array kosong
      }
    } catch (error) {
      console.error("Terjadi Kesalahan:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getAll(id); // Panggil getAll hanya jika id tersedia
    }
  }, [id]);

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
          .delete(`${API_DUMMY_PYTHON}/api/admin/visi-misi/` + id, {
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
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Hapus Data Gagal!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(err);
          });
      }
    });
  };

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
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="box-tabel">
            <div className="card shadow w-100">
              <div className="title card-header d-flex justify-content-between">
                <h1 className="fw-bold fs-3">Visi Misi</h1>
                {datas.length > 0 ? (
                  <>
                    <div>
                      <button type="button" className="btn-primary btn-sm mr-2">
                        <a
                          style={{
                            color: "white",
                            textDecoration: "none",
                          }}
                          href={`/edit_visimisi/${id}`}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </a>
                      </button>
                      <button
                        onClick={() => deleteData(id)}
                        type="button"
                        className="btn-danger btn-sm"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button className="active btn-focus p-2 rounded">
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="/add_visimisi"
                      >
                        Tambah Data
                      </a>
                    </button>
                  </>
                )}
              </div>
              <br />
              <div className="card-body">
                <div class="mb-3">
                  <label class="form-label fw-bold">Visi</label>
                  <div
                    className="form-control"
                    style={{ height: "auto", background: "#e9ecef" }}
                    dangerouslySetInnerHTML={{ __html: visi }}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Misi</label>
                  <div
                    className="form-control"
                    style={{ height: "auto", background: "#e9ecef" }}
                    dangerouslySetInnerHTML={{ __html: misi }}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tujuan</label>
                  <div
                    className="form-control"
                    style={{ height: "auto", background: "#e9ecef" }}
                    dangerouslySetInnerHTML={{ __html: tujuan }}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Dibuat</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={format(
                      new Date(createdDate || new Date()),
                      "dd MMMM yyyy",
                      { locale: idLocale }
                    )}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Update</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={format(
                      new Date(updateDate || new Date()),
                      "dd MMMM yyyy",
                      { locale: idLocale }
                    )}
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

export default DetailVisiPanti;
