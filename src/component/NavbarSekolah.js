import React, { useEffect, useState } from "react";
import "../css/gabung.css";
import "../css/style.css";

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

  // const handleScrollToSection = (id) => {
  //   document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  // };

  const handleScrollToSection = (id) => {
    const isHomePage = window.location.pathname === '/';
    
    if (isHomePage) {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
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
        className={`navbar-area navbar-area-2 navbar-expand-lg ${isSticky ? "sticky-active" : ""
          }`}>
        <div className="nav-container m-0">
          <div className="responsive-mobile-menu">
            <button
              className={`d-lg-none menu toggle-btn ${menuOpen ? "is-active" : ""
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
              <img style={{ width: "45px", height: "40px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd1W6Zktkl7wn7ar4kZHzbHhrugJNTkJMKjg&s" />
            </a>
          </div>
          <div
            style={{
              width: windowWidth > 992 ? "max-content" : "",
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
                <a href="/" style={{ paddingLeft: "15px" }}>Beranda</a>
              </li>
              <li className="menu-item-has-children">
                <a
                  href="#submenu"
                  data-bs-toggle="collapse"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={toggleSubmenu}>
                  Profil Sekolah
                </a>
                <ul
                  className={`${isMobile ? "collapse" : "sub-menu"}`}
                  id="submenu"
                  data-bs-parent="#menu">
                  <li>
                    <a href="/sambutan">Sambutan Kepala Sekolah</a>
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
                    <a href="/stuktur-organisasi">Struktur Organisasi</a>
                  </li>
                  <li>
                    <a href="/staff">Staff</a>
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
                  Berita
                </a>
                <ul
                  className={`${isMobile ? "collapse" : "sub-menu"}`}
                  id="submenu2"
                  data-bs-parent="#menu2">
                  <li>
                    <a href="/news">Berita Terbaru</a>
                  </li>
                  <li>
                    <a href="/info">Info Sekolah</a>
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
                  href="#submenu3"
                  data-bs-toggle="collapse"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={toggleSubmenu}>
                  Keuangan
                </a>
                <ul
                  className={`${isMobile ? "collapse" : "sub-menu"}`}
                  id="submenu3"
                  data-bs-parent="#menu">
                  <li>
                    <a href="/keuangan-bos">BOS</a>
                  </li>
                  <li>
                    <a href="/keuangan-apbd">APBD</a>
                  </li>
                  <li>
                    <a href="/keuangan-komite">Komite</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a
                  href="#submenu8"
                  data-bs-toggle="collapse"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={toggleSubmenu}>
                  Kesiswaan
                </a>
                <ul
                  className={`${isMobile ? "collapse" : "sub-menu"}`}
                  id="submenu8"
                  data-bs-parent="#menu8">
                  <li>
                    <a href="/osis">OSIS</a>
                  </li>
                  <li>
                    <a onClick={() => handleScrollToSection('ekstra-kulikuler')} style={{cursor: "pointer" }}>Ekstrakurikuler</a>
                  </li>
                </ul>
              </li>
              <li>
                <a onClick={() => handleScrollToSection('prestasi-terbaru')} style={{ paddingLeft: "15px", cursor: "pointer" }}>Prestasi</a>
              </li>
              <li>
                <a onClick={() => handleScrollToSection('hubungi-kami')} style={{ paddingLeft: "15px", cursor: "pointer" }}>Kontak</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarSekolah;
