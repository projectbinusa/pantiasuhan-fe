import React, { useEffect, useState } from "react";
import { API_DUMMY_BYRTGHN } from "../../../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { Pagination } from "@mui/material";
import SidebarPantiAdmin from "../../../../../../component/SidebarPantiAdmin";
import SidebarYayasan from "../../../../../../component/SidebarYayasan";

function DetailAnakAsuh() {
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

  //   const getAll = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${API_DUMMY_BYRTGHN}/api/customer/member?page=${currentPage}&limit=${rowsPerPage}`,
  //         {
  //           headers: {
  //             "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
  //           },
  //         }
  //       );

  //       console.log(response);

  //       const { data, pagination } = response.data;
  //       setList(data);
  //       setPaginationInfo({
  //         totalPages: pagination.total_page,
  //         totalElements: pagination.total,
  //       });
  //     } catch (error) {
  //       console.error("Terjadi Kesalahan", error);
  //     }
  //   };

  //   useEffect(() => {
  //     getAll(currentPage);
  //     const role = localStorage.getItem("userRole"); // Get role from localStorage
  //     setUserRole(role); // Set role in state
  //   }, [currentPage, rowsPerPage]);

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
      <SidebarYayasan toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div
          className="container box-table mt-3 app-main__outer"
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
              <p className="mt-3">Data Anak Asuh</p>
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
                {/* <div className="btn-actions-pane-right">
                  <div role="group" className="btn-group-sm btn-group">
                    {userRole !== "yayasan" && (
                      <button className="active btn-focus p-2 rounded">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/add_anak_asuh"
                        >
                          Tambah Anak Asuh
                        </a>
                      </button>
                    )}
                  </div>
                </div> */}
              </div>
            </div>
            <div
              className="table-responsive-3"
              style={{ overflowX: "auto", maxWidth: "100%" }}
            >
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th>Nama</th>
                    <th>TTL</th>
                    {/* <th>Aksi</th> */}
                  </tr>
                </thead>
                <tbody>
                  {/* {filteredList.length > 0 ? (
                    filteredList.map((row, no) => {
                      return ( */}
                  <tr>
                    <td data-label="No" className="">
                      {/* {no + 1 + (currentPage - 1) * rowsPerPage} */}1
                    </td>
                    <td data-label="Nama">Andini</td>
                    <td data-label="TTL">25 Januari 2007</td>
                    {/* <td data-label="Aksi" className="action">
                      <div className="d-flex justify-content-center align-items-center">
                        <button
                          type="button"
                          className="btn-warning btn-sm mr-2"
                        >
                          <a
                            style={{
                              color: "white",
                              textDecoration: "none",
                            }}
                            href={`/detail_anak_asuh}`}
                          >
                            <i className="fa-solid fa-info-circle"></i>
                          </a>
                        </button>
                        <button
                          type="button"
                          className="btn-primary btn-sm mr-2"
                        >
                          <a
                            style={{
                              color: "white",
                              textDecoration: "none",
                            }}
                            href={`/export-anak-asuh-cabang/id`}
                          >
                            <i className="fa-solid fa-download"></i>
                          </a>
                        </button>
                      </div>
                    </td> */}
                  </tr>
                  {/* );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center my-3">
                        <div style={{ padding: "10px", color: "#555" }}>
                          Tidak ada data yang tersedia.
                        </div>
                      </td>
                    </tr>
                  )} */}
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

export default DetailAnakAsuh;
