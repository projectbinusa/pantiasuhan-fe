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

function TahfidzMingguan() {
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
  const [end_date, setEndDate] = useState("");
  const [limit, setLimit] = useState(10);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const getAll = async () => {
    try {
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

      // Pastikan start_date dan end_date ada
      if (!start_date || !end_date) {
        console.error("start_date dan end_date harus diisi!");
        return;
      }

      const token = localStorage.getItem("tokenpython"); // Pastikan token tersimpan dengan benar
      if (!token) {
        console.error("Token autentikasi tidak ditemukan!");
        return;
      }

      // Set konfigurasi header
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

      // Panggil API dengan axios
      const response = await axios.get(
        `${API_DUMMY_BYRTGHN}/api/member/guru/tahsin?page=${currentPage}&limit=${limit}&filter=${searchTerm}&date=${date}&type=2`,
        config
      );

      // Set data ke state
      setList(response.data.data);
      setPaginationInfo({
        totalPages: response.data.pagination?.total_page || 1,
      });

      console.log("API Response:", response.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
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

  const [rfidNumber, setRfidNumber] = useState("");
  const [userData, setUserData] = useState(null);
  const [memberName, setMemberName] = useState("");
  const [foto, setFoto] = useState("");

  // const tabrfid = async (event) => {
  //   event.preventDefault(); // Mencegah reload halaman

  //   if (!rfidNumber) {
  //     setUserData(null);
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY_BYRTGHN}/api/customer/member/rfid?rfid_number=${rfidNumber}`,
  //       {
  //         headers: {
  //           "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
  //         },
  //       }
  //     );

  //     if (response.data && response.data.data) {
  //       setUserData(response.data.data);
  //       setMemberName(response.data.data.name);
  //       setMemberId(response.data.data.id);
  //       console.log(response.data.data);

  //       // Tutup modal terlebih dahulu
  //       closeModal2();

  //       // Tunggu modal benar-benar tertutup sebelum menampilkan alert
  //       // setTimeout(async () => {
  //       //   await Swal.fire({
  //       //     title: "Berhasil!",
  //       //     text: "Data RFID berhasil ditemukan.",
  //       //     icon: "success",
  //       //   });
  //       // }, 500);

  //       openModal();
  //     }
  //   } catch (error) {
  //     console.error("Terjadi Kesalahan", error);
  //     setUserData(null);
  //     await Swal.fire({
  //       title: "Gagal!",
  //       text: "RFID tidak ditemukan atau terjadi kesalahan.",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   }
  // };

  // const rfidInputRef = useRef(null);

  // useEffect(() => {
  //   if (isModalOpen2) {
  //     setTimeout(() => {
  //       rfidInputRef.current?.focus();
  //     }, 100); // Beri sedikit delay agar modal selesai dirender
  //   }
  // }, [isModalOpen2]);

  // // Menangkap pemindaian kartu otomatis
  // useEffect(() => {
  //   const handleScanRFID = (event) => {
  //     const scannedRfid = event.detail; // RFID dari event
  //     setRfidNumber(scannedRfid);
  //     tabrfid(); // Ambil data siswa setelah RFID terdeteksi
  //   };

  //   window.addEventListener("scanRFID", handleScanRFID);
  //   return () => {
  //     window.removeEventListener("scanRFID", handleScanRFID);
  //   };
  // }, []);

  // // Menangani input manual RFID
  // const handleManualRFID = (e) => {
  //   const manualRfid = e.target.value;
  //   setRfidNumber(manualRfid);
  // };

  // const add = async (e) => {
  //   e.preventDefault();
  //   e.persist();

  //   const data = {
  //     start_juz,
  //     end_juz,
  //     start_pojok,
  //     end_pojok,
  //     description,
  //     member_id,
  //     status,
  //   };

  //   try {
  //     await axios.post(`${API_DUMMY_BYRTGHN}/api/customer/tahsin`, data, {
  //       headers: {
  //         "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
  //       },
  //     });

  //     Swal.fire({
  //       icon: "success",
  //       title: "Data Berhasil DiTambahkan",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     getAll()
  //     setIsModalOpen(false);
  //     // window.location.reload();
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       localStorage.clear();
  //       window.location.reload(); // Redirect to login or perform other actions
  //     } else {
  //       setIsModalOpen(false);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Tambah Data Gagal!",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       console.log("Error:", error.response ? error.response.data : error);
  //     }
  //   }
  // };

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

  const searchTermLower = (searchTerm || "").toLowerCase(); // Pastikan searchTerm terdefinisi
  const filteredList = (list || []).filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTermLower)
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
              <p className="mt-3">Daftar Rekap Tahsin Week</p>
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
              ;
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
                    {/* <th>Aksi</th> */}
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

export default TahfidzMingguan;
