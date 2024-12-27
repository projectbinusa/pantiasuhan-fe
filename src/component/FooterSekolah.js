import "../css/style.css";
import "../css/gabung.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_DUMMY, API_DUMMY_PYTHON } from "../utils/base_URL";
import { Grid, Typography } from "@mui/material";

function FooterSekolah() {
  const [berita, setBerita] = useState([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [fax, setFax] = useState("");
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [isContactAvailable, setIsContactAvailable] = useState(true);

  // const getAllSejarah = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/smpn1bergas/api/sejarah/all/terbaru?page=0&size=1`
  //     );
  //     const content = response.data.data.content[0]?.isi || "";
  //     const truncatedContent =
  //       content.length > 375 ? `${content.substring(0, 375)}...` : content;
  //     setJudul(response.data.data.content[0]?.judul || "Data tidak ditemukan");
  //     setIsi(truncatedContent);
  //   } catch (error) {
  //     console.log("Error fetching sejarah data:", error);
  //   }
  // };

  // useEffect(() => {
  //   getAllSejarah();
  // }, []);

  // const getAllKontak = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/pantiasuhan/api/kontak/all/terbaru?page=0&size=1`
  //     );
  //     const data = response.data.data.content[0] || {};

  //     const isDataAvailable =
  //       data.email || data.phone || data.fax || data.address;

  //     setIsContactAvailable(!!isDataAvailable);
  //     setEmail(data.email || "Email tidak tersedia");
  //     setPhone(data.phone || "Telepon tidak tersedia");
  //     setFax(data.fax || "Fax tidak tersedia");
  //     setAddress(data.address || "Alamat tidak tersedia");
  //   } catch (error) {
  //     console.log("Error fetching contact data:", error);
  //   }
  // };

  // useEffect(() => {
  //   getAllKontak();
  // }, []);

  // const getAllBerita = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/smpn1bergas/api/berita/by-category?category=Berita%20Sekolah&order=asc&page=0&size=4&sort=created_date`
  //     );
  //     setBerita(response.data.data.content);
  //   } catch (error) {
  //     console.log("Error fetching berita data:", error);
  //   }
  // };

  // useEffect(() => {
  //   getAllBerita();
  // }, []);

  const formatDate = (value) => {
    const date = new Date(value);

    const day = date.getDate();
    const monthNames = [
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
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
  };

  // GET VISI MISI PANTI
  const [visiPanti, setVisiPanti] = useState(null);

  const getAllVisiMisiPanti = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY_PYTHON}/api/public/visimisi?page=1&limit=1`, {
        headers: {
          "x-origin": "mccsemarang.com"
        },
      }
      );
      console.log(response.data.data[0]);

      setVisiPanti(response.data.data[0]);
    } catch (error) {
      console.log("get visi misi", error);
    }
  };

  useEffect(() => {
    getAllVisiMisiPanti();
  }, []);

  return (
    <>
      <footer
        className="footer-area bg-cover"
        style={{
          backgroundImage: `url('https://www.solverwp.com/demo/html/itechie/assets/img/bg/2.webp')`,
        }}>
        <div className="footer-menu container">
          <Grid spacing={3} container>
            <Grid item xs={12} md={6}>
              <div className="widget widget_about">
                <h4
                  className="widget-title"
                  style={{ textTransform: "uppercase" }}>
                  Pantinya Sang Juara
                </h4>
                <div className="details">
                  <p style={{ fontSize: "14px", textAlign: "justify" }}>
                    {/* <div
                    dangerouslySetInnerHTML={{
                      __html:
                        "Mewujudkan cita-cita Muhammadiyah yakni menjunjung tinggi agama Islam yang berakidah tauhid, bersumber kepada Al-Qur'an dan sunnah Rasulullah SAW sehingga terwujud masyarakat Islam yang sebenar-benarnya, melalui pendidikan dan pembinaan anak asuh sehingga terwujud generasi yang beriman, berakhlak mulia, berilmu, dan mandiri.",
                    }}
                  /> */}
                    <div
                      dangerouslySetInnerHTML={{ __html: visiPanti?.visi }}
                    />
                  </p>
                  {/* <ul className="social-media d-none d-md-none d-lg-flex gap-2 mb-4">
                  <li>
                    <a
                      className="facebook"
                      href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="instagram"
                      href="https://www.instagram.com/osisspensagas"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="youtube"
                      href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul> */}
                </div>
              </div>
              <div class="widget widget_nav_menu">
                <h4 class="widget-title">Menu</h4>
                <ul className="text-white">
                  <div class="row">
                    <div class="col-lg-3 col-md-6">
                      <li>
                        <a className="text-white" href="/">
                          Home
                        </a>
                      </li>
                      <li>
                        <a className="text-white" href="#visi-misi">
                          Visi Misi{" "}
                        </a>
                      </li>
                      <li>
                        <a className="text-white" href="#program">
                          Program
                        </a>
                      </li>
                      <li>
                        <a className="text-white" href="#berita">
                          Berita
                        </a>
                      </li>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <li>
                        <a className="text-white" href="#santri">
                          Santri
                        </a>
                      </li>
                      <li>
                        <a className="text-white" href="/bukutamu/form/35">
                          Buku Tamu
                        </a>
                      </li>
                      <li>
                        <a className="text-white" href="/donasiumum">
                          Donasi
                        </a>
                      </li>
                    </div>
                  </div>
                </ul>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h5"
                gutterBottom
                style={{
                  color: "white",
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
          </Grid>
          {/* <div style={{ width: "100%" }}>
            <div className="widget widget_subscribe">
              <h4
                className="widget-title"
                style={{ textTransform: "uppercase" }}>
                Alamat
              </h4>
              <div className="details" style={{ fontSize: "14px" }}>
                {isContactAvailable ? (
                  <>
                    <p style={{ color: "white", textAlign: "left" }}>
                      {address}
                    </p>
                    <p style={{ color: "white", textAlign: "left" }}>
                      Telepon (+628740041119 ) {phone}
                    </p>
                    <p style={{ color: "white", textAlign: "left" }}>
                      E-mail {email}
                    </p>
                    <p style={{ color: "white", textAlign: "left" }}>{fax}</p>
                  </>
                ) : (
                  <p style={{ color: "white", textAlign: "left" }}>
                    LKSA Panti Asuhan Muhammadiyah Kota Semarang Jl. Giri Mukti
                    Barat II no. 19 Graha Mukti Tlogosari Kulon
                  </p>
                )}
              </div>
            </div>
          </div> */}
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 align-self-center footer-media">
                <ul
                  className="social-media d-lg-none d-md-flex gap-2 mb-3"
                  style={{ alignItems: "center", justifyContent: "center" }}>
                  <li>
                    <a
                      className="facebook"
                      href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="instagram"
                      href="https://www.instagram.com/osisspensagas"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="youtube"
                      href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
                <p>© 2024. Panti Asuhan.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterSekolah;
