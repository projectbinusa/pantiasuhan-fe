import React, { useEffect, useState, useRef } from "react";
import Footer from "../../component/FooterSekolah";
import {
  Link,
  Typography,
  TextField,
  Button,
  Grid,
  Modal,
  Box,
} from "@mui/material";
import "../../css/prestasi/card.css";
import AOS from "aos";
import axios from "axios";
import { API_DUMMY, API_DUMMY_SMART } from "../../utils/base_URL";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import visimisi from "../../aset/pantiasuhan/visimisi.webp";
import NavbarSekolah from "../../component/NavbarSekolah";
import NavbarSekolah2 from "../../component/NavbarSekolah2";
import backgroundImage1 from "../../aset/pantiasuhan/pantiasuhan.png";
import backgroundImage from "../../aset/pantiasuhan/pantiasuhan.png";
// import program1 from "../../aset/pantiasuhan/program1.png";
// import program2 from "../../aset/pantiasuhan/program/program9.png";
// import program3 from "../../aset/pantiasuhan/program/program10.png";
// import program4 from "../../aset/pantiasuhan/program/program11.png";
// import program5 from "../../aset/pantiasuhan/program/program12.png";
// import program6 from "../../aset/pantiasuhan/program/program13.png";
// import program7 from "../../aset/pantiasuhan/program/program14.png";
// import program8 from "../../aset/pantiasuhan/program/program15.png";
// import program9 from "../../aset/pantiasuhan/program/program16.png";
// import program10 from "../../aset/pantiasuhan/program/program18.png";
// import program11 from "../../aset/pantiasuhan/program/program19.png";
// import program12 from "../../aset/pantiasuhan/program/program20.png";
// import program13 from "../../aset/pantiasuhan/program/program22.png";
import Navbar from "../../component/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { formatRupiah } from "../../utils/formating";
import { removeImages } from "../../utils/removeImages";
import charity from "../../aset/pantiasuhan/charity.jpg";
import avatar from "../../aset/pantiasuhan/avatarr.png";
import "bootstrap/dist/css/bootstrap.min.css";

const formatTanggal = (tanggalString) => {
  const tanggal = new Date(tanggalString);
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

  return `${hari} ${bulanNama} ${tahun}`;
};

