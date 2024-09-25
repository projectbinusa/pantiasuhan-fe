import React from "react";
import logo from "../aset/smpn1bergas/logo.png";

function ResponsiveNav() {
  return (
    <>
      <nav class="navbar navbar-expand-lg " style={{ background: "#003366" }}>
        <div class="container-fluid container">
          <a class="navbar-brand" href="#">
            <img style={{ width: "40px" }} src={logo} alt="" />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon" style={{ color: "white" }}></span>
          </button>
          <div style={{ background: "#003366" }} class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-white">
              <li className={`nav-item `}>
                <a href="#profil-sekolah" className="">
                  Profil Sekolah<i class="fa-solid fa-caret-down"></i>
                </a>
                <ul className="submenu">
                  <li>
                    <a href="/sambutan">SAMBUTAN KEPALA SEKOLAH</a>
                  </li>
                  <li>
                    <a href="/sejarah">SEJARAH</a>
                  </li>
                  <li>
                    <a href="/visi-misi">VISI & MISI</a>
                  </li>
                  <li>
                    <a href="/struktur-organisasi">STRUKTUR ORGANISASI</a>
                  </li>
                  <li>
                    <a href="/kondisi-sekolah-view">KONDISI SEKOLAH</a>
                  </li>
                  <li>
                    <a href="/staff">STAFF</a>
                  </li>
                </ul>
              </li>
              <li className={`nav-item`}>
                <a href="#berita" className="">
                  Berita<i class="fa-solid fa-caret-down"></i>
                </a>
                <ul className="submenu">
                  <li>
                    <a href="/news">BERITA TERBARU</a>
                  </li>
                  <li>
                    <a href="/info">INFO SEKOLAH</a>
                  </li>
                  <li>
                    <a href="/agenda">AGENDA</a>
                  </li>
                  <li>
                    <a href="/galery">GALERI</a>
                  </li>
                </ul>
              </li>
              <li className={`nav-item`}>
                <a href="#keuangan" className="">
                  KEUANGAN<i class="fa-solid fa-caret-down"></i>
                </a>
                <ul className="submenu">
                  <li>
                    <a href="/keuangan-bos">BOS</a>
                  </li>
                  <li>
                    <a href="/keuangan-apbd">APBD</a>
                  </li>
                  <li>
                    <a href="/keuangan-komite">KOMITE</a>
                  </li>
                </ul>
              </li>
              <li className={`nav-item`}>
                <a
                  href="#kesiswaan"
                  className="">
                  KESISWAAN<i class="fa-solid fa-caret-down"></i>
                </a>
                <ul className="submenu">
                  <li>
                    <a href="/materi_ajar">Materi AJAR</a>
                  </li>
                  <li>
                    <a href="/osis">OSIS</a>
                  </li>
                  <li>
                    <a
                      href="/ekstrakurikuler"
                      style={{ textTransform: "uppercase", fontWeight: "600" }}>
                      EKSTRAKURIKULER
                    </a>
                  </li>
                </ul>
              </li>
              <li className={`nav-item`}>
                <a href="#sapras" className="">
                  Sarana prasarana<i class="fa-solid fa-caret-down"></i>
                </a>
                <ul className="submenu">
                  <li>
                    <a href="/sarana-prasarana">SARANA</a>
                  </li>
                  <li>
                    <a href="/program">PROGRAM</a>
                  </li>
                  <li>
                    <a href="/kegiatan">KEGIATAN</a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  href="/perpustakaan"
                  style={{ textTransform: "uppercase", fontWeight: "600", color:"white" }}>
                  PERPUSTAKAAN
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/all-prestasi"
                  style={{ textTransform: "uppercase", fontWeight: "600" }}>
                  PRESTASI
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/kontak"
                  style={{ textTransform: "uppercase", fontWeight: "600" }}>
                  KONTAK
                </a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">
                  Disabled
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default ResponsiveNav;
