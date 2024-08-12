import { Pagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Sidebar from "../../../../../component/Sidebar";
import Header from "../../../../../component/Header";
import Swal from "sweetalert2";

function JenisInformasi() {
  const [list, setList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/jenis-informasi/all?page=${
          currentPage - 1
        }&size=${rowsPerPage}&sortBy=id&sortOrder=desc`
      );
      setList(response.data.data);
      setPaginationInfo({
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`${API_DUMMY}/bawaslu/api/jenis-informasi/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Dihapus!",
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  const filteredList = list.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  useEffect(() => {
    getAll();
  }, [currentPage, rowsPerPage, searchTerm]);

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container box-tabel mt-3 app-main__outer">
          <div className="ml-2 row g-3 align-items-center d-lg-none d-md-flex">
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
              className="form-control widget-content-right mt-3 mb-3 d-lg-none d-block"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header" style={{ display: "flex" }}>
              <p className="mt-3">Jenis Informasi</p>
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
                  className="form-control widget-content-right w-75 d-lg-block d-none"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className="btn-actions-pane-right">
                  <div role="group" className="btn-group-sm btn-group">
                    <button className="active btn-focus p-2 rounded">
                      <a
                        href="/tambah-jenis-informasi"
                        className="text-light"
                        style={{ textDecoration: "none" }}
                      >
                        {" "}
                        Tambah Data
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="table-responsive"
              style={{ overflowY: "auto", maxHeight: "60vh", minWidth: "100%" }}
            >
              <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-left">No</th>
                    <th className="text-left">Jenis Informasi</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((jenis, index) => (
                    <tr key={index}>
                      <td data-label="No" className="">
                        {index + 1}
                      </td>
                      <td data-label="Jenis Informasi" className="">
                        {jenis.namaInformasi}
                      </td>
                      <td data-label="Aksi" className="text-center">
                        <div className="aksi">
                          <button
                            type="button"
                            className="btn-primary btn-sm mr-2"
                          >
                            <a
                              style={{ color: "white", textDecoration: "none" }}
                              href={`/edit-jenis-informasi/${jenis.namaInformasi}/${jenis.id}`}
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </a>
                          </button>
                          <button
                            onClick={() => deleteData(jenis.id)}
                            type="button"
                            className="btn-danger btn-sm mr-2"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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

export default JenisInformasi;
