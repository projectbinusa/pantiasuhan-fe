import React, { useEffect, useState } from "react";
import { API_DUMMY_PYTHON } from "../../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { Pagination } from "@mui/material";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import "../../../../../css/button.css";

function DataBukuTamu() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [role, setRole] = useState(""); // Menyimpan role pengguna

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
    // Cek role pengguna di localStorage atau dari API
    const userRole = localStorage.getItem("role"); // Misalnya role disimpan di localStorage
    setRole(userRole);
  }, []);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY_PYTHON}/api/admin/guestbook?page=${currentPage}&size=${rowsPerPage}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      setList(response.data.data);
      const { pagination } = response.data;
      setPaginationInfo({
        totalPages: Math.ceil(pagination.total / rowsPerPage),
        totalElements: pagination.total,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

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
          .delete(`${API_DUMMY_PYTHON}/api/admin/guestbook/` + id, {
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
            getAll();
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Hapus Data Gagal!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(err);
          });
      }
    });
  };

  useEffect(() => {
    getAll(currentPage);
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset ke halaman pertama
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset ke halaman pertama setelah pencarian
  };

  const filteredList = list.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
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
          {/* Baris filter dan pagination */}
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header" style={{ display: "flex" }}>
              <p className="mt-3">Buku Tamu</p>
              {/* ... */}
              {/* <div className="d-flex ml-auto gap-3">
                {role !== "yayasan" && (
                  <button
                    className="active btn-focus p-2 rounded"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <a href="/add_buku_tamu">Tambah Tamu</a>
                  </button>
                )}
              </div> */}
            </div>
            <div className="table-responsive-3" style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th>Nama Orang Tua</th>
                    <th>Nomor Whatsapp</th>
                    <th>Alamat</th>
                    <th>Tanggal Kunjungan</th>
                    <th scope="col" style={{ minWidth: "150px" }}>Tujuan Kunjungan</th>
                    <th>TTD</th>
                    <th>Catatan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((berita, no) => (
                      <tr key={no}>
                        <td>{no + 1 + (currentPage - 1) * rowsPerPage}</td>
                        <td>{berita.nama}</td>
                        <td>{berita.no_wa}</td>
                        <td>{berita.address}</td>
                        <td>{berita.visit_date}</td>
                        <td>{berita.description_donation}</td>
                        <td>
                          <img
                            src={berita.url_image_donation || ""}
                            style={{ height: "4.5rem", width: "4.5rem" }}
                          />
                        </td>
                        <td>{berita.note}</td>
                        <td>
                          <div className="d-flex justify-content-center align-items-center">
                            <button
                              className="btn-success  mr-2 btn-sm"
                              onClick={() => {
                                const phone = encodeURIComponent(berita.no_wa);
                                const message = encodeURIComponent(
                                  `Terima kasih atas kunjungannya, semoga amal bapak/ibu ${berita.nama} bermanfaat bagi kami semua`
                                );
                                window.open(
                                  `https://api.whatsapp.com/send?phone=${phone}&text=${message}`
                                );
                              }}
                            >
                              <i className="fab fa-whatsapp"></i>
                            </button>
                            {role !== "yayasan" && (
                              <button
                                onClick={() => deleteData(berita.id)}
                                className="btn-danger btn-sm"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center my-3">
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

export default DataBukuTamu;
