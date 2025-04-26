import React, { useEffect, useState } from "react";
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

function DataHafalanKitabMonth() {
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

  const months = [
    { label: "Januari", value: "01" },
    { label: "Februari", value: "02" },
    { label: "Maret", value: "03" },
    { label: "April", value: "04" },
    { label: "Mei", value: "05" },
    { label: "Juni", value: "06" },
    { label: "Juli", value: "07" },
    { label: "Agustus", value: "08" },
    { label: "September", value: "09" },
    { label: "Oktober", value: "10" },
    { label: "November", value: "11" },
    { label: "Desember", value: "12" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => ({
    label: (currentYear - i).toString(),
    value: (currentYear - i).toString(),
  }));

  const getAll = async () => {
    try {
      const userData = {
        id: localStorage.getItem("id"),
        organization_id: localStorage.getItem("organization_id"),
        rolename: localStorage.getItem("rolename"),
      };

      if (!userData.organization_id || !month || !year) return;

      const token = localStorage.getItem("tokenpython");
      if (!token) return;

      const config = {
        headers: {
          "auth-tgh": `jwt ${token}`,
        },
        params: {
          month,
          year,
          organization_id: userData.organization_id,
        },
      };

      const response = await axios.get(
        `${API_DUMMY_BYRTGHN}/api/member/hafalan-kitab/rekap-month/organization`,
        config
      );

      if (response.data && response.data.data) {
        setList(response.data.data);
        setPaginationInfo({
          totalPages: Math.ceil(response.data.data.length / rowsPerPage),
        });
      } else {
        setList([]);
        setPaginationInfo({ totalPages: 1 });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setList([]);
      setPaginationInfo({ totalPages: 1 });
    }
  };

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setSidebarToggled(false);
      }
    };

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

  const filteredList = list.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedList = filteredList.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header" style={{ display: "flex" }}>
              <p className="mt-3">Daftar Rekap Hafalan Kitab Month</p>
              <div className="d-flex ml-auto gap-2">
                <Select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  style={{ width: "110px", height: "35px", fontSize: "12px" }}
                >
                  <MenuItem value="">Bulan</MenuItem>
                  {months.map((m) => (
                    <MenuItem key={m.value} value={m.value}>
                      {m.label}
                    </MenuItem>
                  ))}
                </Select>
                <Select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  style={{ width: "110px", height: "35px", fontSize: "12px" }}
                >
                  <MenuItem value="">Tahun</MenuItem>
                  {years.map((y) => (
                    <MenuItem key={y.value} value={y.value}>
                      {y.label}
                    </MenuItem>
                  ))}
                </Select>
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
            <div className="table-responsive-3">
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
                  </tr>
                </thead>
                <tbody>
                  {paginatedList.length > 0 ? (
                    paginatedList.map((item, no) => (
                      <tr key={no}>
                        <td>{no + 1 + (currentPage - 1) * rowsPerPage}</td>
                        <td>{item.member_name}</td>
                        <td>{item.created_date}</td>
                        <td>{item.kitab}</td>
                        <td>{item.start_page} - {item.end_page}</td>
                        <td>{item.description}</td>
                        <td>{item.status || "Pending"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">Tidak ada data</td>
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

export default DataHafalanKitabMonth;
