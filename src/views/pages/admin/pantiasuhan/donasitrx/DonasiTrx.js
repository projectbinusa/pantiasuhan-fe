import React, { useEffect, useState } from "react";
import { API_DUMMY_SMART } from "../../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { Box, Modal, Pagination } from "@mui/material";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import "../../../../../css/button.css";

function DonasiTrx() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarToggled, setSidebarToggled] = useState(true);

  // Mendapatkan role pengguna
  const userRole = localStorage.getItem("role"); // Menyimpan role saat login

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
        `${API_DUMMY_SMART}/api/customer/donation_trx/masuk?page=${currentPage}&limit=${rowsPerPage}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      const { data, pagination } = response.data;

      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setList(sortedData);
      setPaginationInfo({
        totalPages: pagination.total_page,
        totalElements: pagination.total,
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error.response || error.message);
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
          .delete(`${API_DUMMY_SMART}/api/customer/donation_trx/${id}`, {
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

  useEffect(() => {
    if (currentPage > paginationInfo.totalPages) {
      setCurrentPage(paginationInfo.totalPages || 1);
    }
  }, [paginationInfo.totalPages, currentPage]);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredList = searchTerm
    ? list.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : list;

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Persentase untuk fleksibilitas
    maxWidth: "800px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    overflowY: "auto",
    maxHeight: "90vh",
    textAlign: "center", // Menempatkan konten di tengah
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(""); // Untuk menyimpan URL gambar

  const openModal = (image) => {
    setImageSrc(image); // Simpan URL gambar
    setIsModalOpen(true); // Buka modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Tutup modal
    setImageSrc(""); // Reset URL gambar
  };

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
              <p className="mt-3">Dana Masuk</p>
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
                {/* Tombol Tambah hanya ditampilkan jika bukan role 'yayasan' */}
                {userRole !== "yayasan" && (
                  <div className="btn-actions-pane-right">
                    <div role="group" className="btn-group-sm btn-group">
                      <button className="active btn-focus p-2 rounded">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/add_donasi_trx"
                        >
                          Tambah
                        </a>
                      </button>
                    </div>
                  </div>
                )}
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
                    <th>Nama Donatur</th>
                    <th>Nominal</th>
                    <th>Deskripsi</th>
                    <th>Image</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((item, index) => (
                    <tr key={index}>
                      <td data-label="No" className="text-md-start text-end">
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </td>
                      <td
                        data-label="Nama Donatur"
                        className="text-md-start text-end"
                      >
                        {item.name}
                      </td>
                      <td data-label="Nominal" className="text-end">
                        {item.nominal}
                      </td>
                      <td
                        data-label="Deskripsi"
                        className="text-md-start text-end"
                      >
                        <div
                          className="isiBerita"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </td>
                      <td
                        data-label="Image"
                        className="text-md-center text-end"
                      >
                        <button
                          onClick={() => openModal(item.url_image)}
                          type="button"
                          className="btn-info btn-sm"
                        >
                          Tampilkan Gambar
                        </button>
                        {/* <img src={item.url_image} alt="image" style={{ width: 50, height: 50 }} /> */}
                      </td>
                      <td data-label="Aksi" className="action">
                        {/* Tombol hanya tampil jika role bukan 'yayasan' */}
                        {userRole !== "yayasan" && (
                          <div style={{ display: "flex" }}>
                            <button
                              type="button"
                              className="btn-primary btn-sm mr-2"
                            >
                              <a
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                                href={`/edit_donasi_trx/${item.id}`}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </a>
                            </button>
                            <button
                              type="button"
                              className="btn-danger btn-sm"
                              onClick={() => deleteData(item.id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-header mt-3 d-flex justify-content-center">
              <Pagination
                count={paginationInfo.totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                showFirstButton
                showLastButton
                color="primary"
                disabled={paginationInfo.totalPages === 0}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button
            onClick={closeModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "black",
            }}
            aria-label="Close"
          >
            ✖
          </button>{" "}
          <br />
          {/* Gambar */}
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "70vh",
                borderRadius: "8px",
              }}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default DonasiTrx;
