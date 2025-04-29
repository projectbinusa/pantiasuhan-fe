import React, { useEffect, useRef, useState } from "react";
import { API_DUMMY_SMART } from "../../../../utils/base_URL";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "../../../../css/button.css";
import { Box, Modal, Pagination } from "@mui/material";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function Kitab() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedKitabId, setSelectedKitabId] = useState(null);
  
  // Form states
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [kitab, setKitab] = useState("");
  const [startHalaman, setStartHalaman] = useState("");
  const [endHalaman, setEndHalaman] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [member_id, setMemberId] = useState("");
  const [rfidNumber, setRfidNumber] = useState("");
  const [userData, setUserData] = useState(null);
  const [memberName, setMemberName] = useState("");

  const rfidInputRef = useRef(null);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/member/guru/materi_kitab?page=${currentPage}&limit=${rowsPerPage}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      const { data, pagination } = response.data;
      console.log(response);

      setList(data || []); // Pastikan data selalu berupa array

      setPaginationInfo({
        totalPages: pagination?.total_page || 1,
        totalElements: pagination?.total || 0,
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
          .delete(`${API_DUMMY_SMART}/api/member/guru/materi_kitab/` + id, {
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
              history.push("/guru/kitab");
              window.location.reload();
            }, 1500);
          });
      }
    });
  };

  // Modal functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModal1 = (id) => {
    setSelectedKitabId(id);
    setIsModalOpen1(true);
  };
  const closeModal1 = () => setIsModalOpen1(false);

  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => {
    setIsModalOpen2(false);
    setUserData(null);
    setRfidNumber("");
  };

  // RFID functions
  const tabrfid = async (event) => {
    event.preventDefault();

    if (!rfidNumber) {
      setUserData(null);
      return;
    }

    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/customer/member/rfid?rfid_number=${rfidNumber}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      if (response.data && response.data.data) {
        setUserData(response.data.data);
        setMemberName(response.data.data.name);
        setMemberId(response.data.data.id);
        console.log(response.data.data);

        closeModal2();
        openModal();
      }
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
      setUserData(null);
      await Swal.fire({
        title: "Gagal!",
        text: "RFID tidak ditemukan atau terjadi kesalahan.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleManualRFID = (e) => {
    const manualRfid = e.target.value;
    setRfidNumber(manualRfid);
  };

  // Add function
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      name,
      date,
      kitab,
      startHalaman,
      endHalaman,
      description,
      member_id,
      status,
    };

    try {
      const response = await axios.post(
        `${API_DUMMY_SMART}/api/member/guru/materi_kitab`,
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
        window.location.reload();
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

  // Edit function
  const edit = async (e) => {
    e.preventDefault();

    if (!selectedKitabId) {
      console.error("Error: kitab_id tidak tersedia");
      return;
    }

    const data = {
      status,
    };

    try {
      const response = await axios.put(
        `${API_DUMMY_SMART}/api/member/guru/materi_kitab/${selectedKitabId}/status`,
        data,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      setIsModalOpen1(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Diedit",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      } else {
        setIsModalOpen1(false);
        Swal.fire({
          icon: "error",
          title: "Edit Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Error:", error.response ? error.response.data : error);
      }
    }
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "800px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    overflowY: "auto",
    maxHeight: "90vh",
    textAlign: "center",
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
              <p className="mt-3">Kitab</p>
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
                      onClick={openModal2}
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
                    <th>No</th>
                    <th>Nama</th>
                    <th>Tanggal</th>
                    <th>Kitab</th>
                    <th>Halaman Awal - Akhir</th>
                    <th>Deskripsi</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td data-label="No" className="text-md-start text-end">
                            {index + 1 + (currentPage - 1) * rowsPerPage}
                          </td>
                          <td data-label="Nama" className="text-md-start text-end">
                            {data.name}
                          </td>
                          <td data-label="Tanggal" className="text-md-start text-end">
                            {data.date}
                          </td>
                          <td data-label="Kitab" className="text-md-start text-end">
                            {data.kitab}
                          </td>
                          <td data-label="Halaman" className="text-md-start text-end">
                            {`${data.startHalaman} - ${data.endHalaman}`}
                          </td>
                          <td data-label="Deskripsi" className="text-md-start text-end">
                            {data.description}
                          </td>
                          <td data-label="Status" className="text-md-start text-end">
                            {data.status !== "" ? data.status : "Pending"}
                          </td>
                          <td className="action" data-label="Aksi">
                            <div className="d-flex justify-content-center align-items-center">
                              <button
                                type="button"
                                className="btn-primary btn-sm mr-2"
                                onClick={() => openModal1(data.id)}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                              <button
                                type="button"
                                className="btn-danger btn-sm"
                                onClick={() => deleteData(data.id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
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
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Materi Kitab - {memberName}
          </h4>

          <form onSubmit={add}>
            <div
              className="form-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                gridTemplateAreas: `
                  "name date"
                  "kitab ."
                  "startHalaman endHalaman"
                  "description ."
                `,
              }}
            >
              {/* Name */}
              <div className="mb-3" style={{ gridArea: "name" }}>
                <label className="form-label font-weight-bold">Nama</label>
                <input
                  className="form-control"
                  required
                  placeholder="Masukkan Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Date */}
              <div className="mb-3" style={{ gridArea: "date" }}>
                <label className="form-label font-weight-bold">Tanggal</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Kitab */}
              <div className="mb-3" style={{ gridArea: "kitab" }}>
                <label className="form-label font-weight-bold">Kitab</label>
                <input
                  className="form-control"
                  required
                  placeholder="Masukkan Nama Kitab"
                  value={kitab}
                  onChange={(e) => setKitab(e.target.value)}
                />
              </div>

              {/* Start Halaman */}
              <div className="mb-3" style={{ gridArea: "startHalaman" }}>
                <label className="form-label font-weight-bold">Halaman Awal</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  placeholder="Masukkan Halaman Awal"
                  value={startHalaman}
                  onChange={(e) => setStartHalaman(e.target.value)}
                />
              </div>

              {/* End Halaman */}
              <div className="mb-3" style={{ gridArea: "endHalaman" }}>
                <label className="form-label font-weight-bold">Halaman Akhir</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  placeholder="Masukkan Halaman Akhir"
                  value={endHalaman}
                  onChange={(e) => setEndHalaman(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="mb-3" style={{ gridArea: "description" }}>
                <label className="form-label font-weight-bold">Deskripsi</label>
                <textarea
                  className="form-control"
                  required
                  placeholder="Masukkan Deskripsi"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
                marginTop: "1rem",
              }}
            >
              <button onClick={closeModal} className="btn btn-danger">
                TUTUP
              </button>
              <button type="submit" className="btn btn-primary">
                SIMPAN
              </button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={isModalOpen1}
        onClose={closeModal1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            mx: "auto",
            mt: "10%",
          }}
        >
          <form onSubmit={edit}>
            <h4 style={{ marginBottom: "1rem", textAlign: "center" }}>
              Edit Status Kitab
            </h4>

            <div className="mb-3">
              <label className="form-label font-weight-bold">Status</label>
              <select
                className="form-control"
                required
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Pilih Status</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <button
                onClick={closeModal1}
                className="btn btn-danger"
                type="button"
              >
                TUTUP
              </button>
              <button type="submit" className="btn btn-primary">
                SIMPAN
              </button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* RFID Modal */}
      <Modal
        open={isModalOpen2}
        onClose={closeModal2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            mx: "auto",
            mt: "10%",
          }}
        >
          <form onSubmit={tabrfid}>
            <h4 style={{ marginBottom: "1rem", textAlign: "center" }}>
              Tab Kartu
            </h4>

            <div className="mb-3">
              <label className="form-label font-weight-bold">Tab Kartu</label>
              <input
                className="form-control"
                required
                placeholder="Tab Kartu"
                value={rfidNumber}
                onChange={handleManualRFID}
                ref={rfidInputRef}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <button
                onClick={closeModal2}
                className="btn btn-danger"
                type="button"
              >
                TUTUP
              </button>
              <button type="submit" className="btn btn-primary">
                SIMPAN
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Kitab;