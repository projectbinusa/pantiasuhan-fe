import React from "react";
import logo from "../../../../../../aset/BNILogo.png"; // Ganti dengan lokasi logo Anda

function Panduan() {
  // const handleCopy = () => {
  //   navigator.clipboard.writeText(member.va_wallet);
  //   alert("Nomor Virtual Account berhasil disalin!");
  // };

  // return (
  //   <div className="p-5 mx-auto max-w-lg rounded-lg">
  //     {/* Header */}
  //     {/* <div className="text-center">
  //   <h4 className="font-semibold text-xl">Panduan</h4>
  // </div> */}

  //     {/* Card */}
  //     <div className="mt-3 bg-white shadow-lg rounded-lg p-4" style={{ borderRadius: '2%' }}>
  //       {/* Logo */}
  //       <div className="text-center">
  //         <img src={logo} alt="BNI Logo" className="mx-auto w-2/5" />
  //       </div>

  //       {/* Informasi Bank */}
  //       <div style={{ display: "flex", marginTop: "5%" }}>
  //         <div style={{ lineHeight: "1.1" }}>
  //           <p>Nama Bank :</p>
  //           <p>Nama Akun :</p>
  //           <p>Biaya Admin :</p>
  //           <p>Nomor Virtual Account :</p>
  //         </div>
  //         <div style={{ lineHeight: "1.1" }}>
  //           <p>Bank Negara Indonesia</p>
  //           <p>Rara</p>
  //           <p>RP. 0</p>
  //           <p style={{ color: "blue" }}>
  //             <i className="fa-regular fa-copy"></i>
  //           </p>
  //         </div>
  //       </div>

  //       <hr className="my-4" />

  //       {/* Panduan */}
  //       <h5 className="text-center font-semibold text-lg">
  //         PANDUAN PEMBAYARAN BNI
  //       </h5>
  //       <p className="text-center text-sm mt-2 mb-4">
  //         Anda dapat melakukan pembayaran dengan menggunakan Bank BNI Virtual
  //         Account dengan mengikuti langkah-langkah berikut:
  //       </p>

  //       {/* Panduan Manual */}
  //       <div className="bg-gray-100 p-3 rounded-md mb-3">
  //         <p className="font-semibold mb-2">Pembayaran Melalui BNI Mobile:</p>
  //         <ul className="list-decimal list-inside text-sm space-y-1">
  //           <li>Pilih Menu Pembayaran/Payment</li>
  //           <li>Pilih Akademik</li>
  //           <li>
  //             Masukan Id Pelanggan/Kode Bayar ... (
  //             {/* {member.va_wallet.toString().slice(-8)},{" "} */}
  //             <span className="font-bold">8 digit terakhir dari nomor VA</span>)
  //           </li>
  //           <li>Pilih Selanjutnya</li>
  //           <li>Masukan Nominal Yang Akan diTopup Kedalam Aplikasi</li>
  //           <li>Masukan PIN</li>
  //           <li>
  //             Konfirmasi Transaksi, Pastikan Nama Dan Nominal Sudah Sesuai
  //           </li>
  //           <li>Selanjutnya</li>
  //         </ul>
  //         <button className="d-grid gap-2">
  //           Pembayaran Melalui BNI Mobile
  //         </button>
  //       </div>

  //       <div className="bg-gray-100 p-3 rounded-md mb-3">
  //         <p className="font-semibold mb-2">
  //           Pembayaran Melalui ATM Bank Lain:
  //         </p>
  //         <ul className="list-decimal list-inside text-sm space-y-1">
  //           <li>Pilih Menu Transfer</li>
  //           <li>Pilih Menu Antar Bank</li>
  //           <li>
  //             Masukan Bank Tujuan <span className="font-bold">Bank BNI</span>
  //           </li>
  //           <li>Masukan Nomor VA Tujuan (nama bank)</li>
  //           <li>
  //             Masukan Nominal Transfer, Dan Layanan Transfer Realtime{" "}
  //             <span className="font-bold">ONLINE</span>, Lalu Klik Masuk
  //           </li>
  //           <li>Pastikan Nama Rekening VA Dan Nominal Sudah Sesuai</li>
  //           <li>Klik Selanjutnya</li>
  //         </ul>
  //       </div>

  //       {/* Tombol */}
  //       <div className="space-y-3">
  //         <button className="w-full max-w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center">
  //           Pembayaran Melalui ATM Bank Lain
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <main className="section-donasi">
      <section className="body-donasi">
        <div className="container-donasi">
          <header className="header-back">
            <h6>Tolong, Selamatkan Nyawa Balita Sakit Kronis!</h6>
          </header>
          <div className="content-donasi">
            <div className="content-img">
              <img src={logo} />
            </div> <br />
            <div style={{ display: "flex", marginTop: "5%", gap: "1rem" }}>
              <div style={{ lineHeight: "1.1" }}>
                <p>Nama Bank </p>
                <p>Nama Akun </p>
                <p>Biaya Admin </p>
                <p>No VA</p>
              </div>
              <div style={{ lineHeight: "1.1" }}>
                <p>Bank Negara Indonesia</p>
                <p>Rara</p>
                <p>Rp. 0</p>
                <p style={{ color: "blue" }}>
                  <i className="fa-regular fa-copy"></i>
                </p>
              </div>
            </div> <br /> <br />
            <p className="thanks">Terima kasih atas donasi Anda! Dukungan Anda sangat berarti dan akan membawa perubahan positif bagi mereka yang membutuhkan. ❤️🙏</p>
          </div>
          <div className="fixed-donate-buttons">
            <button type="button" className="btn-primary mt-3" onClick={() => window.location.href = `/donasi_umum`}>Kembali
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
          margin: 40px auto 0;
          background-color: #fff;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          min-height: 100vh;
        }

        .content-donasi {
          padding: 15px;
        }
        
        .content-donasi .content-img{
          display: flex;
          justify-content: center;
        }

        .content-donasi h2 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #222;
        }

        .content-donasi p.thanks{
        text-align: center;
        }

        .donation-amount {
          color: #005b9f;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          font-family: "Poppins", sans-serif
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

export default Panduan;
