import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { Pagination } from "@mui/material";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { API_DUMMY_SMART } from "../../../../../utils/base_URL";
import "../../../../../css/button.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Donasi() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const { id } = useParams();
  const [donasiDetail, setDonasiDetail] = useState(null);

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

    // Mengambil role pengguna dari localStorage atau sumber lainnya
    const role = localStorage.getItem("rolename"); // Misalnya disimpan dalam localStorage
    setUserRole(role);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/customer/donation?page=${currentPage}&limit=${rowsPerPage}`,
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

      // Ambil data untuk chart
      const labels = data.map((item) => item.name);
      const incomeData = data.map((item) => item.total_income);
      const outcomeData = data.map((item) => item.total_outcome);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Total Income",
            data: incomeData,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.4,
          },
          {
            label: "Total Outcome",
            data: outcomeData,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            tension: 0.4,
          },
        ],
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error.response || error.message);
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
          .delete(`${API_DUMMY_SMART}/api/customer/donation/${id}`, {
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
            console.log(err);
          });
      }
    });
  };

  useEffect(() => {
    getAll(currentPage);
  }, [currentPage, rowsPerPage]);

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

  const filteredList = list.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  useEffect(() => {
    const getDonasiDetail = async (donationId) => {
      try {
        const response = await axios.get(
          `${API_DUMMY_SMART}/api/customer/donation/${donationId}`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        setDonasiDetail(response.data.data);
      } catch (error) {
        console.error("Error fetching donation details:", error);
      }
    };

    if (id) {
      getDonasiDetail(id);
    }
  }, [id]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Income",
        data: [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Total Outcome",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
      },
    ],
  });

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
          <div className="card p-3 mb-4">
            <h5>Grafik Donasi</h5>
            <Line data={chartData} />
          </div>
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
              <p className="mt-3">Donasi </p>
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
                  className="form-control widget-content-right w-100 d-lg-block d-none d-md-none"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {userRole !== "Yayasan" && (
                  <div className="btn-actions-pane-right">
                    <div role="group" className="btn-group-sm btn-group">
                      <button className="active btn-focus p-2 rounded">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/donasi/add"
                        >
                          Tambah Donasi
                        </a>
                      </button>
                    </div>
                  </div>
                )}
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
                    <th>Nama Donasi</th>
                    <th>Deskripsi</th>
                    <th>Dana Masuk (RP)</th>
                    <th>Dana Keluar (rp)</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.length > 0 ? (
                    filteredList.map((item, index) => (
                      <tr key={index}>
                        <td
                          className="text-lg-start text-md-end text-sm-end"
                          data-label="No"
                        >
                          {(currentPage - 1) * rowsPerPage + index + 1}
                        </td>
                        <td
                          className="text-lg-start text-md-end text-sm-end"
                          data-label="Nama Donasi"
                        >
                          {item.name}
                        </td>
                        <td
                          className="text-lg-start text-md-end text-sm-end"
                          data-label="Deskripsi"
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        </td>
                        <td className="text-end" data-label="Dana Masuk (RP)">
                          {item.total_income}
                        </td>
                        <td className="text-end" data-label="Dana Keluar (rp)">
                          {item.total_outcome}
                        </td>
                        <td
                          className="text-lg-center text-md-end text-sm-end"
                          data-label="Aksi"
                        >
                          {userRole !== "Yayasan" && (
                            <>
                              <button
                                type="button"
                                className="btn-primary btn-sm mr-2"
                              >
                                <a
                                  style={{
                                    color: "white",
                                    textDecoration: "none",
                                  }}
                                  href={`/donasi/put/${item.id}`}
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </a>
                              </button>
                              <button
                                type="button"
                                className="btn-danger btn-sm mr-2"
                                onClick={() => deleteData(item.id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </>
                          )}
                          <button type="button" className="btn-warning btn-sm">
                            <a
                              className="text-light"
                              href={"/donasi/detail/" + item.id}
                            >
                              <i className="fas fa-info-circle"></i>
                            </a>
                          </button>
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

export default Donasi;
