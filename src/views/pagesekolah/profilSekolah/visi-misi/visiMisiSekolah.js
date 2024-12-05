import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import NavbarSekolah2 from "../../../../component/NavbarSekolah2";
import FooterSekolah from "../../../../component/FooterSekolah";
import Aos from "aos";
import "aos/dist/aos.css";

function VisiMisiSekolah() {
  const [visiMisiData, setVisiMisiData] = useState({
    visi: "",
    misi: "",
    tujuan: "",
  });

  useEffect(() => {
    const fetchVisiMisiData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/smpn1bergas/api/visiMisi/all`
        );
        const data = response.data.data.content[0] || {};
        setVisiMisiData({
          visi: data.visi || "Data tidak tersedia",
          misi: data.misi || "Data tidak tersedia",
          tujuan: data.tujuan || "Data tidak tersedia",
        });
      } catch (error) {
        console.log("Error fetching visi misi data:", error);
      }
    };
    Aos.init({ duration: 1000 });
    fetchVisiMisiData();
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #f8fafc, #e9f5f9)",
        minHeight: "100vh",
        paddingTop: "20px",
      }}
    >
      <NavbarSekolah2 />
      <main className="container-berita container">
        <div
          className="header-berita"
          data-aos="fade-down"
          style={{ marginBottom: "40px" }}
        >
          <ul>
            <li>
              <a href="/">
                <i className="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <i className="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>Visi Misi</span>
            </li>
          </ul>
        </div>

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.8",
          }}
        >
          {/* Visi Section */}
          <div
            data-aos="fade-up"
            style={{
              textAlign: "center",
              padding: "20px",
              marginBottom: "30px",
              background: "#ffffff",
              borderRadius: "15px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "2em",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginBottom: "20px",
                color: "#2c3e50",
              }}
            >
              Visi Panti Asuhan
            </h2>
            <p
              style={{
                fontSize: "1.2em",
                color: "#34495e",
                padding: "0 10px",
              }}
            >
              Mewujudkan cita-cita Muhammadiyah yakni menjunjung tinggi agama
              Islam yang berakidah tauhid, bersumber kepada Al-Qur'an dan
              sunnah Rasulullah SAW sehingga terwujud masyarakat Islam yang
              sebenar-benarnya, melalui pendidikan dan pembinaan anak asuh
              sehingga terwujud generasi yang beriman, berakhlak mulia,
              berilmu, dan mandiri.
            </p>
          </div>

          {/* Misi Section */}
          <div
            data-aos="fade-up"
            style={{
              textAlign: "center",
              padding: "20px",
              background: "#ffffff",
              borderRadius: "15px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "2em",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginBottom: "20px",
                color: "#2c3e50",
              }}
            >
              Misi Panti Asuhan
            </h2>
            <ul
              style={{
                fontSize: "1.2em",
                color: "#34495e",
                textAlign: "left",
                padding: "0 20px",
                listStyleType: "disc",
              }}
            >
              <li>Menyelenggarakan pendidikan agama dan keagamaan bagi anak asuh.</li>
              <li>
                Memberikan pengasuhan dan pembinaan serta membantu tumbuh
                kembang jasmani dan rohani anak asuh secara wajar.
              </li>
              <li>
                Melindungi dan mengembangkan kemampuan anak asuh untuk menjadi
                pribadi tangguh dan memahami jati diri sebagai Muslim.
              </li>
              <li>
                Menyiapkan anak asuh menghadapi masa depan yang gemilang.
              </li>
              <li>
                Menjadikan panti asuhan Muhammadiyah sebagai ajang kaderisasi
                Muhammadiyah.
              </li>
            </ul>
          </div>
        </div>
      </main>
      <FooterSekolah />
    </div>
  );
}

export default VisiMisiSekolah;