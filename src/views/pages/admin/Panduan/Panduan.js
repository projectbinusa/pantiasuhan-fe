import React from "react";
import logo from "../../../../aset/BNILogo.png"; // Ganti dengan lokasi logo Anda

function Panduan({ member }) {
  // const handleCopy = () => {
  //   navigator.clipboard.writeText(member.va_wallet);
  //   alert("Nomor Virtual Account berhasil disalin!");
  // };

  return (
    <div className="p-5 mx-auto max-w-lg rounded-lg">
      {/* Header */}
      {/* <div className="text-center">
    <h4 className="font-semibold text-xl">Panduan</h4>
  </div> */}

      {/* Card */}
      <div className="mt-3 bg-white shadow-lg rounded-lg p-4" style={{ borderRadius: '2%' }}>
        {/* Logo */}
        <div className="text-center">
          <img src={logo} alt="BNI Logo" className="mx-auto w-2/5" />
        </div>

        {/* Informasi Bank */}
        <div style={{ display: "flex", marginTop: "5%" }}>
          <div style={{ lineHeight: "1.1" }}>
            <p>Nama Bank :</p>
            <p>Nama Akun :</p>
            <p>Biaya Admin :</p>
            <p>Nomor Virtual Account :</p>
          </div>
          <div style={{ lineHeight: "1.1" }}>
            <p>Bank Negara Indonesia</p>
            <p>Rara</p>
            <p>RP. 4.000</p>
            <p style={{ color: "blue" }}>
              <i className="fa-regular fa-copy"></i>
            </p>
          </div>
        </div>

        <hr className="my-4" />

        {/* Panduan */}
        <h5 className="text-center font-semibold text-lg">
          PANDUAN PEMBAYARAN BNI
        </h5>
        <p className="text-center text-sm mt-2 mb-4">
          Anda dapat melakukan pembayaran dengan menggunakan Bank BNI Virtual
          Account dengan mengikuti langkah-langkah berikut:
        </p>

        {/* Panduan Manual */}
        <div className="bg-gray-100 p-3 rounded-md mb-3">
          <p className="font-semibold mb-2">Pembayaran Melalui BNI Mobile:</p>
          <ul className="list-decimal list-inside text-sm space-y-1">
            <li>Pilih Menu Pembayaran/Payment</li>
            <li>Pilih Akademik</li>
            <li>
              Masukan Id Pelanggan/Kode Bayar ... (
              {/* {member.va_wallet.toString().slice(-8)},{" "} */}
              <span className="font-bold">8 digit terakhir dari nomor VA</span>)
            </li>
            <li>Pilih Selanjutnya</li>
            <li>Masukan Nominal Yang Akan diTopup Kedalam Aplikasi</li>
            <li>Masukan PIN</li>
            <li>
              Konfirmasi Transaksi, Pastikan Nama Dan Nominal Sudah Sesuai
            </li>
            <li>Selanjutnya</li>
          </ul>
          <button className="d-grid gap-2">
            Pembayaran Melalui BNI Mobile
          </button>
        </div>

        <div className="bg-gray-100 p-3 rounded-md mb-3">
          <p className="font-semibold mb-2">
            Pembayaran Melalui ATM Bank Lain:
          </p>
          <ul className="list-decimal list-inside text-sm space-y-1">
            <li>Pilih Menu Transfer</li>
            <li>Pilih Menu Antar Bank</li>
            <li>
              Masukan Bank Tujuan <span className="font-bold">Bank BNI</span>
            </li>
            <li>Masukan Nomor VA Tujuan (nama bank)</li>
            <li>
              Masukan Nominal Transfer, Dan Layanan Transfer Realtime{" "}
              <span className="font-bold">ONLINE</span>, Lalu Klik Masuk
            </li>
            <li>Pastikan Nama Rekening VA Dan Nominal Sudah Sesuai</li>
            <li>Klik Selanjutnya</li>
          </ul>
        </div>

        {/* Tombol */}
        <div className="space-y-3">
          <button className="w-full max-w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center">
            Pembayaran Melalui ATM Bank Lain
          </button>
        </div>
      </div>
    </div>
  );
}

export default Panduan;
