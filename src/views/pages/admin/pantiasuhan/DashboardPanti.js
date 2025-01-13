import React, { useEffect, useState } from "react";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";
import axios from "axios";
import {
  API_DUMMY,
  API_DUMMY_SMART,
} from "../../../../utils/base_URL";

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

function DashboardPanti() {
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
        `${API_DUMMY_SMART}/api/customer/donation/recap`,
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

  // const fetchJumlahDanaKeluar = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://dev-api.byrtagihan.com/api/customer/donation_trx/recap", // Endpoint API
  //       {
  //         headers: {
  //           "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`, // Menambahkan token jika diperlukan
  //         },
  //       }
  //     );

  //     console.log("Response data:", response.data); // Melihat struktur data API

  //     // Pastikan `data` adalah array sebelum menggunakan reduce
  //     if (Array.isArray(response.data?.data)) {
  //       const totalNominal = response.data.data.reduce((total, item) => {
  //         console.log("Nominal item:", item.nominal); // Melihat setiap nominal
  //         return total + (item.nominal || 0);
  //       }, 0);

  //       console.log("Total nominal dana keluar:", totalNominal); // Melihat total nominal
  //       setJumlahDanaKeluar(totalNominal || 0); // Set total nominal ke state
  //     } else {
  //       console.error("Unexpected data format:", response.data?.data);
  //       setJumlahDanaKeluar(0); // Jika data tidak sesuai, set ke 0
  //     }
  //   } catch (error) {
  //     console.error("Error fetching jumlah dana keluar: ", error.message);
  //     setJumlahDanaKeluar(0); // Jika error, tampilkan 0
  //   }
  // };

  useEffect(() => {
    fetchData();
    fetchTahsin();
    fetchPresensi();
    fetchGuestCount();
    fetchAnakAsuhData();
    fetchJumlahPostingan();
    // fetchJumlahDanaKeluar();
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
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="box-tabel card1">
            <div>
              <div className="card shadow w-100 border-none cardmenu">
                <h2 style={{ fontFamily: "Poppins" }}>
                  Jumlah Donasi dalam 1 Minggu Terakhir
                </h2>
                <h1 style={{ fontFamily: "Poppins" }}>{rupiah(fetchWeekly)}</h1>
                <div className="info-link">
                  <a href="/donasi">Informasi Selengkapnya</a>
                </div>
              </div>
              <div className="card shadow w-100 border-none cardmenu">
                <h2 style={{ fontFamily: "Poppins" }}>Jumlah Dana Keluar dalam 1 Minggu Terakhir</h2>
                <h1 style={{ fontFamily: "Poppins" }}>{rupiah(jumlahDanaKeluar)}</h1>
                <div className="info-link">
                  <a href="/admin_dana_keluar">Informasi Selengkapnya</a>
                </div>
              </div>
              <div className="card shadow w-100 border-none cardmenu">
                <h2 style={{ fontFamily: "Poppins" }}>Jumlah Saldo Keuangan Panti</h2>
                <h1 style={{ fontFamily: "Poppins" }}>Rp 0</h1>
                <div className="info-link">
                  <a href="/admin_keuangan">Informasi Selengkapnya</a>
                </div>
              </div>
            </div>
            <div className="card shadow w-100 cardmenu">
              <h2 style={{ fontFamily: "Poppins" }}>Jumlah Barang</h2> <br />
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
                  {conditions.length > 0 && quantities.length > 0 ? (
                    conditions.map((condition, index) => {
                      const matchingQuantity = quantities.filter(
                        (quantity) =>
                          quantity.kondisi_barang_name ===
                          condition.kondisi_barang
                      );

                      let ttl = 0;
                      matchingQuantity.map((item) => (ttl += item.stok));
                      console.log(matchingQuantity);
                      console.log(ttl);
                      return (
                        <tr key={index}>
                          <td data-label="No" className="text-center">
                            {index + 1}
                          </td>
                          <td data-label="Kondisi" className="text-center">
                            {condition.kondisi_barang || "Tidak Diketahui"}
                          </td>
                          <td data-label="Jumlah" className="text-center">
                            {/* {quantities[index]?.stok || 0} */}
                            {ttl || 0}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        Data tidak tersedia
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <footer>
                <div className="info-link">
                  <a href="/barang_inventaris">Informasi Selengkapnya</a>
                </div>
              </footer>
            </div>
          </div>
          <div className="box-tabel card2">
            <div className="card shadow w-100 border-none cardmenu">
              <h2 style={{ fontFamily: "Poppins" }}>Jumlah Anak Asuh</h2>
              <br /> <br />
              <h1 style={{ fontFamily: "Poppins" }}>{anakAsuhCount}</h1>
              <div className="info-link">
                <a href="/admin_anak_asuh">Informasi Selengkapnya</a>
              </div>
            </div>
            <div className="card shadow w-100 border-none cardmenu">
              <h2 style={{ fontFamily: "Poppins" }}>Jumlah Setoran Tahsin</h2>
              <span>dalam 1 Minggu Terakhir</span> <br />
              <h1>{total_tahsin}</h1>
              {/* <div className="info-link">
                <a href="#">Informasi Selengkapnya</a>
              </div> */}
            </div>
            <div className="card shadow w-100 border-none cardmenu">
              <h2 style={{ fontFamily: "Poppins" }}>Jumlah Presensi</h2>
              <span>dalam 1 Minggu Terakhir</span> <br />
              <h1>{presensiCount}</h1>
              <div className="info-link">
                <a href="/laporan_presensi/harian">Informasi Selengkapnya</a>
              </div>
            </div>
          </div>
          <div className="box-tabel card1">
            <div className="card shadow w-100 border-none cardmenu">
              <h2 style={{ fontFamily: "Poppins" }}>Jumlah Tamu dalam 1 Minggu Terakhir</h2>
              <h1>{guestCount}</h1>
              <div className="info-link">
                <a href="/admin_buku_tamu">Informasi Selengkapnya</a>
              </div>
            </div>
            <div className="card shadow w-100 border-none cardmenu">
              <h2 style={{ fontFamily: "Poppins" }}>Jumlah Postingan Blog Web</h2>
              <h1>{jumlahPostingan}</h1>
              <div className="info-link">
                <a href="/admin_berita">Informasi Selengkapnya</a>
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
            // background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));
            background-color: #ffffff;
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
