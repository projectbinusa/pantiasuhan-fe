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

function DataTahfidzWeekly() {
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  const getAll = async () => {
    try {
      // Ambil data user dari localStorage
      const userData = {
        id: localStorage.getItem("id"),
        organization_id: localStorage.getItem("organization_id"),
        rolename: localStorage.getItem("rolename"),
      };

      console.log("User Data dari localStorage:", userData); // Debugging

      if (!userData.organization_id) {
        console.error("organization_id tidak ditemukan dalam localStorage!");
        return;
      }

      // Pastikan start_date dan end_date ada sebelum melakukan request
      if (!start_date || !end_date) {
        console.error("start_date dan end_date harus diisi!");
        return;
      }

      // Ambil token dari localStorage
      const token = localStorage.getItem("tokenpython");
      if (!token) {
        console.error("Token autentikasi tidak ditemukan di localStorage!");
        return;
      }

      console.log("Token ditemukan:", token); // Debugging

      // Set konfigurasi header dengan format auth-tgh
      const config = {
        headers: {
          "auth-tgh": `jwt ${token}`,
        },
        params: {
          start_date,
          end_date,
          organization_id: userData.organization_id,
        },
      };

      console.log("Mengirim request ke API dengan config:", config); // Debugging

      // Panggil API dengan axios
      const response = await axios.get(
        `${API_DUMMY_BYRTGHN}/api/member/tahfidz/rekap-weekly/organization`,
        config
      );

      console.log("API Response:", response.data); // Debugging

      if (response.data && response.data.data) {
        setList(response.data.data);
        setPaginationInfo({
          totalPages: Math.ceil(response.data.data.length / rowsPerPage),
        });
      } else {
        setList([]); // Kosongkan list jika tidak ada hasil
        setPaginationInfo({ totalPages: 1 });
      }
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
      setList([]); // Kosongkan list jika terjadi error
      setPaginationInfo({ totalPages: 1 });
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

  // Paginasi dengan slice()
  const paginatedList = filteredList.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  return (
    <div
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""}`}
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
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header" style={{ display: "flex" }}>
              <p className="mt-3">Daftar Rekap Tahfidz Weekly</p>
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
                {/* Input Start Date */}
                <div className="col-auto">
                  <input
                    type="date"
                    className="form-select form-select-sm"
                    value={start_date}
                    style={{ height: "35px", fontSize: "12px" }}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                {/* Filter End Date */}
                <div className="col-auto">
                  <input
                    type="date"
                    className="form-select form-select-sm"
                    value={end_date}
                    style={{ height: "35px", fontSize: "12px" }}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <Button
                  variant="contained"
                  className="col-md-2"
                  onClick={getAll}
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
                    <th>Nama</th>
                    <th>Tanggal</th>
                    <th>Pojok Awal - Pojok Akhir</th>
                    <th>Juz Awal - Juz Akhir</th>
                    <th>Deskripsi</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedList.length > 0 ? (
                    paginatedList.map((tahfidz, no) => {
                      return (
                        <tr key={no}>
                          <td className="text-md-start text-end">
                            {no + 1 + (currentPage - 1) * rowsPerPage}
                          </td>
                          <td className="text-md-start text-end">
                            {tahfidz.member_name}
                          </td>
                          <td className="text-md-start text-end">
                            {tahfidz.created_date}
                          </td>
                          <td className="text-md-start text-end">
                            {tahfidz.start_pojok} - {tahfidz.end_pojok}
                          </td>
                          <td className="text-md-start text-end">
                            {tahfidz.start_juz} - {tahfidz.end_juz}
                          </td>
                          <td className="text-md-start text-end">
                            {tahfidz.description}
                          </td>
                          <td className="text-md-start text-end">
                            {tahfidz.status !== "" ? tahfidz.status : "Pending"}
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

export default DataTahfidzWeekly;
