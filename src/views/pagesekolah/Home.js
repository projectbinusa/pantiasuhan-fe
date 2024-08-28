import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../component/NavbarSekolah";
import Footer from "../../component/FooterSekolah";
import SingleCardMenu from "./profilSekolah/sambutan/SingleCardMenu";
import NewsCard from "./card/NewsCard";
import EkstraKulikulerCard from "./card/EkstraKulikulerCard";
import PrestasiCard from "./card/PrestasiCard";
import AlumniCard from "./card/AlumniCard";
import Slider from "react-slick";
import { Link, Typography, TextField, Button, Grid } from "@mui/material";
import "../../css/prestasi/card.css";
import AOS from "aos";
import axios from "axios";
import { API_DUMMY } from "../../utils/base_URL";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Captcha from "./Captcha";
import NavbarSekolah from "../../component/NavbarSekolah";

const contentStyles = {
  marginTop: "10px",
};

const sectionStyles = {
  marginBottom: "40px",
  textAlign: "center",
  backgroundColor: "#003366",
  color: "white",
  padding: "20px 50px",
};

const sectionStyless = {
  marginBottom: "40px",
  textAlign: "center",
  backgroundColor: "#003366",
  color: "white",
  padding: "50px 50px 100px 50px",
};

const teacherCardStyle = {
  borderRadius: "10px",
  textAlign: "center",
  width: "250px",
  height: "350px",
};

const teacherImageStyle = {
  borderRadius: "10px",
  objectFit: "cover",
  width: "100%",
  maxWidth: "250px",
  height: "300px",
};

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  draggable: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const PreviousArrow = ({ onClick }) => (
  <div
    style={{
      cursor: "pointer",
      position: "absolute",
      top: "50%",
      left: "-30px",
      transform: "translateY(-50%)",
      zIndex: 1,
    }}
    onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#FFFFFF"
      width="30"
      height="30"
      viewBox="0 0 24 24">
      <path d="M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6z" />
    </svg>
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    style={{
      cursor: "pointer",
      position: "absolute",
      top: "50%",
      right: "-30px",
      transform: "translateY(-50%)",
      zIndex: 1,
    }}
    onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#FFFFFF"
      width="30"
      height="30"
      viewBox="0 0 24 24">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
    </svg>
  </div>
);

