import React, { useEffect, useState } from "react";
import "../css/navbarSekolah.css";
import logo from "../aset/pantiasuhan/logo.png";

const NavbarSekolah = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992); // Track screen width for mobile view

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992); // Update mobile state on resize
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize); // Listen for resize events
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbars ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbars-container">
        <a href="/">
          <img
            src={logo}
            alt="Logo"
            className="navbars-logo"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </a>
        {isMobile && (
          <div
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={handleMenuClick}
          >
            {isMenuOpen ? "✖" : "☰"}
          </div>
        )}
        <ul className={`navbars-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="navbars-item">
            <a href="/">HOME</a>
          </li>
          <li className="navbars-item">
            <a href="#visi-misi">VISI-MISI</a>
          </li>
          <li className="navbars-item">
            <a href="#program">PROGRAM</a>
          </li>
          <li className="navbars-item">
            <a href="#kontak">KONTAK</a>
          </li>
          <li className="navbars-item">
            <a href="/form_buku_tamu/35">BUKU TAMU</a>
          </li>
          <li className="navbars-item">
            <a href="/donasi-umum">DONASI</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarSekolah;
