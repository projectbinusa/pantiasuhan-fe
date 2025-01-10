import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { API_DUMMY, API_DUMMY_PYTHON } from "../utils/base_URL";
import "../css/gabung.css";
import "../css/style.css";
import logo from "../aset/pantiasuhan/logo.png";

function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const getAllKontakPanti = async () => {
    try {
      const response = await axios.get(`${API_DUMMY_PYTHON}/api/public/kontak`,{
        headers: {
          "x-origin": "mccsemarang.com"
        },
      });
      console.log("kontak panti: ", response.data.data);

      // Mengatur state dari data API
      if (response.data.data.length > 0) {
        const data = response.data.data[0];
        setAddress(data.address);
        setPhone(data.phone);
        setEmail(data.email);
      }
    } catch (error) {
      console.error("Error saat mendapatkan kontak panti:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const isMobile = windowWidth < 992;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const [regulasi, setRegulasi] = useState([]);
  // const getRegulasi = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/bawaslu/api/jenis-regulasi/all/terbaru?page=0&size=10&sortBy=id&sortOrder=desc
  //       `
  //     );
  //     setRegulasi(response.data.data);
  //     console.log(response.data.data);
  //   } catch (error) {
  //     console.error("Terjadi Kesalahan", error);
  //   }
  // };
  // const [informasi, setInformasi] = useState([]);
  // const getInformasi = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/bawaslu/api/jenis-informasi/all/terbaru?page=0&size=10&sortBy=id&sortOrder=desc`
  //     );
  //     setInformasi(response.data.data);
  //     console.log(response.data.data);
  //   } catch (error) {
  //     console.error("Terjadi Kesalahan", error);
  //   }
  // };
  useEffect(() => {
    getAllKontakPanti();
  }, []);

  return (
    // <!-- navbar start -->
    <>
      <div className="navbar-top style-2 d-lg-flex d-none">
        <div className="container">
          <div className="row">
            {/* <div class="col-sm-6">
              <ul class="topbar-right text-md-start text-center">
                <li class="d-inline-block d-lg-none">
                  <p>
                    <i class="far fa-clock"></i> Opening Hour 9:00am - 10:00pm
                  </p>
                </li>
                <li>
                  <p>
                    <i class="far fa-envelope"></i>{" "}
                    <a
                      href="/cdn-cgi/l/email-protection"
                      class="__cf_email__"
                      data-cfemail="80e5f8e1edc0e7ede1e9ecaee3efed">
                      [email&#160;protected]
                    </a>
                  </p>
                </li>
              </ul>
            </div> */}
            <div className="col-lg-3">
              <div className="box-logo">
                <a href="/">
                  <img className="logo1" src={logo} />
                </a>
                <p>
                  Pantiasuhan <br /> Muhammadiyah
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-5 align-self-center">
              <div className="media">
                <div className="media-left">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="media-body">
                  <h6>Telephone</h6>
                  <p>{phone}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-5 align-self-center">
              <div className="media">
                <div className="media-left">
                  <i className="far fa-envelope"></i>
                </div>
                <div className="media-body">
                  <h6>Email</h6>
                  <p>
                    <p>
                      {email}
                    </p>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 d-lg-block d-none align-self-center">
              <div className="text-md-end text-center">
                <ul className="social-media">
                  <li>
                    <a
                      className="facebook"
                      href="https://www.facebook.com/Bawaslu.Kabupaten.Boyolali"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="twitter"
                      href="https://twitter.com/i/flow/login?redirect_after_login=%2Fbawasluboyolali"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="instagram"
                      href="https://www.instagram.com/bawaslu_boyolali/"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="youtube"
                      href="https://www.youtube.com/channel/UC-OZT-HT_Qg7cUmo-oHfkAw"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        className={`navbar-area navbar-area-2 navbar-expand-lg ${
          isSticky ? "sticky-active" : ""
        }`}>
        <div
          className="d-inline-block d-lg-none"
          style={{
            background: "#0d2f74",
            fontWeight: "bold",
            color: "white",
            overflow: "hidden",
            position: "relative",
            whiteSpace: "nowrap",
            width:"100%"
          }}>
          <div
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              animation: "marquee 20s linear infinite",
            }}>
            <span style={{ fontSize: "20px" }}>
              "Pendidikan adalah jembatan menuju masa depan yang lebih cerah,
              tempat harapan tumbuh, dan setiap anak menemukan kekuatan untuk
              meraih mimpinya."
            </span>
          </div>
        </div>
        <div className="container nav-container m-0">
          <div className="responsive-mobile-menu">
            <button
              className={`d-lg-none menu toggle-btn ${
                menuOpen ? "is-active" : ""
              }`}
              onClick={toggleMenu}
              data-target="#Iitechie_main_menu"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="icon-left"></span>
              <span className="icon-right"></span>
            </button>
          </div>

          <div className="d-inline-block d-lg-none">
            <div
              className="d-flex"
              style={{
                justifyContent: "center",
                justifyItems: "center",
                gap: "5px",
              }}>
              <a href="/">
                <img style={{ width: "50px" }} src={logo} />
              </a>
              <p style={{ fontSize: "15px", fontWeight: "bold  " }}>
                PantiAsuhan <br /> Muhammadiyah
              </p>
            </div>
          </div>
          <div
            style={{
              width: windowWidth > 800 ? "max-content" : "",
              textAlign: "center",
            }}
            className={`collapse navbar-collapse ${menuOpen ? "sopen" : ""}`}
            id="Iitechie_main_menu text-navbar-rspnv">
            <ul
              className="navbar-reponsive navbar-nav menu-open text-lg-start"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
              }}>
              <li className="">
                <a href="/" style={{ paddingLeft: "15px", textDecoration:"none" }}>
                  Home
                </a>
              </li>
              <li className="">
                <a href="#visi-misi" style={{ paddingLeft: "15px", textDecoration:"none" }}>
                  Visi Misi
                </a>
              </li>
              <li className="">
                <a href="/programpanti" style={{ paddingLeft: "15px", textDecoration:"none" }}>
                  Program
                </a>
              </li>
              <li className="">
                <a href="/beritapanti" style={{ paddingLeft: "15px", textDecoration:"none" }}>
                  Berita
                </a>
              </li>
              {/* <li className="">
                <a href="#santri" style={{ paddingLeft: "15px" }}>
                  Santri
                </a>
              </li> */}
              <li className="">
                <a href="/bukutamu/form/38" style={{ paddingLeft: "15px", textDecoration:"none" }}>
                  Buku Tamu
                </a>
              </li>
              <li className="">
                <a href="/donasiumum" style={{ paddingLeft: "15px", textDecoration:"none" }}>
                  Donasi
                </a>
              </li>
              <li className="">
                <a href="/presensipanti" style={{ paddingLeft: "15px", textDecoration:"none" }}>
                  Presensi
                </a>
              </li>
              <li
                className="d-lg-flex d-none"
                style={{
                  background: "#95D2B3",
                  borderTopLeftRadius: "60px",
                  borderBottomLeftRadius: "60px",
                  fontWeight: "bold",
                  color: "#0d2f74",
                  overflow: "hidden",
                  position: "relative",
                  whiteSpace: "nowrap",
                }}>
                <div
                  style={{
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    animation: "marquee 20s linear infinite",
                  }}>
                  <span>
                    "Pendidikan adalah jembatan menuju masa depan yang lebih
                    cerah, tempat harapan tumbuh, dan setiap anak menemukan
                    kekuatan untuk meraih mimpinya."
                  </span>
                </div>
              </li>
              {/* <li className="menu-item-has-children">
                <a
                  href="#submenu"
                  data-bs-toggle="collapse"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={toggleSubmenu}>
                  Informasi Publik
                </a>
                <ul
                  className={`${isMobile ? "collapse" : "sub-menu"}`}
                  id="submenu"
                  data-bs-parent="#menu">
                  <li>
                    <a href="/informasi-serta-merta">Informasi Serta Merta</a>
                  </li>
                  <li>
                    <a href="/informasi-setiap-saat">Informasi Setiap Saat</a>
                  </li>
                  <li>
                    <a href="/informasi-berkala">Informasi Berkala</a>
                  </li>
                  <li>
                    <a href="/informasi-dikecuali">Informasi DiKecualikan</a>
                  </li>
                  <li>
                    <a href="/informasi-kanal">Kanal Pengawasan Pemilu 2024</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a
                  href="#submenu2"
                  data-bs-toggle="collapse"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={toggleSubmenu}>
                  Daftar Regulasi
                </a>
                <ul
                  className={`${isMobile ? "collapse" : "sub-menu"}`}
                  id="submenu2"
                  data-bs-parent="#menu">
                  <li>
                    <a href="/regulasi-public">Regulasi</a>
                  </li>
                  <li>
                    <a href="/dip-public">DIP</a>
                  </li>
                  <li>
                    <a href="/sop-public">SOP</a>
                  </li>
                  <li>
                    <a href="/maklumat-pelayanan">Maklumat Pelayanan</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a
                  href="#submenu3"
                  data-bs-toggle="collapse"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={toggleSubmenu}>
                  Form Online
                </a>
                <ul
                  className={`${isMobile ? "collapse" : "sub-menu"}`}
                  id="submenu3"
                  data-bs-parent="#menu">
                  <li>
                    <a href="/form-permohonan-informasi">
                      Form Permohonan Informasi
                    </a>
                  </li>
                  <li>
                    <a href="/form-permohonan-keberatan">
                      Form Permohonan Keberatan
                    </a>
                  </li>
                  <li>
                    <a href="/layanan-informasi-berbasis-android">
                      Layanan Informasi Berbasis Adroid
                    </a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a
                  href="#submenu4"
                  data-bs-toggle="collapse"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={toggleSubmenu}>
                  Prosedur
                </a>
                <ul
                  className={`${isMobile ? "collapse" : "sub-menu"}`}
                  id="submenu4"
                  data-bs-parent="#menu">
                  <li>
                    <a href="/prosedur-permintaan-informasi">
                      Prosedur Permintaan Informasi
                    </a>
                  </li>
                  <li>
                    <a href="/prosedur-permohonan-keberatan">
                      Prosedur Permohonan Keberatan
                    </a>
                  </li>
                  <li>
                    <a href="/waktu-layanan">Waktu Layanan</a>
                  </li>
                  <li>
                    <a href="/biaya-pelayanan">Biaya Layanan</a>
                  </li>
                  <li>
                    <a href="/prosedur-permohonan-penyelesaian-sengketa-informasi">
                      Prosedur Permohonan Penyelesaian <br /> Sengketa Informasi
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      {/* <!-- navbar end --> */}
    </>
  );
}

export default Navbar;
