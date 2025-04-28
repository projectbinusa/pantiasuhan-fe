import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { Pagination } from "@mui/material";
import "../../../../css/button.css";
import { API_DUMMY_SMART } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function GuruAnakAsuh() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [userRole, setUserRole] = useState("");

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
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/member/guru/anak_asuh?page=${currentPage}&limit=${rowsPerPage}&level=santri&search=${searchTerm}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      const { data, pagination } = response.data;
      setList(data);
      setPaginationInfo({
        totalPages: pagination.total_page,
        totalElements: pagination.total,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getAll();
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, [currentPage, rowsPerPage, searchTerm]); // tambahin searchTerm biar pas cari langsung fetch

  useEffect(() => {
    AOS.init();
  }, []);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""}`}>
      <a id="show-sidebar" className="btn1 btn-lg" onClick={toggleSidebar} style={{ color: "white", background: "#3a3f48" }}>
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container box-table mt-3 app-main__outer" data-aos="fade-left">
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header" style={{ display: "flex" }}>
              <p className="mt-3">Anak Asuh</p>
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
              </div>
            </div>
            <div className="table-responsive-3" style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>Email</th>
                    <th>NIK</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {list.length > 0 ? (
                    list.map((row, index) => (
                      <tr key={row.id}>
                        <td data-label="No" className="text-md-start text-end">
                          {index + 1 + (currentPage - 1) * rowsPerPage}
                        </td>
                        <td data-label="Nama" className="text-md-start text-end">
                          {row.name}
                        </td>
                        <td data-label="Alamat" className="text-md-start text-end">
                          {row.address}
                        </td>
                        <td data-label="Email" className="text-md-start text-end">
                          {row.email}
                        </td>
                        <td data-label="NIK" className="text-md-start text-end">
                          {row.unique_id}
                        </td>
                        <td data-label="Aksi" className="action">
                          <div className="d-flex justify-content-center align-items-center">
                            <button type="button" className="btn-success btn-sm mr-2">
                              <a
                                style={{ color: "white", textDecoration: "none" }}
                                href={`/guru/tahsin/anak_asuh/${row.id}`}>
                                <i className="fa-solid fa-list-alt"></i>
                              </a>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center my-3">
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

export default GuruAnakAsuh;
