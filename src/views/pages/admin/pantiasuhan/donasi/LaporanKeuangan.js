import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
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
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { API_DUMMY_SMART } from "../../../../../utils/base_URL";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LaporanKeuangan() {
  const [date, setDate] = useState("");
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const toggleSidebar = () => setSidebarToggled(!sidebarToggled);
  const getTgl = () => console.log("Tanggal Dipilih:", date);
  const [date2, setDate2] = useState("");

  // ✅ Tambahkan state untuk menyimpan data agar tidak undefined
  const [totalPendapatanHariIni, setTotalPendapatanHariIni] = useState(0);
  const [totalPengeluaranHariIni, setTotalPengeluaranHariIni] = useState(0);
  const [totalPendapatanKeseluruhan, setTotalPendapatanKeseluruhan] = useState(0);
  const [totalPengeluaranBulanTerakhir, setTotalPengeluaranBulanTerakhir] = useState(0);

  // ✅ Tambahkan state untuk data chart agar tidak undefined
  const [chartDataMingguan, setChartDataMingguan] = useState({
    labels: [],
    datasets: [],
  });

  const [chartDataBulanan, setChartDataBulanan] = useState({
    labels: [],
    datasets: [],
  });

  const tanggal = new Date();
  const hari = tanggal.getDate();
  const bulan = String(tanggal.getMonth() + 1).padStart(2, "0");
  const tahun = tanggal.getFullYear();
  const formatTanggal = `${tahun}-${bulan}-${hari}`;

  const exportHarian = async () => {
    try {
      const tgl = date2 || formatTanggal;
      const response = await axios({
        url: `${API_DUMMY_SMART}/api/customer/export/donation?date=${tgl}`,
        method: "GET",
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "laporan-harian.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Gagal mengekspor laporan keuangan:", error);
    }
  };

  return (
    <div className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""}`}>
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
        <div className="container d-flex g-3 align-items-center mt-3">
          <input
            className="form-control"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="btn-primary ml-3" onClick={getTgl}>
            Pilih
          </button>
          <button className="btn-primary ml-3" onClick={exportHarian}>
            Export
          </button>
        </div>

        {/* Card Statistik */}
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-4">
              <div className="card shadow w-100 border-none cardmen">
                <div className="card-body">
                  <h5 className="card-title">Total Pendapatan Hari Ini</h5>
                  <p className="card-text">
                    Rp {totalPendapatanHariIni.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow w-100 border-none cardmen">
                <div className="card-body">
                  <h5 className="card-title">Total Pengeluaran Hari Ini</h5>
                  <p className="card-text">
                    Rp {totalPengeluaranHariIni.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow w-100 border-none cardmen">
                <div className="card-body">
                  <h5 className="card-title">Total Pendapatan Keseluruhan</h5>
                  <p className="card-text">
                    Rp {totalPendapatanKeseluruhan.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grafik Pemasukan & Pengeluaran */}
        <div className="container mt-4 d-flex gap-3">
          <div className="card flex-fill">
            <div className="card-body">
              <h5 className="card-title">
                Pemasukan & Pengeluaran 1 Minggu Terakhir
              </h5>
              <Line data={chartDataMingguan} />
            </div>
          </div>

          <div className="card flex-fill">
            <div className="card-body">
              <h5 className="card-title">Total Pendapatan Perbulan (1 Tahun)</h5>
              <Line data={chartDataBulanan} />
            </div>
          </div>
        </div>

        {/* Total Pengeluaran 1 Bulan Terakhir */}
        <div className="container mt-4">
          <div className="card text-white bg-secondary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Pengeluaran 1 Bulan Terakhir</h5>
              <p className="card-text text-white">
                Rp {totalPengeluaranBulanTerakhir.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaporanKeuangan;
