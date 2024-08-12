import React, { useEffect, useState } from "react";
import Header from "../../../../component/Header";
import Sidebar from "../../../../component/Sidebar";
import Footer from "../../../../component/Footer";
import axios from "axios";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { API_DUMMY } from "../../../../utils/base_URL";
import Swal from "sweetalert2";
import { Pagination, TableContainer } from "@mui/material";
import "../../../../../src/css/adminBerita.css";
import "../../../../css/indexadmin.css";

function Index() {
  const [jenisInformasi, setJenisInformasi] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const param = useParams();
  const history = useHistory();

  const getJenisInformasi = async (page) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/jenis-informasi/getByIdWithKeterangan?id=${
          param.id
        }&page=${page - 1}&size=10&sortBy=id&sortOrder=desc`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Make sure that response.data.data.content is an array before using map
      if (Array.isArray(response.data.data.content)) {
        setJenisInformasi(response.data.data.content);
        console.log(response.data.data.content);
        setPaginationInfo({
          totalPages: response.data.data.totalPages,
          totalElements: response.data.data.totalElements,
        });
      } else {
        console.error("Data received is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getJenisInformasi(currentPage);
  }, [currentPage]);

  const deleteData = async (id) => {
    try {
      await axios.delete(`${API_DUMMY}/bawaslu/api/jenis-keterangan/` + id, {
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
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
    setCurrentPage(1);
  };

  const filteredList = jenisInformasi.filter((item) =>
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
      <div id="app-main" className="app-main">
        <Sidebar />
        <div className="box-tabel container mt-3 app-main__outer">
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
          <div class="main-card w-100 mb-3 card">
            <div className="card-header" style={{ display: "flex" }}>
              {jenisInformasi.length > 0 && jenisInformasi[0].namaInformasi}
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
                        href={`/tambah/jenis-keterangan/${param.id}`}
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
            <div style={{ overflowY: "auto", maxHeight: "60vh" }}>
              <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Jenis Keterangan</th>
                    <th className="text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((inf, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="No">{index + 1}</td>
                        <td data-label="keterangan \" className="t">
                          {inf.jenisKeteranganInformasiDTOList[0].keterangan}
                        </td>
                        <td
                          data-label="Aksi : "
                          className="pt-3 pb-3 aksi text-center"
                        >
                          <div className="d-flex justify-content-center">
                            <button
                              type="button"
                              className=".responsive-buttons btn-primary btn-sm mr-2"
                            >
                              <a
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                                href={`/edit-jenis/${inf.jenisKeteranganInformasiDTOList[0].keterangan}/${inf.jenisKeteranganInformasiDTOList[0].id}`}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </a>
                            </button>
                            <button
                              type="button"
                              className="mr-2 btn-danger btn-sm"
                              onClick={() =>
                                deleteData(
                                  inf.jenisKeteranganInformasiDTOList[0].id
                                )
                              }
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                            <button type="button" class="btn-info btn-sm">
                              <a
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                                href={
                                  "/isi-keterangan/" +
                                  inf.jenisKeteranganInformasiDTOList[0]
                                    .keterangan +
                                  "/" +
                                  inf.jenisKeteranganInformasiDTOList[0].id
                                }
                              >
                                <i class="fas fa-plus"></i>
                              </a>
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
        </div>
      </div>
    </div>
  );
}

export default Index;
