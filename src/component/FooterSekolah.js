import "../css/style.css";
import "../css/gabung.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_DUMMY } from "../utils/base_URL";

function FooterSekolah() {
  const [berita, setBerita] = useState([]);
  const [totalPages, setTotalPage] = useState(1);

  const getAllBerita = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/berita/by-category?category=Berita%20Sekolah&order=asc&page=0&size=4&sort=created_date`);
      setBerita(response.data.data.content);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllBerita();
  }, []);

  const formatDate = (value) => {
    const date = new Date(value);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
  };

  return (
    <>
      <footer
        className="footer-area bg-cover"
        style={{
          backgroundImage: `url('https://www.solverwp.com/demo/html/itechie/assets/img/bg/2.webp')`,
        }}
      >
        <div className="footer-menu container">
          <div style={{ width: "100%" }}>
            <div className="widget widget_about">
              <h4 className="widget-title" style={{textTransform: "uppercase"}}>SMP Negeri 1 Bergas</h4>
              <div className="details">
                <p style={{fontSize: "14px"}}>
                  SMP Negeri 1 Bergas didirikan pada tahun 1985 di Kabupaten
                  Semarang, Jawa Tengah. Sejak awal berdirinya, sekolah ini
                  memiliki tujuan mulia untuk menyediakan pendidikan
                  berkualitas bagi masyarakat setempat. Dengan komitmen yang
                  kuat terhadap keunggulan akademik dan pengembangan karakter
                  siswa, SMP Negeri 1 Bergas telah menjadi salah satu sekolah
                  menengah pertama terkemuka di wilayahnya.
                </p>
                <ul className="social-media d-none d-md-none d-lg-flex gap-2 mb-4">
                  <li>
                    <a
                      className="facebook"
                      href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="instagram"
                      href="https://www.instagram.com/osisspensagas"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="youtube"
                      href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div className="widget widget_subscribe">
              <h4 className="widget-title" style={{textTransform: "uppercase"}}>Alamat</h4>
              <div className="details" style={{fontSize: "14px"}}>
                <p style={{ color: "white" }}>
                  Jl. Krakatau, Gembongan, Karangjati, Kec. Bergas, Kabupaten
                  Semarang, Jawa Tengah 50552
                </p>
                <p style={{ color: "white" }}>Telpon (+62) </p>
                <p style={{ color: "white" }}>
                  E-mail smpn1_bergas@yahoo.co.id
                </p>
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div className="widget widget_news">
              <h4 className="widget-title" style={{textTransform:"uppercase"}}>Berita Terbaru</h4>
              <div className="details card-container">
                {berita.length > 0 ? (
                  berita.map(news => (
                    <div className="card" key={news.id}>
                      <div className="card-body">
                        <a href={`/detail-news-${news.id}`} className="card-title">{news.judulBerita}</a>
                        <p className="card-date">{formatDate(news.createdDate)}</p>
                        <p className="card-content" style={{fontSize: "14px"}}>{news.isiBerita}</p>
                      </div>
                    </div>
                  ))
                ) : (<></>)}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 align-self-center footer-media">
                <ul
                  className="social-media d-lg-none d-md-flex gap-2 mb-3"
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <li>
                    <a
                      className="facebook"
                      href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="instagram"
                      href="https://www.instagram.com/osisspensagas"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="youtube"
                      href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
                <p>© 2024. SMP Negeri 1 Bergas.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterSekolah;
