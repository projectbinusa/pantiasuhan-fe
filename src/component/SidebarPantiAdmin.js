import React, { useEffect, useRef, useState } from "react";
import "../../src/component/sidebar.css"; // Assuming you have the CSS in this file
import Swal from "sweetalert2";
import {
  NavLink,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

function SidebarPantiAdmin({ toggleSidebar }) {
  const history = useHistory();
  const location = useLocation();
  const menuRefs = useRef([]);
  const inventarisRefs = useRef([]);

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

    // INVENTARIS MENU
    const activeIndexInventaris = inventarisItems.findIndex(
      (item) => location.pathname === item.path
    );
    if (activeIndexInventaris !== -1 && inventarisRefs.current[activeIndexInventaris]) {
      inventarisRefs.current[activeIndexInventaris].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
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
      path: "/admin_sambutan",
      action: ["/add_sambutan", "/edit_sambutan"],
    },
    {
      title: "Visi Misi",
      icon: "fa-solid fa-list",
      path: "/admin_visimisi",
      action: ["/add_visimisi", "/edit_visimisi", "/detail_visimisi"],
    },
    {
      title: "Anak Asuh",
      icon: "fa-solid fa-user",
      path: "/admin_anak_asuh",
      action: ["/add_anak_asuh", "/edit_anak_asuh", "/detail_anak_asuh"],
    },
    {
      title: "Orang Tua Asuh",
      icon: "fa-solid fa-user",
      path: "/admin_ortu_asuh",
      action: ["/add_ortu_asuh", "/edit_ortu_asuh", "/detail_ortu_asuh"],
    },
    {
      title: "Buku Tamu",
      icon: "fa-solid fa-list",
      path: "/admin_buku_tamu",
      action: ["/add_buku_tamu", "/edit_buku_tamu", "/detail_buku_tamu"],
    },
    {
      title: "Tahsin",
      icon: "fa-solid fa-list",
      path: "/admin_tahsin",
      action: ["/edit_tahsin"],
    },
    {
      title: "Presensi",
      icon: "fa-solid fa-list",
      path: "/admin_absensi",
      action: [],
    },
    {
      title: "Kegiatan",
      icon: "fas fa-calendar-alt",
      path: "/admin_kegiatan",
      action: ["/add_kegiatan", "/edit_kegiatan", "/detail_kegiatan"],
    },
    {
      title: "Galeri",
      icon: "fa-solid fa-images",
      path: "/admin_galeri",
      action: ["/add_galeri", "/edit_galeri"],
    },
    {
      title: "Kontak",
      icon: "fa-solid fa-id-card",
      path: "/admin_kontak",
      action: ["/add_kontak", "/edit_kontak"],
    },
    {
      title: "Kotak Saran",
      icon: "fas fa-comment-dots",
      path: "/admin_kotak_saran",
      action: ["/add_kotak_saran", "/edit_kotak_saran"],
    },
  ];

  const inventarisItems = [
    {
      title: "Barang Inventaris",
      icon: "fa-solid fa-list",
      path: "/barang_inventaris",
      action: ["/edit_barang_inventaris"],
    },
    {
      title: "Kategori Barang",
      icon: "fa-solid fa-list",
      path: "/kategori_barang_inventaris",
      action: ["/edit_kategori_barang_inventaris"],
    },
    {
      title: "Status Barang",
      icon: "fa-solid fa-list",
      path: "/status_barang_inventaris",
      action: ["/edit_status_barang_inventaris"],
    },
    {
      title: "Stok Barang",
      icon: "fa-solid fa-list",
      path: "/stok_barang_inventaris",
      action: ["/edit_stok_barang_inventaris"],
    },
    {
      title: "Lokasi Barang",
      icon: "fa-solid fa-list",
      path: "/lokasi_barang_inventaris",
      action: ["/edit_lokasi_barang_inventaris"],
    },
  ]
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
                      className={`${data.icon} ${location.pathname === data.path ||
                        data.action.includes(location.pathname)
                        ? "active"
                        : ""
                        }`}></i>

                    <span>{data.title}</span>
                  </NavLink>
                </li>
              ))}
              <li className="header-menu1">
                <span>Inventaris</span>
              </li>
              {inventarisItems.map((data, index) => (
                <li key={index} ref={(el) => (inventarisRefs.current[index] = el)}>
                  <NavLink to={data.path} style={{ background: "none" }}>
                    <i
                      className={`${data.icon} ${location.pathname === data.path ||
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

export default SidebarPantiAdmin;
