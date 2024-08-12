import React, { useEffect, useState } from "react";
import Header from "../../../../component/Header";
import Sidebar from "../../../../component/Sidebar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import Swal from "sweetalert2";
import AOS from "aos";

import {
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";

function AdminBerita() {
  const [list, setList] = useState([]);
  const [list1, setList1] = useState([]);
  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(0);
  const [category, setCategory] = useState([""]);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [id, setId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage1, setCurrentPage1] = useState(1);
  const [rowsPerPage1, setRowsPerPage1] = useState(5);
  const [paginationInfo1, setPaginationInfo1] = useState({
    totalPages1: 1,
    totalElements1: 0,
  });
  const [searchResults1, setSearchResults1] = useState([]);
  const [searchTerm1, setSearchTerm1] = useState("");
  const history = useHistory();

  const getAll = async (page) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/berita/all?page=${
          page - 1
        }&size=${rowsPerPage}&sortBy=id&sortOrder=desc`
      );
      setList(response.data.data.content);
      console.log(response.data.data.content);
      setPaginationInfo({
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  const getAll1 = async (page1) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/category-berita/all?direction=desc&page=${
          page1 - 1
        }&size=${rowsPerPage1}&sort=id`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setList1(response.data.data.content);
      console.log(response.data.data.content);
      setPaginationInfo1({
        totalPages1: response.data.data.totalPages,
        totalElements1: response.data.data.totalElements,
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
          .delete(`${API_DUMMY}/bawaslu/api/berita/delete/` + id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
              history.push("/admin-berita");
              window.location.reload();
            }, 1500);
          });
      }
    });
  };

  //delete category
  const deleteData1 = async (id) => {
    Swal.fire({
      title: "Apakah Anda Ingin Menghapus Kategori Berita?",
      text: "Seluruh berita dalam kategori ini akan ikut terhapus dan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_DUMMY}/bawaslu/api/category-berita/delete/` + id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
              history.push("/admin-berita");
              window.location.reload();
            }, 1500);
          });
      }
    });
  };

  useEffect(() => {
    getAll(currentPage);
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    getAll1(currentPage1);
  }, [currentPage1, rowsPerPage1]);

  useEffect(() => {
    AOS.init();
  },[]);

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
  const handleRowsPerPageChange1 = (event) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0);
  };

  const handleSearchChange1 = (event) => {
    setSearchTerm1(event.target.value);
    setPage1(0);
    setCurrentPage1(1);
  };

  const filteredList1 = list1.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm1.toLowerCase())
    )
  );

  console.log(filteredList);

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container box-table mt-3 app-main__outer" data-aos="fade-left">
          <div className="ml-2 row g-3 align-items-center d-lg-none d-md-flex rows-rspnv">
            <div className="col-auto">
              {/* a */}
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
              <p className="mt-3">Berita</p>
              <div className="ml-2 row g-3 align-items-center d-lg-flex d-none d-md-none">
                <div className="col-auto">
                  {/* a */}
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
                <div className="btn-actions-pane-right">
                  <div role="group" className="btn-group-sm btn-group">
                    <button className="active btn-focus p-2 rounded">
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="/add-berita-admin"
                      >
                        Tambah Berita
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="table-responsive-3"
              style={{ overflowX: "auto", maxWidth: "100%" }}
            >
              <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th className="text-long">
                      Judul Berita
                    </th>
                    {/* <th className="text-center">
                      Isi Berita
                    </th> */}
                    <th
                      scope="col"
                      className="text-left"
                      style={{ minWidth: "150px" }}
                    >
                      Penulis Berita
                    </th>
                    <th className="text-left">
                      Image
                    </th>
                    <th className="text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((berita, no) => {
                    return (
                      <tr key={no}>
                        <td data-label="No" className="">
                          {no + 1 + (currentPage - 1) * rowsPerPage}
                        </td>
                        <td data-label="Judul Berita" className="text-long">
                          {berita.judulBerita}
                        </td>
                        {/* <td data-label="">{berita.isiBerita}</td> */}
                        <td data-label="Penulis Berita" className="">
                          {berita.author}
                        </td>
                        <td data-label="Image" className="">
                          <img
                            src={berita.image}
                            style={{ height: "4.5rem", width: "4.5rem" }}
                          />
                        </td>
                        <td data-label="Aksi">
                          <div className="aksi">
                            <button
                              type="button"
                              className="btn-primary btn-sm mr-2"
                            >
                              <a
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                                href={`/edit-berita-admin/${berita.id}`}
                              >
                                {" "}
                                <i className="fa-solid fa-pen-to-square"></i>
                              </a>
                            </button>
                            <button
                              type="button"
                              class="btn-warning  mr-2 btn-sm"
                            >
                              <a
                                className="text-light"
                                href={"/detail/berita/" + berita.id}
                              >
                                <i class="fas fa-info-circle"></i>
                              </a>
                            </button>
                            <button
                              onClick={() => deleteData(berita.id)}
                              type="button"
                              className="btn-danger btn-sm"
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

          {/* Category */}
          <div class="ml-2 row g-3 align-items-center d-lg-none d-md-flex rows-rspnv">
            <div class="col-auto">
              {/*                */}
              <label className="form-label mt-2">Rows per page:</label>
            </div>
            <div class="col-auto">
              <select
                className="form-select form-select-xl w-auto"
                onChange={handleRowsPerPageChange1}
                value={rowsPerPage1}
              >
                {/*  */}
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
              value={searchTerm1}
              onChange={handleSearchChange1}
            />
          </div>
          <div className="mb-3 card box-tabel">
            <div
              className="card-header pembungkus-text-button"
              style={{ display: "flex" }}
            >
              <p className="mt-3">Kategori Berita</p>
              <div class="ml-2 row g-3 align-items-center d-lg-flex d-none d-md-none">
                <div class="col-auto">
                  {/*  */}
                  <label className="form-label mt-2">Rows per page:</label>
                </div>
                <div class="col-auto">
                  <select
                    className="form-select form-select-sm"
                    onChange={handleRowsPerPageChange1}
                    value={rowsPerPage1}
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
                  value={searchTerm1}
                  onChange={handleSearchChange1}
                />
                <div className="btn-actions-pane-right">
                  <div role="group" className="btn-group-sm btn-group">
                    <button className="active btn-focus p-2 rounded">
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="/tambah-category-berita"
                      >
                        Tambah Data
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="table-responsive-3"
              style={{ overflowY: "auto", maxHeight: "60vh" }}
            >
              <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-left nomor">No</th>
                    <th className="text-left">Kategory Berita</th>
                    <th className="text-left">Tanggal Dibuat</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList1.map((kategory, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="No" className="nomor">
                          {index + 1 + (currentPage1 - 1) * rowsPerPage1}
                        </td>
                        <td data-label="Category">{kategory.category}</td>
                        <td data-label="Created Date">
                          {kategory.createdDate}
                        </td>
                        <td data-label="Aksi">
                          <div className="aksi">
                            <button
                              type="button"
                              className="btn-primary btn-sm mr-2"
                            >
                              <a
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                                href={`/edit-category-berita/${kategory.id}`}
                              >
                                {" "}
                                <i className="fa-solid fa-pen-to-square"></i>
                              </a>
                            </button>
                            <button
                              onClick={() => deleteData1(kategory.id)}
                              type="button"
                              className="btn-danger btn-sm"
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
              <div className="card-header mt-3 d-flex justify-content-center">
                <Pagination
                  count={paginationInfo1.totalPages1}
                  page={currentPage1}
                  onChange={(event, value) => setCurrentPage1(value)}
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

export default AdminBerita;
