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

  const getAllSambutan = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/sambutan/all?page=0&size=1`);
      const sambutanContent = response.data.data.content[0];
      setSambutanData({
        judul: sambutanContent.judul,
        isi: sambutanContent.isi,
        nama: sambutanContent.nama,
        nip: sambutanContent.nip,
        foto: sambutanContent.foto
      });
    } catch (error) {
      console.log("Error fetching sambutan data:", error);
    }
  };

  useEffect(() => {
    getAllSambutan();
  }, []);

  return (
    <div>
      <NavbarSekolah2 />
      <div className="sambutan-container">
        <div className="parent-sambutan">
          <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333", fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
            {sambutanData.judul}
          </h2>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <img
              src={sambutanData.foto}
              alt="Kepala Sekolah"
              style={{ width: "220px", height: "auto" }}
            />
          </div>
          <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>
            {sambutanData.isi}
          </p>
          <p style={{ textAlign: "right", marginTop: "40px", fontSize: "18px", color: "#333", fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
            Kepala Sekolah,<br />
            {sambutanData.nama}<br />
            <span style={{ fontSize: "16px", fontWeight: "normal", color: "#777" }}>NIP: {sambutanData.nip}</span>
          </p>
        </div>
      </div>
      <FooterSekolah />
    </div>
  );
}

export default SambutanKepala;
