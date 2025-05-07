import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import { Button, Pagination } from "@mui/material";
import Swal from "sweetalert2";
import "../../../../css/button.css";
import { API_DUMMY_BYRTGHN } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function DataTahfidzDay() {
  const [list, setList] = useState([]);
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // default 10 rows per halaman

  const getAll = async () => {
    try {
      const token = localStorage.getItem("tokenpython");
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Token tidak ditemukan",
          text: "Silakan login ulang.",
        });
        return;
      }

      const response = await axios.get(
        `${API_DUMMY_BYRTGHN}/api/member/guru/tahsin`,
        {
          params: {
            type: 2,
            date: startDate || "2025-04-28", // default date
          },
          headers: {
            "auth-tgh": `jwt ${token}`,
          },
        }
      );

      setList(response.data.data || []);
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

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  // Pagination sederhana manual
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(list.length / rowsPerPage);

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
                  {currentItems.length > 0 ? (
                    currentItems.map((tahfidz, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1 + (currentPage - 1) * rowsPerPage}</td>
                        <td>{tahfidz.member_name}</td>
                        <td>{tahfidz.created_date}</td>
                        <td>{tahfidz.start_pojok} - {tahfidz.end_pojok}</td>
                        <td>{tahfidz.start_juz} - {tahfidz.end_juz}</td>
                        <td>{tahfidz.description}</td>
                        <td>{tahfidz.status !== "" ? tahfidz.status : "Pending"}</td>
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
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
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
