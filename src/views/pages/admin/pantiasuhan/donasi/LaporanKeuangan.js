import React, { useState, useEffect } from "react";
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

  // Dummy Data Keuangan
  const totalPendapatanHariIni = 500000;
  const totalPengeluaranHariIni = 200000;
  const totalPendapatanKeseluruhan = 10000000;
  const totalPengeluaranBulanTerakhir = 1500000;
  const pendapatanPerbulan = [
    1000000, 1500000, 1200000, 1800000, 2000000, 2200000, 2500000, 2700000,
    2900000, 3100000, 3300000, 3500000,
  ];

  const chartDataMingguan = {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    datasets: [
      {
        label: "Pemasukan",
        data: [200000, 250000, 220000, 300000, 320000, 400000, 500000],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
      },
      {
        label: "Pengeluaran",
        data: [100000, 120000, 130000, 140000, 160000, 180000, 200000],
        borderColor: "#FF5733",
        backgroundColor: "rgba(255, 87, 51, 0.2)",
      },
    ],
  };

  const chartDataBulanan = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    datasets: [
      {
        label: "Pendapatan Perbulan",
        data: pendapatanPerbulan,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
      },
    ],
  };

  const exportHarian = () => {
    const csvContent = [
      ["Tanggal", "Pendapatan", "Pengeluaran"],
      [date, totalPendapatanHariIni, totalPengeluaranHariIni],
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `laporan_keuangan_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <div className="container d-flex g-3 align-items-center mt-3">
          <input
            className="form-control"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="btn btn-primary ml-3" onClick={getTgl}>
            Pilih
          </button>
          <button className="btn btn-primary ml-3" onClick={exportHarian}>
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
              <h5 className="card-title">
                Total Pendapatan Perbulan (1 Tahun)
              </h5>
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
