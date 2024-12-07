import React, { useEffect, useRef, useState } from "react";
import "../../src/component/sidebar.css"; // Assuming you have the CSS in this file
import Swal from "sweetalert2";
import {
  NavLink,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

function Sidebar1({ toggleSidebar }) {
  // const [activeDropdown, setActiveDropdown] = useState(null);
  // const [sidebarToggled, setSidebarToggled] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const menuRefs = useRef([]);
  const ProfileRefs = useRef([]);
  const SiswaRefs = useRef([]);
  const saprasRefs = useRef([]);

  useEffect(() => {
    const activeIndex = menuItems.findIndex(
      (item) => location.pathname === item.path
    );
    if (activeIndex !== -1 && menuRefs.current[activeIndex]) {
      menuRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
    // const activeIndexProfile = profileItem.findIndex(
    //   (item) => location.pathname === item.path
    // );
    // if (activeIndexProfile !== -1 && ProfileRefs.current[activeIndexProfile]) {
    //   ProfileRefs.current[activeIndexProfile].scrollIntoView({
    //     behavior: "smooth",
    //     block: "nearest",
    //   });
    // }
    // const activeIndexSiswa = siswaItem.findIndex(
    //   (item) => location.pathname === item.path
    // );
    // if (activeIndexSiswa !== -1 && SiswaRefs.current[activeIndexSiswa]) {
    //   SiswaRefs.current[activeIndexSiswa].scrollIntoView({
    //     behavior: "smooth",
    //     block: "nearest",
    //   });
    // }
    // const activeIndexsapras = saprasItem.findIndex(
    //   (item) => location.pathname === item.path
    // );
    // if (activeIndexsapras !== -1 && saprasRefs.current[activeIndexsapras]) {
    //   saprasRefs.current[activeIndexsapras].scrollIntoView({
    //     behavior: "smooth",
    //     block: "nearest",
    //   });
    // }
  }, [location.pathname]);

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
          history.push("/login");
        }, 1500);
      }
    });
  };

  const menuItems = [
    {
      title: "Sambutan",
      icon: "fa-solid fa-book-open",
      path: "/admin-sambutan",
      action: ["/add-sambutan", "/edit-sambutan"],
    },
    {
      title: "Visi Misi",
      icon: "fa-solid fa-list",
      path: "/admin-visimisi",
      action: ["/add-visimisi", "/edit-visimisi", "/detail-visimisi"],
    },
    {
      title: "Kegiatan",
      icon: "fas fa-calendar-alt",
      path: "/admin-kegiatan",
      action: ["/add-kegiatan", "/edit-kegiatan", "/detail-kegiatan"],
    },
    {
      title: "Galeri",
      icon: "fa-solid fa-images",
      path: "/admin-galery",
      action: ["/add-galery", "/edit-galery"],
    },
    {
      title: "Kontak",
      icon: "fa-solid fa-id-card",
      path: "/admin-kontak",
      action: ["/add-kontak", "/edit-kontak"],
    },
    {
      title: "Kotak Saran",
      icon: "fas fa-comment-dots",
      path: "/admin-kotak-saran",
      action: ["/add-kotak-saran", "/edit-kotak-saran"],
    },
  ];

  // const profileItem = [
  //   {
  //     title: "Sejarah",
  //     icon: "fas fa-comment-dots",
  //     path: "/admin-sejarah",
  //     action: ["/add-sejarah", "/edit-sejarah", "/detail-sejarah"],
  //   },
  //   {
  //     title: "Visi Misi",
  //     icon: "fa-solid fa-list",
  //     path: "/admin-visimisi",
  //     action: ["/add-visimisi", "/edit-visimisi", "/detail-visimisi"],
  //   },
  //   {
  //     title: "Prestasi",
  //     icon: "fa-solid fa-medal metismenu-icon",
  //     path: "/admin-prestasi",
  //     action: ["/add-prestasi", "/edit-prestasi", "/detail-prestasi"],
  //   },
  //   {
  //     title: "Guru",
  //     icon: "fa-solid fa-chalkboard-user",
  //     path: "/admin-guru",
  //     action: ["/add-guru", "/edit-guru", "/detail-guru"],
  //   },
  //   {
  //     title: "Tenaga Kependidikan",
  //     icon: "fa-solid fa-users-viewfinder",
  //     path: "/admin-tenaga-kependidikan",
  //     action: [
  //       "/add-tenaga-kependidikan",
  //       "/edit-tenaga-kependidikan",
  //       "/detail-tenaga-kependidikan",
  //     ],
  //   },
  //   {
  //     title: "Kondisi Sekolah",
  //     icon: "fa-solid fa-school",
  //     path: "/admin-kondisi-sekolah",
  //     action: [
  //       "/add-kondisi-sekolah",
  //       "/edit-kondisi-sekolah",
  //       "/detail-kondisi-sekolah",
  //     ],
  //   },
  // ];

  // const siswaItem = [
  //   {
  //     title: "Osis",
  //     icon: "fa-solid fa-users",
  //     path: "/admin-osis",
  //     action: ["/add-osis", "/edit-osis", "/detail-osis"],
  //   },
  //   {
  //     title: "Ekstrakurikuler",
  //     icon: "fa-solid fa-people-robbery",
  //     path: "/admin-ekstrakulikuler",
  //     action: [
  //       "/add-ekstrakulikuler",
  //       "/detail-ekstrakulikuler",
  //       "/edit-ekstrakulikuler",
  //       "/detail-ekstrakulikuler",
  //     ],
  //   },
  // ];

  // const saprasItem = [
  //   {
  //     title: "Sarana",
  //     icon: "fas fa-tools",
  //     path: "/admin-sarana",
  //     action: ["/add-sarana", "/edit-sarana", "/detail-sarana"],
  //   },
  //   {
  //     title: "Kegiatan",
  //     icon: "fas fa-calendar-alt",
  //     path: "/admin-kegiatan",
  //     action: ["/add-kegiatan", "/edit-kegiatan", "/detail-kegiatan"],
  //   },
  //   {
  //     title: "Struktur",
  //     icon: " fas fa-sitemap",
  //     path: "/admin-struktur",
  //     action: [
  //       "/add-struktur",
  //       "/detail-struktur",
  //       "/edit-struktur",
  //       "/detail-struktur",
  //     ],
  //   },
  //   {
  //     title: "Program",
  //     icon: "fas fa-tasks",
  //     path: "/admin-program",
  //     action: ["/add-program", "/edit-program", "/detail-program"],
  //   },
  // ];

  useEffect(() => {
    console.log(
      "data: ",
      menuItems.map((dt) => dt.badge)
    );
  }, []);

  return (
    <>
      <nav id="sidebar" className="sidebar-wrapper">
        <div className="sidebar-content">
          <div className="sidebar-brand">
            <a href="#" style={{ textAlign: "center" }}>
              PANTI ASUHAN
            </a>
            <div id="close-sidebar" onClick={toggleSidebar}>
              <i className="fas fa-times"></i>
            </div>
          </div>
          <div className="sidebar-menu1">
            <ul>
              <li className="header-menu1">
                <span>Menu</span>
              </li>{" "}
              {menuItems.map((data, index) => (
                <li key={index} ref={(el) => (menuRefs.current[index] = el)}>
                  <NavLink to={data.path} style={{ background: "none" }}>
                    <i
                      className={`${data.icon} ${
                        location.pathname === data.path ||
                        data.action.includes(location.pathname)
                          ? "active"
                          : ""
                      }`}></i>

                    <span>{data.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="sidebar-footer">
          <button type="button" onClick={logout}>
            <i class="fa-solid fa-right-from-bracket"></i>
            <span> Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Sidebar1;
