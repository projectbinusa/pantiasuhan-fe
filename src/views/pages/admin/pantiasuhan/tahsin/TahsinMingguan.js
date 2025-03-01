import React, { useEffect, useRef, useState } from "react";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { Box, Modal, Pagination } from "@mui/material";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import "../../../../../css/button.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function TahsinMingguan() {
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

  const [date, setDate] = useState("");
  const [date2, setDate2] = useState("");

  const tanggal = new Date();
  const hari = tanggal.getDate();
  const bulan = String(tanggal.getMonth() + 1).padStart(2, "0");
  const tahun = tanggal.getFullYear();
  const formatTanggal = `${tahun}-${bulan}-${hari}`;

  const getTgl = () => {
    setDate2(date);
  };

  console.log(date2);

  const getAll = async () => {
    try {
      const tglAwal = date || formatTanggal;
      const tglAkhir = date2 || formatTanggal;
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/customer/tahsin?page=${currentPage}&limit=${rowsPerPage}&start_date=${tglAwal}&end_date=${tglAkhir}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      setList(response.data.data);
      setPaginationInfo({
        totalPages: response.data.pagination.total_page,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  // const exportTahsin = async () => {
  //   try {
  //     const response = await axios({
  //       url: `${API_DUMMY_SMART}/api/customer/absen/daily?year=${year}&month=${month}&day=${day}&as_file=true`,
  //       method: "GET",
  //       headers: {
  //         "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
  //       },
  //       responseType: "blob",
  //     });

  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "laporan-mingguan.xlsx");
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Gagal mengekspor absensi mingguan:", error);
  //   }
  // };
  useEffect(() => {
    getAll();
    console.log("date: ", date);
  }, [currentPage, rowsPerPage, date2, date]);

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
        <div className="container d-flex g-3 align-items-center mt-3">
          <input
            className="form-control"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <span className="mx-2">sampai</span>
          <input
            className="form-control"
            type="date"
            onChange={(e) => setDate2(e.target.value)}
          />
          <button className="btn-primary ml-3" type="button" onClick={getAll}>
            Cari
          </button>
          <button
            className="btn-primary ml-3"
            type="button"
            // onClick={exportMingguan}
          >
            Export
          </button>
        </div>
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
              <p className="mt-3">Rekap Tahsin Mingguan</p>
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
                    <th>Member ID</th>
                    <th>Nama</th>
                    <th>Tanggal</th>
                    <th>Pojok Awal - Pojok Akhir</th>
                    <th>Juz Awal - Juz Akhir</th>
                    <th>Deskripsi</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((tahsin, no) => {
                      return (
                        <tr key={no}>
                          <td
                            data-label="No"
                            className="text-md-start text-end"
                          >
                            {no + 1 + (currentPage - 1) * rowsPerPage}
                          </td>
                          <td
                            data-label="Member ID"
                            className="text-md-start text-end"
                          >
                            {tahsin.member_id}
                          </td>
                          <td
                            data-label="Nama"
                            className="text-md-start text-end"
                          >
                            {tahsin.member_name}
                          </td>
                          <td
                            data-label="Tanggal"
                            className="text-md-start text-end"
                          >
                            {tahsin.created_date}
                          </td>
                          <td
                            data-label="Pojok Awal - Pojok Akhir"
                            className="text-md-start text-end"
                          >
                            {tahsin.start_pojok} - {tahsin.end_pojok}
                          </td>
                          <td
                            data-label="Juz Awal - Juz Akhir"
                            className="text-md-start text-end"
                          >
                            {tahsin.start_juz} - {tahsin.end_juz}
                          </td>
                          <td
                            data-label="Deskripsi"
                            className="text-md-start text-end"
                          >
                            {tahsin.description}
                          </td>
                          <td
                            data-label="Status"
                            className="text-md-start text-end"
                          >
                            {tahsin.status !== "" ? tahsin.status : "Pending"}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center my-3">
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
    </div>
  );
}

export default TahsinMingguan;
