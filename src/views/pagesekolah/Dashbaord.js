import React, { useEffect, useState } from "react";
import Navbar from "../../component/NavbarSekolah";
import Footer from "../../component/Footer";
import SingleCardMenu from "./SingleCardMenu";
import NewsCard from "./card/NewsCard";
import EkstraKulikulerCard from "./card/EkstraKulikulerCard";
import PrestasiCard from './card/PrestasiCard';
import Slider from "react-slick"; // Import Slider from react-slick
import { Link, Typography } from "@mui/material";

const contentStyle = {
  padding: "20px 50px",
  marginTop: "30px",
};

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

const sectionStyle = {
  marginBottom: "40px",
  textAlign: "center",
  padding: "20px 50px",
};

const newsCardsContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
};

const ekstraKulikulerContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
};

const teacherCardStyle = {
  padding: "10px",
  borderRadius: "5px",
  backgroundColor: "#fff",
  textAlign: "center",
};

const buttonStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  fontSize: '16px',
  color: '#fff',
  backgroundColor: '#003366',
  border: 'none',
  borderRadius: '5px',
  textDecoration: 'none',
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: '20px',
};

// Define the settings for the carousel
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function Dashboard() {
  const [scrollY, setScrollY] = useState(0);

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
    height: "600px",
    overflow: "hidden",
  };

  const textOverlayStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "36px",
    fontWeight: "bold",
    textAlign: "center",
  };

  const newsItems = Array(6).fill({
    image: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png",
    title: "Berita Terbaru",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  });

  const darkColors = [
    "#2c3e50",
    "#34495e",
    "#2c2c54",
    "#1e272e",
    "#3d3d3d",
    "#4b4b4b",
    "#2f3640",
    "#3b3b98",
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
      image: 'https://via.placeholder.com/500',
      title: 'Juara 1 Lomba Matematika',
      content: 'Lomba Matematika tingkat Kabupaten',
      date: '12 August 2024',
      participant: 'Budi Santoso',
      description: 'Ini adalah lomba matematika tahunan yang diadakan di tingkat kabupaten dengan peserta dari berbagai sekolah.',
    },
    {
      image: 'https://via.placeholder.com/500',
      title: 'Juara 2 Lomba Fisika',
      content: 'Lomba Fisika tingkat Provinsi',
      date: '15 August 2024',
      participant: 'Sari Dewi',
      description: 'Lomba fisika tingkat provinsi yang diikuti oleh siswa-siswa terbaik dari seluruh provinsi.',
    },
    {
      image: 'https://via.placeholder.com/500',
      title: 'Juara 3 Lomba Biologi',
      content: 'Lomba Biologi tingkat Nasional',
      date: '18 August 2024',
      participant: 'Andi Pratama',
      description: 'Lomba biologi tingkat nasional yang menampilkan berbagai penelitian dan eksperimen dari seluruh Indonesia.',
    },
    {
      image: 'https://via.placeholder.com/500',
      title: 'Juara 1 Lomba Pidato',
      content: 'Lomba Pidato tingkat Sekolah',
      date: '20 August 2024',
      participant: 'Rina Nurul',
      description: 'Lomba pidato di tingkat sekolah yang menilai kemampuan berbicara dan retorika peserta.',
    },
    {
      image: 'https://via.placeholder.com/500',
      title: 'Juara 2 Lomba Catur',
      content: 'Lomba Catur tingkat Daerah',
      date: '25 August 2024',
      participant: 'Hadi Setiawan',
      description: 'Lomba catur tingkat daerah yang mempertemukan pemain-pemain catur terbaik dari berbagai kota.',
    },
  ];

  const teacherItems = [
    { image: 'https://via.placeholder.com/100', name: 'Dr. Asep Hidayat', position: 'Kepala Sekolah' },
    { image: 'https://via.placeholder.com/100', name: 'Ibu Rina Sari', position: 'Wakil Kepala Sekolah' },
    { image: 'https://via.placeholder.com/100', name: 'Bapak Joko Widodo', position: 'Guru Matematika' },
    { image: 'https://via.placeholder.com/100', name: 'Ibu Siti Fatimah', position: 'Guru Bahasa Indonesia' },
    { image: 'https://via.placeholder.com/100', name: 'Bapak Ahmad Fauzi', position: 'Guru IPA' },
    { image: 'https://via.placeholder.com/100', name: 'Ibu Nani Suryani', position: 'Guru Sejarah' },
    { image: 'https://via.placeholder.com/100', name: 'Bapak Rizki Pratama', position: 'Guru PPKn' },
    { image: 'https://via.placeholder.com/100', name: 'Ibu Yulia Arini', position: 'Guru Seni Budaya' },
    { image: 'https://via.placeholder.com/100', name: 'Bapak Heru Santoso', position: 'Guru Olahraga' },
    { image: 'https://via.placeholder.com/100', name: 'Ibu Dian Lestari', position: 'Guru Ekonomi' },
  ];

  return (
    <div>
      <Navbar />
      <div
        style={{ position: "relative", height: "600px", overflow: "hidden" }}
      >
        <img
          src="https://lh5.googleusercontent.com/p/AF1QipPiTYMPukmrWn57NP0O_90hGlAwYH1dxd-Tv39r=w2048-h2048-k-no"
          style={imageStyle}
        />
        <div style={textOverlayStyle}>
          <p style={{ color: "white" }}>SMP Negeri 1 BERGAS</p>
        </div>
      </div>
      <div style={contentStyle}>
        <section id="pengumuman">
          <div style={{ marginBottom: "30px" }}>
            <SingleCardMenu />
          </div>
        </section>
      </div>
      <div style={contentStyles}>
        <section id="berita-terbaru" style={sectionStyles}>
          <Typography
            style={{
              fontWeight: "bold",
              borderBottom: "2px solid #FFCC00",
              display: "inline-block",
              marginBottom: "50px",
              marginTop: "30px",
            }}
            variant="h4"
            gutterBottom
          >
            Berita Terbaru
          </Typography>
          <div style={newsCardsContainerStyle}>
            {newsItems.map((item, index) => (
              <div style={{ width: "100%", maxWidth: "400px" }} key={index}>
                <NewsCard
                  image={item.image}
                  title={item.title}
                  content={item.content}
                  date="12 August 2024"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
        
      <div style={contentStyle}>
        <section id="ekstra-kulikuler" style={sectionStyle}>
          <Typography
            style={{
              fontWeight: "bold",
              borderBottom: "2px solid #FFCC00",
              display: "inline-block",
              marginBottom: "50px",
              marginTop: "30px",
            }}
            variant="h4"
            gutterBottom
          >
            Ekstra Kulikuler
          </Typography>
          <div style={ekstraKulikulerContainerStyle}>
            {ekstraKulikulerItems.map((item, index) => (
              <div key={index}>
                <EkstraKulikulerCard
                  title={item.title}
                  content={item.content}
                  backgroundColor={darkColors[index % darkColors.length]}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div style={contentStyle}>
        <section id="prestasi-terbaru" style={sectionStyle}>
          <Typography
            style={{
              fontWeight: 'bold',
              borderBottom: '2px solid #FFCC00',
              display: 'inline-block',
              marginBottom: '50px',
              marginTop: '30px',
            }}
            variant="h4"
            gutterBottom
          >
            Prestasi Terbaru
          </Typography>
          <div>
            {prestasiItems.map((item, index) => (
              <PrestasiCard
                key={index}
                image={item.image}
                title={item.title}
                content={item.content}
                date={item.date}
                participant={item.participant}
                description={item.description}
              />
            ))}
          </div>
          <Link href="/all-prestasi" style={buttonStyle}>
            Tampilkan Semua Prestasi
          </Link>
        </section>
      </div>

      <div style={contentStyle}>
        <section id="guru-dan-tenaga-kependidikan" style={sectionStyle}>
          <Typography
            style={{
              fontWeight: 'bold',
              borderBottom: '2px solid #FFCC00',
              display: 'inline-block',
              marginBottom: '50px',
              marginTop: '30px',
            }}
            variant="h4"
            gutterBottom
          >
            Guru dan Tenaga Kependidikan
          </Typography>
          <Slider {...sliderSettings}>
            {teacherItems.map((item, index) => (
              <div key={index} style={teacherCardStyle}>
                <img src={item.image} alt={item.name} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                <h4>{item.name}</h4>
                <p>{item.position}</p>
              </div>
            ))}
          </Slider>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
