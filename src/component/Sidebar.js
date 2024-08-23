import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { API_DUMMY } from "../utils/base_URL";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
// import { NavL, a, N } from "react-router-dom/cjs/react-router-dom.min";

function Sidebar() {
  const location = useLocation();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo1, setPaginationInfo1] = useState({
    totalPages1: 1,
    totalElements1: 0,
  });

  const getAllCategoryKeuangan = async (page1) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/category_keuangan/all?page=${page}&size=${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setList(response.data.data.content);
      console.log(response.data.data.content);
      setPaginationInfo1({
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getAllCategoryKeuangan();
  }, []);

  return (
    <div className="app-theme-white body-tabs-shadow fixed-sidebar fixed-header overflow-auto">
      <div
        className="app-sidebar sidebar-shadow"
        style={{ height: "100vh", overflowY: "auto" }}>
        <div className="app-header__logo">
          <div className="logo-src"></div>
          <div className="header__pane ml-auto">
            <div>
              <button
                type="button"
                class="hamburger close-sidebar-btn hamburger--elastic"
                data-class="closed-sidebar">
                <span class="hamburger-box">
                  <span class="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              class="hamburger hamburger--elastic mobile-toggle-nav">
              {/*  */}
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
        <div className="app-header__menu">
          <span>
            <button
              type="button"
              class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
              <span class="btn-icon-wrapper">
                <i class="fa-solid fa-chevron-down"></i>{" "}
              </span>
            </button>
          </span>
        </div>{" "}
        <div className="scrollbar-sidebar">
          <div className="app-sidebar__inner">
            <ul className="vertical-nav-menu">
              <li class="app-sidebar__heading">Menu</li>{" "}
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-alumni"
                  className={
                    location.pathname === "/admin-alumni" ? "active" : ""
                  }>
                  <i class="metismenu-icon fa-solid fa-users"></i> Alumni
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-kontak"
                  className={
                    location.pathname === "/admin-kontak" ? "active" : ""
                  }>
                  <i class="metismenu-icon fa-solid fa-id-card"></i> Kontak
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-sambutan"
                  className={
                    location.pathname === "/admin-sambutan" ? "active" : ""
                  }>
                  <i class="metismenu-icon fa-solid fa-book-open"></i> Sambutan
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-sejarah"
                  className={
                    location.pathname === "/admin-sejarah" ? "active" : ""
                  }>
                  <i class="metismenu-icon fa-solid fa-book"></i> Sejarah
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-visimisi"
                  className={
                    location.pathname === "/admin-visimisi" ? "active" : ""
                  }>
                  <i class="metismenu-icon fa-solid fa-list"></i> Visi Misi
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-perpustakaan"
                  className={
                    location.pathname === "/admin-perpustakaan" ? "active" : ""
                  }>
                  <i class="fa-solid fa-book metismenu-icon"></i> Perpustakaan
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-kotak-saran"
                  className={
                    location.pathname === "/admin-kotak-saran" ? "active" : ""
                  }>
                  <i class="fas fa-comment-dots metismenu-icon"></i> Kotak Saran
                </a>
              </li>
              <li className="app-sidebar__heading">Profile Sekolah</li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-kondisi-sekolah"
                  className={
                    location.pathname === "/admin-kondisi-sekolah"
                      ? "active"
                      : ""
                  }>
                  <i class="fa-solid fa-school metismenu-icon"></i> Kondisi
                  Sekolah
                </a>
              </li>
              {/* <li>
                <a style={{ textDecoration: "none" }} href="/admin-pengumuman">
                  <i className="fa-solid fa-circle-info  metismenu-icon"></i>{" "}
                  Pengumuman
                </a>
              </li>
              <li>
                <a style={{ textDecoration: "none" }} href="/admin-page-carousel">
                <i class="fas fa-images metismenu-icon"></i>{" "}
                  Carousel
                </a>
              </li>
              <li>
                <a style={{ textDecoration: "none" }} href="/admin-library">
                <i class="fas fa-book metismenu-icon"></i>{" "}
                  ELibrary
                </a>
              </li> */}
              {/* <li className="app-sidebar__heading">Informasi</li> */}
              {/* <li>
                <a style={{ textDecoration: "none" }} href="/jenis-informasi">
                  <i className="fa-regular fa-rectangle-list  metismenu-icon"></i>{" "}
                  Jenis Informasi
                </a>
              </li> */}
              <li>
                <a
                  href="#"
                  style={{ textDecoration: "none" }}
                  className={
                    location.pathname === "/admin-tenaga-kependidikan" &&
                    "/admin-tenaga-pendidikan"
                      ? "active"
                      : ""
                  }>
                  <i class="fa-solid fa-clipboard-user metismenu-icon"></i>{" "}
                  Staff
                  <i class="fas fa-arrow-circle-down metismenu-state-icon caret-left"></i>
                </a>
                <ul
                  className={
                    location.pathname === "/admin-tenaga-kependidikan" &&
                    "/admin-guru"
                      ? "active mm-show"
                      : ""
                  }>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="/admin-tenaga-kependidikan"
                      className={
                        location.pathname === "/admin-tenaga-kependidikan"
                          ? "active"
                          : ""
                      }>
                      <i className="metismenu-icon"></i>Kependidikan
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="/admin-guru"
                      className={
                        location.pathname === "/admin-guru" ? "active" : ""
                      }>
                      <i class="metismenu-icon fa-solid fa-chalkboard-user"></i>{" "}
                      Guru
                    </a>
                  </li>
                  {/* <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="/admin-berkala-kepemiluan">
                      <i className="metismenu-icon"></i>Bekala Kepemiluan
                    </a>
                  </li> */}
                  {/* <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="/admin-berkala-kelembagaan"
                    >
                      <i className="metismenu-icon"></i>Bekala Kelembagaan
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ textDecoration: "none" }}
                      href="/admin-dikecualikan"
                    >
                      <i className="metismenu-icon"></i>Di Kecualikan
                    </a>
                  </li>
                  <li>
                    <a style={{ textDecoration: "none" }} href="/admin-kanal">
                      <i className="metismenu-icon"></i>Kanal
                    </a>
                  </li> */}
                </ul>
              </li>
              {/* <li>
                <a style={{ textDecoration: "none" }} href="#">
                  <i class="fa-solid fa-bullhorn metismenu-icon "></i>
                  Informasi Publik
                  <i class="fas fa-arrow-circle-down metismenu-state-icon caret-left"></i>
                </a>
                <ul>
                  {informasi.map((inf) => {
                    return (
                      <li key={inf.id}>
                        <a
                          style={{ textDecoration: "none" }}
                          href={`./admin-informasi/${inf.namaInformasi}/${inf.id}`}
                        >
                          <i class="fas fa-arrow-circle-down metismenu-icon"></i>
                          {inf.namaInformasi}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li> */}
              {/* MENU REGULASI */}
              <li class="app-sidebar__heading">Berita</li>
              <li>
                <a style={{ textDecoration: "none" }} href="/admin-berita">
                  <i className="fa-regular fa-rectangle-list  metismenu-icon"></i>{" "}
                  Berita Terbaru
                </a>
              </li>
              <li>
                <a style={{ textDecoration: "none" }} href="/admin-galery">
                  <i class="fa-solid fa-images metismenu-icon"></i> Galery
                </a>
              </li>
              {/* END MENU REGULASI */}
              <li class="app-sidebar__heading">Keuangan</li>
              {/* {list.map((data, index) => (
                <li key={index}>
                  {/*  */}
              {/* <a
                    style={{ textDecoration: "none" }}
                    href={"/adminn/" + data.category + "/" + data.id}>
                    <i class="fa-solid fa-file-invoice-dollar metismenu-icon"></i>{" "}
                    {data.category}
                  </a>
                </li>
              ))} */}
              <li>
                <a style={{ textDecoration: "none" }} href="/admin-Keuangan">
                  <i class="fa-solid fa-circle-dollar-to-slot metismenu-icon "></i>{" "}
                  Keuangan
                </a>
              </li>
              {/* <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-permohonan-keberatan">
                  <i class="fa-solid fa-user-group metismenu-icon"></i> Komite
                </a>
              </li> */}
              <li class="app-sidebar__heading">Lainya</li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-ekstrakulikuler">
                  <i class="fa-solid fa-people-robbery metismenu-icon"></i>{" "}
                  Ekstrakurikuler
                </a>
              </li>
              <li>
                <a style={{ textDecoration: "none" }} href="/admin-prestasi">
                  <i class="fa-solid fa-medal metismenu-icon"></i> Prestasi
                </a>
              </li>
              <li class="app-sidebar__heading">Sarana Prasana</li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-sarana"
                  className={
                    location.pathname === "/admin-sarana" ? "active" : ""
                  }>
                  <i class="metismenu-icon fas fa-tools"></i> Sarana
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-kegiatan"
                  className={
                    location.pathname === "/admin-kegiatan" ? "active" : ""
                  }>
                  <i class="metismenu-icon fas fa-calendar-alt"></i> Kegiatan
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-struktur"
                  className={
                    location.pathname === "/admin-struktur" ? "active" : ""
                  }>
                  <i class="metismenu-icon fas fa-sitemap"></i> Struktur
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-program"
                  className={
                    location.pathname === "/admin-program" ? "active" : ""
                  }>
                  <i class="metismenu-icon fas fa-tasks"></i> Program
                </a>
              </li>
              {/* <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-struktur"
                  className={
                    location.pathname === "/admin-struktur" ? "active" : ""
                  }>
                  <i class="metismenu-icon fa-solid fa-building"></i> Struktur
                </a>
              </li> */}
              {/* <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-permohonan-informasi">
                  <i class="fa-solid fa-circle-user metismenu-icon"></i> Profile
                  Alumni
                </a>
              </li> */}
              {/* <li class="app-sidebar__heading">Sarana</li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/admin-permohonan-informasi">
                  <i class="fa-solid fa-circle-question  metismenu-icon"></i>{" "}
                  Standar
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/adminn-permohonan-informasi">
                  <i class="fa-solid fa-house-laptop metismenu-icon"></i> Ruang
                  Kantor
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/adminn-permohonan-informasi">
                  <i class="fa-solid fa-person-shelter metismenu-icon"></i>{" "}
                  Ruang Kelas
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/adminn-permohonan-informasi">
                  <i class="fa-solid fa-flask-vial metismenu-icon"></i> Ruang
                  Laboratorium
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/adminn-permohonan-informasi">
                  <i class="fa-solid fa-baseball metismenu-icon"></i> Sarana
                  Olahraga
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/adminn-permohonan-informasi">
                  <i class="fa-solid fa-mosque metismenu-icon"></i> Sarana
                  Ibadah
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/adminn-permohonan-informasi">
                  <i class="fa-solid fa-notes-medical metismenu-icon"></i>{" "}
                  Sarana Kesehatan
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/adminn-permohonan-informasi">
                  <i class="fa-solid fa-book metismenu-icon"></i> Perpustakaan
                </a>
              </li>
              <li>
                <a
                  style={{ textDecoration: "none" }}
                  href="/adminn-permohonan-informasi">
                  <i class="fa-solid fa-book-medical metismenu-icon"></i> Sarana
                  Protokol Kesehatan
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
