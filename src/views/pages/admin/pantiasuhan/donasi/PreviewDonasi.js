import React, { useState } from "react";

function PreviewDonasi() {
  const [showFullStory, setShowFullStory] = useState(false);

  const toggleStory = () => {
    setShowFullStory(!showFullStory);
  };

  return (
    <main className="section-donasi">
      <section className="body-donasi">
        <div className="container-donasi">
          <div className="header-donasi">
            <header className="header-back">
              <a href="/donasi-umum">
                <i class="fas fa-arrow-left"></i>
              </a>
            </header>
            <img src="https://via.placeholder.com/500x250" alt="Gambar Header" />
          </div>
          <div className="content-donasi">
            <h2>Tolong, Selamatkan Nyawa Balita Sakit Kronis!</h2>
            <p className="donation-amount">Rp20.144</p>
            <div className="info-box">
              Semakin banyak donasi yang tersedia, semakin besar bantuan yang bisa disalurkan oleh gerakan ini.
            </div>
            <div className="story-section">
              <h3>Cerita Penggalangan Dana</h3>
              <p>23 Agustus 2024</p>
              <p className={showFullStory ? '' : 'content-isi'}>
                Sahabat, ada ratusan anak menderita sakit kanker di pelosok yang saat ini nyawanya terancam karena sulit...
                Akses terhadap layanan kesehatan masih terbatas, dan banyak keluarga tidak memiliki dana untuk
                pengobatan yang memadai. Dukungan Anda sangat berarti untuk menyelamatkan mereka.
                Akses terhadap layanan kesehatan masih terbatas, dan banyak keluarga tidak memiliki dana untuk
                pengobatan yang memadai. Dukungan Anda sangat berarti untuk menyelamatkan mereka.
                Akses terhadap layanan kesehatan masih terbatas, dan banyak keluarga tidak memiliki dana untuk
                pengobatan yang memadai. Dukungan Anda sangat berarti untuk menyelamatkan mereka.
              </p>
              <button className="lihat-selengkapnya" onClick={toggleStory}>
                {showFullStory ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
              </button>
            </div>
            <hr />
            <div className="dana-masuk">
              <h3>Dana Masuk</h3> <br />
              <ul>
                <li>
                  <h3>Yulianto</h3>
                  <p>Berdonasi sebesar <b>Rp500.000</b></p>
                  <span>2024-12-12</span>
                </li>
                <li>
                  <h3>Yulianto</h3>
                  <p>Berdonasi sebesar <b>Rp500.000</b></p>
                  <span>2024-12-12</span>
                </li>
                <li>
                  <h3>Yulianto</h3>
                  <p>Berdonasi sebesar <b>Rp500.000</b></p>
                  <span>2024-12-12</span>
                </li>
                <li>
                  <h3>Yulianto</h3>
                  <p>Berdonasi sebesar <b>Rp500.000</b></p>
                  <span>2024-12-12</span>
                </li>
                <li>
                  <h3>Yulianto</h3>
                  <p>Berdonasi sebesar <b>Rp500.000</b></p>
                  <span>2024-12-12</span>
                </li>
              </ul>
            </div>
            <hr />
            <div className="dana-masuk">
              <h3>Dana Keluar</h3> <br />
              <ul>
                <li>
                  <h3>Pembelian ATK</h3>
                  <p>Sebesar <b>Rp500.000</b></p>
                  <span>2024-12-12</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Fixed Donate Button */}
        <div className="fixed-donate-buttons">
          <button className="donate-automatic">Donasi Sekarang!</button>
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

        .donate-automatic {
          background-color: #1e88e5;
        }
        `}
      </style>
    </main>
  );
}

export default PreviewDonasi;
