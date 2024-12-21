import React from "react";

function DanaMasuk() {
  return (
    <main className="section-donasi">
      <section className="body-donasi">
        <div className="container-donasi">
          <header className="header-back">
            <h6>Tolong, Selamatkan Nyawa Balita Sakit Kronis!</h6>
          </header>
          <div className="content-donasi">
            <div className="dana-masuk">
              <br />
              <h3>Dana Masuk (32)</h3> <br />
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
          </div>
          <div className="fixed-donate-buttons">
            <button type="button" className="btn-primary" onClick={() => window.location.href = `/donasi_umum`}>Kembali
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