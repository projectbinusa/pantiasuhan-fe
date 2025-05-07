import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import {
  Box,
  Button,
  Pagination,
} from "@mui/material";
import "../../../../css/button.css";
import { API_DUMMY_BYRTGHN } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function DataTahfidzWeek() {
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
  const [week, setWeek] = useState(""); // ganti jadi 1 input
  const [isLoading, setIsLoading] = useState(false);

  const getAll = async () => {
    try {
      const userData = {
        id: localStorage.getItem("id"),
        organization_id: localStorage.getItem("organization_id"),
        rolename: localStorage.getItem("rolename"),
      };

      if (!userData.organization_id) {
        console.error("organization_id tidak ditemukan dalam localStorage!");
        return;
      }

      if (!week) {
        console.error("week harus diisi!");
        return;
      }

      const token = localStorage.getItem("tokenpython");
      if (!token) {
        console.error("Token autentikasi tidak ditemukan!");
        return;
      }

      const config = {
        headers: {
          "auth-tgh": `jwt ${token}`,
        },
        params: {
          type: 2,
          week: week,
          organization_id: userData.organization_id,
        },
      };

      const response = await axios.get(
        `${API_DUMMY_BYRTGHN}/api/member/guru/tahsin`,
        config
      );

      setList(response.data.data || []);
      setPaginationInfo({
        totalPages: response.data.pagination?.total_page || 1,
      });
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleExport = async () => {
    try {
      setIsLoading(true);

      if (!week) {
        Swal.fire({
          icon: "warning",
          title: "Week belum dipilih!",
          text: "Silakan isi week terlebih dahulu sebelum export.",
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

      const url = `${API_DUMMY_BYRTGHN}/api/member/guru/tahsin/export/weekly?as_file=true&type_param=2&start_date=${week}`;
      const filename = `rekap_tahfidz_mingguan_${week}.xlsx`;

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

  const searchTermLower = (searchTerm || "").toLowerCase();
  const filteredList = (list || []).filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTermLower)
    )
  );

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

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
              <p className="mt-3">Daftar Rekap Tahfidz Mingguan</p>
              <div className="d-flex ml-auto gap-2">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Contoh: 2025-04-2028"
                    value={week}
                    style={{ height: "35px", fontSize: "12px" }}
                    onChange={(e) => setWeek(e.target.value)}
                  />
                </div>
                <Button variant="contained" onClick={getAll}>
                  Cari
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleExport}
                  disabled={isLoading}
                >
                  {isLoading ? "Exporting..." : "Export"}
                </Button>
              </div>
            </div>

            <div className="table-responsive-3" style={{ overflowX: "auto", maxWidth: "100%" }}>
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
                    filteredList.map((tahfidz, no) => (
                      <tr key={no}>
                        <td>{no + 1 + (currentPage - 1) * rowsPerPage}</td>
                        <td>{tahfidz.member_name}</td>
                        <td>{tahfidz.created_date}</td>
                        <td>{tahfidz.start_pojok} - {tahfidz.end_pojok}</td>
                        <td>{tahfidz.start_juz} - {tahfidz.end_juz}</td>
                        <td>{tahfidz.description}</td>
                        <td>{tahfidz.status || "Pending"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
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

export default DataTahfidzWeek;
