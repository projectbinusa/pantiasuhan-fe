import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_DUMMY_SMART } from "../../../../utils/base_URL";
import SidebarYayasan from "../../../../component/SidebarYayasan";
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
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";
import { formatRupiah } from "../../../../utils/formating";
// import "../../../../css/dashboardyayasan.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DashboardYayasan() {
  const [list, setList] = useState([]);
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userRole, setUserRole] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
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

    const role = localStorage.getItem("role"); // Retrieve role from localStorage
    setUserRole(role);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [income, setIncome] = useState();
  const [outcome, setOutcome] = useState();
  const [nominal, setNominal] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY_SMART}/api/user/donation/recap`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        if (response.data.code === 200) {
          setIncome(response.data.data.total_income);
          setOutcome(response.data.data.total_outcome);
          console.log("data: ", response.data.data);
        } else {
          console.error("Failed to fetch data:", response.data.message);
        }
      } catch (err) {
        console.log("error: ", err);
      }
    };

    const fetchDataTrx = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY_SMART}/api/user/donation_trx/recap`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        if (response.data.code === 200) {
          setNominal(response.data.data.total_nominal);
          console.log("data: ", response.data.data);
        } else {
          console.error("Failed to fetch data:", response.data.message);
        }
      } catch (err) {
        console.log("error: ", err);
      }
    };

    fetchData();
    fetchDataTrx();
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

      // Update chart data
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

  useEffect(() => {
    getAll(currentPage);
  }, [currentPage, rowsPerPage]);

  return (
    <div
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
      }`}>
      {/* Sidebar */}
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#" }}>
        <i className="fas fa-bars"></i>
      </a>
      {/* <div className={`sidebar ${sidebarToggled ? "toggled" : ""}`}> */}
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      {/* </div> */}

      {/* Konten Utama */}
      <div className="page-content1">
        <div className="container py-4 app-main__outer">
          <a
            id="show-sidebar"
            className="btn1 btn-lg toggle-sidebar-btn"
            onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </a>
          <div className="row">
            <div className="col-lg-4 col-md-12 mb-4">
              <div className="row g-3">
                <div className="col-md-12 col-12 mb-3">
                  <div
                    className="card shadow-sm rounded-3 financial-card"
                    style={{ width: "100%" }}>
                    <div className="p-3">
                      <div className="fw-bold text-xs text-success text-start">
                        <i
                          className="fas fa-donate"
                          style={{
                            fontSize: "0.6rem",
                            marginRight: "0.5rem",
                          }}></i>
                        <span style={{ fontSize: "0.9rem" }}>Dana Masuk</span>
                      </div>
                      <h3
                        className="display-6"
                        style={{
                          fontSize: "1.5rem",
                          textAlign: "center",
                          marginTop: "5px",
                          fontWeight: "bold",
                        }}>
                        {formatRupiah(income)}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-12 mb-3">
                  <div
                    className="card shadow-sm rounded-3 financial-card"
                    style={{ width: "100%" }}>
                    <div className="p-3">
                      <div className="fw-bold text-xs text-success text-start">
                        <i
                          className="fas fa-donate"
                          style={{
                            fontSize: "0.6rem",
                            marginRight: "0.5rem",
                          }}></i>
                        <span style={{ fontSize: "0.9rem" }}>Donasi Trx</span>
                      </div>
                      <h3
                        className="display-6"
                        style={{
                          fontSize: "1.5rem",
                          textAlign: "center",
                          marginTop: "5px",
                          fontWeight: "bold",
                        }}>
                        {formatRupiah(nominal)}
                      </h3>
                    </div>
                  </div>
                  {/* <span
                  style={{
                    fontSize: "0.9rem",
                    textAlign: "left",
                    marginBottom: "0px",
                  }}>
                  +10% dari bulan lalu{" "}
                </span> */}
                </div>
                <div className="col-md-12 col-12 mb-3">
                  <div
                    className="card shadow-sm rounded-3 financial-card"
                    style={{ width: "100%" }}>
                    <div className="p-3">
                      <div className="fw-bold text-xs text-success text-start">
                        <i
                          className="fas fa-donate"
                          style={{
                            fontSize: "0.6rem",
                            marginRight: "0.5rem",
                          }}></i>
                        <span style={{ fontSize: "0.9rem" }}>
                          Donasi Keluar
                        </span>
                      </div>
                      <h3
                        className="display-6"
                        style={{
                          fontSize: "1.5rem",
                          textAlign: "center",
                          marginTop: "5px",
                          fontWeight: "bold",
                        }}>
                        {formatRupiah(outcome)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-12">
              <div className="card p-4 shadow-sm rounded-3 chart-card">
                <h5 className="fw-bold">Data Tren Keuangan Panti</h5>
                <div style={{ position: "relative", height: "400px" }}>
                  <Line data={chartData} options={{ responsive: true }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardYayasan;
