import React, { useEffect, useState } from "react";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";
import Footer from "../../../../../component/Footer";
import axios from "axios";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Swal from "sweetalert2";
import "../../../../../css/menuRegulasi.css";
import { Pagination } from "@mui/material";

function MenuRegulasi() {
  const [menuRegulasi, setMenuRegulasi] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const param = useParams();

  const getMenuRegulasi = async (page) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/menu-regulasi/get-by-jenis-regulasi?id-jenis-regulasi=${
          param.id
        }&page=${page - 1}&size=${rowsPerPage}`
      );
      setMenuRegulasi(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getMenuRegulasi(currentPage);
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

  const filteredList = menuRegulasi.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
        axios.delete(`${API_DUMMY}/bawaslu/api/menu-regulasi/delete/` + id, {
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
    });
  };

  return  (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container mt-3 app-main__outer">
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
              className="form-control widget-content-right mt-2 mb-2 d-lg-none d-md-block"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="main-card mb-3 card box-tabel">
            <div className="card-header" style={{ display: "flex" }}>
              {menuRegulasi.length > 0 && menuRegulasi[0].jenisRegulasiId.jenisRegulasi}
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
                <div className="btn-actions-pane-right">
                  <div role="group" className="btn-group-sm btn-group">
                    <button className="active btn-focus p-2 rounded">
                      <a
                        href={`/add/menu-regulasi/${param.id}`}
                        className="text-light"
                        style={{ textDecoration: "none" }}
                      >
                        Tambah Data
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive" style={{ maxHeight: "60vh" }}>
            <table className="align-middle mb-0 table  table-striped table-hover" >
                <thead>
                  <tr>
                    <th className="text-center">
                      No
                    </th>
                    <th className="text-center">
                      Menu Regulasi
                    </th>
                    <th className="text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
  {filteredList.map((jenis, index) => (
    <tr key={index}>
      <td className="text-center">{index + 1}</td>
      <td  className="text-center">{jenis.menuRegulasi}</td>
      <td className="text-center">
        <button
          type="button"
          className="btn-primary btn-sm mr-2"
        >
          <a
            style={{
              color: "white",
              textDecoration: "none",
            }}
            href={`/edit-data/${jenis.menuRegulasi}/${jenis.id}`}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </a>
        </button>
        <button
          onClick={() => deleteData(jenis.id)}
          type="button"
          className="btn-danger mr-2 btn-sm"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
        <button type="button" className="btn-info btn-sm">
                            <a
                              style={{
                                color: "white",
                                textDecoration: "none",
                              }}
                              href={"/" + jenis.menuRegulasi + "/" + jenis.id}
                            >
                              <i className="fas fa-plus"></i>
                            </a>
                          </button>
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

export default MenuRegulasi;
