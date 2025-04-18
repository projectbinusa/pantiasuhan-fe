import React, { useEffect, useState } from "react";
import { API_DUMMY, API_DUMMY_ABSEN, API_DUMMY_SMART } from "../../../../../utils/base_URL";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
// import news from "../../../../../aset/smpn1bergas/News-rafiki.png";
import { Pagination } from "@mui/material";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";

const formatDate = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

function LaporanTahunanPresensi() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");
  const [date2, setDate2] = useState("");

  const tanggal = new Date();
  const tahun = tanggal.getFullYear();

  const getTgl = () => {
    setDate2(date);
  };

  const exportTahunan = async () => {
    try {
      const response = await axios({
        url: `${API_DUMMY_SMART}/api/absensi/export-tahunan?tahun=${tahun}`,
        method: "GET",
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "laporan-tahunan.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Gagal mengekspor absensi tahunan:", error);
    }
  };

  const getAll = async () => {
    try {
      const tgl = date2 || tahun;
      console.log(tgl);

      const response = await axios.get(
        `${API_DUMMY_SMART}/api/customer/absen?page=${currentPage}&limit=${rowsPerPage}&year=${tgl}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      const { data, pagination } = response.data;
      console.log(response);
      setList(data);
      setPaginationInfo({
        totalPages: pagination.total_page || 1,
        totalElements: pagination.total || 0,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  // Gunakan useEffect untuk memantau perubahan
  useEffect(() => {
    getAll();
  }, [currentPage, rowsPerPage, date2]);

  const deleteData = async (id) => {
    Swal.fire({
      title: "Apakah Anda Ingin Menghapus?",
      text: "Perubahan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_DUMMY}/api/siswa/absensi/` + id, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Dihapus!",
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          });
      }
    });
  };

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

  console.log(filteredList);

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  const [sidebarToggled, setSidebarToggled] = useState(true);

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
        <div className="container d-flex g-3 align-items-center mt-3">
          <input
            className="form-control"
            type="text"
            placeholder="Masukkan Tahun"
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="btn-primary ml-3" type="button" onClick={getTgl}>
            Pilih
          </button>
          {/* <button
            className="btn-primary ml-3"
            type="button"
            onClick={exportTahunan}
          >
            Export
          </button> */}
        </div>
        <div
          className="container box-table app-main__outer"
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
          <div className="search">
            <input
              type="search"
              className="form-control widget-content-right w-100 mt-2 mb-2 d-lg-none d-md-block"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header" style={{ display: "flex" }}>
              <p className="mt-3">Presensi Tahunan</p>
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
              <div className="d-flex ml-auto gap-3">
                <input
                  type="search"
                  className="form-control widget-content-right w-75 d-lg-block d-none d-md-none"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
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
                    <th>Jam Masuk</th>
                    <th>Jam Pulang</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((item, no) => {
                      return (
                        <tr key={no}>
                          <td data-label="No" className="text-md-start text-end">
                            {no + 1 + (currentPage - 1) * rowsPerPage}
                          </td>
                          <td data-label="Nama" className="text-md-start text-end"> {item.name }</td>
                          <td data-label="Tanggal" className="text-md-start text-end">{formatDate(item.created_date)}</td>
                          <td data-label="Jam Masuk" className="text-md-start text-end">{item.jam_masuk}</td>
                          <td data-label="Jam Pulang" className="text-md-start text-end">{item.jam_pulang}</td>
                          <td data-label="Keterangan" className="text-md-start text-end">{item.description}</td>
                        </tr>
                      );
                    })
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

export default LaporanTahunanPresensi;
