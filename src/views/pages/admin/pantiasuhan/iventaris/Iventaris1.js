import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { Pagination } from "@mui/material";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import "../../../../../css/button.css";

function Iventaris() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarToggled, setSidebarToggled] = useState(true);

  const organizationId = localStorage.getItem("organization_id");

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
      const response = await axios.get(`${API_DUMMY}/api/admin/investaris`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      });

      console.log("Data dari API:", response.data);

      if (response.data && response.data.data) {
        const filteredData = response.data.data.filter(
          (item) => String(item.organization_id) === organizationId
        );
        setList(filteredData.length > 0 ? filteredData : response.data.data);
      } else {
        console.log("Data kosong atau tidak ditemukan");
        setList([]);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setList([]);
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
          .delete(`${API_DUMMY}/api/admin/investaris/${id}`, {
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
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Hapus Data Gagal!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.error(err);
          });
      }
    });
  };

  useEffect(() => {
    getAll();
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredList = list.filter((item) =>
    searchTerm === ""
      ? true
      : Object.values(item || {}).some(
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
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div
          className="container box-table mt-3 app-main__outer"
          data-aos="fade-left"
        >
          <div className="search">
            <input
              type="search"
              className="form-control widget-content-right w-100 mt-2 mb-2"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header">
              <h5 className="mt-2">Iventaris</h5>
              <div className="d-flex ml-auto gap-3">
                <button className="btn btn-success btn-sm">
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    href="/add_iventaris"
                  >
                    Tambah Investaris
                  </a>
                </button>
              </div>
            </div>
            <div
              className="table-responsive-3"
              style={{ overflowX: "auto", maxWidth: "100%" }}
            >
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Tanggal Pembelian</th>
                    <th>Harga Pembelian</th>
                    <th>Kategori</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList
                      .slice(
                        (currentPage - 1) * rowsPerPage,
                        currentPage * rowsPerPage
                      )
                      .map((row, index) => (
                        <tr key={row.id}>
                          <td>{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                          <td>{row.name || "-"}</td>
                          <td>{row.tanggal_masuk || "-"}</td>
                          <td>{row.purchase_price || "-"}</td>
                          <td>{row.kategori_barang_name || "-"}</td>
                          <td>
                            <button
                              onClick={() => deleteData(row.id)}
                              className="btn btn-danger btn-sm"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="6">Tidak ada data</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, pageNumber) => setCurrentPage(pageNumber)}
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Iventaris;