const sliderSettingsAlumni = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PreviousArrow />,
  arrows: true,
  draggable: true,
  responsive: [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

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

  const buttonStyle = {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "16px",
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

  const buttonStylesss = {
    display: "inline-block",
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

  const buttonStyles = {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "16px",
    color: isHovereds ? "#fff" : "#FFCC00",
    backgroundColor: isHovereds ? "#FFCC00" : "#003366",
    border: isHovereds ? "2px solid #003366" : "2px solid #FFCC00",
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

  const mapStyle = {
    width: "100%",
    height: "500px",
    border: "none",
  };

  const contactInfoStyle = {
    textAlign: "left",
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

  const newsItems = [
    {
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
      id: "1",
      title: "Berita 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
      id: "2",
      title: "Berita 2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
      id: "3",
      title: "Berita 3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
      id: "4",
      title: "Berita 4",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
      id: "5",
      title: "Berita 5",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
      id: "6",
      title: "Berita 6",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. por incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const lightColors = [
    "#f39c12", // Bright Orange
    "#f1c40f", // Yellow
    "#e74c3c", // Bright Red
    "#e67e22", // Bright Orange
    "#9b59b6", // Light Purple
    "#1abc9c", // Light Turquoise
    "#2ecc71", // Light Green
    "#3498db", // Light Blue
    "#ecf0f1", // Light Gray
    "#e84393", // Bright Pink
    "#fdcb6e", // Soft Yellow
    "#74b9ff", // Soft Blue
    "#a29bfe", // Soft Purple
    "#81ecec", // Soft Cyan
  ];

  const alumniItems = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOndEexr8NTOP7h4YEYfBDz5qDfI92M8IQhw&s",
      title: "Alumni 1",
      description:
        "Description for Alumni 1. Description for Alumni 1Description for Alumni 1Description for Alumni 1Description for Alumni 1Description for Alumni 1Description for Alumni 1Description for Alumni 1Description for Alumni 1Description for Alumni 1Description for Alumni 1Description for Alumni 1Description for Alumni 1Description for Alumni 1Description for Alumni 1Description for Alumni 1Description for Alumni 1Description for Alumni 1",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOndEexr8NTOP7h4YEYfBDz5qDfI92M8IQhw&s",
      title: "Alumni 2",
      description: "Description for Alumni 2",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOndEexr8NTOP7h4YEYfBDz5qDfI92M8IQhw&s",
      title: "Alumni 3",
      description: "Description for Alumni 3",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOndEexr8NTOP7h4YEYfBDz5qDfI92M8IQhw&s",
      title: "Alumni 4",
      description: "Description for Alumni 4",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOndEexr8NTOP7h4YEYfBDz5qDfI92M8IQhw&s",
      title: "Alumni 5",
      description: "Description for Alumni 5",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOndEexr8NTOP7h4YEYfBDz5qDfI92M8IQhw&s",
      title: "Alumni 6",
      description: "Description for Alumni 6",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOndEexr8NTOP7h4YEYfBDz5qDfI92M8IQhw&s",
      title: "Alumni 7",
      description: "Description for Alumni 7",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOndEexr8NTOP7h4YEYfBDz5qDfI92M8IQhw&s",
      title: "Alumni 8",
      description: "Description for Alumni 8",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOndEexr8NTOP7h4YEYfBDz5qDfI92M8IQhw&s",
      title: "Alumni 9",
      description: "Description for Alumni 9",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOndEexr8NTOP7h4YEYfBDz5qDfI92M8IQhw&s",
      title: "Alumni 10",
      description: "Description for Alumni 10",
    },
  ];

  const ekstraKulikulerItems = [
    {
      title: "Basket",
      content: "Latihan setiap Selasa dan Kamis, 15:00 - 17:00.",
    },
    {
      title: "Paskibra",
      content: "Latihan setiap Senin dan Rabu, 15:00 - 17:00.",
    },
    { title: "Pramuka", content: "Latihan setiap Sabtu, 08:00 - 12:00." },
    { title: "Pencak Silat", content: "Latihan setiap Jumat, 16:00 - 18:00." },
    { title: "Karate", content: "Latihan setiap Minggu, 09:00 - 11:00." },
    {
      title: "Musik",
      content: "Latihan setiap Rabu dan Jumat, 14:00 - 16:00.",
    },
    { title: "Tari", content: "Latihan setiap Kamis, 13:00 - 15:00." },
    { title: "Teater", content: "Latihan setiap Selasa, 14:00 - 16:00." },
  ];

  const prestasiItems = [
    {
      id: 1,
      image: "https://via.placeholder.com/500",
      title: "Juara 1 Lomba Matematika",
      content: "Lomba Matematika tingkat Kabupaten",
      date: "12 August 2024",
      participant: "Budi Santoso",
      description:
        "Ini adalah lomba matematika tahunan yang diadakan di tingkat kabupaten dengan peserta dari berbagai sekolah.",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/500",
      title: "Juara 2 Lomba Fisika",
      content: "Lomba Fisika tingkat Provinsi",
      date: "15 August 2024",
      participant: "Sari Dewi",
      description:
        "Lomba fisika tingkat provinsi yang diikuti oleh siswa-siswa terbaik dari seluruh provinsi.",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/500",
      title: "Juara 3 Lomba Biologi",
      content: "Lomba Biologi tingkat Nasional",
      date: "18 August 2024",
      participant: "Andi Pratama",
      description:
        "Lomba biologi tingkat nasional yang menampilkan berbagai penelitian dan eksperimen dari seluruh Indonesia.",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/500",
      title: "Juara 1 Lomba Pidato",
      content: "Lomba Pidato tingkat Sekolah",
      date: "20 August 2024",
      participant: "Rina Nurul",
      description:
        "Lomba pidato di tingkat sekolah yang menilai kemampuan berbicara dan retorika peserta.",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/500",
      title: "Juara 2 Lomba Catur",
      content: "Lomba Catur tingkat Daerah",
      date: "25 August 2024",
      participant: "Hadi Setiawan",
      description:
        "Lomba catur tingkat daerah yang mempertemukan pemain-pemain catur terbaik dari berbagai kota.",
    },
  ];

  const teacherItems = [
    {
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
      name: "Dr. Asep Hidayat",
      position: "Kepala Sekolah",
    },
    {
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
      name: "Ibu Rina Sari",
      position: "Wakil Kepala Sekolah",
    },
    {
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
      name: "Bapak Joko Widodo",
      position: "Guru Matematika",
    },
    {
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
      name: "Ibu Siti Fatimah",
      position: "Guru Bahasa Indonesia",
    },
    // {
    //   image:
    //     "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
    //   name: "Bapak Ahmad Fauzi",
    //   position: "Guru IPA",
    // },
    // {
    //   image:
    //     "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
    //   name: "Ibu Nani Suryani",
    //   position: "Guru Sejarah",
    // },
    // {
    //   image:
    //     "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
    //   name: "Bapak Rizki Pratama",
    //   position: "Guru PPKn",
    // },
    // {
    //   image:
    //     "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
    //   name: "Ibu Yulia Arini",
    //   position: "Guru Seni Budaya",
    // },
    // {
    //   image:
    //     "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
    //   name: "Bapak Dedi Kurniawan",
    //   position: "Guru Olahraga",
    // },
    // {
    //   image:
    //     "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
    //   name: "Ibu Mira Sari",
    //   position: "Guru Bahasa Inggris",
    // },
  ];

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
        `${API_DUMMY}/smpn1bergas/api/ekstrakulikuler/all?direction=asc&page=0&size=8&sort=createdDate`
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
        `${API_DUMMY}/smpn1bergas/api/guru/all?page=0&size=20`
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
        `${API_DUMMY}/smpn1bergas/api/alumni/all/terbaru?page=0&size=20`
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
        `${API_DUMMY}/smpn1bergas/api/kontak/all?page=0&size=1`
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
      pesan: pesan,
      nama: namaPengirim,
      telp: telp,
    };
    // const formData = new FormData();
    // formData.append("email", email1);
    // formData.append("nama", namaPengirim);
    // formData.append("pesan", pesan);
    // formData.append("telp", telp);

    try {
      await axios.post(
        `${API_DUMMY}/smpn1bergas/api/kotak_saran/add?email=${email1}&nama=${namaPengirim}&pesan=${pesan}&telp=${telp}`
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // }
      );
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

  return (
    <div>
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

      {/* PENGUMUMAN */}
      <div className="mt-5 container">
        <section id="pengumuman">
          <div style={{ marginBottom: "30px" }}>
            <SingleCardMenu />
          </div>
        </section>
      </div>

      {/* BERITA */}
      <div style={contentStyles} >
        <section id="berita-terbaru" style={sectionStyles} data-aos="fade-up">
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
            Berita Terbaru
          </Typography>
          <div className="container">
            <div className="berita-card">
              {berita.length > 0 ? (
                berita.map((news, idx) => (
                  <div className="berita-card" key={idx}>
                    <NewsCard
                      image={news.image}
                      id={news.id}
                      title={news.judulBerita}
                      content={news.isiBerita}
                      date={news.updatedDate}
                    />
                  </div>
                ))
              ) : (
                <></>
              )}
              {/* {newsItems.map(item => (
                <div key={item.id}>
                  <NewsCard
                    image={item.image}
                    id={item.id}
                    title={item.title}
                    content={item.content}
                    date="12 August 2024"
                  />
                </div>
              ))} */}
            </div>
          </div>
          <Link
            href="/news"
            style={buttonStyles}
            onMouseEnter={() => setIsHovereds(true)}
            onMouseLeave={() => setIsHovereds(false)}>
            Tampilkan Semua Berita
          </Link>
        </section>
      </div>

      {/* EKSTRAKULIKULER */}
      <div className="content-style">
        <section id="ekstra-kulikuler" className="section-style">
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
            Ekstrakurikuler
          </Typography>
          <div className="ekstrakurikuler-container-style container">
            {ekstrakurikuler.length > 0 ? (
              ekstrakurikuler.map((ekskul, idx) => (
                <div key={idx}>
                  <EkstraKulikulerCard
                    title={ekskul.name}
                    id={ekskul.id}
                    backgroundColor={lightColors[idx % lightColors.length]}
                  />
                </div>
              ))
            ) : (
              <></>
            )}
            {/* {ekstraKulikulerItems.map((item, index) => (
              <div key={index}>
                <EkstraKulikulerCard
                  title={item.title}
                  backgroundColor={lightColors[index % lightColors.length]}
                />
              </div>
            ))} */}
          </div>
          <Link
            href="/ekstrakurikuler"
            style={buttonStylesss}
            onMouseEnter={() => setIsHoveredss(true)}
            onMouseLeave={() => setIsHoveredss(false)}>
            Tampilkan Semua Ekstrakurikuler
          </Link>
        </section>
      </div>

      {/* PRESTASI */}
      <div className="content-style">
        <section id="prestasi-terbaru" className="section-style">
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
            Prestasi Terbaru
          </Typography>
          <div className="container">
            {prestasi.length > 0 ? (
              prestasi.map((row, idx) => (
                <PrestasiCard
                  key={idx}
                  id={row.id}
                  image={row.foto}
                  title={row.judul}
                  content={row.skala}
                  date={row.creadtedDate}
                  participant={row.nama_peserta}
                  description={row.penyelenggara}
                />
              ))
            ) : (
              <></>
            )}
            {/* {prestasiItems.map((item, index) => (
              <PrestasiCard
                key={index}
                id={item.id}
                image={item.image}
                title={item.title}
                content={item.content}
                date={item.date}
                participant={item.participant}
                description={item.description}
              />
            ))} */}
          </div>
          <Link
            href="/all-prestasi"
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            Tampilkan Semua Prestasi
          </Link>
        </section>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100px",
          backgroundColor: "#003366",
        }}>
        <h3 style={{ color: "white", textAlign:"center" }} className="container">
          Pendidikan: Kunci Menuju Dunia Kemungkinan
        </h3>
      </div>

      {/* GURU */}
      <div className="content-style">
        <section id="guru-dan-tenaga-kependidikan" className="section-style">
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
            Guru dan Tenaga Kependidikan
          </Typography>
          <div style={{ position: "relative" }}>
            <Slider ref={sliderRef} {...sliderSettings}>
              {gurus.length > 4 ? (
                gurus.map((guru, idx) => (
                  <div key={idx} style={teacherCardStyle}>
                    <div
                      style={{
                        width: "100%",
                        height: "300px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      <img
                        src={guru.foto}
                        alt={guru.nama_guru}
                        style={teacherImageStyle}
                      />
                    </div>
                    <Typography
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                      variant="h6">{guru.nama_guru}</Typography>
                    <Typography
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                      variant="body2">{guru.mapel}</Typography>
                  </div>
                ))
              ) : (
                <></>
              )}
              {/* {teacherItems.map((teacher, index) => (
                <div key={index} style={teacherCardStyle}>
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      style={teacherImageStyle}
                    />
                  </div>
                  <Typography style={{ fontFamily: "'Poppins', sans-serif" }} variant="h6">{teacher.name}</Typography>
                  <Typography style={{ fontFamily: "'Poppins', sans-serif" }} variant="body2">{teacher.position}</Typography>
                </div>
              ))} */}
            </Slider>
            <div
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}>
              <button
                onClick={() => sliderRef.current.slickPrev()}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#003366"
                  viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <button
                onClick={() => sliderRef.current.slickNext()}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#003366"
                  viewBox="0 0 24 24">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ALUMNI */}
      <div style={contentStyles}>
        <section id="alumni" style={sectionStyless}>
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
            Profil Alumni
          </Typography>
          <div style={{ position: "relative" }} className="container">
            <Slider {...sliderSettingsAlumni}>
              {alumnus.length > 0 ? (
                alumnus.map((alumni, idx) => (
                  <div key={idx} style={{ padding: "0 10px" }}>
                    <AlumniCard
                      image={alumni.foto}
                      title={alumni.nama}
                      description={alumni.biografi}
                    />
                  </div>
                ))
              ) : (
                <></>
              )}
              {/* {alumniItems.map((item, index) => (
                <div key={index} style={{ padding: "0 10px" }}>
                  <AlumniCard
                    image={item.image}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ))} */}
            </Slider>
          </div>
        </section>
      </div>

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
      <Footer />
    </div>
  );
}

export default Home;
