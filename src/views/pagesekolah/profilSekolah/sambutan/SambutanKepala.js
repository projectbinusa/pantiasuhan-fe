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
    foto: "",
  });

  const getAllSambutan = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/sambutan/all/terbaru?page=0&size=1`
      );
      const sambutanContent = response.data.data.content[0];
      if (sambutanContent) {
        setSambutanData({
          judul: sambutanContent.judul,
          isi: sambutanContent.isi,
          nama: sambutanContent.nama,
          nip: sambutanContent.nip,
          foto: sambutanContent.foto,
        });
      } else {
        setSambutanData({
          judul: "Data tidak tersedia",
          isi: "Tidak ada informasi sambutan yang tersedia.",
          nama: "",
          nip: "",
          foto: "",
        });
      }
    } catch (error) {
      console.log("Error fetching sambutan data:", error);
      setSambutanData({
        judul: "Terjadi kesalahan",
        isi: "Tidak dapat mengambil data sambutan.",
        nama: "",
        nip: "",
        foto: "",
      });
    }
  };

  useEffect(() => {
    getAllSambutan();
  }, []);

  return (
    <div>
      <NavbarSekolah2 />
      <main className="container-berita container">
        <div className="header-berita">
          <ul>
            <li>
              <a href="/">
                <i className="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <i className="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>
                Sambutan Kepala Sekolah
              </span>
            </li>
          </ul>
        </div>
        <div className="sambutan-container">
          <div className="parent-sambutan">
            <h2 className="sambutan-title">{sambutanData.judul}</h2>
            {sambutanData.foto && (
              <div className="sambutan-image">
                <img
                  src={sambutanData.foto}
                  alt="Kepala Sekolah"
                />
              </div>
            )}
            <p className="sambutan-text">
              {sambutanData.isi}
            </p>
            {sambutanData.nama && sambutanData.nip && (
              <p className="sambutan-footer">
                Kepala Sekolah,
                <br />
                {sambutanData.nama}
                <br />
                <span className="nip-text">
                  NIP: {sambutanData.nip}
                </span>
              </p>
            )}
          </div>
        </div>
      </main>
      <FooterSekolah />
    </div>
  );
}

export default SambutanKepala;
