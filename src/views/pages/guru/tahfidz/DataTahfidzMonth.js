import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import Swal from "sweetalert2"; // Import SweetAlert2
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Pagination,
  Select,
} from "@mui/material";
import "../../../../css/button.css";
import { API_DUMMY_BYRTGHN } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function DataTahfidzMonth() {
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({ totalPages: 1 });
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
      const organization_id = localStorage.getItem("organization_id");
      if (!organization_id || !month || !year) return;

      const token = localStorage.getItem("tokenpython");
      if (!token) return;

      const response = await axios.get(
        `${API_DUMMY_BYRTGHN}/api/member/tahfidz/rekap-month/organization`,
        {
          headers: { "auth-tgh": `jwt ${token}` },
          params: { month, year, organization_id },
        }
      );

      const data = response.data?.data || [];
      setList(data);
      setPaginationInfo({ totalPages: Math.ceil(data.length / rowsPerPage) });
    } catch (error) {
      console.error("Error fetching data:", error.response?.data || error.message);
      setList([]);
      setPaginationInfo({ totalPages: 1 });
    }
  };

  const handleExport = async () => {
    try {
      if (!month || !year) {
        Swal.fire({
          icon: 'warning',
          title: 'Pilih bulan dan tahun terlebih dahulu.',
          showConfirmButton: true,
        });
        return;
      }

      const token = localStorage.getItem("tokenpython");
      if (!token) return;

      const response = await axios.get(
        `${API_DUMMY_BYRTGHN}/api/member/tahfidz/export/monthly`,
        {
          headers: { "auth-tgh": `jwt ${token}` },
          params: {
            as_file: true,
            type: 2,
            type_param: 2,
            month,
            year,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Tahfidz_Bulanan_${month}_${year}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      Swal.fire({
        icon: 'success',
        title: 'Export Berhasil!',
        text: `Data Tahfidz Bulanan ${month} ${year} berhasil diunduh.`,
        showConfirmButton: true,
      });
    } catch (error) {
      console.error("Error exporting data:", error.response?.data || error.message);
      Swal.fire({
        icon: 'error',
        title: 'Gagal Export Data',
        text: 'Terjadi kesalahan saat melakukan export data.',
        showConfirmButton: true,
      });
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
    getAll();
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
    <div className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""}`}>
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
        <div className="container box-table mt-3 app-main__outer" data-aos="fade-left">
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header d-flex flex-wrap align-items-center">
              <p className="mt-3 mb-0">Daftar Rekap Tahfidz Bulanan</p>
              <div className="d-flex ml-auto gap-2 flex-wrap">
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
                <Button variant="contained" color="primary" onClick={getAll}>
                  Cari
                </Button>
                <Button variant="contained" color="success" onClick={handleExport}>
                  Export
                </Button>
              </div>
            </div>

            <div className="table-responsive-3" style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>No</th>
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
                    paginatedList.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                        <td>{item.member_name}</td>
                        <td>{item.created_date}</td>
                        <td>{item.start_pojok} - {item.end_pojok}</td>
                        <td>{item.start_juz} - {item.end_juz}</td>
                        <td>{item.description}</td>
                        <td>{item.status || "Pending"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Tidak ada data yang tersedia.
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

export default DataTahfidzMonth;
