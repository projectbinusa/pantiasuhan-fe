import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { Box, Button, Pagination, Select, MenuItem } from "@mui/material";
import "../../../../css/button.css";
import { API_DUMMY_BYRTGHN } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function DataTahsinDay() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [list, setList] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [start_date, setStartDate] = useState("");
  const [exportType, setExportType] = useState("daily");
  const [isLoading, setIsLoading] = useState(false);

  // List bulan dan tahun
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
      const user = JSON.parse(localStorage.getItem("user"));
      const organization_id = user?.organization_id || "";
  
      if (!organization_id) {
        console.error("organization_id tidak ditemukan!");
        return;
      }
  
      const response = await axios.get(
        `${API_DUMMY_BYRTGHN}/api/member/guru/tahsin`,
        {
          params: {
            type: 1,
            date: "2025-04-28",
          },
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
  
      setList(response.data.data);
      setPaginationInfo({
        totalPages: response.data.pagination?.total_page || 1,
      });
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error
      );
    }
  };  

  const handleExport = async () => {
    try {
      setIsLoading(true);
      
      if (exportType === "daily" && !start_date) {
        Swal.fire({
          icon: "warning",
          title: "Tanggal belum dipilih!",
          text: "Silakan pilih tanggal terlebih dahulu sebelum export.",
        });
        return;
      }

      const token = localStorage.getItem("tokenpython");
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Token tidak ditemukan",
          text: "Silakan login ulang.",
        });
        return;
      }

      let url = "";
      let filename = "";

      if (exportType === "monthly") {
        const monthParam = month || new Date().getMonth() + 1;
        const yearParam = year || new Date().getFullYear();
        url = `${API_DUMMY_BYRTGHN}/api/member/guru/tahsin/export/monthly?as_file=true&type=1&month=${monthParam}&year=${yearParam}`;
        filename = `rekap_tahsin_monthly_${monthParam}-${yearParam}.xlsx`;
      } else if (exportType === "weekly") {
        if (!start_date) {
          Swal.fire({
            icon: "warning",
            title: "Tanggal belum dipilih!",
            text: "Silakan pilih tanggal awal minggu terlebih dahulu sebelum export.",
          });
          return;
        }
        url = `${API_DUMMY_BYRTGHN}/api/member/guru/tahsin/export/weekly?as_file=true&type_param=1&start_date=${start_date}`;
        filename = `rekap_tahsin_weekly_${start_date}.xlsx`;
      } else if (exportType === "daily") {
        url = `${API_DUMMY_BYRTGHN}/api/member/guru/tahsin/export/daily?as_file=true&type_param=22&date=${start_date}`;
        filename = `rekap_tahsin_daily_${start_date}.xlsx`;
      }

      const response = await axios.get(url, {
        responseType: "blob",
        headers: {
          "auth-tgh": `jwt ${token}`,
        },
      });

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil didownload!",
      });

    } catch (error) {
      console.error("Error exporting data:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Export",
        text: "Terjadi kesalahan saat mengunduh data.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAll();
  }, [currentPage, rowsPerPage, month, year, start_date]);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredList = list.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

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

                <div className="col-auto">
                  <input
                    type="date"
                    className="form-select form-select-sm"
                    value={start_date}
                    style={{ height: "35px", fontSize: "12px" }}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={getAll}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Cari
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  onClick={handleExport}
                  style={{ whiteSpace: "nowrap" }}
                >
                  Export
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
                  {filteredList.length > 0 ? (
                    filteredList.map((tahsin, index) => (
                      <tr key={index}>
                        <td data-label="No" className="text-md-start text-end">
                          {index + 1 + (currentPage - 1) * rowsPerPage}
                        </td>
                        <td data-label="Nama" className="text-md-start text-end">
                          {tahsin.member_name}
                        </td>
                        <td data-label="Tanggal" className="text-md-start text-end">
                          {tahsin.created_date}
                        </td>
                        <td data-label="Pojok Awal - Pojok Akhir" className="text-md-start text-end">
                          {tahsin.start_pojok} - {tahsin.end_pojok}
                        </td>
                        <td data-label="Juz Awal - Juz Akhir" className="text-md-start text-end">
                          {tahsin.start_juz} - {tahsin.end_juz}
                        </td>
                        <td data-label="Deskripsi" className="text-md-start text-end">
                          {tahsin.description}
                        </td>
                        <td data-label="Status" className="text-md-start text-end">
                          {tahsin.status || "Pending"}
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
                onChange={(event, value) => setCurrentPage(value)}
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