function Home() {
  const [scrollY, setScrollY] = useState(0);
  // const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  // const [isHovereds, setIsHovereds] = useState(false);
  const [isHoveredss, setIsHoveredss] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anakAsuhData, setAnakAsuhData] = useState({
    total_anak_asuh: 0,
    per_jenis_kelamin: { laki_laki: 0, perempuan: 0 },
    per_tingkat_pendidikan: {},
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    maxHeight: "90vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
  };

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
    color: isHoveredss ? "#006400" : "#fff",
    backgroundColor: isHoveredss ? "#f0f9f0" : "#006400",
    border: isHoveredss ? "2px solid #006400" : "2px solid #f0f9f0",
    borderRadius: "8px",
    textDecoration: "none",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "40px",
    transition: "background-color 0.3s, color 0.3s, border 0.3s",
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

  const titleStyle = {
    fontWeight: "bold",
    textAlign: "left",
    margin: "20px 0px",
    fontFamily: "'Poppins', sans-serif",
  };

  const captchaTextStyle = {
    userSelect: "none",
    pointerEvents: "none",
    background: "black",
    color: "white",
    opacity: "0.1",
    padding: "3px",
    filter: "blur(0.5px)",
    userSelect: "none",
    pointerEvents: "none",
  };

  const inputContainerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    marginTop: "10px",
    flexWrap: "wrap",
    gap: "25px",
  };

  const inputFieldStyle = {
    flex: 1,
    marginTop: "10px",
  };

  const inputFieldStyles = {
    flex: 1,
    marginTop: isMobile ? "20px" : "10px",
  };

  const messageContainerStyle = {
    marginTop: "20px",
  };

  const buttonStyless = {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "medium",
    width: isMobile ? "40%" : "15%",
    color: isHovered ? "#006400" : "#fff",
    backgroundColor: isHovered ? "#f0f9f0" : "#006400",
    border: isHovered ? "2px solid #006400" : "2px solid #f0f9f0",
    borderRadius: "5px",
    textDecoration: "none",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background-color 0.3s, color 0.3s, border 0.3s",
  };

  useEffect(() => {
    AOS.init();
  }, []);

  // GET ALL BERITA TERBARU
  const [berita, setBerita] = useState([]);

  const getAllBerita = async () => {
    const origin = window.location.hostname;
    console.log("origin: ", origin);
    try {
      const response = await axios.get(`${API_DUMMY_SMART}/api/public/berita`, {
        headers: {
          "x-origin": window.location.hostname,
        },
      });
      setBerita(response.data.data);
      console.log("berita");
      console.log(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // useEffect(() => {
  //   getAll();
  // }, []);

  // GET ALL EKSTRAKURIKULER
  const [ekstrakurikuler, setEkstrakurikuler] = useState([]);

  // const getAllEkskul = async () => {

  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/smpn1bergas/api/ekstrakulikuler/all/terbaru?page=0&size=8`
  //     );
  //     setEkstrakurikuler(response.data.data.content);
  //   } catch (error) {
  //     console.log("get all", error);
  //   }
  // };

  // useEffect(() => {
  //   getAllEkskul();
  // }, []);

  // GET ALL GURU
  const [gurus, setGurus] = useState([]);

  // const getAllGuru = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/smpn1bergas/api/guru/all/terbaru?page=0&size=20`
  //     );
  //     setGurus(response.data.data.content);
  //   } catch (error) {
  //     console.log("get all", error);
  //   }
  // };

  // useEffect(() => {
  //   getAllGuru();
  // }, []);

  // GET ALL ALUMNI
  const [galery, setGalery] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const getAllGalery = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/public/galery`, {
        headers: {
          "x-origin": window.location.hostname,
        },
      });
      setGalery(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  const [foto, setFoto] = useState(null);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const byIdGalery = async (id) => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/public/galery/${id}`, {
        headers: {
          "x-origin": window.location.hostname,
        },
      });
      setFoto(response.data.data.foto);
      setJudul(response.data.data.judul);
      setDeskripsi(response.data.data.deskripsi);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // useEffect(() => {
  //   getAllAlumni();
  // }, []);

  // GET ALL PRESTASI
  const [siswa, setSiswa] = useState([]);

  const getAllSantri = async () => {
    try {
      const response = await axios.get(`${API_DUMMY_SMART}/api/public/siswa`, {
        headers: {
          "x-origin": window.location.hostname,
        },
      });
      setSiswa(response.data.data);
      console.log("siswa: ", response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // useEffect(() => {
  //   getAllPrestasi();
  // }, []);

  // GET ALL KONTAK
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");
  // const [fax, setFax] = useState("");

  const [kontak, setKontak] = useState([]);
  const getAllKontak = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/kontak/all/terbaru?page=0&size=1`
      );
      // setEmail(response.data.data.content[0].email);
      // setPhone(response.data.data.content[0].phone);
      // setFax(response.data.data.content[0].fax);
      // setAddress(response.data.data.content[0].address);
      console.log(response.data.data.content);
    } catch (error) {
      console.log("get all", error);
    }
  };

  // useEffect(() => {
  //   getAllKontak();
  // }, []);

  const [sambutan, setSambutan] = useState("");
  const [fotoKepsek, setFotoKepsek] = useState("");
  const [namaKepsek, setNamaKepsek] = useState("");

  // const getAllSambutan = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/smpn1bergas/api/sambutan/all/terbaru?page=0&size=1`
  //     );
  //     const res = response.data.data.content[0];
  //     setSambutan(res.isi || "");
  //     setFotoKepsek(res.foto || "");
  //     setNamaKepsek(res.nama || "");
  //   } catch (error) {
  //     console.log("get all", error);
  //   }
  // };

  // useEffect(() => {
  //   getAllSambutan();
  // }, []);

  const hasData = namaKepsek && sambutan;

  const [email1, setEmail1] = useState("");
  const [namaPengirim, setNamaPengirim] = useState("");
  const [pesan, setPesan] = useState("");
  const [telp, setTelp] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateCaptcha = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setGeneratedCaptcha(captcha);
    if (isLocked) {
      setCaptcha(captcha);
    } else {
      setCaptcha("");
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (isLocked) {
      if (captcha === "") {
        setCaptcha(generatedCaptcha);
      }
    } else {
      setCaptcha("");
    }
  }, [isLocked, generatedCaptcha]);

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
      tlp: telp,
    };

    try {
      await axios.post(`${API_DUMMY}/api/kotak_saran/add`, data);
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
  // GET VISI MISI PANTI
  const [visiPanti, setVisiPanti] = useState(null);

  const getAllVisiMisiPanti = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/public/visimisi`, {
        headers: {
          "x-origin": window.location.hostname,
        },
      });
      console.log("visi misi: ", response.data.data[0]);

      setVisiPanti(response.data.data[0]);
    } catch (error) {
      console.log("get visi misi", error);
    }
  };
  // GET SAMBUTAN PANTI
  const [sambutanPanti, setSambutanPanti] = useState(null);

  const getAllSambutanPanti = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/api/public/sambutan?page=1&limit=1`,
        {
          headers: {
            "x-origin": window.location.hostname,
          },
        }
      );
      console.log(response.data.data[0]);

      setSambutanPanti(response.data.data[0]);
    } catch (error) {
      console.log("get visi misi", error);
    }
  };
  const [kegiatan, setkegiatan] = useState([]);

  const getAllKegiatan = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/public/kegiatan`, {
        headers: {
          "x-origin": window.location.hostname,
        },
      });
      console.log("kegiatan: ", response.data.data);
      setkegiatan(response.data.data);
    } catch (error) {
      console.log("get kegiatan", error);
    }
  };

  // DONASI UMUM
  const [donasi, setdonasi] = useState([]);
  const getAllDonasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/public/donation?page=1&limit=6`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            "x-origin": window.location.hostname,
          },
        }
      );
      console.log("donasi: ", response.data.data);
      setdonasi(response.data.data);
    } catch (error) {
      console.log("get kegiatan", error);
    }
  };

  // GET FASILITAS
  const [list, setList] = useState([]);
  const getAllfasilitas = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/public/fasilitas `,
        {
          headers: {
            "x-origin": window.location.hostname,
          },
        }
      );

      const { data, pagination } = response.data;
      console.log(response);

      setList(data || []);

      // setPagi`nationInfo({
      //   totalPages: pagination?.total_page || 1,
      //   totalElements: pagination?.total || 0,
      // });`
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  // GET PENGURUS
  const [listp, setListp] = useState([]);
  const getAllPengurus = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/public/pengurus/pengurus`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
        }
      );

      setListp(response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  // useEffect(() => {
  //   // Fetch data jumlah anak asuh dari API
  //   axios
  //     .get(`${API_DUMMY_SMART}/api/public/jumlah_siswa`, {
  //       headers: {
  //         "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
  //       },
  //     })
  //     .then((response) => {
  //       const data = response.data.data.data;
  //       console.log(data);
  //       setAnakAsuhData(data); // Simpan data ke state
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  const [bg, setBg] = useState("#ffffff"); // Default warna putih
  const [bg2, setBg2] = useState("#ffffff");
  const [font, setFont] = useState("");
  const [title, setTitle] = useState("Panti Asuhan Muhammadiyah");
  const [subtitle, setSubtitle] = useState("Pantinya Sang Juara");

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/admin/web`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      });

      const res = response.data.data;
      if (res) {
        setFont(res.font);
        setBg(res.background);
        setBg2(res.background2);
        setTitle(res.title || "Panti Asuhan Muhammadiyah");
        setSubtitle(res.subtitle || "Pantinya Sang Juara");
        console.log("isi bg 1", bg);
        console.log("isi bg 2", bg);
      }
    } catch (error) {
      console.error("Terjadi Kesalahan:", error);
    }
  };

  useEffect(() => {
    getAllVisiMisiPanti();
    getAllSambutanPanti();
    getAllKegiatan();
    getAll();
    // getAllKontakPanti();
    getAllBerita();
    getAllSantri();
    getAllGalery();
    getAllDonasi();
    getAllfasilitas();
    getAllPengurus();
  }, []);

  return (
    <div style={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}>
      {/* <div className="navbarrr">
        <NavbarSekolah />
      </div>
      <div className="navbarrr2">
        <NavbarSekolah2 />
      </div> */}
      {/* <img
          src={backgroundImage}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.7) blur(2px)",
          }}
          alt="Panti Asuhan"
        /> */}
      {/* <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "url('https://solverwp.com/demo/html/itechie/assets/img/banner/2.webp')",
          }}
        /> */}
      {/* <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "url('https://solverwp.com/demo/html/itechie/assets/img/banner/2.webp')",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        /> */}
      <Navbar />
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        class="banner-area banner-area-1 bg-black bg-relative"
      >
        <div
          className="banner-bg-img"
          style={{
            backgroundImage: `url(https://solverwp.com/demo/html/itechie/assets/img/banner/2.webp)`,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        ></div>
        <div
          className="banner-bg-img"
          style={{
            backgroundImage: `url(https://solverwp.com/demo/html/itechie/assets/img/banner/2.webp)`,
          }}
        ></div>
        <div class="container">
          <div class="order-lg-first align-self-center">
            <div
              data-aos="zoom-out-right"
              class="banner-inner style-white text-center text-lg-start"
            >
              {/* <h4 class="sub-title">Best it solution</h4> */}
              <h2 class="title d-none d-lg-inline-block">
                Panti Asuhan Muhammadiyah <br />
                <span style={{ color: "#00FF9C" }}> Pantinya Sang Juara</span>
              </h2>
              <h2
                style={{ fonrSize: "30px", color: "white" }}
                class="d-inline-block d-lg-none"
              >
                Panti Asuhan Muhammadiyah <br />
                <span style={{ color: "#00FF9C" }}> Pantinya Sang Juara</span>
              </h2>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
      {/* <div
        style={{ backgroundImage: `url(${bg})` }}
        className="banner-area banner-area-1 bg-black bg-relative"
      >
        <div
          className="banner-bg-img"
          style={{
            backgroundImage: `url(${bg2})`,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        ></div>
        <div className="container">
          <div className="order-lg-first align-self-center">
            <div
              data-aos="zoom-out-right"
              className="banner-inner style-white text-center text-lg-start"
              style={{ fontFamily: font }}
            >
              <h2 className="title d-none d-lg-inline-block">
                {title} <br />
                <span>{subtitle}</span>
              </h2>
              <h2
                style={{ fontSize: "30px", color: "white" }}
                className="d-inline-block d-lg-none"
              >
                {title} <br />
                <span>{subtitle}</span>
              </h2>
            </div>
          </div>
        </div>
      </div> */}
      
        {/* Sambutan */}
      <div class="testimonial-slider bg-sky bg-relative testimonial-slider-bg pd-top-120 pd-bottom-120">
        <div class="container bg-relative">
          <div class="slider testimonial-thumb">
            <div class="item">
              <div class="row">
                <div
                  data-aos="fade-right"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                  class="col-md-5"
                >
                  <div class="thumb mb-4 mb-md-0">
                    <img
                      src={
                        sambutanPanti?.foto == null || sambutanPanti?.foto == ""
                          ? avatar
                          : sambutanPanti?.foto
                      }
                      alt="img"
                      style={{
                        maxWidth: "60%"
                      }}
                    />
                    {/* <img src={sambutanPanti?.foto} alt="img" /> */}
                    {/* <div class="quote-wrap">
                      <div class="quote">
                        <img
                          src="https://solverwp.com/demo/html/itechie/assets/img/quote.webp"
                          alt="img"
                        />
                      </div>
                    </div> */}
                  </div>
                </div>
                <div
                  class="col-md-7"
                  data-aos="fade-left"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <div class="single-testimonial-inner px-lg-5">
                    <div class="details section-title">
                      {/* <div className=""> */}
                      <h5 class="sub-title right-line">Sambutan</h5>
                      {/* </div> */}
                      <h2>{sambutanPanti?.judul}</h2>
                      <span>{sambutanPanti?.nama}</span>
                      <div
                        style={{
                          fontSize: "1rem",
                          color: "#666",
                          marginBottom: "15px",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: sambutanPanti?.isi_sambutan,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="slider testimonial-nav-slider">
          <div class="item">
            <div class="thumb">
              <img src="assets/img/testimonial/1.webp" alt="img" />
            </div>
          </div>
          <div class="item">
            <div class="thumb">
              <img src="assets/img/testimonial/2.webp" alt="img" />
            </div>
          </div>
          <div class="item">
            <div class="thumb">
              <img src="assets/img/testimonial/1.webp" alt="img" />
            </div>
          </div>
          <div class="item">
            <div class="thumb">
              <img src="assets/img/testimonial/2.webp" alt="img" />
            </div>
          </div>
        </div> */}
        </div>
      </div>

      {/* visi misi */}
      <div id="visi-misi" class="about-area pd-top-120 pd-bottom-120">
        <div className="container">
          <div class="row justify-content-end p-3 p-lg-0">
            <div class="col-lg-6 px-xl-5 order-lg-last text-lg-end">
              <div data-aos="fade-left" class="thumb">
                <img src={visimisi} alt="img" />
              </div>
            </div>
            <div
              data-aos="fade-right"
              class="col-lg-6 pe-xl-5 order-lg-first align-self-center"
            >
              <div class="section-title mb-0">
                {/* <h5 class="sub-title right-line">Faq</h5> */}
                <h2 class="title">Visi Misi</h2>
                <p>
                  Visi dan misi adalah panduan strategis organisasi untuk
                  mencapai tujuan jangka panjang melalui langkah-langkah
                  operasional yang terarah.
                </p>
              </div>
              <div class="accordion mt-4" id="accordionExample">
                <div class="accordion-item single-accordion-inner">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Visi
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    {/* <div> */}
                    <div
                      class="accordion-body"
                      style={{
                        fontSize: "1rem",
                        color: "white",
                        marginBottom: "15px",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: visiPanti?.visi,
                      }}
                    />
                    {/* </div> */}
                  </div>
                </div>
                <div class="accordion-item single-accordion-inner">
                  <h2 class="accordion-header" id="headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Misi
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div
                      class="accordion-body"
                      style={{
                        fontSize: "1rem",
                        marginBottom: "15px",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: visiPanti?.misi,
                      }}
                    />
                  </div>
                </div>
                <div class="accordion-item single-accordion-inner">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Motto
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div
                      class="accordion-body"
                      style={{
                        fontSize: "1rem",
                        marginBottom: "15px",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: visiPanti?.tujuan,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>

      {/* Kegiatan */}
      <div>
        <div
          style={{ backgroundImage: `url(${backgroundImage1})` }}
          id="program"
          class="banner-area banner-area-1 project-area bg-black bg-relative pd-top-115"
        >
          <div
            className="banner-bg-img"
            style={{
              // backgroundImage: `url(https://solverwp.com/demo/html/itechie/assets/img/banner/2.webp)`,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
          ></div>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7">
                <div
                  data-aos="flip-up"
                  class="section-title style-white text-center"
                >
                  <h5
                    class="sub-title double-line"
                    style={{ color: "#00FF9C" }}
                  >
                    Kegiatan / Program
                  </h5>
                  <h2 class="title">Program dan Kegiatan Panti Asuhan</h2>
                  <p class="content">
                    Kami menyediakan berbagai kegiatan dan program untuk
                    mendukung tumbuh kembang anak-anak, seperti pendidikan
                    formal dan nonformal, pelatihan keterampilan, kegiatan
                    keagamaan, serta program pengembangan karakter untuk
                    membentuk generasi yang mandiri dan berakhlak mulia.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1, // 1 slide untuk layar sangat kecil (320px ke bawah)
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2, // 2 slide untuk layar sedang (480px ke bawah)
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3, // 3 slide untuk tablet (768px ke bawah)
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4, // 4 slide untuk layar besar
                spaceBetween: 30,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <div class="project-slider-2 slider-control-square owl-carousel">
              {kegiatan.map((data) => (
                <SwiperSlide>
                  <div class="item">
                    <div
                      data-aos="flip-down"
                      class="single-project-inner style-two"
                    >
                      <div class="thumb thumb-img">
                        <img
                          src={
                            data.foto ||
                            "https://blog-asset.jakartanotebook.com/blog/content/images/2020/03/cewek-kerja-cover.jpg"
                          }
                          alt="img"
                        />
                      </div>
                      <div class="details-wrap">
                        <h3>
                          <a href={"/programpanti/" + data.id}>{data.judul}</a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>{" "}
          </Swiper>
        </div>
      </div>
      {/* <div
        className="about-area pd-top-90 pd-bottom-120"
        style={{
          backgroundColor: "#f1f8fe", // Biru muda lembut sebagai latar
          fontFamily: "'Poppins', sans-serif",
        }}>
        <div className="container">
          <div className="row align-items-center">
            <div
              data-aos="fade-right"
              className="col-lg-6 col-md-12 mb-4 d-flex justify-content-center">
              <div
                className="mask-bg-wrap mask-bg-img-3"
                style={{
                  position: "relative",
                  maxWidth: "400px",
                }}>
                <img
                  style={{
                    borderRadius: "15px",
                    width: "100%",
                    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  src={
                    fotoKepsek ||
                    "https://cdn3d.iconscout.com/3d/premium/thumb/profile-3d-icon-download-in-png-blend-fbx-gltf-file-formats--user-avatar-account-man-person-shopping-pack-e-commerce-icons-7190777.png"
                  }
                  alt="Kepala Yayasan"
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.08)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            </div>

            <div data-aos="fade-left" className="col-lg-6 col-md-12">
              <div className="section-title px-lg-5">
                <h5
                  className="sub-title left-border"
                  style={{
                    color: "#1e88e5", // Biru cerah
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    borderLeft: "5px solid #1e88e5", // Biru cerah
                    paddingLeft: "15px",
                    marginBottom: "15px",
                  }}>
                  {sambutanPanti?.judul}
                </h5>
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#005b9f", // Biru lebih gelap
                    marginBottom: "20px",
                  }}>
                  {sambutanPanti?.nama}
                </h2>
                <div
                  style={{
                    fontSize: "1rem",
                    color: "#666",
                    marginBottom: "15px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: sambutanPanti?.isi_sambutan,
                  }}
                />
                <div
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.8",
                    color: hasData ? "#333" : "gray",
                    marginBottom: "20px",
                  }}
                  dangerouslySetInnerHTML={{ __html: sambutan }}
                />
                {hasData && (
                  <a
                    href="/sambutan"
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      fontWeight: "600",
                      color: "white",
                      backgroundColor: "#43a047", // Hijau sesuai tema
                      borderRadius: "25px",
                      textDecoration: "none",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={
                      (e) => (e.currentTarget.style.backgroundColor = "#388e3c") // Hijau lebih gelap saat hover
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#43a047")
                    }>
                    SELENGKAPNYA
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* BERITA */}
      {/* <div
        className="blog-area pd-top-115 pd-bottom-60"
        id="visi-misi"
        style={{
          backgroundColor: "#004080", // Biru sangat muda untuk latar keseluruhan
          fontFamily: "'Poppins', sans-serif",
        }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-10">
              <div className="section-title text-center" data-aos="fade-down">
                <h5
                  className="sub-title double-line"
                  style={{
                    color: "#f1fcf1",
                    fontSize: "1.5em",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}>
                  Visi dan Misi
                </h5>
              </div>
            </div>
          </div>

          <div
            className="row"
            style={{
              display: "flex",
              gap: "30px",
              justifyContent: "center",
              marginTop: "40px",
            }}>
            <div
              data-aos="fade-up"
              style={{
                flex: "1 1 45%",
                background: "#f1fcf1", // Hijau sangat muda untuk blok
                borderRadius: "15px",
                boxShadow: "0px 6px 15px rgba(0, 64, 128, 0.2)", // Biru lembut
                padding: "30px",
                textAlign: "center",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }>
              <h2
                style={{
                  fontSize: "1.8em",
                  fontWeight: "bold",
                  color: "#004080", // Biru gelap
                  marginBottom: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}>
                Visi Panti Asuhan
              </h2>
              <div
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  color: hasData ? "#333" : "gray",
                  marginBottom: "20px",
                }}
                dangerouslySetInnerHTML={{ __html: visiPanti?.visi }}
              />
            </div>

            <div
              data-aos="fade-up"
              style={{
                flex: "1 1 45%",
                background: "#f1fcf1", // Hijau sangat muda untuk blok
                borderRadius: "15px",
                boxShadow: "0px 6px 15px rgba(0, 64, 128, 0.2)", // Biru lembut
                padding: "30px",
                textAlign: "center",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }>
              <h2
                style={{
                  fontSize: "1.8em",
                  fontWeight: "bold",
                  color: "#004080", // Biru gelap
                  marginBottom: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}>
                Misi Panti Asuhan
              </h2>
              <div
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  color: hasData ? "#333" : "gray",
                  marginBottom: "20px",
                  textAlign: "left",
                }}
                dangerouslySetInnerHTML={{ __html: visiPanti?.misi }}
              />
            </div>
          </div>
        </div>
      </div> */}

      {/* DONASI SECTION */}
      {/* <div
        id="donasi"
        class="blog-area pd-top-115 pd-bottom-60"
        style={{ background: "#F8FCFB" }}> */}
      <div id="donasi" class="bg-relative team-area pd-top-115 pd-bottom-90">
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
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-6 col-lg-7 col-md-10">
              <div class="section-title text-center" data-aos="fade-down">
                {/* <h5 class="sub-title double-line">Blog Post</h5> */}
                <h2 class="title">Ayo Donasi!</h2>
                <p class="content">
                  Bersama Kita Berbagi, Sekecil Apapun Berarti!
                </p>
              </div>
            </div>
          </div>
          <div
            className="grid-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {donasi.map((item, index) => (
              <div
                className="card"
                key={index}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "15px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0, 0, 0, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.1)";
                }}
              >
                <img
                  src={
                    item.url_image !== ""
                      ? item.url_image
                      : "https://via.placeholder.com/300x200"
                  }
                  alt="Foto Donasi"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: "20px" }}>
                  <h4
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "#004080",
                      marginBottom: "10px",
                    }}
                  >
                    {item.name}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#555",
                      marginBottom: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
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
                        width: "16px",
                        height: "16px",
                        color: "#004080",
                        marginRight: "5px",
                      }}
                    >
                      <path
                        fill="currentColor"
                        d="M152 64c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V160c0-26.51-21.49-48-48-48h-56V64c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v48H152V64zM32 192h384v272c0 8.82-7.18 16-16 16H48c-8.82 0-16-7.18-16-16V192zm96 100c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40zm96 0c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40zm96 0c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40zm96 0c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40z"
                      />
                    </svg>
                    {formatTanggal(item.created_date)}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#777",
                      lineHeight: "1.5",
                      marginBottom: "15px",
                      marginTop: "1rem",
                    }}
                    className="content-isi"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    />
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#777",
                      fontWeight: "500",
                      marginTop: "1rem",
                    }}
                    className="content-isi"
                  >
                    Total Donasi
                  </p>
                  <h4
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      color: "#004080",
                      marginBottom: "10px",
                    }}
                  >
                    {formatRupiah(item.total_income)}
                  </h4>
                  <a
                    className="read-more-text"
                    href={"/donasiumum/preview/" + item.id}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      color: "#004080",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "#0066cc")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = "#004080")
                    }
                  >
                    <span style={{ marginRight: "8px" }}>Selengkapnya</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pengurus */}
      <div className="team-area pd-top-115 pd-bottom-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section-title text-center" data-aos="fade-down">
                <h2
                  className="title"
                  style={{ fontWeight: "bold", color: "#004080" }}
                >
                  Pengurus Panti
                </h2>
              </div>
            </div>
          </div>
          <div className="row" data-aos="fade-up">
            <div
              className="grid-container"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
                padding: "20px",
              }}
            >
              {listp.map((member, index) => (
                <div
                  className="card"
                  key={index}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    border: "1px solid #ddd",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 12px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <div style={{ padding: "25px", textAlign: "center" }}>
                    <h4
                      style={{
                        fontSize: "1.6rem",
                        fontWeight: "600",
                        color: "#004080",
                        marginBottom: "10px",
                        transition: "color 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = "#007BFF")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.color = "#004080")
                      }
                    >
                      {member.name}
                    </h4>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#666",
                        marginBottom: "5px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      No HP: {member.hp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Berita */}
      <div
        id="berita"
        class="blog-area pd-top-115 pd-bottom-60"
        style={{ background: "#F8FCFB" }}
      >
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-6 col-lg-7 col-md-10">
              <div class="section-title text-center" data-aos="fade-down">
                <h5 class="sub-title double-line">Blog Post</h5>
                <h2 class="title">Informasi Berita Terbaru</h2>
                {/* <p class="content">
                  Dcidunt eget semper nec quam. Sed hendrerit. acfelis Nunc
                  egestas augue atpellentesque laoreet
                </p> */}
              </div>
            </div>
          </div>
          <div
            class="row justify-content-center"
            data-aos="fade-up"
            data-aos-easing="linear"
          >
            {berita.map((data) => (
              <div class="col-lg-4 col-md-6 mb-4">
                <div class="single-blog-inner style-3">
                  <div class="thumb">
                    <img
                      src={
                        data.image == null || data.image == ""
                          ? charity
                          : data.image
                      }
                      alt="img"
                    />
                    <ul class="blog-meta">
                      <li>
                        <i class="far fa-user"></i> {data.author}
                      </li>
                      <li>
                        <i class="far fa-calendar-alt"></i> {data.created_date}
                      </li>
                    </ul>
                  </div>
                  <div class="details shadow">
                    <h4>
                      <a
                        style={{ color: "#0d2f74", textDecoration: "none" }}
                        className="content-preview"
                        href={`/beritapanti/${data.id}`}
                      >
                        {data.judul_berita}
                      </a>
                    </h4>
                    <div
                      class="content-preview"
                      style={{
                        color: "black",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: removeImages(data.isi_berita),
                      }}
                    />
                    <a class="read-more-btn" href={`/beritapanti/${data.id}`}>
                      <i class="fa fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
            {/* <div class="col-lg-4 col-md-6">
              <div class="single-blog-inner style-3">
                <div class="thumb">
                  <img src="assets/img/blog/6.webp" alt="img" />
                  <ul class="blog-meta">
                    <li>
                      <i class="far fa-user"></i> By Admin
                    </li>
                    <li>
                      <i class="far fa-calendar-alt"></i> 25 May 2021
                    </li>
                  </ul>
                </div>
                <div class="details shadow">
                  <h4>
                    <a href="blog-details.html">
                      Market Stock Exchange Foreca 2024-2024
                    </a>
                  </h4>
                  <p>
                    Duis leo. Sed fringilla mauris iamet nibh. odales sagittis
                    magonsequat letendum sodales augue velit
                  </p>
                  <a class="read-more-btn" href="blog-details.html">
                    <i class="fa fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="single-blog-inner style-3">
                <div class="thumb">
                  <img src="assets/img/blog/7.webp" alt="img" />
                  <ul class="blog-meta">
                    <li>
                      <i class="far fa-user"></i> By Admin
                    </li>
                    <li>
                      <i class="far fa-calendar-alt"></i> 25 May 2021
                    </li>
                  </ul>
                </div>
                <div class="details shadow">
                  <h4>
                    <a href="blog-details.html">
                      Foreca Exchange Stock Market 2010-2024
                    </a>
                  </h4>
                  <p>
                    Duis leo. Sed fringilla mauris iamet nibh. odales sagittis
                    magonsequat letendum sodales augue velit
                  </p>
                  <a class="read-more-btn" href="blog-details.html">
                    <i class="fa fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* Galeri */}
      <div
        style={{
          backgroundImage:
            "url('https://solverwp.com/demo/html/itechie/assets/img/bg/10.webp')",
          padding: "50px 0",
        }}
        className="text-center"
      >
        <div className="container">
          <h2 className="text-white">Galeri</h2>
          <p className="text-white">
            Galeri panti asuhan menampilkan momen kebahagiaan, kreativitas, dan
            kegiatan sehari-hari anak-anak, mencerminkan semangat harapan dan
            kebersamaan yang indah.
          </p>

          {/* Pastikan `galery` tidak undefined atau null */}
          {galery && galery.length > 0 ? (
            <div
              className="d-grid"
              style={{
                gridTemplateColumns: "repeat(3, 1fr)", // 3 kolom
                gridGap: "20px",
              }}
            >
              {galery.slice(0, 6).map((item, index) => (
                <div
                  key={index}
                  className="card border-0 shadow"
                  style={{ borderRadius: "15px", overflow: "hidden" }}
                  onClick={() => openModal(item.foto)}
                >
                  <img
                    src={item.foto}
                    alt="galery Item"
                    className="img-fluid"
                    style={{
                      height: "200px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white">Tidak ada gambar tersedia</p>
          )}
        </div>

        {/* Popup Modal */}
        {modalIsOpen && selectedImage && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(0,0,0,0.8)",
                border: "none",
              },
            }}
          >
            <img
              src={selectedImage}
              alt="Full Size"
              className="img-fluid"
              style={{ maxHeight: "80vh", maxWidth: "100%" }}
              onClick={closeModal}
            />
          </Modal>
        )}
      </div>

      {/* Santri */}
      <div id="santri" class="bg-relative team-area pd-top-115 pd-bottom-90">
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
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="section-title text-center" data-aos="fade-down">
                {/* <h5 class="sub-title double-line">Santri Panti</h5> */}
                <h2 class="title">Jumlah Anak Asuh</h2>
                {/* <p class="content">
                  Dcidunt eget semper nec quam. Sed hendrerit. acfelis Nunc
                  egestas augue atpellentesque laoreet
                </p> */}
              </div>
            </div>
          </div>
          <div class="row" data-aos="fade-up">
            <div
              class="col-lg-2 col-md-4 col-sm-6"
              style={{ textAlign: "center" }}
            >
              <div>
                <i class="fas fa-male" style={{ fontSize: "32px" }}></i>
                <Typography
                  variant="h4"
                  style={{ fontWeight: "bold", marginTop: "30px" }}
                >
                  {anakAsuhData?.per_jenis_kelamin?.["laki_laki"] || 0}
                </Typography>
                <h5 style={{ fontWeight: "bold" }}>PRIA</h5>
              </div>
              <hr />
            </div>
            <div
              class="col-lg-2 col-md-4 col-sm-6"
              style={{ textAlign: "center" }}
            >
              <div>
                <i class="fas fa-female" style={{ fontSize: "32px" }}></i>
                <Typography
                  variant="h4"
                  style={{ fontWeight: "bold", marginTop: "30px" }}
                >
                  {anakAsuhData?.per_jenis_kelamin?.["perempuan"] || 0}
                </Typography>
                <h5 style={{ fontWeight: "bold" }}>WANITA</h5>
              </div>
              <hr />
            </div>
            <div
              class="col-lg-2 col-md-4 col-sm-6"
              style={{ textAlign: "center" }}
            >
              <div>
                <i
                  class="fas fa-graduation-cap"
                  style={{ fontSize: "32px" }}
                ></i>
                <Typography
                  variant="h4"
                  style={{ fontWeight: "bold", marginTop: "30px" }}
                >
                  {anakAsuhData?.per_tingkat_pendidikan?.["sd/mi"]?.["total"] ||
                    0}
                </Typography>
                <h5 style={{ fontWeight: "bold" }}>SD</h5>
              </div>
              <hr />
            </div>
            <div
              class="col-lg-2 col-md-4 col-sm-6"
              style={{ textAlign: "center" }}
            >
              <div>
                <i
                  class="fas fa-graduation-cap"
                  style={{ fontSize: "32px" }}
                ></i>
                <Typography
                  variant="h4"
                  style={{ fontWeight: "bold", marginTop: "30px" }}
                >
                  {anakAsuhData?.per_tingkat_pendidikan?.["smp/mts"]?.[
                    "total"
                  ] || 0}
                </Typography>
                <h5 style={{ fontWeight: "bold" }}>SMP</h5>
              </div>
              <hr />
            </div>
            <div
              class="col-lg-2 col-md-4 col-sm-6"
              style={{ textAlign: "center" }}
            >
              <div>
                <i
                  class="fas fa-graduation-cap"
                  style={{ fontSize: "32px" }}
                ></i>
                <Typography
                  variant="h4"
                  style={{ fontWeight: "bold", marginTop: "30px" }}
                >
                  {anakAsuhData?.per_tingkat_pendidikan?.["sma/smk/ma"]?.[
                    "total"
                  ] || 0}
                </Typography>
                <h5 style={{ fontWeight: "bold" }}>SMA</h5>
              </div>
              <hr />
            </div>
            <div
              class="col-lg-2 col-md-4 col-sm-6"
              style={{ textAlign: "center" }}
            >
              <div>
                <i
                  class="fas fa-graduation-cap"
                  style={{ fontSize: "32px" }}
                ></i>
                <Typography
                  variant="h4"
                  style={{ fontWeight: "bold", marginTop: "30px" }}
                >
                  {anakAsuhData?.per_tingkat_pendidikan?.["kuliah"]?.[
                    "total"
                  ] || 0}
                </Typography>
                <h5 style={{ fontWeight: "bold" }}>KULIAH</h5>
              </div>
              <hr />
            </div>
            {/* {siswa.map((data) => (
              <div class="col-lg-3 col-md-6">
                <div class="single-team-inner style-1 text-center">
                  <div class="thumb">
                    <img src={data.picture} alt="img" />
                  </div>
                  <div class="details-wrap">
                    <div class="details-inner">
                      <h4>{data.name}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>

      {/* Fasilitas */}
      <div className="project-area half-bg-top pd-top-115">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-10">
              <div
                data-aos="zoom-in-down"
                className="section-title style-white text-center"
              >
                <h2
                  className="title text-black"
                  style={{ fontWeight: "bold", color: "#004080" }}
                >
                  Fasilitas
                </h2>
                <p
                  className="content text-black"
                  style={{
                    fontSize: "1.1rem",
                    color: "#555",
                    whiteSpace: "nowrap",
                  }}
                >
                  Panti asuhan memiliki fasilitas yang mumpuni untuk mendukung
                  kesejahteraan anak-anak.
                </p>
              </div>
            </div>
          </div>

          <div
            className="grid-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              padding: "10px",
            }}
          >
            {list.length > 0 ? (
              list.map((fasilitas, index) => (
                <div
                  className="card"
                  key={index}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    border: "1px solid #ddd",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 18px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0, 0, 0, 0.15)";
                  }}
                >
                  {/* <img
                    src={
                      fasilitas.image && fasilitas.image.trim() !== ""
                        ? fasilitas.image
                        : "https://via.placeholder.com/300x200"
                    }
                    alt="Fasilitas"
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                      transition: "opacity 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                  /> */}
                  <div style={{ padding: "15px", textAlign: "center" }}>
                    <h5
                      style={{
                        marginBottom: "8px",
                        fontSize: "1.3rem",
                        fontWeight: "600",
                        color: "#004080",
                      }}
                    >
                      {fasilitas.name}
                    </h5>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#666",
                        lineHeight: "1.5",
                      }}
                    >
                      {fasilitas.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#777",
                  fontSize: "1.1rem",
                }}
              >
                Tidak ada data yang tersedia.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img style={{width:"50px"}} src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{width:"50px"}} src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{width:"50px"}} src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{width:"50px"}} src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{width:"50px"}} src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{width:"50px"}} src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{width:"50px"}} src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{width:"50px"}} src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img style={{width:"50px"}} src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
      </Swiper> */}
      {/* <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper> */}

      {/* KEGIATAN */}
      {/* <div
        className="blog-area pd-top-115 pd-bottom-60"
        id="visi-misi"
        style={{
          backgroundColor: "#f9f9f9",
          fontFamily: "'Poppins', sans-serif",
          padding: "40px 20px",
        }}>
        <div
          className="container"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}>
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-10">
              <div className="section-title text-center" data-aos="fade-down">
                <h5
                  className="sub-title double-line"
                  style={{
                    color: "#000000",
                    fontSize: "1.5em",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}>
                  Informasi Kegiatan
                </h5>
              </div>
            </div>
          </div>
          <div
            className="grid-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}>
            <div
              className="card"
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}>
              <img
                src="https://via.placeholder.com/300x200"
                alt="Foto Kegiatan Sosial"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "20px" }}>
                <h4
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#004080",
                    marginBottom: "10px",
                  }}>
                  Kegiatan Sosial
                </h4>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#555",
                    marginBottom: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}>
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
                      width: "16px",
                      height: "16px",
                      color: "#004080",
                      marginRight: "5px",
                    }}>
                    <path
                      fill="currentColor"
                      d="M152 64c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V160c0-26.51-21.49-48-48-48h-56V64c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v48H152V64zM32 192h384v272c0 8.82-7.18 16-16 16H48c-8.82 0-16-7.18-16-16V192zm96 100c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40zm96 0c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40zm96 0c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40zm96 0c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40z"
                    />
                  </svg>
                  18 Desember 2024
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#555",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}>
                  <svg
                    className="svg-inline--fa fa-tags fa-w-18"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="tags"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "#007b5e",
                      marginRight: "5px",
                    }}>
                    <path
                      fill="currentColor"
                      d="M497.941 225.941l-212.49-212.49C276.678 4.678 259.149 0 241.04 0H32C14.326 0 0 14.326 0 32v209.04c0 18.109 4.678 35.638 13.451 50.411l212.49 212.49c37.27 37.27 97.818 37.27 135.088 0l136.912-136.912c37.27-37.27 37.27-97.818 0-135.088zm-80.108-45.94c0-35.346-28.654-64-64-64s-64 28.654-64 64 28.654 64 64 64 64-28.654 64-64zm214.059 45.94l-136.912 136.912c-37.27 37.27-97.818 37.27-135.088 0l-22.66-22.66 169.728-169.728c35.346 0 64-28.654 64-64s-28.654-64-64-64l-169.728 169.728-22.66-22.66c-37.27-37.27-97.818-37.27-135.088 0L50.412 310.451c-9.743-16.269-15.451-35.006-15.451-54.411V32C35.04 14.326 49.366 0 67.04 0h209.04c19.404 0 38.142 5.708 54.411 15.451l212.49 212.49c37.27 37.27 37.27 97.818 0 135.088z"
                    />
                  </svg>
                  Sosial
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#777",
                    lineHeight: "1.5",
                    marginBottom: "15px",
                  }}>
                  Ini adalah deskripsi singkat dari kegiatan sosial. Deskripsi
                  dapat diperpanjang sesuai kebutuhan.
                </p>
                <a
                  className="read-more-text"
                  href="blog-details.html"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    color: "#004080",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#0066cc")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#004080")}>
                  <span style={{ marginRight: "8px" }}>Read More</span>
                </a>
              </div>
            </div>
            <div
              className="card"
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}>
              <img
                src="https://via.placeholder.com/300x200"
                alt="Foto Kegiatan Pendidikan"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "20px" }}>
                <h4
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#004080",
                    marginBottom: "10px",
                  }}>
                  Kegiatan Pendidikan
                </h4>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#555",
                    marginBottom: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}>
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
                      width: "16px",
                      height: "16px",
                      color: "#004080",
                      marginRight: "5px",
                    }}>
                    <path
                      fill="currentColor"
                      d="M152 64c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V160c0-26.51-21.49-48-48-48h-56V64c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v48H152V64zM32 192h384v272c0 8.82-7.18 16-16 16H48c-8.82 0-16-7.18-16-16V192zm96 100c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40zm96 0c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40zm96 0c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40zm96 0c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40z"
                    />
                  </svg>
                  19 Desember 2024
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#555",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                  }}>
                  <svg
                    className="svg-inline--fa fa-tags fa-w-18"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="tags"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    style={{
                      width: "16px",
                      height: "16px",
                      color: "#007b5e",
                      marginRight: "5px",
                    }}>
                    <path
                      fill="currentColor"
                      d="M497.941 225.941l-212.49-212.49C276.678 4.678 259.149 0 241.04 0H32C14.326 0 0 14.326 0 32v209.04c0 18.109 4.678 35.638 13.451 50.411l212.49 212.49c37.27 37.27 97.818 37.27 135.088 0l136.912-136.912c37.27-37.27 37.27-97.818 0-135.088zm-80.108-45.94c0-35.346-28.654-64-64-64s-64 28.654-64 64 28.654 64 64 64 64-28.654 64-64zm214.059 45.94l-136.912 136.912c-37.27 37.27-97.818 37.27-135.088 0l-22.66-22.66 169.728-169.728c35.346 0 64-28.654 64-64s-28.654-64-64-64l-169.728 169.728-22.66-22.66c-37.27-37.27-97.818-37.27-135.088 0L50.412 310.451c-9.743-16.269-15.451-35.006-15.451-54.411V32C35.04 14.326 49.366 0 67.04 0h209.04c19.404 0 38.142 5.708 54.411 15.451l212.49 212.49c37.27 37.27 37.27 97.818 0 135.088z"
                    />
                  </svg>
                  Pendidikan
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#777",
                    lineHeight: "1.5",
                    marginBottom: "15px",
                  }}>
                  Ini adalah deskripsi singkat dari kegiatan pendidikan.
                  Deskripsi dapat diperpanjang sesuai kebutuhan.
                </p>
                <a
                  className="read-more-text"
                  href="blog-details.html"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    color: "#004080",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#0066cc")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#004080")}>
                  <span style={{ marginRight: "8px" }}>Read More</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* BERITA TERBARU */}
      {/* <div style={{ padding: "40px 20px", backgroundColor: "#f9f9f9" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}>
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="news-card"
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}>
              <img
                src={`https://via.placeholder.com/150x100+${item}`}
                alt={`Berita ${item}`}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "10px",
                  }}>
                  Jum'at Berkah Panti Asuhan Muhammadiyah {item}
                </h3>
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
                  Admin &nbsp;|&nbsp;
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
                  Sabtu, 14 Desember 2024
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    lineHeight: "1.5",
                    maxHeight: "60px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginBottom: "15px",
                  }}>
                  Ini adalah isi berita ke-{item} yang dibuat untuk menampilkan
                  informasi terbaru. Anda dapat mengganti teks ini sesuai dengan
                  berita Anda.
                </p>
                <a
                  className="read-more-text"
                  href="blog-details.html"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    color: "#004080",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#0066cc")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#004080")}>
                  <span style={{ marginRight: "8px" }}>Read More</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* PROGRAM */}
      {/* <div class="project-area pd-top-115 pd-bottom-90" id="program">
        <div class="container">
          <div id="prestasiSlider" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="single-project-inner style-two text-center">
                  <div class="thumb">
                    <img
                      src={program1}
                      class="d-block w-100"
                      alt="Prestasi Anak 1"
                    />
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="single-project-inner style-two text-center">
                  <div class="thumb">
                    <img
                      src={program2}
                      class="d-block w-100"
                      alt="Prestasi Anak 2"
                    />
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="single-project-inner style-two text-center">
                  <div class="thumb">
                    <img
                      src={program3}
                      class="d-block w-100"
                      alt="Prestasi Anak 3"
                    />
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="single-project-inner style-two text-center">
                  <div class="thumb">
                    <img
                      src={program4}
                      class="d-block w-100"
                      alt="Prestasi Anak 4"
                    />
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="single-project-inner style-two text-center">
                  <div class="thumb">
                    <img
                      src={program5}
                      class="d-block w-100"
                      alt="Prestasi Anak 5"
                    />
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="single-project-inner style-two text-center">
                  <div class="thumb">
                    <img
                      src={program6}
                      class="d-block w-100"
                      alt="Prestasi Anak 6"
                    />
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="single-project-inner style-two text-center">
                  <div class="thumb">
                    <img
                      src={program7}
                      class="d-block w-100"
                      alt="Prestasi Anak 7"
                    />
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="single-project-inner style-two text-center">
                  <div class="thumb">
                    <img
                      src={program8}
                      class="d-block w-100"
                      alt="Prestasi Anak 8"
                    />
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="single-project-inner style-two text-center">
                  <div class="thumb">
                    <img
                      src={program9}
                      class="d-block w-100"
                      alt="Prestasi Anak 9"
                    />
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="single-project-inner style-two text-center">
                  <div class="thumb">
                    <img
                      src={program10}
                      class="d-block w-100"
                      alt="Prestasi Anak 9"
                    />
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="single-project-inner style-two text-center">
                  <div class="thumb">
                    <img
                      src={program11}
                      class="d-block w-100"
                      alt="Prestasi Anak 9"
                    />
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="single-project-inner style-two text-center">
                  <div class="thumb">
                    <img
                      src={program12}
                      class="d-block w-100"
                      alt="Prestasi Anak 9"
                    />
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="single-project-inner style-two text-center">
                  <div class="thumb">
                    <img
                      src={program13}
                      class="d-block w-100"
                      alt="Prestasi Anak 9"
                    />
                  </div>
                </div>
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#prestasiSlider"
              role="button"
              data-slide="prev">
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#prestasiSlider"
              role="button"
              data-slide="next">
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div> */}

      {/* KONTAK */}
      {/* <div className="contact-section-style" id="kontak">
        <section id="hubungi-kami" className="contact-section-style">
          <div className="section-title style-white text-center">
            <h5
              className="sub-title double-line"
              style={{ color: "black" }}
              data-aos="fade-down">
              Hubungi Kami
            </h5>
          </div>
          <Grid container spacing={3} className="container">
            <Grid item xs={12} md={6} data-aos="fade-right">
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
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.9824873682737!2d110.45976957379189!3d-6.9885941684384205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708cdb5955f7fd%3A0x2dd118c3e56d1f3a!2sPanti%20Asuhan%20Muhammadiyah!5e1!3m2!1sid!2sid!4v1733301705391!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade`}
                style={{ width: "100%", height: "400px", border: "0" }}
                allowFullScreen=""
                loading="lazy"></iframe>
            </Grid>

            <Grid item xs={12} md={6} data-aos="fade-left">
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
                {kontakPanti?.email !== "" ? (
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
                    <span style={{ marginLeft: "8px" }}>
                      {kontakPanti?.email}
                    </span>
                  </Typography>
                ) : (
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
                    <span style={{ color: "gray", marginLeft: "8px" }}>
                      Email Tidak Tersedia
                    </span>
                  </Typography>
                )}

                {kontakPanti?.phone !== "" ? (
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
                    <span style={{ marginLeft: "8px" }}>
                      +62 {kontakPanti?.phone}
                    </span>
                  </Typography>
                ) : (
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
                    <span
                      style={{
                        color: "gray",
                        marginLeft: "8px",
                        textAlign: "left",
                      }}>
                      +628740041119
                    </span>
                  </Typography>
                )}

                {kontakPanti?.fax !== "" ? (
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
                        d="M11 4a1 1 0 0 0-1 1v10h10.459l.522-3H16a1 1 0 1 1 0-2h5.33l.174-1H16a1 1 0 1 1 0-2h5.852l.117-.67v-.003A1.983 1.983 0 0 0 20.06 4H11ZM9 18c0-.35.06-.687.17-1h11.66c.11.313.17.65.17 1v1a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-1Zm-6.991-7a17.8 17.8 0 0 0 .953 6.1c.198.54 1.61.9 2.237.9h1.34c.17 0 .339-.032.495-.095a1.24 1.24 0 0 0 .41-.27c.114-.114.2-.25.254-.396a1.01 1.01 0 0 0 .055-.456l-.242-2.185a1.073 1.073 0 0 0-.395-.71 1.292 1.292 0 0 0-.819-.286H5.291c-.12-.863-.17-1.732-.145-2.602-.024-.87.024-1.74.145-2.602H6.54c.302 0 .594-.102.818-.286a1.07 1.07 0 0 0 .396-.71l.24-2.185a1.01 1.01 0 0 0-.054-.456 1.088 1.088 0 0 0-.254-.397 1.223 1.223 0 0 0-.41-.269A1.328 1.328 0 0 0 6.78 4H4.307c-.3-.001-.592.082-.838.238a1.335 1.335 0 0 0-.531.634A17.127 17.127 0 0 0 2.008 11Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <strong style={{ marginLeft: "8px" }}>:</strong>
                    <span style={{ marginLeft: "8px" }}>
                      {kontakPanti?.fax}
                    </span>
                  </Typography>
                ) : (
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
                        d="M11 4a1 1 0 0 0-1 1v10h10.459l.522-3H16a1 1 0 1 1 0-2h5.33l.174-1H16a1 1 0 1 1 0-2h5.852l.117-.67v-.003A1.983 1.983 0 0 0 20.06 4H11ZM9 18c0-.35.06-.687.17-1h11.66c.11.313.17.65.17 1v1a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1v-1Zm-6.991-7a17.8 17.8 0 0 0 .953 6.1c.198.54 1.61.9 2.237.9h1.34c.17 0 .339-.032.495-.095a1.24 1.24 0 0 0 .41-.27c.114-.114.2-.25.254-.396a1.01 1.01 0 0 0 .055-.456l-.242-2.185a1.073 1.073 0 0 0-.395-.71 1.292 1.292 0 0 0-.819-.286H5.291c-.12-.863-.17-1.732-.145-2.602-.024-.87.024-1.74.145-2.602H6.54c.302 0 .594-.102.818-.286a1.07 1.07 0 0 0 .396-.71l.24-2.185a1.01 1.01 0 0 0-.054-.456 1.088 1.088 0 0 0-.254-.397 1.223 1.223 0 0 0-.41-.269A1.328 1.328 0 0 0 6.78 4H4.307c-.3-.001-.592.082-.838.238a1.335 1.335 0 0 0-.531.634A17.127 17.127 0 0 0 2.008 11Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <strong style={{ marginLeft: "8px" }}>:</strong>
                    <span style={{ color: "gray", marginLeft: "8px" }}>
                      Fax Tidak Tersedia
                    </span>
                  </Typography>
                )}

                {kontakPanti?.alamat !== "" ? (
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{
                      display: "flex",
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                    <svg
                      className="w-8 h-8 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.577-.764 1.072 1.072 0 0 1-.182-.62A8.021 8.021 0 0 1 3.62 10.24 7.976 7.976 0 0 1 1.875 6.804a7.99 7.99 0 0 1 6.137-5.295c.2-.058.399-.106.597-.147a.969.969 0 0 1 .299-.011l.006.002ZM11.07 7.553a.5.5 0 0 1 .37-.683c.31-.085.639-.075.94.026.318.107.623.292.844.55a.5.5 0 0 1 .092.618l-1 2a.5.5 0 0 1-.866-.5l.815-1.627a.482.482 0 0 1 .127-.139ZM8 12a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1ZM7 8.585A.996.996 0 0 1 7.248 8H8v3a1 1 0 0 1-1 1h-.004a.995.995 0 0 1-.992-.891V9.415ZM13 9v4a1 1 0 0 1-1 1v-4a1 1 0 0 1 1-1Zm1-4.243a.5.5 0 0 1 .658-.237c.05.03.099.068.145.107.379.346.723.72 1.01 1.113a1.048 1.048 0 0 1 .16.305A4.477 4.477 0 0 1 14 8v1.58c0 .2-.017.4-.048.597.044.04.087.083.124.129a.5.5 0 0 1-.5.816.51.51 0 0 1-.228-.046A3.5 3.5 0 0 0 14 9.415V9a1 1 0 0 1-1-1v-.585ZM9.17 5.72a.999.999 0 0 1-.17-.176 1.001 1.001 0 0 1 .338-1.374 1.002 1.002 0 0 1 1.351.215l.825 1.2a.5.5 0 0 1 .032.497.51.51 0 0 1-.031.066l-1.05 2.2a.5.5 0 0 1-.745.122l-.18-.17a.502.502 0 0 1-.06-.672.479.479 0 0 1 .113-.135l1.307-1.935a.501.501 0 0 1 .716-.052c.278.278.438.648.438 1.041a.5.5 0 0 1-.315.415l-1.029.684c-.282.189-.432.487-.432.773a.5.5 0 0 1-.387.487.507.507 0 0 1-.452-.06l-.446-.447a1.019 1.019 0 0 1-.126-1.382Zm5.027-.98a.995.995 0 0 1 .87-.26.975.975 0 0 1 .507.164c.123.057.237.133.336.23a2.11 2.11 0 0 1 .368.295.492.492 0 0 1 .062.65l-.37.517a1.025 1.025 0 0 1-.225.171l-1.321.883a.492.492 0 0 1-.7-.228l-.493-.843a.501.501 0 0 1 .12-.694l1.068-.734a1.013 1.013 0 0 1 .647-.212Zm-.014-2.124a.5.5 0 0 1 .48.327.5.5 0 0 1-.106.603l-1.056 1.056a.5.5 0 0 1-.707-.707l.899-.9A.493.493 0 0 1 15.056 2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <strong style={{ marginLeft: "8px" }}>:</strong>
                    <span style={{ marginLeft: "8px", textAlign: "left" }}>
                      {kontakPanti?.alamat}
                    </span>
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    gutterBottom
                    style={{
                      display: "flex",
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                    <svg
                      className="w-8 h-8 text-gray-800 dark:text-white"
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
                    <strong style={{ marginLeft: "8px" }}>:</strong>
                    <span
                      style={{
                        color: "gray",
                        marginLeft: "8px",
                        textAlign: "left",
                      }}>
                      LKSA Panti Asuhan Muhammadiyah Kota Semarang Jl. Giri
                      Mukti Barat II no. 19 Graha Mukti Tlogosari Kulon
                    </span>
                  </Typography>
                )}
              </div>
            </Grid>
          </Grid>
        </section>
      </div> */}
      {/* <div
        className="client-area-area pt-5 pb-5"
        style={{ backgroundColor: "#f0f9f0" }}>
        <div className="container">
          <div className="section-title style-white text-center">
            <h6
              className="title"
              style={{
                color: "#004080",
                fontSize: "1.5rem",
                lineHeight: "1.8",
                fontWeight: "bold",
                padding: "20px",
              }}>
              "Pendidikan adalah jembatan menuju masa depan yang lebih cerah,
              tempat harapan tumbuh, dan setiap anak menemukan kekuatan untuk
              meraih mimpinya."
            </h6>
          </div>
        </div>
      </div> */}
      <Footer />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {judul}
          </Typography>
          <br />
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={foto}
            alt=""
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {deskripsi}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
