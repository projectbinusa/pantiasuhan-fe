import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { Box, Button, Pagination } from "@mui/material";
import "../../../../css/button.css";
import { API_DUMMY_BYRTGHN } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function DataTahsinDay() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({ totalPages: 1 });
  const [list, setList] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [start_date, setStartDate] = useState("");
  const [exportType, setExportType] = useState("daily");
  const [isLoading, setIsLoading] = useState(false);

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
            page: currentPage,
            month: month || new Date().getMonth() + 1,
            year: year || new Date().getFullYear(),
            organization_id,
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
      console.error("Error fetching data:", error.response || error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengambil data, coba lagi!",
      });
    }
  };  

  const handleExport = async () => {
    try {
      setIsLoading(true);

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

      if (exportType === "daily") {
        if (!start_date) {
          Swal.fire({
            icon: "warning",
            title: "Tanggal belum dipilih!",
            text: "Silakan pilih tanggal terlebih dahulu sebelum export.",
          });
          return;
        }
        url = `${API_DUMMY_BYRTGHN}/api/member/guru/tahsin/export/daily?as_file=true&type_param=22&date=${start_date}`;
        filename = `rekap_tahsin_daily_${start_date}.xlsx`;
      } else if (exportType === "weekly") {
        if (!start_date) {
          Swal.fire({
            icon: "warning",
            title: "Tanggal awal minggu belum dipilih!",
            text: "Silakan pilih tanggal terlebih dahulu.",
          });
          return;
        }
        url = `${API_DUMMY_BYRTGHN}/api/member/guru/tahsin/export/weekly?as_file=true&type_param=1&start_date=${start_date}`;
        filename = `rekap_tahsin_weekly_${start_date}.xlsx`;
      } else if (exportType === "monthly") {
        const selectedMonth = month || new Date().getMonth() + 1;
        const selectedYear = year || new Date().getFullYear();
        url = `${API_DUMMY_BYRTGHN}/api/member/guru/tahsin/export/monthly?as_file=true&type=1&month=${selectedMonth}&year=${selectedYear}`;
        filename = `rekap_tahsin_monthly_${selectedMonth}-${selectedYear}.xlsx`;
      }

      const response = await axios.get(url, {
        responseType: "blob",
        headers: {
          "auth-tgh": `jwt ${token}`,
        },
      });

      const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "File berhasil didownload!",
      });
    } catch (error) {
      console.error("Error exporting:", error.response || error);
      Swal.fire({
        icon: "error",
        title: "Gagal Export",
        text: "Terjadi kesalahan saat mengunduh file.",
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

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
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
        <div className="container box-table mt-3 app-main__outer" data-aos="fade-left">
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header d-flex align-items-center">
              <p className="mt-3">Daftar Rekap Tahsin Day</p>

              <div className="d-flex ml-auto gap-2">
                <input
                  type="date"
                  className="form-select form-select-sm"
                  value={start_date}
                  style={{ height: "35px", fontSize: "12px" }}
                  onChange={(e) => setStartDate(e.target.value)}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={getAll}
                  style={{ whiteSpace: "nowrap" }}
                  disabled={isLoading}
                >
                  Cari
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  onClick={handleExport}
                  style={{ whiteSpace: "nowrap" }}
                  disabled={isLoading}
                >
                  {isLoading ? "Mengunduh..." : "Export"}
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
                    <th>Pojok Awal - Akhir</th>
                    <th>Juz Awal - Akhir</th>
                    <th>Deskripsi</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((item, index) => (
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
                      <td colSpan="7" className="text-center">Tidak ada data tersedia.</td>
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
