import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { API_DUMMY } from "../utils/base_URL";
import "../css/gabung.css";

function NavbarSekolah() {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  const handleScrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };
  return (
    // <!-- navbar start -->
    <>
      <div className="navbar-top style-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 d-lg-inline-block d-none">
              <div className="logo1">
                <a href="/">
                  <img style={{ width: "55px", height: "50px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd1W6Zktkl7wn7ar4kZHzbHhrugJNTkJMKjg&s" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-5 align-self-center">
              <div className="media">
                <div className="media-left">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="media-body">
                  <h6>Telephone</h6>
                  {/* <p>(0276) 320420</p> */}
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
                    <a href="mailto:smpn1_bergas@yahoo.co.id">
                      smpn1_bergas@yahoo.co.id
                    </a>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav
        className={`navbar-area navbar-area-2 navbar-expand-lg ${
          isSticky ? "sticky-active" : ""
        }`}>
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
            <a href="/">
              <img src="https://boyolali.bawaslu.go.id/sites/boyolali/files/bawaslu_logo.png" />
            </a>
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
                <a href="/" style={{paddingLeft:"15px"}}>Home</a>
              </li>
              <li className="menu-item-has-children">
                <a
                  href="#submenu"
                  data-bs-toggle="collapse"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={toggleSubmenu}>
                  Profile Sekolah
                </a>
                <ul
                  className={`${isMobile ? "collapse" : "sub-menu"}`}
                  id="submenu"
                  data-bs-parent="#menu">
                  <li>
                    <a href="/Sambutan">Sambutan Kepala Sekolah</a>
                  </li>
                  <li>
                    <a href="/sejarah">Sejarah</a>
                  </li>
                  <li>
                    <a href="/visi-misi">Visi & Misi</a>
                  </li>
                  <li>
                    <a href="/sarana-prasarana">Sarana Prasarana</a>
                  </li>
                  <li>
                    <a href="">Kelas Layanan</a>
                  </li>
                  <li>
                    <a href="/adiwiyata">Adiwiyata</a>
                  </li>
                  <li>
                    <a href="">Struktur Organisasi</a>
                  </li>
                  <li>
                    <a href="">Staf</a>
                  </li>
                </ul>
              </li>
              {/* <li className="">
                <a href="/berita" style={{paddingLeft:"15px"}}>Berita</a>
              </li>
              <li className="">
                <a href="/library" style={{paddingLeft:"15px"}}>E-Library</a>
              </li>
              <li className="">
                <a href="/pengumuman" style={{paddingLeft:"15px"}}>Pengumuman</a>
              </li> */}
              <li className="menu-item-has-children">
                <a
                  href="#submenu"
                  data-bs-toggle="collapse"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={toggleSubmenu}>
                  Berita
                </a>
                <ul
                  className={`${isMobile ? "collapse" : "sub-menu"}`}
                  id="submenu"
                  data-bs-parent="#menu">
                  <li>
                    <a href="/berita-terbaru">Berita Terbaru</a>
                  </li>
                  <li>
                    <a href="/info-sekolah">Info Sekolah</a>
                  </li>
                  <li>
                    <a href="/agenda">Agenda</a>
                  </li>
                  <li>
                    <a href="/galery">Galery</a>
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
                  Keuangan
                </a>
                <ul
                  className={`${isMobile ? "collapse" : "sub-menu"}`}
                  id="submenu2"
                  data-bs-parent="#menu">
                  <li>
                    <a href="/bos">BOS</a>
                  </li>
                  <li>
                    <a href="/apbd">APBD</a>
                  </li>
                  <li>
                    <a href="/komite">Komite</a>
                  </li>
                </ul>
              </li>
              <li>
                <a onClick={() => handleScrollToSection('pengumuman')} style={{paddingLeft:"15px"}}>Pengumuman</a>
              </li>
              <li>
                <a onClick={() => handleScrollToSection('ekstra-kulikuler')} style={{paddingLeft:"15px"}}>Ekstra Kulikuler</a>
              </li>
              <li>
                <a onClick={() => handleScrollToSection('prestasi')} style={{paddingLeft:"15px"}}>Prestasi</a>
              </li>
              <li>
                <a onClick={() => handleScrollToSection('alumni')} style={{paddingLeft:"15px"}}>Profil Alumni</a>
              </li>
              <li>
                <a onClick={() => handleScrollToSection('hubungi-kami')} style={{paddingLeft:"15px"}}>Kontak</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarSekolah;
