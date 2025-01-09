import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { API_DUMMY_SMART_DEV } from "../../../../../../utils/base_URL";
import Swal from "sweetalert2";

const formatTanggal = (tanggalString) => {
  const tanggal = new Date(tanggalString);
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const hari = tanggal.getDate();
  const bulanNama = bulan[tanggal.getMonth()];
  const tahun = tanggal.getFullYear();

  return `${hari} ${bulanNama} ${tahun}`;
};

function DanaMasuk() {
  const [datas, setDatas] = useState(null);
  const param = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY_SMART_DEV}/api/public/donation/${param.id}`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
              "x-origin": "mccsemarang.com"
            },
          }
        );
        const resp = response.data.data;
        setDatas(resp)
        console.log(resp);
        // setDanaMasuk(resp.income_trx)
        // setDanaKeluar(resp.outcome_trx)
      } catch (error) {
        console.error("Terjadi Kesalahan", error);
      }
    };

    fetchData();
  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(9); // Tetapkan jumlah item per halaman
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Untuk mendeteksi apakah masih ada data untuk dimuat

  const getAll = async () => {
    if (isLoading || !hasMore) return; // Hindari pemanggilan ganda jika sudah loading atau tidak ada data lagi

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_DUMMY_SMART_DEV}/api/public/donation_trx/masuk/donation/${param.id}?page=${currentPage}&limit=${rowsPerPage}`,
        {
          headers: {
            // "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            "x-origin": "mccsemarang.com"
          },
        }
      );

      const { data, pagination } = response.data;
      console.log(response);


      if (data && pagination) {
        // Tambahkan data baru ke daftar yang sudah ada tanpa duplikat
        setList((prevList) => {
          const uniqueData = data.filter(
            (item) => !prevList.some((prevItem) => prevItem.id === item.id) // Hindari data dengan ID yang sama
          );
          return [...prevList, ...uniqueData];
        });

        setHasMore(currentPage < pagination.total_page); // Periksa apakah masih ada halaman berikutnya
      } else {
        console.error("Data atau pagination tidak ditemukan dalam response.");
        setHasMore(false);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error.response || error.message);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Gagal memuat data.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200 &&
      !isLoading &&
      hasMore
    ) {
      setCurrentPage((prevPage) => prevPage + 1); // Naikkan halaman saat scroll mendekati bawah
    }
  };

  useEffect(() => {
    getAll(); // Panggil fungsi getAll setiap kali currentPage berubah
  }, [currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="section-donasi">
      <section className="body-donasi">
        <div className="container-donasi">
          <header className="header-back">
            <h6>{datas?.name}</h6>
          </header>
          <div className="content-donasi">
            <div className="dana-masuk">
              <br />
              <h3>Dana Masuk</h3> <br />
              <ul>
                {list.map((item, index) => (
                  <li key={index}>
                    <h3>{item.name}</h3>
                    <p>Berdonasi sebesar <b>{rupiah(item.nominal)}</b></p>
                    <span>{formatTanggal(item?.created_date)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="fixed-donate-buttons">
            <button type="button" className="btn-primary" onClick={() => window.location.href = `/donasiumum`}>Kembali
            </button>
          </div>
        </div>
      </section>

      <style>
        {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
          font-family: "Poppins", sans-serif
        }

        body {
          background-color: #f8f8f8;
          color: #333;
        }

        .header-back {
          position: fixed;
          background-color: #1e88e5;
          top: 0;
          left: 0;
          width: 100%;
          text-align: center;
          padding: 10px 0;
          z-index: 1000;
          font-size: 24px;
          font-weight: bold;
        }

        .header-back h6{
          color: #fff;
        }

        .container-donasi {
          max-width: 500px;
          margin: 40px auto 50px;
          background-color: #fff;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          min-height: 100vh;
        }

        .content-donasi {
          padding: 15px;
        }

        .dana-masuk h3 {
          font-size: 16px;
          color: #444;
        }

        .dana-masuk p {
          font-size: 14px;
          color: #555;
          margin-top: 5px;
          font-family: "Poppins", sans-serif;
        }

        .dana-masuk ul {
    list-style: none;
    list-style-position: inside;
    margin: 0;
    padding: 0; /* Tambahkan ini untuk menghapus padding bawaan */
    width: 100%;
}

.dana-masuk ul li {
    background-color: #f0f8ff;
    color: #555;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
    margin-bottom: 15px;
    font-family: "Poppins", sans-serif;
    width: calc(100% - 5px); /* Sesuaikan width agar memperhitungkan padding */
    box-sizing: border-box; /* Pastikan padding masuk dalam perhitungan width */
}

.dana-masuk ul li b, .dana-masuk ul li span{
font-family: "Poppins", sans-serif;
}

        .fixed-donate-buttons {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          // gap: 10px;
          padding: 10px 0;
          background-color: #f8f8f8;
          z-index: 1000;
        }

        .fixed-donate-buttons button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
          font-size: 14px;
          font-family: "Poppins", sans-serif;
          width: 100%;
          max-width: 500px;
        }

        .fixed-donate-buttons button a {
        font-family: "Poppins", sans-serif;
        }
        `}
      </style>
    </main>
  )
}

export default DanaMasuk;