import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { Box, Modal, Pagination } from "@mui/material";
import SidebarPantiAdmin from "../../../../../../component/SidebarPantiAdmin";
import "../../../../../../css/button.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function DataBarangInventaris() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const userRole = localStorage.getItem("rolename");
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
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

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/investaris?page=${currentPage}&size=${rowsPerPage}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      setList(response.data.data);
      console.log("response: ", response.data);
      setPaginationInfo({
        totalPages: Math.ceil(response.data.pagination.total / rowsPerPage),
      });
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
          .delete(`${API_DUMMY}/api/admin/investaris/` + id, {
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
            getAll();
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

  useEffect(() => {
    getAll(currentPage);
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
    setCurrentPage(1);
  };

  const filteredList = list.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // ADD
  const [namaBarang, setNamaBarang] = useState("");
  const [idKategori, setIdKategori] = useState("");
  const [idStatus, setIdStatus] = useState("");
  const [idLokasi, setIdLokasi] = useState("");
  const [idKondisi, setIdKondisi] = useState("");
  const [stok, setStok] = useState("");
  const [purchase_price, setPurchasePrice] = useState("");
  const [purchase_date, setPurchaseDate] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [kategori, setKategori] = useState([]);
  const [status, setStatus] = useState([]);
  const [lokasi, setLokasi] = useState([]);
  const [kondisi, setKondisi] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/admin/status_barang`,
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
          `${API_DUMMY}/api/admin/kategori_barang`, // Asumsi endpoint berbeda
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

    const fetchDataLokasi = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/admin/lokasi_barang`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        setLokasi(response.data.data);
      } catch (error) {
        console.error("Terjadi Kesalahan saat mengambil data lokasi:", error);
      }
    };

    const fetchDataKondisi = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/admin/kondisi_barang`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        setKondisi(response.data.data);
        console.log("kegiatan: ", response.data.data);
      } catch (error) {
        console.error("Terjadi Kesalahan saat mengambil data lokasi:", error);
      }
    };

    fetchDataKondisi();
    fetchDataLokasi();
    fetchData();
    fetchDataKategori();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      name: namaBarang || "-",
      kategori_barang_id: idKategori || 0,
      status_barang_id: idStatus || 0,
      lokasi_barang_id: idLokasi || 0,
      tanggal_masuk: tanggal || "-",
      kondisi_barang_id: idKondisi || 0,
      // purchase_date: purchase_date,
      // purchase_price: purchase_price,
      stok: stok || 0,
    };

    try {
      await axios.post(`${API_DUMMY}/api/admin/investaris`, data, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      });
      setIsModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
      } else {
        setIsModalOpen(false);
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
        <div
          className="container box-table mt-3 app-main__outer"
          data-aos="fade-left">
          <div className="ml-2 row g-3 align-items-center d-lg-none d-md-flex rows-rspnv">
            <div className="col-auto">
              <label className="form-label mt-2">Rows per page:</label>
            </div>
            <div className="col-auto">
              <select
                className="form-select form-select-xl w-auto"
                onChange={handleRowsPerPageChange}
                value={rowsPerPage}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          <div className="search">
            <input
              type="search"
              className="form-control widget-content-right w-100 mt-2 mb-2 d-lg-none d-md-block"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header" style={{ display: "flex" }}>
              <p className="mt-3">Barang Inventaris</p>
              <div className="ml-2 row g-3 align-items-center d-lg-flex d-none d-md-none">
                <div className="col-auto">
                  <label className="form-label mt-2">Rows per page:</label>
                </div>
                <div className="col-auto">
                  <select
                    className="form-select form-select-sm"
                    onChange={handleRowsPerPageChange}
                    value={rowsPerPage}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </div>
              <div className="d-flex ml-auto gap-3">
                <input
                  type="search"
                  className="form-control widget-content-right w-75 d-lg-block d-none d-md-none"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="btn-actions-pane-right">
                  <div role="group" className="btn-group-sm btn-group">
                    <button className="active btn-focus p-2 rounded">
                      <Link
                        style={{ color: "white", textDecoration: "none" }}
                        to="/add_barang_inventaris">
                        Tambah
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="table-responsive-3"
              style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th>Nama Barang</th>
                    <th scope="col">Kategori</th>
                    <th>Status</th>
                    <th>Tanggal Masuk</th>
                    <th>Lokasi</th>
                    <th>Kondisi</th>
                    <th>Stok</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((row, no) => {
                      return (
                        <tr key={no}>
                          <td
                            className="text-md-start text-end"
                            data-label="No">
                            {no + 1 + (currentPage - 1) * rowsPerPage}
                          </td>
                          <td
                            className="text-md-start text-end"
                            data-label="Nama Barang">
                            {row.name}
                          </td>
                          <td
                            className="text-md-start text-end"
                            data-label="Kategori">
                            {row.kategori_barang_name}
                          </td>
                          <td
                            className="text-md-start text-end"
                            data-label="Status">
                            {row.status_barang_name}
                          </td>
                          <td
                            className="text-md-start text-end"
                            data-label="Tanggal Masuk">
                            {row.tanggal_masuk}
                          </td>
                          <td
                            className="text-md-start text-end"
                            data-label="Lokasi">
                            {row.lokasi_barang_name}
                          </td>
                          <td
                            className="text-md-start text-end"
                            data-label="Kondisi">
                            {row.kondisi_barang_name}
                          </td>
                          <td
                            className="text-md-start text-end"
                            data-label="Stok">
                            {row.stok}
                          </td>
                          <td
                            className="text-sm-start text-end action"
                            data-label="Aksi">
                            <div className="d-flex justify-content-center align-items-center">
                              {userRole !== "yayasan" && (
                                <>
                                  <button
                                    type="button"
                                    className="btn-primary btn-sm mr-2">
                                    <a
                                      style={{
                                        color: "white",
                                        textDecoration: "none",
                                      }}
                                      href={`/edit_barang_inventaris/${row.id}`}>
                                      <i className="fa-solid fa-pen-to-square"></i>
                                    </a>
                                  </button>
                                  <button
                                    onClick={() => deleteData(row.id)}
                                    type="button"
                                    className="btn-danger btn-sm">
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center my-3">
                        <div style={{ padding: "10px", color: "#555" }}>
                          Tidak ada data yang tersedia.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="card-header mt-3 d-flex justify-content-center">
              <Pagination
                count={paginationInfo.totalPages}
                page={currentPage}
                onChange={(event, value) => {
                  setCurrentPage(value);
                  setPage(value);
                }}
                showFirstButton
                showLastButton
                color="primary"
              />
            </div>
          </div>
          <Modal
            open={isModalOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <form onSubmit={add}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label
                      for="exampleInputEmail1"
                      className="form-label  font-weight-bold ">
                      Nama Barang
                    </label>
                    <input
                      className="form-control"
                      placeholder="Masukkan Nama Barang"
                      onChange={(e) => setNamaBarang(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label
                      for="exampleInputEmail1"
                      className="form-label font-weight-bold ">
                      Tanggal Masuk
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      onChange={(e) => setTanggal(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label
                      for="exampleInputEmail1"
                      className="form-label font-weight-bold ">
                      Kategori Barang
                    </label>
                    <select
                      className="form-control"
                      aria-label="Small select example"
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        setIdKategori(selectedId);
                      }}>
                      <option value="">Pilih Kategori</option>
                      {kategori.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.nama_kategori}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label
                      for="exampleInputEmail1"
                      className="form-label font-weight-bold ">
                      Status Barang
                    </label>
                    <select
                      className="form-control"
                      aria-label="Small select example"
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        setIdStatus(selectedId);
                      }}>
                      <option value="">Pilih Status</option>
                      {status.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.nama_status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label
                      for="exampleInputEmail1"
                      className="form-label font-weight-bold ">
                      Kondisi Barang
                    </label>
                    <select
                      className="form-control"
                      aria-label="Small select example"
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        setIdKondisi(selectedId);
                      }}>
                      <option value="">Pilih Kondisi</option>
                      {kondisi.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.kondisi_barang}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label
                      for="exampleInputEmail1"
                      className="form-label font-weight-bold ">
                      Lokasi Barang
                    </label>
                    <select
                      className="form-control"
                      aria-label="Small select example"
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        setIdLokasi(selectedId);
                      }}>
                      <option value="">Pilih Lokasi</option>
                      {lokasi.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.lokasi_barang}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label
                      for="exampleInputEmail1"
                      className="form-label  font-weight-bold ">
                      Stok
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Masukkan Stok Barang"
                      onChange={(e) => setStok(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button onClick={closeModal} className="btn-danger ">
                      TUTUP
                    </button>
                    <button type="submit" className="btn-primary">
                      SIMPAN
                    </button>
                  </div>
                </div>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default DataBarangInventaris;
