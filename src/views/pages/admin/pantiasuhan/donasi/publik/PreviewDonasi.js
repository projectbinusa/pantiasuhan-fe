import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { API_DUMMY_SMART_DEV } from "../../../../../../utils/base_URL";

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

function PreviewDonasi() {
  const [showFullStory, setShowFullStory] = useState(false);
  const [datas, setDatas] = useState(null);
  const [danaMasuk, setDanaMasuk] = useState([]);
  const [danaKeluar, setDanaKeluar] = useState([]);

  const toggleStory = () => {
    setShowFullStory(!showFullStory);
  };

  const param = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY_SMART_DEV}/api/public/donation/${param.id}`,
          {
            headers: {
              // "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
              "x-origin": "mccsemarang.com"
            },
          }
        );
        const resp = response.data.data;
        setDatas(resp)
        console.log("data:", resp);
        setDanaMasuk(resp.income_trx)
        setDanaKeluar(resp.outcome_trx)
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

  return (
    <main className="section-donasi">
      <section className="body-donasi">
        <div className="container-donasi">
          <div className="header-donasi">
            <header className="header-back">
              <a href="/donasiumum">
                <i class="fas fa-arrow-left"></i>
              </a>
            </header>
            <img src={datas?.url_image !== "" ? datas?.url_image : "https://via.placeholder.com/500x250"} style={{
              width: "100%",
              height: "250px",
              objectFit: "cover",
            }} alt="Gambar Header" />
          </div>
          <div className="content-donasi">
            <h2>{datas?.name}</h2>
            <p className="donation-amount">Rp{datas?.total_income}</p>
            <div className="info-box">
              Semakin banyak donasi yang tersedia, semakin besar bantuan yang bisa disalurkan oleh gerakan ini.
            </div>
            <div className="story-section">
              <h3>Cerita Penggalangan Dana</h3>
              <p>{formatTanggal(datas?.created_date)}</p>
              <div className={showFullStory ? 'stories' : 'content-isi stories'}>
                <div dangerouslySetInnerHTML={{ __html: datas?.description }} />
              </div>
              <button className="lihat-selengkapnya" onClick={toggleStory}>
                {showFullStory ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
              </button>
            </div>
            <hr />
            <div className="dana-masuk">
              <header>
                {/* <h3>Dana Masuk <span>{danaMasuk.length}</span></h3> */}
                <h3>Dana Masuk</h3>
                <a href={`/donasiumum/danamasuk/${param.id}`}><i class="fas fa-caret-right"></i></a>
              </header>
              {danaMasuk.map((item) => (
                <ul>
                  <li>
                    <h3>{item.name}</h3>
                    <p>Berdonasi sebesar <b>{rupiah(item.nominal)}</b></p>
                    <span>{formatTanggal(item.created_date)}</span>
                  </li>
                </ul>
              ))}
            </div>
            <hr />
            <div className="dana-masuk">
              <header>
                <h3>Dana Keluar</h3>
                <a href={`/donasiumum/danakeluar/${param.id}`}><i class="fas fa-caret-right"></i></a>
              </header>
              {danaKeluar.map((item) => (
                <ul>
                  <li>
                    <h3>{item.name}</h3>
                    <p>Sebesar <b>{rupiah(item.nominal)}</b></p>
                    <span>{formatTanggal(item.created_date)}</span>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Donate Button */}
        <div className="fixed-donate-buttons">
          <button className="donate-automatic" onClick={() => window.location.href = `/donasiumum/add/${datas?.id}`}>Donasi Sekarang!</button>
        </div>
      </section>
      <style>
        {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          background-color: #f8f8f8;
          color: #333;
        }

        .header-donasi{
        position:relative
        }

        .header-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          text-align: left;
          padding: 10px 0;
          z-index: 1000;
          font-size: 24px;
          font-weight: bold;
        }

        .header-back a{
          color: #fff;
          margin-left: 1rem
        }

        .container-donasi {
          max-width: 500px;
          margin: 0 auto 60px;
          background-color: #fff;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .header-donasi img {
          width: 100%;
          height: auto;
        }

        .profile-donasi {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 15px 0 10px;
        }

        .profile-donasi img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .content-donasi {
          padding: 15px;
        }

        .content-donasi h2 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #222;
        }

        .donation-amount {
          color: #005b9f;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          font-family: "Poppins", sans-serif
        }

        .info-box {
          background-color: #f0f8ff;
          color: #555;
          padding: 10px;
          border-radius: 5px;
          font-size: 14px;
          margin-bottom: 15px;
          font-family: "Poppins", sans-serif;
        }

        .story-section h3,
        .dana-masuk h3 {
          font-size: 16px;
          color: #444;
        }

        .dana-masuk h3 span{
        background-color: #f0f8ff;
        color: #005b9f;
        font-weight: 500;
        font-family: "Poppins", sans-serif;
        margin-left: 0.3rem;
        padding: 5px;
        border-radius: 1rem;
        }

        .dana-masuk header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dana-masuk header a{
          color: #555;
          font-size: 1.5rem
        }

        .story-section p,
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

        .lihat-selengkapnya {
          background-color: transparent;
          color: #005b9f;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: "Poppins", sans-serif;
        }

        .lihat-selengkapnya:hover{
        background-color: transparent;
          color: #005b9f;
          border: none;
          padding: 0;
        }

        .fixed-donate-buttons {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 10px;
          padding: 10px;
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

        .donate-automatic {
          background-color: #1e88e5;
        }
        `}
      </style>
    </main>
  );
}

export default PreviewDonasi;
