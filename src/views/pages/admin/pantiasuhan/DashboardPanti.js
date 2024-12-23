import React, { useEffect, useState } from "react";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";
import axios from "axios";
import { API_DUMMY_PYTHON } from "../../../../utils/base_URL";

function DashboardPanti() {
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [fetchWeekly, setFetchWeekly] = useState();
  const [total_tahsin, setTotalTahsin] = useState();
  const [presensiCount, setPresensiCount] = useState();
  const [guestCount, setGuestCount] = useState();

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

  // Fungsi untuk melakukan fetch data
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("tokenpython");
      if (!token) {
        throw new Error("Token tidak ditemukan. Harap login ulang.");
      }

      const response = await axios.get(
        `https://api.byrtagihan.com/api/customer/donation`, 
        {
          headers: {
            "auth-tgh": `jwt ${token}`,
          },
        }
      );

      setFetchWeekly(response.data.weeklyDonation); 
    } catch (error) {
      console.error("Error fetching data: ", error.message);
    }
  };

  // ambil data tahsin
  const fetchTahsin = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY_PYTHON}/api/admin/tahsin/minggu`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      
      if (response.status === 200) {
        const { data } = response.data;
        setTotalTahsin(data.total || 0);
      } else {
        console.error("Error: API tidak mengembalikan status 200");
      }
    } catch (error) {
      console.error("Gagal mengambil data tahsin:", error.response || error.message);
    }
  };
  

  // Ambil data presensi
  const fetchPresensi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY_PYTHON}/api/siswa/presensi`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      const { data } = response.data;
      const totalPresensi = data.reduce(
        (acc, item) => acc + (item.jumlah || 0),
        0
      );
      setPresensiCount(totalPresensi);
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil data presensi:",
        error.response || error.message
      );
    }
  };

  // Ambil data tamu
  const fetchGuestCount = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY_PYTHON}/api/admin/guest_book/week`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      const { data } = response.data;
      setGuestCount(data.total || 0);
    } catch (error) {
      console.error(
        "Gagal mengambil data tamu:",
        error.response || error.message
      );
    }
  };

  useEffect(() => {
    fetchData();
    fetchTahsin();
    fetchPresensi();
    fetchGuestCount();
  }, []);

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
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="box-tabel card1">
            <div>
              <div className="card shadow w-100 border-none cardmenu">
                <h2 className="">Jumlah Donasi dalam 1 Minggu Terakhir</h2>
                {/* <h1>{fetchWeekly}</h1> */}
                <h1>Rp 500.0000</h1>
                <div className="info-link">
                  <a href="/donasi">Informasi Selengkapnya</a>
                </div>
              </div>
              <div className="card shadow w-100 border-none cardmenu">
                <h2 className="">Jumlah Dana Keluar dalam 1 Minggu Terakhir</h2>
                <h1>Rp 500.000</h1>
                <div className="info-link">
                  <a href="/admin_dana_keluar">Informasi Selengkapnya</a>
                </div>
              </div>
              <div className="card shadow w-100 border-none cardmenu">
                <h2 className="">Jumlah Saldo Keuangan Panti</h2>
                <h1>Rp 500.000</h1>
                <div className="info-link">
                  <a href="/admin_keuangan">Informasi Selengkapnya</a>
                </div>
              </div>
            </div>
            <div className="card shadow w-100 cardmenu">
              <h2 className="">Jumlah Barang (stok barang)</h2> <br />
              <table className="align-middle mb-0 table table-bordered table-striped table-hover tabelbarang">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      No
                    </th>
                    <th className="text-center">Kondisi</th>
                    <th className="text-center">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-label="No" className="text-center">
                      1
                    </td>
                    <td data-label="Kondisi" className="text-center">
                      Baik
                    </td>
                    <td data-label="Jumlah" className="text-center">
                      18
                    </td>
                  </tr>
                </tbody>
              </table>
              <footer>
                <div className="info-link">
                  <a href="/barang_inventari">Informasi Selengkapnya</a>
                </div>
              </footer>
            </div>
          </div>
          <div className="box-tabel card2">
            <div className="card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Anak Asuh</h2> <br />
              <br />
              <h1>20</h1>
              <div className="info-link">
                <a href="/admin_anak_asuh">Informasi Selengkapnya</a>
              </div>
            </div>
            <div className="card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Setoran Tahsin</h2>
              <span>dalam 1 Minggu Terakhir</span> <br />
              <h1>{total_tahsin}</h1>
              <div className="info-link">
                <a href="#">Informasi Selengkapnya</a>
              </div>
            </div>
            <div className="card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Presensi</h2>
              <span>dalam 1 Minggu Terakhir</span> <br />
              <h1>{presensiCount}</h1>
              <div className="info-link">
                <a href="/laporan_presensi">Informasi Selengkapnya</a>
              </div>
            </div>
          </div>
          <div className="box-tabel card1">
            <div className="card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Tamu dalam 1 Minggu Terakhir</h2>
              <h1>{guestCount}</h1>
              <div className="info-link">
                <a href="/admin_buku_tamu">Informasi Selengkapnya</a>
              </div>
            </div>
            <div className="card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Postingan Blog Web</h2>
              <h1>100</h1>
              <div className="info-link">
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
            grid-template-columns: 1fr;
            }
          }
          @media (max-width: 800px) {
            .box-tabel {
              width: 100%;
              margin-left: 0;
            }
          }
        `}
      </style>
    </div>
  );
}

export default DashboardPanti;
