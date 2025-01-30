import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

function DetailCabang() {
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [fetchWeekly, setFetchWeekly] = useState();
  const [total_tahsin, setTotalTahsin] = useState();
  const [presensiCount, setPresensiCount] = useState();
  const [guestCount, setGuestCount] = useState();
  const [donationData, setDonationData] = useState();
  const [anakAsuhCount, setAnakAsuhCount] = useState(0);
  const [conditions, setConditions] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [jumlahPostingan, setJumlahPostingan] = useState(0);
  const [jumlahDanaKeluar, setJumlahDanaKeluar] = useState(0); // Menyimpan jumlah dana keluar
  const [saldoKeuangan, setSaldoKeuangan] = useState(0);

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

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("tokenpython");
      if (!token) {
        throw new Error("Token tidak ditemukan. Harap login ulang.");
      }

      const response = await axios.get(
        `${API_DUMMY_SMART}/api/customer/donation/recap/weekly`,
        {
          headers: { "auth-tgh": `jwt ${token}` },
        }
      );

      setFetchWeekly(response.data.data?.total_income || 0);
      setJumlahDanaKeluar(response.data.data?.total_outcome || 0);
    } catch (error) {
      console.error("Error fetching donation data: ", error.message);
    }
  };

  const fetchTahsin = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/tahsin/minggu`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
        }
      );
      setTotalTahsin(response.data?.data?.total_tahsin || 0);
    } catch (error) {
      console.error("Gagal mengambil data tahsin:", error.message);
    }
  };

  const fetchPresensi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/siswa/presensi`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
        }
      );
      const totalPresensi = response.data?.data.reduce(
        (acc, item) => acc + (item.jumlah || 0),
        0
      );
      setPresensiCount(totalPresensi || 0);
    } catch (error) {
      console.error("Gagal mengambil data presensi:", error.message);
    }
  };

  const fetchGuestCount = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/guest_book/week`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
        }
      );
      setGuestCount(response.data?.data?.total_tamu || 0);
    } catch (error) {
      console.error("Gagal mengambil data tamu:", error.message);
    }
  };

  const fetchAnakAsuhData = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/admin/siswa`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
      });
      // Periksa struktur data respons yang diterima
      console.log("Jumlah siswa = ", response.data?.data); // Mencetak data siswa yang diterima dari API

      // Mengambil jumlah siswa berdasarkan array yang ada di response.data.data
      setAnakAsuhCount(response.data?.data?.length || 0); // Asumsi response.data.data adalah array siswa
    } catch (error) {
      console.error("Gagal mengambil data anak asuh:", error.message);
    }
  };

  const fetchJumlahPostingan = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/berita`, // Endpoint API
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`, // Menambahkan token jika diperlukan
          },
        }
      );
      console.log(response.data); // Memeriksa struktur respons

      // Pastikan 'organization_id' ada dalam respons yang sesuai
      setJumlahPostingan(response.data?.data?.length || 0);
    } catch (error) {
      console.error("Error fetching jumlah postingan: ", error);
    }
  };

  const fetchJumlahDana = async () => {
    try {
      const token = localStorage.getItem("tokenpython");
      if (!token) {
        throw new Error("Token tidak ditemukan. Harap login ulang.");
      }

      const response = await axios.get(
        `${API_DUMMY_SMART}/api/customer/donation/recap`,
        {
          headers: { "auth-tgh": `jwt ${token}` },
        }
      );

      const totalIncome = response.data.data?.total_income || 0;
      const totalOutcome = response.data.data?.total_outcome || 0;
      setFetchWeekly(totalIncome); // Jumlah Donasi Mingguan
      setJumlahDanaKeluar(totalOutcome); // Jumlah Dana Keluar
      setSaldoKeuangan(totalIncome - totalOutcome); // Hitung saldo keuangan
    } catch (error) {
      console.error("Error fetching donation data: ", error.message);
    }
  };
  useEffect(() => {
    fetchData();
    fetchTahsin();
    fetchPresensi();
    fetchGuestCount();
    fetchAnakAsuhData();
    fetchJumlahPostingan();
    fetchJumlahDana();
  }, []);

  const fetchKondisiBarang = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/kondisi_barang`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
        }
      );
      console.log(response.data?.data);

      setConditions(response.data?.data || []);
    } catch (error) {
      console.error("Gagal mengambil kondisi barang:", error.message);
    }
  };

  // Fetch stok barang
  const fetchStokBarang = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/admin/investaris`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
        }
      );
      console.log(response.data?.data);
      setQuantities(response.data?.data || []);
    } catch (error) {
      console.error("Gagal mengambil stok barang:", error.message);
    }
  };

  useEffect(() => {
    fetchKondisiBarang();
    fetchStokBarang();
  }, []);

  return (
    <div
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
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
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="box-tabel card2">
            <div>
              <div className="card shadow w-100 border-none cardmenu">
                <h2 style={{ fontFamily: "Poppins" }}>
                  Jumlah Anak Asuh
                </h2>
                <h1 style={{ fontFamily: "Poppins" }}>102</h1>
              </div>
              <div className="card shadow w-100 border-none cardmenu">
                <h2 style={{ fontFamily: "Poppins" }}>Jumlah Pegawai</h2>
                <h1 style={{ fontFamily: "Poppins" }}>10</h1>
              </div>
              <div className="card shadow w-100 border-none cardmenu">
                <h2 style={{ fontFamily: "Poppins" }}>Jumlah Aset</h2>
                <h1 style={{ fontFamily: "Poppins" }}>1223</h1>
              </div>
            </div>
            <div className="card shadow w-100 cardmenu cardcol">
              <h2 style={{ fontFamily: "Poppins" }}>Profile</h2> <br />
            </div>
          </div>
          <div className="box-tabel card1">
            <div className="card shadow w-100 border-none cardmenu">
              <h2 style={{ fontFamily: "Poppins" }}>
                Alamat Lengkap
              </h2>
              <h1 style={{ fontFamily: "Poppins" }}>{rupiah(fetchWeekly)}</h1>
            </div>
            <div className="card shadow w-100 border-none cardmenu">
              <h2 style={{ fontFamily: "Poppins" }}>Maps</h2>
              <iframe
                title="Location Map"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.9824873682737!2d110.45976957379189!3d-6.9885941684384205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708cdb5955f7fd%3A0x2dd118c3e56d1f3a!2sPanti%20Asuhan%20Muhammadiyah!5e1!3m2!1sid!2sid!4v1733301705391!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade`}
                style={{ width: "100%", height: "400px", border: "0" }}
                allowFullScreen=""
                loading="lazy"></iframe>
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
            // background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));
            background-color: #ffffff;
          }
          .cardmenu h2{
            font-size: 1.1rem
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
            // background-color: #001f54; /* Biru tua */
            background-color: #0d9c1e;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-size: 0.9rem;
          }
          .info-link a:hover {
            background-color:rgb(11, 128, 24);
            // background-color: #00397d;
          }
          footer {
            margin-top: auto; /* Mengatur footer selalu di bawah */
          }
          .cardcol{
            grid-column: span 2;
          }
          @media (max-width: 1024px) {
            .card1, .card2 {
            grid-template-columns: 1fr;
            }
            .cardcol{
            grid-column: span 1;
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

export default DetailCabang;
