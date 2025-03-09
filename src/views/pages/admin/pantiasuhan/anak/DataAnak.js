import React, { useEffect, useState } from "react";
import { API_DUMMY_SMART } from "../../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { Pagination } from "@mui/material";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import "../../../../../css/button.css";

function DataAnak() {
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
  const [anakAsuhData, setAnakAsuhData] = useState({
    total_anak_asuh: 0,
    per_jenis_kelamin: { laki_laki: 0, perempuan: 0 },
    per_tingkat_pendidikan: {},
  });
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
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/customer/member?page=${currentPage}&limit=${rowsPerPage}&level=santri`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      console.log(response);

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

  const deleteData = async (member_id) => {
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
            .delete(`${API_DUMMY_SMART}/api/customer/member/` + member_id, {
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
    const role = localStorage.getItem("userRole"); // Get role from localStorage
    setUserRole(role); // Set role in state
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

  useEffect(() => {
    // Fetch data jumlah anak asuh dari API
    axios
      .get(`${API_DUMMY_SMART}/api/customer/jumlah_siswa`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setAnakAsuhData(data); // Simpan data ke state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
          {/* Tabel Data Jumlah Anak Asuh */}
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header">
              <p className="mt-3">Data Jumlah Anak Asuh</p>
            </div>
            <div className="table-responsive-3">
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>Total Anak Asuh</th>
                    <th>Laki-laki</th>
                    <th>Perempuan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      data-label="Total Anak Asuh"
                      className="text-md-start text-end">
                      {anakAsuhData.total_anak_asuh}
                    </td>
                    <td
                      data-label="Laki-Laki"
                      className="text-md-start text-end">
                      {anakAsuhData.per_jenis_kelamin.laki_laki}
                    </td>
                    <td
                      data-label="Perempuan"
                      className="text-md-start text-end">
                      {anakAsuhData.per_jenis_kelamin.perempuan}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabel Data Anak Asuh per Tingkat Pendidikan */}
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header">
              <p className="mt-3">Data Anak Asuh per Tingkat Pendidikan</p>
            </div>
            <div className="table-responsive-3">
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>Tingkat Pendidikan</th>
                    <th>Laki-laki</th>
                    <th>Perempuan</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(anakAsuhData.per_tingkat_pendidikan).map(
                    ([tingkat, data]) => (
                      <tr key={tingkat}>
                        <td
                          data-label="Tingkat Pendidikan"
                          className="text-md-start text-end">
                          {tingkat}
                        </td>
                        <td
                          data-label="Laki-Laki"
                          className="text-md-start text-end">
                          {data.laki_laki}
                        </td>
                        <td
                          data-label="Perempuan"
                          className="text-md-start text-end">
                          {data.perempuan}
                        </td>
                        <td
                          data-label="Total"
                          className="text-md-start text-end">
                          {data.total}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabel Data Anak Asuh */}
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
                <div className="btn-actions-pane-right">
                  <div role="group" className="btn-group-sm btn-group">
                    {userRole !== "yayasan" && (
                      <button className="active btn-focus p-2 rounded">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/add_anak_asuh">
                          Tambah Anak Asuh
                        </a>
                      </button>
                    )}
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
                    <th>RFID Number</th>
                    <th>NIK</th>
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
                            data-label="Nama"
                            className="text-md-start text-end">
                            {row.name}
                          </td>
                          <td
                            data-label="RFID Number"
                            className="text-md-start text-end">
                            {row.rfid_number}
                          </td>
                          <td
                            data-label="NIK"
                            className="text-md-start text-end">
                            {row.unique_id}
                          </td>
                          <td data-label="Aksi" className="action">
                            <div className="d-flex justify-content-center align-items-center">
                              <button
                                type="button"
                                className="btn-success btn-sm mr-2">
                                <a
                                  style={{
                                    color: "white",
                                    textDecoration: "none",
                                  }}
                                  href={`/tahsin_anak/${row.id}`}>
                                  <i className="fa-solid fa-list-alt"></i>
                                </a>
                              </button>
                              <button
                                type="button"
                                className="btn-primary btn-sm mr-2">
                                <a
                                  style={{
                                    color: "white",
                                    textDecoration: "none",
                                  }}
                                  href={`/edit_anak_asuh/${row.id}`}>
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
                                  href={`/detail_anak_asuh/${row.id}`}>
                                  <i className="fa-solid fa-info-circle"></i>
                                </a>
                              </button>
                              {userRole !== "yayasan" && (
                                <button
                                  onClick={() => deleteData(row.id)}
                                  type="button"
                                  className="btn-danger btn-sm"
                                  disabled={isLoading}
                                >
                                  {isLoading ? (
                                    <i className="fa-solid fa-spinner fa-spin"></i>
                                  ) : (
                                    <i className="fa-solid fa-trash"></i>
                                  )}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center my-3">
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

export default DataAnak;
