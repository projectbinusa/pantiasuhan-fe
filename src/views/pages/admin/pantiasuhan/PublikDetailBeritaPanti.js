import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../../component/FooterSekolah";
import Navbar from "../../../../component/Navbar";
import axios from "axios";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../utils/base_URL";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";

const formatTanggal = (tanggalString) => {
  const tanggal = new Date(tanggalString);

  const hariNama = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const hari = tanggal.getDate();
  const bulanNama = bulan[tanggal.getMonth()];
  const tahun = tanggal.getFullYear();
  const namaHari = hariNama[tanggal.getDay()];

  return `${namaHari}, ${hari} ${bulanNama} ${tahun}`;
};

function PublikDetailBeritaPanti() {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [berita, setBerita] = useState(null);
  const [komentar, setKomentar] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const param = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY_SMART}/api/public/berita/${param.id}`,
          {
            headers: {
              // "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
              ORIGIN: window.location.hostname,
              // "ORIGIN": "https://staging.mccsemarang.com",
            },
          }
        );
        const resp = response.data.berita;
        setBerita(resp);
        console.log(resp);
      } catch (error) {
        console.error("Terjadi Kesalahan", error);
      }
    };

    fetchData();
  }, []);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleKomentarChange = (event) => {
    setKomentar(event.target.value);
  };

  const handleSubmitKomentar = async (e) => {
    e.preventDefault();
    e.persist();

    const datas = {
      description: komentar,
      name: name,
    };
    if (!komentar.trim()) {
      setError("Komentar tidak boleh kosong.");
      return;
    }
    try {
      await axios.post(
        `${API_DUMMY_SMART}/api/public/komentar/berita/${param.id}`,
        datas
      );
      Swal.fire({
        icon: "success",
        title: "Komentar Berhasil Terkirim",
        showConfirmButton: false,
        timer: 1500,
      });
      // setTimeout(() => {
      //   history.push("/beritapanti");
      // }, 1500);
      console.log("Komentar yang dikirim:", komentar);
      setKomentar("");
      setError(null);
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }
  };

  const [verificationCode, setVerificationCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const generateVerificationCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setVerificationCode(code);
  };

  const addKomentar = async (e) => { };

  useEffect(() => {
    generateVerificationCode();
  }, []);

  return (
    <div style={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}>
      <Navbar /> <br /> <br /> <br /> <br /> <br /> <br />
      <div className="bg-relative">
        <img
          class="shape-left-top top_image_bounce"
          src="https://solverwp.com/demo/html/itechie/assets/img/shape/3.webp"
          alt="img"
        />
        <img
          class="shape-right-top top_image_bounce"
          src="https://solverwp.com/demo/html/itechie/assets/img/shape/4.webp"
          alt="img"
        />
        <div className="container" style={{ minHeight: "100vh" }}>
          <img
            src={
              berita?.image !== ""
                ? berita?.image
                : "https://via.placeholder.com/500x350"
            }
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
            }}
            alt="Gambar Header"
          />{" "}
          <br /> <br />
          <h2 className="titlepanti">{berita?.judul_berita}</h2>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "15px",
            }}>
            <svg
              className="svg-inline--fa fa-user fa-w-14"
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="user"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              style={{
                widht: "16px",
                height: "16px",
                color: "#004080",
                marginRight: "5px",
              }}>
              <path
                fill="currentColor"
                d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path>
            </svg>
            {berita?.author} &nbsp;|&nbsp;
            <svg
              className="svg-inline--fa fa-calendar-alt fa-w-14"
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="calendar-alt"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              style={{
                widht: "16px",
                height: "16px",
                color: "#004080",
                marginRight: "5px",
              }}>
              <path
                fill="currentColor"
                d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
            </svg>
            {formatTanggal(berita?.created_date)}
          </p>
          <br />
          <div dangerouslySetInnerHTML={{ __html: berita?.isi_berita }} />
          <div className="row">
            <div style={{ marginTop: "20px" }} className="col-lg-4 col-md-12">
              <h3>Tambahkan Komentar</h3>
              <textarea
                className="form-control"
                value={komentar}
                onChange={handleKomentarChange}
                placeholder="Tulis komentar Anda..."
                rows="4"></textarea>
              <br />
              <div>
                <label>Kode Verifikasi: {verificationCode}</label>
                <input
                  type="text"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="form-control"
                  placeholder="Masukkan kode di atas"
                  required
                />
              </div>
              <br />
              <div>
                <label>Nama :</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan Nama Anda"
                />
              </div>
              <br />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button className="btn-primary mt-2" onClick={handleSubmitKomentar}>
                Kirim Komentar
              </button>
            </div>
            <div style={{ marginTop: "20px", marginBottom: "20px" }} className="col-lg-8 col-md-12">
              <h3>Komentar (0)</h3>
              <div style={{backgroundColor: "white", padding: "1rem", maxHeight: "400px", // Atur tinggi maksimal
        overflowY: "auto",}}>
                <div>
                  <h6>Nama</h6>
                  <p>Bagus</p>
                  <hr />
                </div>
                <div>
                  <h6>Nama</h6>
                  <p>Bagus</p>
                  <hr />
                </div>
                <div>
                  <h6>Nama</h6>
                  <p>Bagus</p>
                  <hr />
                </div>
                <div>
                  <h6>Nama</h6>
                  <p>Bagus</p>
                  <hr />
                </div>
                <div>
                  <h6>Nama</h6>
                  <p>Bagus</p>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif
          }

          h2.titlepanti {
            color: #005b9f
          }
        `}
      </style>
      <FooterSekolah />
    </div>
  );
}

export default PublikDetailBeritaPanti;
