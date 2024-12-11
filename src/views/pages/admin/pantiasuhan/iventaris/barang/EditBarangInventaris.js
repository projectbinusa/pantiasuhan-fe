import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY_PYTHON } from "../../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../../component/SidebarPantiAdmin";

function EditBarangInventaris() {
  const [tanggal, setTanggal] = useState("");
  const history = useHistory();
  const param = useParams();
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [namaBarang, setNamaBarang] = useState("");
  const [idKategori, setIdKategori] = useState("");
  const [namaKategori, setNamaKategori] = useState("");
  const [idStatus, setIdStatus] = useState("");
  const [namaStatus, setNamaStatus] = useState("");
  const [kategori, setKategori] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY_PYTHON}/api/admin/status_barang`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        setStatus(response.data.data);
      } catch (error) {
        console.error("Terjadi Kesalahan saat mengambil data barang:", error);
      }
    };

    const fetchDataKategori = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY_PYTHON}/api/admin/kategori_barang`, // Asumsi endpoint berbeda
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        setKategori(response.data.data); // Pastikan ada state untuk lokasi
      } catch (error) {
        console.error("Terjadi Kesalahan saat mengambil data lokasi:", error);
      }
    };

    fetchData();
    fetchDataKategori();
  }, []);

  useEffect(() => {
    axios
      .get(`${API_DUMMY_PYTHON}/api/admin/barang/` + param.id, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setNamaBarang(response.nama_barang);
        setTanggal(response.tgl_masuk)
        setIdKategori(response.kategori_id)
        setIdStatus(response.status_id)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  //add
  const put = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_DUMMY_PYTHON}/api/admin/barang/${param.id}`,
        {
          nama_barang: namaBarang,
          kategori_id: idKategori,
          status_id: idStatus,
          tgl_masuk: tanggal,
        },
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Berhasil Mengedit Barang",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push("/barang_inventaris");
      }, 1500);
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Edit Data Gagal!",
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
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
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
        <div className="app-main__outer container mb-3" data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Edit Data</h1>
                    <hr />
                    <form onSubmit={put}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">Nama Barang
                          </label>
                          <input
                            value={namaBarang}
                            onChange={(e) => setNamaBarang(e.target.value)}
                            type="number"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Tanggal Masuk
                          </label>
                          <input
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            type="date"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label  font-weight-bold ">
                            Kategori Barang
                          </label>
                          <select
                            value={idKategori}
                            className="form-control"
                            aria-label="Small select example"
                            onChange={(e) => {
                              const selectedId = e.target.value;
                              setIdKategori(selectedId);
                              const selected = kategori.find(
                                (data) => String(data.id) === String(selectedId)
                              );
                              setNamaKategori(
                                selected ? selected.nama_kategori : ""
                              );
                            }}>
                            <option value="">
                              Pilih Kategori
                            </option>
                            {kategori.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.nama_kategori}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label  font-weight-bold ">
                            Status Barang
                          </label>
                          <select
                            value={idStatus}
                            className="form-control"
                            aria-label="Small select example"
                            onChange={(e) => {
                              const selectedId = e.target.value;
                              setIdStatus(selectedId);
                              const selected = status.find(
                                (data) => String(data.id) === String(selectedId)
                              );
                              setNamaStatus(
                                selected ? selected.nama_status : ""
                              );
                            }}>
                            <option value="">
                              Pilih Status
                            </option>
                            {status.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.nama_status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/barang_inventaris">
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

export default EditBarangInventaris;