import React from "react";
import Header from "../../../../component/Header";
import Sidebar from "../../../../component/Sidebar";
import Footer from "../../../../component/Footer";
import { useState } from "react";
import { API_DUMMY } from "../../../../utils/base_URL";
import axios from "axios";
import { useEffect } from "react";
import "../../../../../src/css/adminBerita.css";
import { Pagination } from "@mui/material";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";

function AdminPermohonanKeberatan() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const getAll = async (page) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/permohonan-keberatan?page=${
          page - 1
        }&size=${rowsPerPage}&sortBy=id&sortOrder=desc`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setList(response.data.data);
      setPaginationInfo({
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
      console.log(response.data.data);
    } catch (error) {
      console.error("terjadi kesalahan", error);
    }
  };

  useEffect(() => {
    getAll(currentPage);
  }, [currentPage, rowsPerPage]);

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

  //delete data
  const deleteData = async (id) => {
    Swal.fire({
      title: "Anda Ingin Menghapus Data ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cencel",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${API_DUMMY}/bawaslu/api/permohonan-keberatan/` + id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          Swal.fire({
            icon: "success",
            title: "Dihapus!",
            showConfirmButton: false,
          });
        }
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        if (error.ressponse && error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        } else {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />

        <div className="container mt-3 app-main__outer" data-aos="fade-left">
          <div class="ml-2 row g-3 align-items-center d-lg-none d-md-flex rows-rspnv">
            <div class="col-auto">
              <label className="form-label mt-2">Rows per page:</label>
            </div>
            <div class="col-auto">
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
          <div class="main-card mb-3 card box-tabel">
            <div class="card-header">
              <p className="mt-3">Permohonan Keberatan</p>
              <div class="ml-2 row g-3 align-items-center d-lg-flex d-none d-md-none">
                <div class="col-auto">
                  <label className="form-label mt-2">Rows per page:</label>
                </div>
                <div class="col-auto">
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
                <div className="btn-actions-pane-right"></div>
              </div>
            </div>
            <div class="table-responsive overflow-x-scroll">
              <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-left">No</th>
                    <th className="text-left">Nama</th>
                    <th className="text-left">Email</th>
                    <th className="text-left">Alamat</th>
                    <th className="text-left">No Telp</th>
                    <th className="text-left">Foto Identitas </th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((informasi, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="No : " className="text-left">
                          {index + 1}
                        </td>
                        <td data-label="email : " className="text-left">
                          {informasi.namaPemohon}
                        </td>
                        <td data-label="nama : " className="text-left">
                          {informasi.email}
                        </td>
                        <td data-label="nama : " className="text-left">
                          {informasi.alamatPemohon}
                        </td>
                        <td data-label="nama : " className="text-left">
                          {informasi.noTlp}
                        </td>
                        <td
                          data-label="jenis identitas : "
                          className="text-left">
                          <img
                            style={{ width: "150px" }}
                            src={informasi.fotoIdentitas}
                          />
                        </td>
                        <td data-label="Aksi : " class="text-center">
                          <div className="d-flex">
                            <button
                              type="button"
                              class="btn-warning mr-2 btn-sm">
                              <a
                                className="text-light"
                                href={
                                  "/detail/permohonan-keberatan/" + informasi.id
                                }>
                                <i class="fas fa-info-circle"></i>
                              </a>
                            </button>
                            <button
                              onClick={() => deleteData(informasi.id)}
                              type="button"
                              className="bg-danger btn-sm text-light">
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* h */}
              <div className="card-header mt-3 d-flex justify-content-center">
                <Pagination
                  count={totalPages}
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
    </div>
  );
}

export default AdminPermohonanKeberatan;
