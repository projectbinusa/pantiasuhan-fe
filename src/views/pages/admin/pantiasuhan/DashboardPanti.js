import React, { useEffect, useState } from "react";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function DashboardPanti() {
  const [sidebarToggled, setSidebarToggled] = useState(true);

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
  return (
    <div
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
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
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="box-tabel card1">
            <div>
              <div className="card shadow w-100 border-none cardmenu">
                <h2 className="">Jumlah Donasi dalam 1 Minggu Terakhir</h2>
                <h1>Rp 500.000</h1>
                <div class="info-link">
                  <a href="/donasi">Informasi Selengkapnya</a>
                </div>
              </div>
              <div className="card shadow w-100 border-none cardmenu">
                <h2 className="">Jumlah Dana Keluar dalam 1 Minggu Terakhir</h2>
                <h1>Rp 500.000</h1>
                <div class="info-link">
                  <a href="/admin_dana_keluar">Informasi Selengkapnya</a>
                </div>
              </div>
              <div className="card shadow w-100 border-none cardmenu">
                <h2 className="">Jumlah Saldo Keuangan Panti</h2>
                <h1>Rp 500.000</h1>
                <div class="info-link">
                  <a href="/admin_keuangan">Informasi Selengkapnya</a>
                </div>
              </div>
            </div>
            <div className="card shadow w-100 cardmenu">
              <h2 className="">Jumlah Barang</h2> <br />
              <table className="align-middle mb-0 table table-bordered table-striped table-hover tabelbarang">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">No</th>
                    <th className="text-center">Kondisi</th>
                    <th className="text-center">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="No" className="text-center">1</td>
                    <td data-label="Kondisi" className="text-center">Baik</td>
                    <td data-label="Jumlah" className="text-center">18</td>
                  </tr>
                </tbody>
              </table>
              <footer>
                <div class="info-link">
                  <a href="/barang_inventari">Informasi Selengkapnya</a>
                </div>
              </footer>
            </div>
          </div>
          <div className="box-tabel card2">
            <div className="card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Anak Asuh</h2> <br /><br />
              <h1>20</h1>
              <div class="info-link">
                <a href="/admin_anak_asuh">Informasi Selengkapnya</a>
              </div>
            </div>
            <div className="card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Setoran Tahsin</h2>
              <span>dalam 1 Minggu Terakhir</span> <br />
              <h1>20</h1>
              {/* <div class="info-link">
                <a href="#">Informasi Selengkapnya</a>
              </div> */}
            </div>
            <div className="card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Presensi</h2>
              <span>dalam 1 Minggu Terakhir</span> <br />
              <h1>20</h1>
              <div class="info-link">
                <a href="/laporan_presensi">Informasi Selengkapnya</a>
              </div>
            </div>
          </div>
          <div className="box-tabel card1">
            <div className="card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Tamu dalam 1 Minggu Terakhir</h2>
              <h1>100</h1>
              <div class="info-link">
                <a href="/admin_buku_tamu">Informasi Selengkapnya</a>
              </div>
            </div>
            <div className="card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Postingan Blog Web</h2>
              <h1>100</h1>
              <div class="info-link">
                <a href="#">Informasi Selengkapnya</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .card1{
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
          }
          .card2{
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
          }
          
          .cardmenu {
            padding: 1rem;
            margin-bottom: 1rem;
            background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));
          }
          .cardmenu h2{
            font-size: 1.3rem
          }
          .cardmenu table thead tr th,
          .cardmenu table tbody tr td {
            font-family: "Poppins", sans-serif
          }

          .info-link {
            margin-top: 2rem;
            text-align: left;
          }

          .info-link a {
            text-decoration: none;
            color: #ffffff;
            background-color: #001f54; /* Biru tua */
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-size: 0.9rem;
          }

          .info-link a:hover {
            background-color: #00397d;
          }

          footer {
            margin-top: auto; /* Mengatur footer selalu di bawah */
          }

          @media (max-width: 1024px) {
            .card1, .card2 {
            grid-template-columns: 1fr; /* 1 kolom */
            }
          }
        `}
      </style>
    </div>
  );
}

export default DashboardPanti;