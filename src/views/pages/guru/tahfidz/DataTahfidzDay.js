import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import {
  Button,
  Pagination,
} from "@mui/material";
import Swal from "sweetalert2";
import "../../../../css/button.css";
import { API_DUMMY_BYRTGHN } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function DataTahfidzDay() {
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getAll = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const organization_id = user?.organization_id || "";
      if (!organization_id) return;

      const response = await axios.get(
        `${API_DUMMY_BYRTGHN}/api/member/tahfidz/rekap-day/member`,
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
        totalPages: response.data.pagination.total_page,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleExport = async () => {
    try {
      setIsLoading(true);
  
      if (!startDate) {
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
  
      const url = `${API_DUMMY_BYRTGHN}/api/member/guru/tahsin?type=2&date=${startDate}`;
      const filename = `rekap_tahfidz_day_${startDate}.xlsx`;
  
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
    getAll(currentPage);
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  // filter sederhana jika diperlukan
  const filteredList = list;

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

          <div className="main-card box-tabel mb-3 card">
            <div className="card-header" style={{ display: "flex" }}>
              <p className="mt-3">Daftar Rekap Tahfidz Day</p>
              <div className="d-flex ml-auto gap-2">
                <div className="col-auto">
                  <input
                    type="date"
                    className="form-select form-select-sm"
                    value={startDate}
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
                    filteredList.map((tahfidz, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1 + (currentPage - 1) * rowsPerPage}</td>
                        <td>{tahfidz.member_name}</td>
                        <td>{tahfidz.created_date}</td>
                        <td>
                          {tahfidz.start_pojok} - {tahfidz.end_pojok}
                        </td>
                        <td>
                          {tahfidz.start_juz} - {tahfidz.end_juz}
                        </td>
                        <td>{tahfidz.description}</td>
                        <td>
                          {tahfidz.status !== "" ? tahfidz.status : "Pending"}
                        </td>
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
                onChange={(_, value) => {
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

export default DataTahfidzDay;