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
import { API_DUMMY } from "../../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../../component/SidebarPantiAdmin";
import AsyncSelect from "react-select/async";

function AddBarangInventaris() {
  const [tanggal, setTanggal] = useState("");
  const history = useHistory();
  const param = useParams();
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [namaBarang, setNamaBarang] = useState("");
  const [idKategori, setIdKategori] = useState("");
  const [namaKategori, setNamaKategori] = useState("");
  const [idStatus, setIdStatus] = useState("");
  const [idKondisi, setIdKondisi] = useState("");
  const [idLokasi, setIdLokasi] = useState("");
  const [namaStatus, setNamaStatus] = useState("");
  const [namaKondisi, setNamaKondisi] = useState("");
  const [namaLokasi, setNamaLokasi] = useState("");
  const [stok, setSTok] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${API_DUMMY}/api/admin/status_barang`,
  //           {
  //             headers: {
  //               "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
  //             },
  //           }
  //         );
  //         setStatus(response.data.data);
  //       } catch (error) {
  //         console.error("Terjadi Kesalahan saat mengambil data barang:", error);
  //       }
  //     };

  //     const fetchDataKategori = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${API_DUMMY}/api/admin/kategori_barang`, // Asumsi endpoint berbeda
  //           {
  //             headers: {
  //               "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
  //             },
  //           }
  //         );
  //         setKategori(response.data.data); // Pastikan ada state untuk lokasi
  //       } catch (error) {
  //         console.error("Terjadi Kesalahan saat mengambil data lokasi:", error);
  //       }
  //     };

  //     const fetchDataLokasi = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${API_DUMMY}/api/admin/lokasi_barang`, // Asumsi endpoint berbeda
  //           {
  //             headers: {
  //               "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
  //             },
  //           }
  //         );
  //         setLokasi(response.data.data); // Pastikan ada state untuk lokasi
  //       } catch (error) {
  //         console.error("Terjadi Kesalahan saat mengambil data lokasi:", error);
  //       }
  //     };

  //     const fetchDataKondisi = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${API_DUMMY}/api/admin/kondisi_barang`, // Asumsi endpoint berbeda
  //           {
  //             headers: {
  //               "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
  //             },
  //           }
  //         );
  //         setKondisi(response.data.data); // Pastikan ada state untuk lokasi
  //         console.log("kondisi: ", response.data.data);

  //       } catch (error) {
  //         console.error("Terjadi Kesalahan saat mengambil data lokasi:", error);
  //       }
  //     };

  //     fetchData();
  //     fetchDataLokasi();
  //     fetchDataKondisi();
  //     fetchDataKategori();
  //   }, []);

  const fetchData = async (inputValue) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/status_barang?nama_status=${inputValue}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      return response.data.data.map((status) => ({
        value: status.id,
        label: status.nama_status,
      }));
    } catch (error) {
      console.error("Terjadi Kesalahan saat mengambil data barang:", error);
    }
  };

  const handleStatusChange = (selectedOption) => {
    if (selectedOption) {
      setIdStatus(selectedOption.value);
      setNamaStatus(selectedOption.label);
    } else {
      setIdStatus(null);
      setNamaStatus("");
    }
  };

  const fetchDataKategori = async (inputValue) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/kategori_barang?nama_kategori=${inputValue}`, // Asumsi endpoint berbeda
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      return response.data.data.map((kategori) => ({
        value: kategori.id,
        label: kategori.nama_kategori,
      }));
    } catch (error) {
      console.error("Terjadi Kesalahan saat mengambil data lokasi:", error);
    }
  };

  const handleKategoriChange = (selectedOption) => {
    if (selectedOption) {
      setIdKategori(selectedOption.value);
      setNamaKategori(selectedOption.label);
    } else {
      setIdKategori(null);
      setNamaKategori("");
    }
  };

  const fetchDataLokasi = async (inputValue) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/lokasi_barang?lokasi_barang=${inputValue}`, // Asumsi endpoint berbeda
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      return response.data.data.map((lokasi) => ({
        value: lokasi.id,
        label: lokasi.lokasi_barang,
      }));
    } catch (error) {
      console.error("Terjadi Kesalahan saat mengambil data lokasi:", error);
    }
  };

  const handleLokasiChange = (selectedOption) => {
    if (selectedOption) {
      setIdLokasi(selectedOption.value);
      setNamaLokasi(selectedOption.label);
    } else {
      setIdLokasi(null);
      setNamaLokasi("");
    }
  };

  const fetchDataKondisi = async (inputValue) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/kondisi_barang?kondisi_barang=${inputValue}`, // Asumsi endpoint berbeda
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      return response.data.data.map((kondisi) => ({
        value: kondisi.id,
        label: kondisi.kondisi_barang,
      }));
      console.log("kondisi: ", response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan saat mengambil data lokasi:", error);
    }
  };

  const handleKondisiChange = (selectedOption) => {
    if (selectedOption) {
      setIdKondisi(selectedOption.value);
      setNamaKondisi(selectedOption.label);
    } else {
      setIdKondisi(null);
      setNamaKondisi("");
    }
  };

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
  const add = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(
        `${API_DUMMY}/api/admin/investaris`,
        {
          name: namaBarang,
          kategori_barang_id: idKategori,
          status_barang_id: idStatus,
          lokasi_barang_id: idLokasi,
          kondisi_barang_id: idKondisi,
          tanggal_masuk: tanggal,
          // purchase_date: purchase_date,
          // purchase_price: purchase_price,
          stok: stok,
        },
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Berhasil Menambah Barang",
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
    } finally {
      setIsLoading(false); // Matikan loading setelah selesai
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
                    <h1 className="fs-4">Form Tambah Data</h1>
                    <hr />
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Nama Barang
                          </label>
                          <input
                            value={namaBarang}
                            onChange={(e) => setNamaBarang(e.target.value)}
                            type="text"
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
                          <label className="form-label font-weight-bold">
                            Stok Barang
                          </label>
                          <input
                            value={stok}
                            onChange={(e) => setSTok(e.target.value)}
                            type="number"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label  font-weight-bold ">
                            Kategori Barang
                          </label>
                          <AsyncSelect
                            cacheOptions
                            defaultOptions
                            loadOptions={fetchDataKategori}
                            onChange={handleKategoriChange}
                            placeholder="Cari Kategori Barang..."
                            noOptionsMessage={() =>
                              "Kategori baranag tidak ditemukan"
                            }
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label  font-weight-bold ">
                            Status Barang
                          </label>
                          <AsyncSelect
                            cacheOptions
                            defaultOptions
                            loadOptions={fetchData}
                            onChange={handleStatusChange}
                            placeholder="Cari Status Barang..."
                            noOptionsMessage={() =>
                              "Status baranag tidak ditemukan"
                            }
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label  font-weight-bold ">
                            Lokasi Barang
                          </label>
                          <AsyncSelect
                            cacheOptions
                            defaultOptions
                            loadOptions={fetchDataLokasi}
                            onChange={handleLokasiChange}
                            placeholder="Cari Lokasi Barang..."
                            noOptionsMessage={() =>
                              "Lokasi baranag tidak ditemukan"
                            }
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label  font-weight-bold ">
                            Kondisi Barang
                          </label>
                          <AsyncSelect
                            cacheOptions
                            defaultOptions
                            loadOptions={fetchDataKondisi}
                            onChange={handleKondisiChange}
                            placeholder="Cari Kondisi Barang..."
                            noOptionsMessage={() =>
                              "Kondisi baranag tidak ditemukan"
                            }
                          />
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/barang_inventaris">
                          Batal
                        </a>
                      </button>
                      <button type="submit" className="btn-primary mt-3" disabled={isLoading}>
                        {isLoading ? <span className="loader"></span> : "Kirim"}
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

export default AddBarangInventaris;
