import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import "../../../../css/button.css";
import { API_DUMMY_BYRTGHN } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function DataTahsinDay() {
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [start_date, setStartDate] = useState("");

  const getAll = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // Ambil user dari localStorage
      const organization_id = user?.organization_id || ""; // Ambil organization_id dari user

      if (!organization_id) {
        console.error("organization_id tidak ditemukan!");
        return; // Berhenti jika organization_id kosong
      }

      const response = await axios.get(
        `${API_DUMMY_BYRTGHN}/api/member/tahsin/rekap-day/member`,
        {
          params: {
            page: currentPage,
            month: month || new Date().getMonth() + 1,
            year: year || new Date().getFullYear(),
            organization_id, // Pastikan ini dikirim
          },
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      setList(response.data.data);
      setPaginationInfo({
        totalPages: response.data.pagination.total_page,
      });

      console.log("API Response:", response.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error
      );
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

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
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
          {/* <div className="search">
            <input
              type="search"
              className="form-control widget-content-right w-100 mt-2 mb-2 d-lg-none d-md-block"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div> */}
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header" style={{ display: "flex" }}>
              <p className="mt-3">Daftar Rekap Tahsin Day</p>
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
                {/* <input
                  type="search"
                  className="form-control widget-content-right w-75 d-lg-block d-none d-md-none"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                /> */}
                {/* Filter Bulan */}
                <div className="col-auto">
                  <input
                    type="date"
                    className="form-select form-select-sm"
                    value={start_date}
                    style={{ height: "35px", fontSize: "12px" }}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                {/* Tombol Cari */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={getAll}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Cari
                </Button>
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
                    {/* <th>Member ID</th> */}
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
                    filteredList.map((tahsin, no) => {
                      return (
                        <tr key={no}>
                          <td
                            data-label="No"
                            className="text-md-start text-end"
                          >
                            {no + 1 + (currentPage - 1) * rowsPerPage}
                          </td>
                          {/* <td
                            data-label="Member ID"
                            className="text-md-start text-end">
                            {tahsin.member_id}
                          </td> */}
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
                      <td colSpan="9" className="text-center my-3">
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

export default DataTahsinDay;
