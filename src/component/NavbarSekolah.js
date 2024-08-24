import React, { useEffect, useState } from "react";
import "../css/navbarSekolah.css";
import logo from "../aset/smpn1bergas/logo.png";

// function NavbarSekolah() {
//   const [activeMenu, setActiveMenu] = useState("");

//   const handleScrollToSection = (id) => {
//     const isHomePage = window.location.pathname === "/";

//     if (isHomePage) {
//       document.getElementById(id).scrollIntoView({ behavior: "smooth" });
//     } else {
//       window.location.href = `/#${id}`;
//     }
//   };

//   const handleMenuClick = (event, menu) => {
//     event.preventDefault();
//     setActiveMenu(menu);

//     const submenu = event.target.nextElementSibling;

//     document.querySelectorAll(".submenu").forEach((item) => {
//       if (item !== submenu) item.style.display = "none";
//     });

//     if (submenu.style.display === "block") {
//       submenu.style.display = "none";
//     } else {
//       submenu.style.display = "block";
//     }
//   };

//   return (
//     <nav className="navbars">
//       <ul
//         className="navbars-menu"
//         style={{
//           textTransform: "uppercase",
//           fontWeight: "500",
//           fontFamily: "'Poppins', sans-serif",
//         }}>
//         <img src={logo} alt="Logo" className="navbars-logo" />
//         <li
//           className={`navbars-item ${
//             activeMenu === "profil-sekolah" ? "active" : ""
//           }`}>
//           <a
//             href="#profil-sekolah"
//             className="has-submenu"
//             onClick={(e) => handleMenuClick(e, "profil-sekolah")}>
//             Profil Sekolah
//           </a>
//           <ul className="submenu">
//             <li>
//               <a href="/sambutan">SAMBUTAN KEPALA SEKOLAH</a>
//             </li>
//             <li>
//               <a href="/sejarah">SEJARAH</a>
//             </li>
//             <li>
//               <a href="/visi-misi">VISI & MISI</a>
//             </li>
//             <li>
//               <a href="/sarana-prasarana">SARANA PRASARANA</a>
//             </li>
//             <li>
//               <a href="/struktur-organisasi">STRUKTUR ORGANISASI</a>
//             </li>
//             <li>
//               <a href="/kondisi-sekolah-view">KONDISI SEKOLAH</a>
//             </li>
//             <li>
//               <a href="/staff">STAFF</a>
//             </li>
//           </ul>
//         </li>
//         <li
//           className={`navbars-item ${activeMenu === "berita" ? "active" : ""}`}>
//           <a
//             href="#berita"
//             className="has-submenu"
//             onClick={(e) => handleMenuClick(e, "berita")}>
//             Berita
//           </a>
//           <ul className="submenu">
//             <li>
//               <a href="/news">BERITA TERBARU</a>
//             </li>
//             <li>
//               <a href="/info">INFO SEKOLAH</a>
//             </li>
//             <li>
//               <a href="/agenda">AGENDA</a>
//             </li>
//             <li>
//               <a href="/galery">GALERI</a>
//             </li>
//           </ul>
//         </li>
//         <li
//           className={`navbars-item ${
//             activeMenu === "keuangan" ? "active" : ""
//           }`}>
//           <a
//             href="#keuangan"
//             className="has-submenu"
//             onClick={(e) => handleMenuClick(e, "keuangan")}>
//             KEUANGAN
//           </a>
//           <ul className="submenu">
//             <li>
//               <a href="/keuangan-bos">BOS</a>
//             </li>
//             <li>
//               <a href="/keuangan-apbd">APBD</a>
//             </li>
//             <li>
//               <a href="/keuangan-komite">KOMITE</a>
//             </li>
//           </ul>
//         </li>
//         <li
//           className={`navbars-item ${
//             activeMenu === "kesiswaan" ? "active" : ""
//           }`}>
//           <a
//             href="#kesiswaan"
//             className="has-submenu"
//             onClick={(e) => handleMenuClick(e, "kesiswaan")}>
//             KESISWAAN
//           </a>
//           <ul className="submenu">
//             <li>
//               <a href="/osis">OSIS</a>
//             </li>
//             <li>
//               <button
//                 onClick={() => handleScrollToSection("ekstra-kulikuler")}
//                 className="navbars-buttons">
//                 EKSRAKURIKULER
//               </button>
//             </li>
//           </ul>
//         </li>
//         <li
//           className="navbars-item"
//           style={{
//             textTransform: "uppercase",
//             fontWeight: "500",
//             fontFamily: "'Poppins', sans-serif",
//           }}>
//           <a href="/perpustakaan">PERPUSTAKAAN</a>
//         </li>
//         <li className="navbars-item">
//           <button
//             onClick={() => handleScrollToSection("prestasi-terbaru")}
//             className="navbars-buttons"
//             style={{
//               textTransform: "uppercase",
//               fontFamily: "'Poppins', sans-serif",
//             }}>
//             PRESTASI
//           </button>
//         </li>
//         <li className="navbars-item">
//           <button
//             onClick={() => handleScrollToSection("hubungi-kami")}
//             className="navbars-buttons"
//             style={{
//               textTransform: "uppercase",
//               fontFamily: "'Poppins', sans-serif",
//             }}>
//             KONTAK
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// }


