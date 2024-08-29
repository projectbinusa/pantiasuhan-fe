import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import NavbarSekolah from "../../../../component/NavbarSekolah";
import FooterSekolah from "../../../../component/FooterSekolah";
import "../../../../css/sambutan/sambutan.css";
import NavbarSekolah2 from "../../../../component/NavbarSekolah2";

function SambutanKepala() {
  const [sambutanData, setSambutanData] = useState({
    judul: "",
    isi: "",
    nama: "",
    nip: "",
    foto: ""
  });
  const [loading, setLoading] = useState(true);

  const getAllSambutan = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/sambutan/all?page=0&size=1`);
      const sambutanContent = response.data.data.content[0];
      if (sambutanContent) {
        setSambutanData({
          judul: sambutanContent.judul,
          isi: sambutanContent.isi,
          nama: sambutanContent.nama,
          nip: sambutanContent.nip,
          foto: sambutanContent.foto
        });
      } else {
        setSambutanData({
          judul: "Data tidak tersedia",
          isi: "Tidak ada informasi sambutan yang tersedia.",
          nama: "",
          nip: "",
          foto: ""
        });
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching sambutan data:", error);
      setSambutanData({
        judul: "Terjadi kesalahan",
        isi: "Tidak dapat mengambil data sambutan.",
        nama: "",
        nip: "",
        foto: ""
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSambutan();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavbarSekolah2 />
      <main className="container-berita container">
        <div className="header-berita">
          <ul>
            <li>
              <a href="/">
                <i class="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <i class="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>Sambutan Kepala Sekolah</span>
            </li>
          </ul>
        </div>
        <div className="sambutan-container">
          <div className="parent-sambutan">
            <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333", fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
              {sambutanData.judul}
            </h2>
            {sambutanData.foto ? (
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <img
                  src={sambutanData.foto}
                  alt="Kepala Sekolah"
                  style={{ width: "220px", height: "auto" }}
                />
              </div>
            ) : null}
            <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>
              {sambutanData.isi}
            </p>
            {sambutanData.nama && sambutanData.nip ? (
              <p style={{ textAlign: "right", marginTop: "40px", fontSize: "18px", color: "#333", fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                Kepala Sekolah,<br />
                {sambutanData.nama}<br />
                <span style={{ fontSize: "16px", fontWeight: "normal", color: "#777" }}>NIP: {sambutanData.nip}</span>
              </p>
            ) : null}
          </div>
        </div>
      </main>
      <FooterSekolah />
    </div>
  );
}

export default SambutanKepala;
