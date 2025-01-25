import React, { useState } from "react";
import "../../src/component/sidebaryayasan.css";

function SidebarYayasan({ toggleSidebar }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (index) => {
    // Toggle the submenu visibility for the clicked dropdown
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <>
      <nav id="sidebar" className="sidebar-wrapper">
        <div className="sidebar">
          <h2>LKSA JATENG</h2>
          <ul>
            <li>
              <a href="#">
                <i className="fa-solid fa-home"></i> DASHBOARD
              </a>
            </li>

            {/* Dropdown CABANG */}
            <li
              className={`sidebar-item dropdown ${
                activeDropdown === 1 ? "active" : ""
              }`}
            >
              <a
                href="#"
                className="sidebar-link"
                onClick={() => handleDropdownToggle(1)}
              >
                <i className="fa-solid fa-sitemap"></i> CABANG
                <i
                  className={`fa-solid ${
                    activeDropdown === 1 ? "fa-chevron-up" : "fa-chevron-down"
                  } dropdown-icon`}
                ></i>
              </a>
              <ul
                className="submenu"
                style={{ display: activeDropdown === 1 ? "block" : "none" }}
              >
                <li className="submenu-item">
                  <a href="#" className="submenu-link">
                    <i className="fa-solid fa-list"></i> Daftar Cabang
                  </a>
                </li>
                <li className="submenu-item">
                  <a href="#" className="submenu-link">
                    <i className="fa-solid fa-info-circle"></i> Detail Cabang
                  </a>
                </li>
                <li className="submenu-item">
                  <a href="#" className="submenu-link">
                    <i className="fa-solid fa-plus-circle"></i> Buat Cabang Baru
                  </a>
                </li>
              </ul>
            </li>

            {/* Dropdown KEUANGAN */}
            <li
              className={`sidebar-item dropdown ${
                activeDropdown === 2 ? "active" : ""
              }`}
            >
              <a
                href="#"
                className="sidebar-link"
                onClick={() => handleDropdownToggle(2)}
              >
                <i className="fa-solid fa-coins"></i> KEUANGAN
                <i
                  className={`fa-solid ${
                    activeDropdown === 2 ? "fa-chevron-up" : "fa-chevron-down"
                  } dropdown-icon`}
                ></i>
              </a>
              <ul
                className="submenu"
                style={{ display: activeDropdown === 2 ? "block" : "none" }}
              >
                <li>
                  <a href="#">
                    <i className="fa-solid fa-file-invoice"></i> Data Keuangan
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-solid fa-chart-bar"></i> Laporan Keuangan
                  </a>
                </li>
              </ul>
            </li>

            {/* Dropdown DONASI */}
            <li
              className={`sidebar-item dropdown ${
                activeDropdown === 3 ? "active" : ""
              }`}
            >
              <a
                href="#"
                className="sidebar-link"
                onClick={() => handleDropdownToggle(3)}
              >
                <i className="fa-solid fa-hand-holding-heart"></i> DONASI
                <i
                  className={`fa-solid ${
                    activeDropdown === 3 ? "fa-chevron-up" : "fa-chevron-down"
                  } dropdown-icon`}
                ></i>
              </a>
              <ul
                className="submenu"
                style={{ display: activeDropdown === 3 ? "block" : "none" }}
              >
                <li>
                  <a href="#">
                    <i className="fa-solid fa-arrow-down"></i> Donasi Masuk
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-solid fa-arrow-up"></i> Donasi Keluar
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-solid fa-book"></i> Laporan Donasi
                  </a>
                </li>
              </ul>
            </li>

            {/* Dropdown INVENTARIS */}
            <li
              className={`sidebar-item dropdown ${
                activeDropdown === 4 ? "active" : ""
              }`}
            >
              <a
                href="#"
                className="sidebar-link"
                onClick={() => handleDropdownToggle(4)}
              >
                <i className="fa-solid fa-box"></i> INVENTARIS
                <i
                  className={`fa-solid ${
                    activeDropdown === 4 ? "fa-chevron-up" : "fa-chevron-down"
                  } dropdown-icon`}
                ></i>
              </a>
              <ul
                className="submenu"
                style={{ display: activeDropdown === 4 ? "block" : "none" }}
              >
                <li>
                  <a href="#">
                    <i className="fa-solid fa-list-alt"></i> Laporan Inventaris
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-solid fa-file-alt"></i> Inventaris Detail
                  </a>
                </li>
              </ul>
            </li>

            {/* Dropdown PERSONALIA */}
            <li
              className={`sidebar-item dropdown ${
                activeDropdown === 5 ? "active" : ""
              }`}
            >
              <a
                href="#"
                className="sidebar-link"
                onClick={() => handleDropdownToggle(5)}
              >
                <i className="fa-solid fa-users"></i> PERSONALIA
                <i
                  className={`fa-solid ${
                    activeDropdown === 5 ? "fa-chevron-up" : "fa-chevron-down"
                  } dropdown-icon`}
                ></i>
              </a>
              <ul
                className="submenu"
                style={{ display: activeDropdown === 5 ? "block" : "none" }}
              >
                <li>
                  <a href="/data-anak-asuh-cabang">
                    <i className="fa-solid fa-user"></i> Data Anak Asuh
                  </a>
                </li>
                <li>
                  <a href="/data-pegawai-cabang">
                    <i className="fa-solid fa-briefcase"></i> Data Kepegawaian
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default SidebarYayasan;
