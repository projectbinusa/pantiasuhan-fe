import React, { useEffect, useState } from "react";
import "../css/navbarSiswa.css";
import logo from "../aset/pantiasuhan/logo.png";
import profileImageUrl from "../aset/pantiasuhan/image.png";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NavbarSiswa = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory()

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
  const logout = () => {
    Swal.fire({
      title: "Keluar Dari Akun Anda ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Keluar Akun",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.clear();
        setTimeout(() => {
          history.push("/login_siswa");
        }, 1500);
      }
    });
  };

  return (
    <nav className={`navbars ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbars-container">
        <a href="/">
          <img src={logo} alt="Logo" className="navbars-logo" />
        </a>

        <ul
          style={{ fontSize: "13.8px" }}
          className={`navbars-menu ${isMenuOpen ? "active" : ""}`}
        >
          <li className="navbars-item has-submenu">
            <a href="/profile-siswa" className="profile-icon">
              <img
                src={profileImageUrl} // Replace with the actual profile image URL
                alt="Profile"
                className="profile-img"
              />
            </a>
            <ul className="submenu">
              <li>
                <a href="/siswa/data-absen">Absensi</a>
              </li>
              <li>
                <a href="/siswa/izin">Izin</a>
              </li>
              <li>
                <a href="/siswa/profile">Profile</a>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </li>
        </ul>

        {/* Hamburger for mobile */}
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </div>
      </div>
    </nav>
  );
};

export default NavbarSiswa;
