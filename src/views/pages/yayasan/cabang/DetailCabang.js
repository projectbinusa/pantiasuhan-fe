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
      const response = await axios.get(`${API_DUMMY}/api/admin/tahsin/minggu`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
      });
      setTotalTahsin(response.data?.data?.total_tahsin || 0);
    } catch (error) {
      console.error("Gagal mengambil data tahsin:", error.message);
    }
  };

  const fetchPresensi = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/siswa/presensi`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
      });
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
      const response = await axios.get(`${API_DUMMY}/api/admin/investaris`, {
        headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
      });
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
          <div className="ktp-card card1">
            <div className="card shadow w-100 border-none">
              <div className="card-body">
                <div className="ktp-header">
                  <h2 className="ktp-title">Detail Cabang</h2>
                </div>
                <div className="ktp-details">
                  <div className="ktp-row">
                    <div className="ktp-info">
                      <h4>Nama Panti</h4>
                      <p>Panti Asuhan Muhammadiyah</p>
                    </div>
                    <div className="ktp-info">
                      <h4>Kepala Panti</h4>
                      <p>Contoh</p>
                    </div>
                  </div>
                  <div className="ktp-row">
                    <div className="ktp-info">
                      <h4>Alamat</h4>
                      <p>Jl. Contoh No. 123, Kota XYZ</p>
                    </div>
                    <div className="ktp-info">
                      <h4>Jumlah Anak Asuh</h4>
                      <p>102</p>
                    </div>
                  </div>
                  <div className="ktp-row">
                    <div className="ktp-info">
                      <h4>Jumlah Pegawai</h4>
                      <p>10</p>
                    </div>
                    <div className="ktp-info">
                      <h4>Jumlah Aset</h4>
                      <p>1223</p>
                    </div>
                  </div>
                  <div className="ktp-row">
                    <div className="ktp-info">
                      <h4>Informasi Rekening</h4>
                      <h1>{rupiah(fetchWeekly)}</h1>
                    </div>
                    <div className="ktp-info">
                      <h4>Maps</h4>
                      <iframe
                        title="Location Map"
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.9824873682737!2d110.45976957379189!3d-6.9885941684384205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708cdb5955f7fd%3A0x2dd118c3e56d1f3a!2sPanti%20Asuhan%20Muhammadiyah!5e1!3m2!1sid!2sid!4v1733301705391!5m2!1sid!2sid`}
                        style={{ width: "100%", height: "200px", border: "0" }}
                        allowFullScreen=""
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .ktp-card {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            max-width: 600px;
            margin: auto;
            border: 2px solid #333;
            border-radius: 10px;
            padding: 20px;
            background-color: #fff;
          }
          .ktp-header {
            text-align: center;
            margin-bottom: 1rem;
          }
          .ktp-title {
            font-family: "Poppins", sans-serif;
            font-size: 1.5rem;
            font-weight: bold;
          }
          .ktp-details {
            font-family: "Poppins", sans-serif;
          }
          .ktp-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
          }
          .ktp-info {
            width: 48%;
          }
          .ktp-info h4 {
            font-size: 1rem;
            font-weight: bold;
          }
          .ktp-info p, .ktp-info h1 {
            font-size: 1rem;
          }
          .ktp-footer {
            text-align: center;
            margin-top: 2rem;
          }
        `}
      </style>
    </div>
  );
}

export default DetailCabang;