// const NavbarSekolah = () => {
//   const [activeMenu, setActiveMenu] = useState("");
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleScrollToSection = (id) => {
//     const isHomePage = window.location.pathname === "/";

//     if (isHomePage) {
//       document.getElementById(id).scrollIntoView({ behavior: "smooth" });
//     } else {
//       window.location.href = `/#${id}`;
//     }
//   };

//   const handleMenuClick = (event, menu) => {
//     event.preventDefault();
//     setActiveMenu(menu);

//     const submenu = event.target.nextElementSibling;

//     document.querySelectorAll(".submenu").forEach((item) => {
//       if (item !== submenu) item.style.display = "none";
//     });

//     if (submenu.style.display === "block") {
//       submenu.style.display = "none";
//     } else {
//       submenu.style.display = "block";
//     }
//   };

//   return (
//     <nav className={`navbars ${isScrolled ? "scrolled" : ""}`}>
//       <div className="navbars-container">
//         <img src={logo} alt="Logo" className="navbars-logo" />
//         <ul className={`navbars-menu ${isMenuOpen ? "active" : ""}`}>
//           <li className={`navbars-item ${activeMenu === "profil-sekolah" ? "active" : ""}`}>
//             <a href="#profil-sekolah" className="has-submenu" onClick={(e) => handleMenuClick(e, "profil-sekolah")}>
//               Profil Sekolah
//             </a>
//             <ul className="submenu">
//               <li><a href="/sambutan">SAMBUTAN KEPALA SEKOLAH</a></li>
//               <li><a href="/sejarah">SEJARAH</a></li>
//               <li><a href="/visi-misi">VISI & MISI</a></li>
//               <li><a href="/sarana-prasarana">SARANA PRASARANA</a></li>
//               <li><a href="/struktur-organisasi">STRUKTUR ORGANISASI</a></li>
//               <li><a href="/kondisi-sekolah-view">KONDISI SEKOLAH</a></li>
//               <li><a href="/staff">STAFF</a></li>
//             </ul>
//           </li>
//           <li className={`navbars-item ${activeMenu === "berita" ? "active" : ""}`}>
//             <a href="#berita" className="has-submenu" onClick={(e) => handleMenuClick(e, "berita")}>
//               Berita
//             </a>
//             <ul className="submenu">
//               <li><a href="/news">BERITA TERBARU</a></li>
//               <li><a href="/info">INFO SEKOLAH</a></li>
//               <li><a href="/agenda">AGENDA</a></li>
//               <li><a href="/galery">GALERI</a></li>
//             </ul>
//           </li>
//           <li className={`navbars-item ${activeMenu === "keuangan" ? "active" : ""}`}>
//             <a href="#keuangan" className="has-submenu" onClick={(e) => handleMenuClick(e, "keuangan")}>
//               KEUANGAN
//             </a>
//             <ul className="submenu">
//               <li><a href="/keuangan-bos">BOS</a></li>
//               <li><a href="/keuangan-apbd">APBD</a></li>
//               <li><a href="/keuangan-komite">KOMITE</a></li>
//             </ul>
//           </li>
//           <li className={`navbars-item ${activeMenu === "kesiswaan" ? "active" : ""}`}>
//             <a href="#kesiswaan" className="has-submenu" onClick={(e) => handleMenuClick(e, "kesiswaan")}>
//               KESISWAAN
//             </a>
//             <ul className="submenu">
//               <li><a href="/osis">OSIS</a></li>
//               <li>
//                 <button onClick={() => handleScrollToSection("ekstra-kulikuler")} className="navbars-buttons">
//                   EKSRAKURIKULER
//                 </button>
//               </li>
//             </ul>
//           </li>
//           <li className="navbars-item">
//             <a href="/perpustakaan">PERPUSTAKAAN</a>
//           </li>
//           <li className="navbars-item">
//             <button onClick={() => handleScrollToSection("prestasi-terbaru")} className="navbars-buttons">
//               PRESTASI
//             </button>
//           </li>
//           <li className="navbars-item">
//             <button onClick={() => handleScrollToSection("hubungi-kami")} className="navbars-buttons">
//               KONTAK
//             </button>
//           </li>
//         </ul>
//         <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//           &#9776;
//         </div>
//       </div>
//     </nav>
//   );
// }; 

const NavbarSekolah = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (id) => {
    const isHomePage = window.location.pathname === "/";

    if (isHomePage) {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const handleMenuClick = (event, menu) => {
    event.preventDefault();
    setActiveMenu(menu);

    const submenu = event.target.nextElementSibling;

    document.querySelectorAll(".submenu").forEach((item) => {
      if (item !== submenu) item.style.display = "none";
    });

    if (submenu.style.display === "block") {
      submenu.style.display = "none";
    } else {
      submenu.style.display = "block";
    }
  };

  return (
    <nav className={`navbars ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbars-container">
        <a href="/">
          <img src={logo} alt="Logo" className="navbars-logo" />
        </a>
        <ul className={`navbars-menu ${isMenuOpen ? "active" : ""}`}>
          <li className={`navbars-item ${activeMenu === "profil-sekolah" ? "active" : ""}`}>
            <a href="#profil-sekolah" className="has-submenu" onClick={(e) => handleMenuClick(e, "profil-sekolah")}>
              Profil Sekolah
            </a>
            <ul className="submenu">
              <li><a href="/sambutan">SAMBUTAN KEPALA SEKOLAH</a></li>
              <li><a href="/sejarah">SEJARAH</a></li>
              <li><a href="/visi-misi">VISI & MISI</a></li>
              <li><a href="/sarana-prasarana">SARANA PRASARANA</a></li>
              <li><a href="/struktur-organisasi">STRUKTUR ORGANISASI</a></li>
              <li><a href="/kondisi-sekolah-view">KONDISI SEKOLAH</a></li>
              <li><a href="/staff">STAFF</a></li>
            </ul>
          </li>
          <li className={`navbars-item ${activeMenu === "berita" ? "active" : ""}`}>
            <a href="#berita" className="has-submenu" onClick={(e) => handleMenuClick(e, "berita")}>
              Berita
            </a>
            <ul className="submenu">
              <li><a href="/news">BERITA TERBARU</a></li>
              <li><a href="/info">INFO SEKOLAH</a></li>
              <li><a href="/agenda">AGENDA</a></li>
              <li><a href="/galery">GALERI</a></li>
            </ul>
          </li>
          <li className={`navbars-item ${activeMenu === "keuangan" ? "active" : ""}`}>
            <a href="#keuangan" className="has-submenu" onClick={(e) => handleMenuClick(e, "keuangan")}>
              KEUANGAN
            </a>
            <ul className="submenu">
              <li><a href="/keuangan-bos">BOS</a></li>
              <li><a href="/keuangan-apbd">APBD</a></li>
              <li><a href="/keuangan-komite">KOMITE</a></li>
            </ul>
          </li>
          <li className={`navbars-item ${activeMenu === "kesiswaan" ? "active" : ""}`}>
            <a href="#kesiswaan" className="has-submenu" onClick={(e) => handleMenuClick(e, "kesiswaan")}>
              KESISWAAN
            </a>
            <ul className="submenu">
              <li><a href="/osis">OSIS</a></li>
              <li style={{ padding: '5px 10px' }}>
                <button onClick={() => handleScrollToSection("ekstra-kulikuler")} className="navbars-buttons">
                  EKSTRAKURIKULER
                </button>
              </li>
            </ul>
          </li>
          <li className="navbars-item">
            <a href="/perpustakaan" style={{ textTransform: "uppercase", fontWeight: "600" }}>PERPUSTAKAAN</a>
          </li>
          <li className="navbars-item">
            <button onClick={() => handleScrollToSection("prestasi-terbaru")} className="navbars-buttons">
              PRESTASI
            </button>
          </li>
          <li className="navbars-item">
            <button onClick={() => handleScrollToSection("hubungi-kami")} className="navbars-buttons">
              KONTAK
            </button>
          </li>
        </ul>
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "✖" : "☰"}
        </div>
      </div>
    </nav>
  );
};

export default NavbarSekolah;