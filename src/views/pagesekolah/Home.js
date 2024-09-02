import React, { useEffect, useState, useRef } from "react";
import Footer from "../../component/FooterSekolah";
import { Link, Typography, TextField, Button, Grid } from "@mui/material";
import "../../css/prestasi/card.css";
import AOS from "aos";
import axios from "axios";
import { API_DUMMY } from "../../utils/base_URL";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavbarSekolah from "../../component/NavbarSekolah";

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovereds, setIsHovereds] = useState(false);
  const [isHoveredss, setIsHoveredss] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imageStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  };

  const buttonStylesss = {
    display: "flex",
    width: "fit-content",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "10px 20px",
    fontSize: "16px",
    color: isHoveredss ? "#000" : "#fff",
    backgroundColor: isHoveredss ? "#fff" : "#003366",
    border: isHoveredss ? "2px solid #003366" : "2px solid #fff",
    borderRadius: "5px",
    textDecoration: "none",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "40px",
    transition: "background-color 0.3s, color 0.3s, border 0.3s",
  };

  const buttonStyless = {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "medium",
    width: isMobile ? "40%" : "15%",
    color: isHovered ? "#000" : "#fff",
    backgroundColor: isHovered ? "#fff" : "#003366",
    border: isHovered ? "2px solid #003366" : "2px solid #fff",
    borderRadius: "5px",
    textDecoration: "none",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background-color 0.3s, color 0.3s, border 0.3s",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "1200px",
    margin: "0",
    left: "0",
    padding: "15px",
    alignItems: "left",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    marginBottom: "20px",
    width: "100%",
    maxWidth: "1200px",
    fontSize: "18px",
    padding: "10px 0",
  };

  const textOverlayStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "55px",
    fontWeight: "800",
    textAlign: "center",
    textTransform: "uppercase",
  };

  useEffect(() => {
    AOS.init();
  }, []);

  // GET ALL BERITA TERBARU
  const [berita, setBerita] = useState([]);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/berita/by-category?category=Berita%20Sekolah&order=asc&page=0&size=6&sort=created_date`
      );
      setBerita(response.data.data.content);
      console.log(response.data.data.content);

    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  // GET ALL EKSTRAKURIKULER
  const [ekstrakurikuler, setEkstrakurikuler] = useState([]);

  const getAllEkskul = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/ekstrakulikuler/all/terbaru?page=0&size=8`
      );
      setEkstrakurikuler(response.data.data.content);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllEkskul();
  }, []);

  // GET ALL GURU
  const [gurus, setGurus] = useState([]);

  const getAllGuru = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/guru/all/terbaru?page=0&size=20`
      );
      setGurus(response.data.data.content);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllGuru();
  }, []);

  // GET ALL ALUMNI
  const [alumnus, setAlumnus] = useState([]);

  const getAllAlumni = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/alumni/all/terbaru?page=0&size=6`
      );
      setAlumnus(response.data.data.content);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllAlumni();
  }, []);

  // GET ALL PRESTASI
  const [prestasi, setPrestasi] = useState([]);

  const getAllPrestasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/prestasi/all/terbaru?page=0&size=6`
      );
      setPrestasi(response.data.data.content);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllPrestasi();
  }, []);

  // GET ALL KONTAK
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [fax, setFax] = useState("");

  const getAllKontak = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/kontak/all/terbaru?page=0&size=1`
      );
      setEmail(response.data.data.content[0].email);
      setPhone(response.data.data.content[0].phone);
      setFax(response.data.data.content[0].fax);
      setAddress(response.data.data.content[0].address);
      console.log(response.data.data.content[0]);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllKontak();
  }, []);

  const [sambutan, setSambutan] = useState("");
  const [fotoKepsek, setFotoKepsek] = useState("");
  const [namaKepsek, setNamaKepsek] = useState("");
  const getAllSambutan = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/sambutan/all/terbaru?page=0&size=1`
      );
      const res = response.data.data.content[0];
      setSambutan(res.isi);
      setFotoKepsek(res.foto);
      setNamaKepsek(res.nama);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllSambutan();
  }, []);

  const [email1, setEmail1] = useState("");
  const [namaPengirim, setNamaPengirim] = useState("");
  const [pesan, setPesan] = useState("");
  const [telp, setTelp] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const history = useHistory();
  const [captcha, setCaptcha] = useState(""); // State untuk menyimpan input CAPTCHA dari pengguna
  const [generatedCaptcha, setGeneratedCaptcha] = useState(""); // State untuk menyimpan CAPTCHA yang dihasilkan

  // Fungsi untuk menggenerate CAPTCHA
  const generateCaptcha = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setGeneratedCaptcha(captcha);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const add = async (e) => {
    e.preventDefault();

    if (captcha !== generatedCaptcha) {
      Swal.fire({
        icon: "error",
        title: "Captcha Salah",
        text: "Harap masukkan CAPTCHA yang benar.",
      });
      return;
    }

    const data = {
      email: email1,
      nama: namaPengirim,
      pesan: pesan,
      telp: telp,
    };

    try {
      await axios.post(`${API_DUMMY}/smpn1bergas/api/kotak_saran/add`, data);
      Swal.fire({
        icon: "success",
        title: "Kotak Masuk Berhasil Terkirim",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const scrollToId = sessionStorage.getItem("scrollToId");
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      element.scrollIntoView({ behavior: "smooth" });
      sessionStorage.removeItem("scrollToId");
    }
  }, []);

  return (
    <div style={{ background: "#FFF9F9" }}>
      <NavbarSekolah />
      <div
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <img
          src="https://lh5.googleusercontent.com/p/AF1QipPiTYMPukmrWn57NP0O_90hGlAwYH1dxd-Tv39r=w2048-h2048-k-no"
          style={imageStyle}
          alt=""
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <div style={textOverlayStyle}>
          <p style={{ color: "white" }}>SMP NEGERI 1 BERGAS</p>
        </div>
      </div>

      <div class="about-area pd-top-90 pd-bottom-120">
        <div class="container">
          <div class="row">
            <div data-aos="fade-right" class="col-lg-6">
              <div class="mask-bg-wrap mask-bg-img-3">
                <img
                  style={{ borderRadius: "15px", width: "70%" }}
                  class="shape-image"
                  src={fotoKepsek}
                  alt="img"
                />
              </div>
            </div>
            <div data-aos="fade-left" class="col-lg-6 align-self-center">
              <div class="section-title px-lg-5 mb-0">
                <h5 class="sub-title left-border">Sambutan Kepala Sekolah</h5>
                <h2 class="title">{namaKepsek}</h2>
                <p class="content mt-2 mb-2 isiBerita2">{sambutan}</p>
                <a href="/sambutan" style={{ fontWeight: "600" }}>SELENGKAPNYA</a>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BERITA */}
      <div class="blog-area bg-blue pd-top-115 pd-bottom-60">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-6 col-lg-7 col-md-10">
              <div class="section-title text-center">
                <Typography
                  style={{
                    fontWeight: "bold",
                    borderBottom: "2px solid #FFCC00",
                    display: "inline-block",
                    color: "white",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                  variant="h4"
                  gutterBottom>
                  Berita Terbaru
                </Typography>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            {berita.map((data) => (
              <div class="col-lg-4 col-md-6">
                <div class="single-blog-inner style-2">
                  <div class="thumb">
                    <img src={data.image} alt="img" className="news" />
                  </div>
                  <div class="details">
                    <h4>
                      <a href={`/detail-news-${data.id}`}>{data.judulBerita}</a>
                    </h4>
                    <ul class="blog-meta">
                      <li>
                        <i class="far fa-user"></i> By {data.author}
                      </li>
                      <li>
                        <i class="far fa-calendar-alt"></i> {data.created_date}
                      </li>
                    </ul>
                    <p
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3, // Menentukan jumlah baris yang ditampilkan
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                      <div
                        dangerouslySetInnerHTML={{ __html: data.isiBerita }} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRESTASI */}
      <section class="project-area pd-top-115 pd-bottom-90">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="section-title style-white text-center">
                <h5 class="sub-title double-line" style={{ color: "black" }}>
                  Prestasi Unggulan
                </h5>
                <h2 class="title" style={{ color: "black" }}>
                  Temui Para Juara Kami
                </h2>
                <p class="content" style={{ color: "black" }}>
                  Kami terus mengukir prestasi di berbagai bidang, dengan
                  dedikasi dan kerja keras, kami siap untuk terus berkembang dan
                  mencapai yang terbaik.
                </p>
              </div>
            </div>
          </div>
          <div className="container-grid">
            {prestasi.map((item) => (
              <div class="card item" key={item.id}>
                <div class="single-project-inner style-two">
                  <div class="thumb">
                    {item.foto !== null ? (
                      <img src={item.foto} alt="img" />
                    ) : (
                      <img
                        src="https://lh5.googleusercontent.com/p/AF1QipPiTYMPukmrWn57NP0O_90hGlAwYH1dxd-Tv39r=w2048-h2048-k-no"
                        alt="img"
                      />
                    )}
                  </div>
                  <div class="details-wrap">
                    <h3>{item.judul}</h3>
                    <a href={`/detail-prestasi-${item.id}`}>
                      SELENGKAPNYA <i class="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EKSTRAKULIKULER */}
      <div class="how-it-work-area bg-blue pd-top-110 pd-top-110">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="section-title style-white text-center">
                <h5 class="sub-title double-line">Ekstrakurikuler</h5>
                <h2 class="title">Cara Pelaksanaannya</h2>
                <p class="content">
                  Pelatihan dilakukan secara bertahap dan sistematis. Setiap
                  sesi dirancang untuk mengembangkan keterampilan peserta.
                  Kegiatan berlangsung dengan pendekatan yang interaktif dan
                  kolaboratif, memastikan setiap peserta mendapatkan pengalaman
                  belajar yang optimal.
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            {ekstrakurikuler.map((data, index) => (
              <div class="col-lg-3 col-md-6">
                <div class="single-work-inner style-two text-center">
                  <div class="count-wrap">
                    <div class="count-inner">
                      <h2>{index + 1}</h2>
                    </div>
                  </div>
                  <div class="details-wrap">
                    <div class="details-inner">
                      <h4>{data.name}</h4>
                      <p
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3, // Menentukan jumlah baris yang ditampilkan
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                        {data.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>{" "}
          <Link
            href="/ekstrakurikuler"
            style={buttonStylesss}
            onMouseEnter={() => setIsHoveredss(true)}
            onMouseLeave={() => setIsHoveredss(false)}>
            Tampilkan Semua Ekstrakurikuler
          </Link>
          <div class="client-slider pd-top-90 owl-carousel"></div>
        </div>
      </div>

      {/* GURU */}
      <div class="team-area pd-top-115 pd-bottom-90">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="section-title text-center">
                <h5 class="sub-title double-line">Guru</h5>
                <h2 class="title">Bertemu dengan Guru Kami</h2>
                <p class="content">
                  Para guru kami adalah profesional yang berdedikasi. Dengan
                  pengalaman dan keahlian yang luas, mereka siap membimbing
                  setiap siswa menuju kesuksesan. Pembelajaran disampaikan
                  dengan metode yang efektif dan inovatif, memastikan siswa
                  memahami materi dengan baik.
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            {gurus.map((data) => (
              <div class="col-lg-3 col-md-6">
                <div class="single-team-inner shadow-sm style-1 text-center">
                  <div class="thumb">
                    <img src={data.foto} alt="img" />
                  </div>
                  <div class="details-wrap">
                    <div class="details-inner">
                      <h4>{data.nama_guru}</h4>
                      <p>{data.mapel}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ALUMNI */}
      <div class="team-area bg-blue pd-top-90 pd-bottom-90">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="section-title style-white text-center">
                <h5 class="sub-title double-line">ALumni</h5>
                <h2 class="title">Bertemu dengan Alumni Kami</h2>
                <p class="content">
                  Jalin koneksi dengan alumni berprestasi yang telah mengukir
                  kesuksesan di berbagai bidang. Mereka siap berbagi pengalaman
                  dan inspirasi untuk generasi berikutnya.
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            {alumnus.map((data) => (
              <div class="col-lg-4 col-md-6">
                <div class="single-team-inner style-4 text-center">
                  <div class="thumb">
                    <img src={data.foto} alt="img" />
                  </div>
                  <div class="details-wrap">
                    <div class="details-inner">
                      <h4
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "white",
                          width: "200px", // Sesuaikan dengan kebutuhan
                        }}>
                        <a>{data.nama}</a>
                      </h4>
                    </div>
                  </div>
                  <div class="hover-details-wrap">
                    <div class="hover-details-inner" style={{ padding: "0 1.5rem" }}>
                      <h4>
                        <a
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            color: "white",
                            width: "150px", // Sesuaikan dengan kebutuhan
                          }}>
                          {data.nama}
                        </a>
                      </h4>
                      <p
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3, // Menentukan jumlah baris yang ditampilkan
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "white",
                          textAlign: "justify"
                        }}>
                        {data.biografi}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/all-alumni"
            style={buttonStylesss}
            onMouseEnter={() => setIsHoveredss(true)}
            onMouseLeave={() => setIsHoveredss(false)}>
            Tampilkan Semua Alumni
          </Link>
        </div>
      </div>

      {/* KONTAK */}
      <div className="contact-section-style">
        <section id="hubungi-kami" className="contact-section-style">
          <Typography
            style={{
              fontWeight: "bold",
              borderBottom: "2px solid #FFCC00",
              display: "inline-block",
              marginBottom: "100px",
              marginTop: "50px",
              fontFamily: "'Poppins', sans-serif",
            }}
            variant="h4"
            gutterBottom>
            Hubungi Kami
          </Typography>
          <Grid container spacing={3} className="container">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                gutterBottom
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  fontFamily: "'Poppins', sans-serif",
                }}>
                Denah Lokasi
              </Typography>
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15897.218736810618!2d110.527273!3d-7.174636!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708d5a1a2a2b1d%3A0x304431cd0522f0e1!2sJl.%20Krakatau%2C%20Gembongan%2C%20Karangjati%2C%20Kec.%20Bergas%2C%20Kabupaten%20Semarang%2C%20Jawa%20Tengah%2050552!5e0!3m2!1sen!2sid!4v1692797763880!5m2!1sen!2sid"
                style={{ width: "100%", height: "300px", border: "0" }}
                allowFullScreen=""
                loading="lazy"></iframe>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                gutterBottom
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  fontFamily: "'Poppins', sans-serif",
                }}>
                Kontak
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{
                    display: "flex",
                    fontFamily: "'Poppins', sans-serif",
                  }}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                    <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                  </svg>
                  <strong style={{ marginLeft: "8px" }}>:</strong>
                  <span style={{ marginLeft: "8px" }}>{email}</span>
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{
                    display: "flex",
                    fontFamily: "'Poppins', sans-serif",
                  }}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                  </svg>
                  <strong style={{ marginLeft: "8px" }}>:</strong>
                  <span style={{ marginLeft: "8px" }}>+62 {phone}</span>
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{
                    display: "flex",
                    fontFamily: "'Poppins', sans-serif",
                  }}>
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      fill-rule="evenodd"
                      d="M11 4a1 1 0 0 0-1 1v10h10.459l.522-3H16a1 1 0 1 1 0-2h5.33l.174-1H16a1 1 0 1 1 0-2h5.852l.117-.67v-.003A1.983 1.983 0 0 0 20.06 4H11ZM9 18c0-.35.06-.687.17-1h11.66c.11.313.17.65.17 1v1a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-1Zm-6.991-7a17.8 17.8 0 0 0 .953 6.1c.198.54 1.61.9 2.237.9h1.34c.17 0 .339-.032.495-.095a1.24 1.24 0 0 0 .41-.27c.114-.114.2-.25.254-.396a1.01 1.01 0 0 0 .055-.456l-.242-2.185a1.073 1.073 0 0 0-.395-.71 1.292 1.292 0 0 0-.819-.286H5.291c-.12-.863-.17-1.732-.145-2.602-.024-.87.024-1.74.145-2.602H6.54c.302 0 .594-.102.818-.286a1.07 1.07 0 0 0 .396-.71l.24-2.185a1.01 1.01 0 0 0-.054-.456 1.088 1.088 0 0 0-.254-.397 1.223 1.223 0 0 0-.41-.269A1.328 1.328 0 0 0 6.78 4H4.307c-.3-.001-.592.082-.838.238a1.335 1.335 0 0 0-.531.634A17.127 17.127 0 0 0 2.008 11Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <strong style={{ marginLeft: "8px" }}>:</strong>
                  <span style={{ marginLeft: "8px" }}>{fax}</span>
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{
                    display: "flex",
                    fontFamily: "'Poppins', sans-serif",
                  }}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <strong style={{ marginLeft: "12px" }}>:</strong>
                  <span style={{ marginLeft: "8px", textAlign: "left" }}>
                    {address}
                  </span>
                </Typography>
              </div>
            </Grid>
          </Grid>
          {/* SARAN */}
          <br /> <br />
          <form onSubmit={add} style={formStyle} className="container">
            <Typography
              variant="h5"
              gutterBottom
              style={{
                fontWeight: "bold",
                textAlign: "left",
                margin: "20px 0px",
                fontFamily: "'Poppins', sans-serif",
              }}>
              Kotak Saran
            </Typography>
            <div style={{ display: "flex", gap: "5px", marginBottom: "5px" }}>
              <p>
                {" "}
                Kode Captcha:{" "}
                <span
                  style={{
                    background: "black",
                    color: "white",
                    opacity: "0.1",
                    padding: "3px",
                    filter: "blur(0.5px)",
                  }}>
                  {generatedCaptcha}
                </span>
              </p>
              <Button type="button" onClick={generateCaptcha}>
                <i class="fa-solid fa-arrows-rotate"></i>
              </Button>
            </div>
            <TextField
              style={inputStyle}
              label="Kode Captcha"
              variant="outlined"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              required
            />
            <TextField
              value={namaPengirim}
              onChange={(e) => setNamaPengirim(e.target.value)}
              style={inputStyle}
              label="Nama"
              variant="outlined"
              required
            />
            <TextField
              value={email1}
              onChange={(e) => setEmail1(e.target.value)}
              style={inputStyle}
              label="Email"
              type="email"
              variant="outlined"
              required
            />
            <TextField
              value={telp}
              onChange={(e) => setTelp(e.target.value)}
              style={inputStyle}
              label="Nomor Telephon"
              type="number"
              variant="outlined"
            />
            <TextField
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              style={inputStyle}
              label="Pesan"
              variant="outlined"
              multiline
              rows={6}
              placeholder="Write your suggestions here..."
              required
            />
            <Button
              type="submit"
              style={buttonStyless}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              Kirim
            </Button>
          </form>
        </section>
      </div>
      <div class="client-area-area bg-base pt-5 pb-2">
        <div class="container">
          <div class="section-title style-white text-center">
            <h6 class="title">
              ` Pendidikan adalah kunci untuk membuka pintu dunia, tempat impian
              menjadi kenyataan dan pengetahuan menjadi kekuatan.`
            </h6>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
