import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Modal, Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";
import AOS from "aos";
import "aos/dist/aos.css";

const GuruDataTahfidz = () => {
  const [list, setList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [startJuz, setStartJuz] = useState("");
  const [endJuz, setEndJuz] = useState("");
  const [startPojok, setStartPojok] = useState("");
  const [endPojok, setEndPojok] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [memberName, setMemberName] = useState("");
  const [rfidNumber, setRfidNumber] = useState("");
  const rfidInputRef = React.createRef();

  const API_DUMMY = "http://example.com"; // Ganti dengan URL API asli Anda

  const toggleSidebar = () => {
    // Logic untuk toggle sidebar
  };

  const getAll = (page) => {
    // Fungsi untuk mendapatkan data
    axios
      .get(`${API_DUMMY}/api/tahfidz`, { params: { page } })
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const openModal1 = (id) => {
    setIsModalOpen1(true);
    // Set memberName atau data lainnya sesuai ID yang dikirim
  };

  const closeModal1 = () => setIsModalOpen1(false);
  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => setIsModalOpen2(false);
  const closeModal = () => setIsModalOpen(false);

  const add = (e) => {
    e.preventDefault();
    // Logic untuk menambahkan data tahfidz
    Swal.fire("Success", "Data berhasil ditambahkan", "success");
  };

  const edit = (e) => {
    e.preventDefault();
    // Logic untuk edit status
    Swal.fire("Success", "Status berhasil diubah", "success");
  };

  const tabrfid = (e) => {
    e.preventDefault();
    // Logic untuk tab RFID
    Swal.fire("Success", "RFID berhasil diset", "success");
  };

  const [sidebarToggled, setSidebarToggled] = useState(true);

  const modalStyle = {
    width: 400,
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    mx: "auto",
    mt: "10%",
  };

  const filteredList = list.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  useEffect(() => {
    getAll(currentPage);
  }, [currentPage]);

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
        <div
          className="container box-table mt-3 app-main__outer"
          data-aos="fade-left"
        >
          <div className="search">
            <input
              type="search"
              className="form-control widget-content-right w-100 mt-2 mb-2"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header" style={{ display: "flex" }}>
              <p className="mt-3">Daftar Tahfidz</p>
              <div className="d-flex ml-auto gap-3">
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
            <div className="table-responsive-3" style={{ overflowX: "auto" }}>
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th>Member ID</th>
                    <th>Nama</th>
                    <th>Tanggal</th>
                    <th>Pojok Awal - Pojok Akhir</th>
                    <th>Juz Awal - Juz Akhir</th>
                    <th>Deskripsi</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((tahfidz, no) => (
                      <tr key={no}>
                        <td>{no + 1 + (currentPage - 1) * rowsPerPage}</td>
                        <td>{tahfidz.member_id}</td>
                        <td>{tahfidz.member_name}</td>
                        <td>{tahfidz.created_date}</td>
                        <td>{tahfidz.start_pojok} - {tahfidz.end_pojok}</td>
                        <td>{tahfidz.start_juz} - {tahfidz.end_juz}</td>
                        <td>{tahfidz.description}</td>
                        <td>{tahfidz.status || "Pending"}</td>
                        <td>
                          <button
                            type="button"
                            className="btn-primary btn-sm"
                            onClick={() => openModal1(tahfidz.id)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center my-3">
                        Tidak ada data yang tersedia.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              showFirstButton
              showLastButton
              color="primary"
            />
          </div>
        </div>
      </div>

      {/* Modal Form Tambah */}
      <Modal open={isModalOpen2} onClose={closeModal2}>
        <Box sx={modalStyle}>
          <h4 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Setoran Tahfidz - {memberName}
          </h4>
          <form onSubmit={add}>
            <div style={{ display: "grid", gap: "1rem" }}>
              <div className="mb-3">
                <label className="form-label font-weight-bold">Start Juz</label>
                <input
                  className="form-control"
                  required
                  placeholder="Masukkan Start Juz"
                  onChange={(e) => setStartJuz(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label font-weight-bold">End Juz</label>
                <input
                  className="form-control"
                  required
                  placeholder="Masukkan End Juz"
                  onChange={(e) => setEndJuz(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label font-weight-bold">Start Pojok</label>
                <input
                  className="form-control"
                  required
                  placeholder="Masukkan Start Pojok"
                  onChange={(e) => setStartPojok(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label font-weight-bold">End Pojok</label>
                <input
                  className="form-control"
                  required
                  placeholder="Masukkan End Pojok"
                  onChange={(e) => setEndPojok(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label font-weight-bold">Deskripsi</label>
                <input
                  className="form-control"
                  required
                  placeholder="Masukkan Deskripsi"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-danger" onClick={closeModal2}>
                  TUTUP
                </button>
                <button type="submit" className="btn btn-primary">
                  SIMPAN
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>

      {/* Modal Edit Status */}
      <Modal open={isModalOpen1} onClose={closeModal1}>
        <Box sx={modalStyle}>
          <h4 style={{ textAlign: "center", marginBottom: "1rem" }}>Edit Status</h4>
          <form onSubmit={edit}>
            <div className="mb-3">
              <label className="form-label font-weight-bold">Status</label>
              <select
                className="form-control"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Pilih Status</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="button" className="btn btn-danger" onClick={closeModal1}>
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
};

export default GuruDataTahfidz;
