import React, { useEffect, useState } from "react";
import {
  API_DUMMY,
  API_DUMMY_SMART,
} from "../../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { Box, Modal, Pagination } from "@mui/material";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";

function DataShift() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
        `${API_DUMMY_SMART}/api/customer/shift?page=${currentPage}&size=${rowsPerPage}`,
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
          .delete(`${API_DUMMY_SMART}/api/customer/shift/` + id, {
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

  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 800,
  //   bgcolor: "background.paper",
  //   boxShadow: 24,
  //   p: 3,
  //   borderRadius: "10px",
  //   backgroundColor: "#f5f5f5",
  // };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Menggunakan persentase agar menyesuaikan dengan ukuran layar
    maxWidth: "800px", // Menentukan lebar maksimum untuk layar besar
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    overflowY: "auto", // Untuk menangani konten panjang
    maxHeight: "90vh", // Membatasi tinggi modal agar tidak melebihi viewport
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const formatTime = (time) => {
    // Ensure the time is in the correct format: HH:MM:SS
    const [hours, minutes] = time.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`; // Add seconds (00)
  };

  const handleWaktuMasukChange = (e) => {
    const formattedTime = formatTime(e.target.value);
    setWaktuMasuk(formattedTime);
  };

  const handleWaktuPulangChange = (e) => {
    const formattedTime = formatTime(e.target.value);
    setWaktuPulang(formattedTime);
  };

  // ADD
  const [name, setName] = useState("");
  const [waktuMasuk, setWaktuMasuk] = useState("");
  const [waktuPulang, setWaktuPulang] = useState("");
  const [active, setActive] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [level, setLevel] = useState("");

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    // Ensure the time is in the correct format
    const formatTime = (time) => {
      const [hours, minutes] = time.split(":");
      return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`; // Add seconds
    };

    const formattedWaktuMasuk = formatTime(waktuMasuk);
    const formattedWaktuPulang = formatTime(waktuPulang);

    // Log the formatted values before sending to check
    console.log("Waktu Masuk:", formattedWaktuMasuk);
    console.log("Waktu Pulang:", formattedWaktuPulang);

    const data = {
      name: name,
      waktu_masuk: formattedWaktuMasuk, // Example: "07:00:00"
      waktu_pulang: formattedWaktuPulang, // Example: "15:00:00"
      active: parseInt(active), // Ensure active is an integer (1 or 0)
      description: deskripsi,
      level: level,
    };

    try {
      const response = await axios.post(
        `${API_DUMMY_SMART}/api/customer/shift`,
        data,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      setIsModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.reload(); // Redirect to login or perform other actions
      } else {
        setIsModalOpen(false);
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Error:", error.response ? error.response.data : error);
      }
    }
  };

  return (
    <div
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
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
        <div
          className="container box-table mt-3 app-main__outer"
          data-aos="fade-left"
        >
          <div className="ml-2 row g-3 align-items-center d-lg-none d-md-flex rows-rspnv">
            <div className="col-auto">
              <label className="form-label mt-2">Rows per page:</label>
            </div>
            <div className="col-auto">
              <select
                className="form-select form-select-xl w-auto"
                onChange={handleRowsPerPageChange}
                value={rowsPerPage}
              >
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
              <p className="mt-3">Shift</p>
              <div className="ml-2 row g-3 align-items-center d-lg-flex d-none d-md-none">
                <div className="col-auto">
                  <label className="form-label mt-2">Rows per page:</label>
                </div>
                <div className="col-auto">
                  <select
                    className="form-select form-select-sm"
                    onChange={handleRowsPerPageChange}
                    value={rowsPerPage}
                  >
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
                    <button
                      className="active btn-focus p-2 rounded"
                      onClick={openModal}
                    >
                      Tambah
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="table-responsive-3"
              style={{ overflowX: "auto", maxWidth: "100%" }}
            >
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th>Nama</th>
                    <th>Waktu Masuk</th>
                    <th>Waktu Pulang</th>
                    <th>Level</th>
                    <th>Deskripsi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((row, no) => (
                      <tr key={row.id}>
                        <td className="text-md-start text-end" data-label="No">
                          {no + 1 + (currentPage - 1) * rowsPerPage}
                        </td>
                        <td
                          className="text-md-start text-end"
                          data-label="Shift"
                        >
                          {row.name}
                        </td>
                        <td
                          className="text-md-start text-end"
                          data-label="Waktu Masuk"
                        >
                          {row.waktu_masuk}
                        </td>
                        <td
                          className="text-md-start text-end"
                          data-label="Waktu Pulang"
                        >
                          {row.waktu_pulang}
                        </td>
                        <td
                          className="text-md-start text-end"
                          data-label="Level"
                        >
                          {row.level}
                        </td>
                        <td
                          className="text-md-start text-end"
                          data-label="Deskripsi"
                        >
                          {row.description}
                        </td>
                        <td
                          className="text-sm-start text-end action"
                          data-label="Aksi"
                        >
                          <div className="d-flex justify-content-center align-items-center">
                            <button
                              type="button"
                              className="btn-primary btn-sm mr-2"
                            >
                              <a
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                                href={`/admin_shift/edit/${row.id}`}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </a>
                            </button>
                            <button
                              onClick={() => deleteData(row.id)}
                              type="button"
                              className="btn-danger btn-sm"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center my-3">
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
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={add}>
                <div className="row">
                  <div className="mb-3 col-md-12">
                    <label
                      for="exampleInputEmail1"
                      className="form-label  font-weight-bold "
                    >
                      Nama
                    </label>
                    <input
                      className="form-control"
                      required
                      placeholder="Masukkan Nama"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-12">
                    <label
                      for="exampleInputEmail1"
                      className="form-label  font-weight-bold "
                    >
                      Waktu Masuk
                    </label>
                    <input
                      className="form-control"
                      type="time"
                      required
                      placeholder="Masukkan Waktu Masuk"
                      onChange={handleWaktuMasukChange}
                    />
                  </div>
                  <div className="mb-3 col-md-12">
                    <label
                      for="exampleInputEmail1"
                      className="form-label  font-weight-bold "
                    >
                      Waktu Pulang
                    </label>
                    <input
                      className="form-control"
                      type="time"
                      required
                      placeholder="Masukkan Waktu Pulang"
                      onChange={handleWaktuPulangChange}
                    />
                  </div>
                  <div className="mb-3 col-md-12">
                    <label
                      for="exampleInputEmail1"
                      className="form-label  font-weight-bold "
                    >
                      Deskripsi
                    </label>
                    <input
                      className="form-control"
                      required
                      placeholder="Masukkan Deskripsi"
                      onChange={(e) => setDeskripsi(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Level
                          </label>
                          <select
                            className="form-control"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                          >
                            <option>Pilih</option>
                            <option value="santri">Santri</option>
                            <option value="pengurus">Pengurus</option>
                            <option value="guru">Guru</option>
                          </select>
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

export default DataShift;
