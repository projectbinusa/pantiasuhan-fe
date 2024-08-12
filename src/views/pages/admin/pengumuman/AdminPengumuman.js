import React, { useEffect, useState } from "react";
import Header from "../../../../component/Header";
import Sidebar from "../../../../component/Sidebar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import Swal from "sweetalert2";
import "../../../../../src/css/adminBerita.css";
import { Pagination, TableContainer, TablePagination } from "@mui/material";
import AOS from "aos";

function AdminPengumuman() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const history = useHistory();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const getAll = async (page) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/pengumuman?page=${
          page - 1
        }&size=${rowsPerPage}&sortBy=id&sortOrder=desc`
      );
      setList(response.data.data.content);
      setPaginationInfo({
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getAll(currentPage);
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    AOS.init();
  },[]);

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
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_DUMMY}/bawaslu/api/pengumuman/` + id, {
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
    }) .catch((error) => {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        console.log(error);
      }
    });
  };

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
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container box-tabel mt-3 app-main__outer"  data-aos="fade-left">
          <div class="ml-2 row g-3 align-items-center d-lg-none d-md-flex rows-rspnv">
            <div class="col-auto">
              <label className="form-label mt-2">Rows per page:</label>
            </div>
            <div class="col-auto">
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
              className="form-control widget-content-right w-100 mt-2 mb-2 md-2 d-lg-none d-md-block"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="main-card mb-3 card box-tabel">
            <div
              className="card-header pembungkus-text-button"
              style={{ display: "flex" }}
            >
              <p className="mt-3">Pengumuman</p>
              <div class="ml-2 row g-3 align-items-center d-lg-flex d-none d-md-none">
                <div class="col-auto">
                  <label className="form-label mt-2">Rows per page:</label>
                </div>
                <div class="col-auto">
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
                <div className="btn-actions-pane-right">
                  <div
                    role="group"
                    className="btn-group-sm btn-group button-pembungkus"
                  >
                    <button
                      id="button-tambah"
                      className="active btn-focus p-2 rounded button-tambah"
                    >
                      <a
                        href="/add-pengumuman"
                        className="text-light txt-tambah"
                        style={{ textDecoration: "none" }}
                      >
                        {" "}
                        Tambah Pengumuman
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <Paper> */}
            <TableContainer>
              <div
                className="table-responsive"
                style={{ overflowX: "auto", width: "100%" }}
              >
                <table
                  className="align-middle mb-0 table table-borderless table-striped table-hover"
                  style={{}}
                >
                  <thead>
                    <tr>
                      <th className="nomor">
                        No
                      </th>
                      <th scope="col" style={{ minWidth: "150px" }}>
                        Judul Pengumuman
                      </th>
                      <th scope="col">Image</th>
                      <th scope="col">Isi Pengumuman</th>
                      <th scope="col">Penulis</th>
                      <th className="text-center">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {filteredList.map((pengumuman, index) => ( */}
                    {filteredList.map((pengumuman, index) => {
                      return (
                        <tr key={index}>
                          <td data-label="No : " className="nomor">
                            {index + 1 + (currentPage - 1) * rowsPerPage}
                          </td>
                          <td data-label="author : ">{pengumuman.author}</td>
                          <td>
                            <img
                              style={{ width: "100px" }}
                              src={pengumuman.image}
                            />
                          </td>
                          <td
                            className="judulPengumuman"
                            data-label="judulPengumuman : "
                          >
                            {pengumuman.judulPengumuman}
                          </td>
                          <td data-label="tags : ">{pengumuman.tags}</td>
                          <td data-label="Aksi : ">
                            <div className="aksi">
                              <button
                                type="button"
                                className=".responsive-buttons  btn-primary btn-sm mr-2"
                              >
                                <a
                                  style={{
                                    color: "white",
                                    textDecoration: "none",
                                  }}
                                  href={`/edit-pengumuman/${pengumuman.id}`}
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </a>
                              </button>
                              <button
                                type="button"
                                class="btn-warning  mr-2 btn-sm"
                              >
                                <a
                                  className="text-light"
                                  href={"/detail-pengumuman/" + pengumuman.id}
                                >
                                  <i class="fas fa-info-circle"></i>
                                </a>
                              </button>
                              <button
                                type="button"
                                className=" btn-danger  btn-sm"
                                onClick={() => deleteData(pengumuman.id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TableContainer>
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

export default AdminPengumuman;
