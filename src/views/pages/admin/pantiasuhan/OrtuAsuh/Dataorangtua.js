import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { Pagination } from "@mui/material";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import "../../../../../css/button.css";

const formatDate = (value) => {
  const date = new Date(value);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
};

function Dataortu() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const userRole = localStorage.getItem("rolename");
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/admin/foster_parent`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      });
      setList(response.data.data);
      setPaginationInfo({
        totalPages: response.pagination.total_pages,
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
    })
      .then((result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          axios
            .delete(`${API_DUMMY}/api/admin/foster_parent/` + id, {
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
              // setTimeout(() => {
              //   window.location.reload();
              // }, 1500);
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
      })
      .finally(() => {
        setIsLoading(false);
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

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  return (
    <div
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
      }`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}>
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div
          className="container box-table mt-3 app-main__outer"
          data-aos="fade-left">
          <div className="ml-2 row g-3 align-items-center d-lg-none d-md-flex rows-rspnv">
            <div className="col-auto">
              <label className="form-label mt-2">Rows per page:</label>
            </div>
            <div className="col-auto">
              <select
                className="form-select form-select-xl w-auto"
                onChange={handleRowsPerPageChange}
                value={rowsPerPage}>
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
              <p className="mt-3">Orang Tua Asuh</p>
              <div className="ml-2 row g-3 align-items-center d-lg-flex d-none d-md-none">
                <div className="col-auto">
                  <label className="form-label mt-2">Rows per page:</label>
                </div>
                <div className="col-auto">
                  <select
                    className="form-select form-select-sm"
                    onChange={handleRowsPerPageChange}
                    value={rowsPerPage}>
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
                <div className="btn-actions-pane-right">
                  <div role="group" className="btn-group-sm btn-group">
                    <button className="active btn-focus p-2 rounded">
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="/add_ortu_asuh">
                        Tambah Orang Tua Asuh
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="table-responsive-3"
              style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th>Nama</th>
                    <th>Pekerjaan</th>
                    <th>No HP</th>
                    <th>Anak Asuh</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((row, no) => {
                      return (
                        <tr key={no}>
                          <td
                            data-label="No"
                            className="text-md-start text-end">
                            {no + 1 + (currentPage - 1) * rowsPerPage}
                          </td>
                          <td
                            data-label="Nama Ayah"
                            className="text-md-start text-end">
                            {row.name}
                          </td>
                          <td
                            data-label="Pekerjaan"
                            className="text-md-start text-end">{row.work}</td>
                          <td
                            data-label="No HP"
                            className="text-md-start text-end">
                            {row.phone_parents}
                          </td>
                          <td
                            data-label="Anak Asuh"
                            className="text-md-start text-end">
                            <ul>
                              {row.nama_anak.map((data) => (
                                <li>{data}</li>
                              ))}
                            </ul>
                          </td>
                          <td data-label="Aksi" className="action">
                            <div className="d-flex justify-content-center align-items-center">
                              {userRole !== "yayasan" && (
                                <>
                                  <button
                                    type="button"
                                    className="btn-primary btn-sm mr-2">
                                    <a
                                      style={{
                                        color: "white",
                                        textDecoration: "none",
                                      }}
                                      href={`/edit_ortu_asuh/${row.id}`}>
                                      <i className="fa-solid fa-pen-to-square"></i>
                                    </a>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-warning btn-sm mr-2">
                                    <a
                                      style={{
                                        color: "white",
                                        textDecoration: "none",
                                      }}
                                      href={`/detail_ortu_asuh/${row.id}`}>
                                      <i className="fa-solid fa-info-circle"></i>
                                    </a>
                                  </button>
                                  <button
                                    onClick={() => deleteData(row.id)}
                                    type="button"
                                    className="btn-danger btn-sm"
                                    disabled={isLoading} // Disabled jika loading
                                  >
                                    {isLoading ? (
                                      <i className="fa-solid fa-spinner fa-spin"></i> // Icon loading
                                    ) : (
                                      <i className="fa-solid fa-trash"></i>
                                    )}
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center my-3">
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
          {/* <FotoKegiatan></FotoKegiatan> */}
        </div>
      </div>
    </div>
  );
}

export default Dataortu;
