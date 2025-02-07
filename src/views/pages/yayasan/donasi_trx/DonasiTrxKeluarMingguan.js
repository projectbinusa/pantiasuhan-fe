import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import { Box, Modal, Pagination } from "@mui/material";
import "../../../../css/button.css";
import { API_DUMMY_SMART } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

const formatDate = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

function DonasiTrxKeluarMingguan() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");
  const [organization_id, setOrganization_id] = useState(0);

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  const [cabang, setCabang] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [idCabang, setIdCabang] = useState(0);
  const [tanggalValid, setTanggalValid] = useState("");
  const [idCabangValid, setIdCabangValid] = useState(0);

  const getLastDayOfWeek = (weekValue) => {
    if (!weekValue) return "";

    const [year, week] = weekValue.split("-W").map(Number);

    // Cek jika nilai tidak valid
    if (isNaN(year) || isNaN(week) || week < 1 || week > 53) {
      console.error("Format minggu tidak valid:", weekValue);
      return "";
    }

    // Cari hari Senin dari minggu yang dipilih
    const firstDayOfYear = new Date(year, 0, 1);
    const daysOffset = (week - 1) * 7;
    const firstMonday = new Date(
      firstDayOfYear.setDate(
        firstDayOfYear.getDate() - firstDayOfYear.getDay() + 1 + daysOffset
      )
    );

    // Cari hari Minggu dalam minggu tersebut
    const lastDayOfWeek = new Date(firstMonday);
    lastDayOfWeek.setDate(firstMonday.getDate() + 7);

    return lastDayOfWeek.toISOString().split("T")[0]; // Format YYYY-MM-DD
  };

  const handleFilter = (tgl, id) => {
    let tgls = getLastDayOfWeek(tgl);
    setTanggalValid(tgls);
    setIdCabangValid(id);
    getAll();
    closeModalForm();
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
    console.log("organization_id", organization_id);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAll = async () => {
    try {
      let todays = tanggalValid || today;
      let url = `${API_DUMMY_SMART}/api/user/donation_trx/keluar?weekly=${todays}&page=${currentPage}&limit=${rowsPerPage}`;

      if (idCabangValid) {
        url += `&organization_id=${idCabangValid}`;
      }

      const response = await axios.get(url, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      });

      const { data, pagination } = response.data;
      setList(data);
      setPaginationInfo({
        totalPages: pagination.total_page,
        totalElements: pagination.total,
      });
      console.log("data donasi keluar: ", response.data.data);
    } catch (error) {
      console.error("Terjadi kesalahan:", error.response || error.message);
    }
  };

  useEffect(() => {
    getAll(currentPage);
  }, [currentPage, rowsPerPage, tanggalValid, idCabangValid]);

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

  // FORM FILTER
  const styleForm = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Persentase untuk fleksibilitas
    maxWidth: "500px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    overflowY: "auto",
    maxHeight: "90vh",
    // textAlign: "center", // Menempatkan konten di tengah
  };
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);

  const openModalForm = (image) => {
    setIsModalFormOpen(true);
  };

  const closeModalForm = () => {
    setIsModalFormOpen(false); // Tutup modalForm
  };

  useEffect(() => {
    const fetchDataOrganization = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY_SMART}/api/user/customer/organization_ids`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        console.log("datas: ", response.data);
        setCabang(response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan:", error.response || error.message);
      }
    };

    fetchDataOrganization();
  }, []);

  console.log(tanggalValid);

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
              <p className="mt-3">
                Biaya Mingguan{" "}
                {tanggalValid ? formatDate(tanggalValid) : formatDate(today)}
              </p>
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
              <div className="d-flex ml-auto gap-2">
                <input
                  type="search"
                  className="form-control widget-content-right w-100 d-lg-block d-none d-md-none"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button
                  type="button"
                  onClick={() => openModalForm()}
                  className="btn-success btn-sm"
                >
                  Filter
                </button>
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
                    <th>Tanggal</th>
                    <th>Nama Biaya</th>
                    <th>Nominal</th>
                    <th>Deskripsi</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((item, index) => (
                      <tr key={index}>
                        <td className="text-left" data-label="No">
                          {(currentPage - 1) * rowsPerPage + index + 1}
                        </td>
                        <td className="text-left" data-label="Tanggal">
                          {item.created_date}
                        </td>
                        <td className="text-left" data-label="Nama Biaya">
                          {item.name}
                        </td>
                        <td className="text-left" data-label="Nominal">
                          {item.nominal}
                        </td>
                        <td className="text-left" data-label="Deskripsi">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        </td>
                        <td
                          className="text-lg-center text-md-end"
                          data-label="Image"
                        >
                          <button
                            onClick={() => openModal(item.url_image)}
                            type="button"
                            className="btn-info btn-sm"
                          >
                            Tampilkan Gambar
                          </button>
                          {/* <img
                          src={item.url_image}
                          alt="image"
                          style={{ width: 50, height: 50 }}
                        /> */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center my-3">
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
                onChange={(event, value) => setCurrentPage(value)}
                showFirstButton
                showLastButton
                color="primary"
                disabled={paginationInfo.totalPages === 0}
              />
            </div>
          </div>
        </div>
        <style>
          {`
          td {
                text-align: left !important;
              }
        `}
        </style>
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
      <Modal
        open={isModalFormOpen}
        onClose={closeModalForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleForm}>
          <button
            onClick={closeModalForm}
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
          <div className="row">
            <div className="mb-3 col-lg-12">
              <label className="form-label font-weight-bold">Tanggal</label>
              <input
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                type="week"
                className="form-control"
              />
            </div>
            <div className="mb-3 col-lg-12">
              <label className="form-label font-weight-bold text-start">
                Cabang
              </label>
              <select
                className="form-control"
                value={idCabang}
                onChange={(e) => setIdCabang(e.target.value)}
              >
                <option>Pilih</option>
                {cabang.map((item, idx) => (
                  <option value={item.organization_id} key={idx}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleFilter(tanggal, idCabang)}
            className="btn-success btn-md"
          >
            Filter
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default DonasiTrxKeluarMingguan;
