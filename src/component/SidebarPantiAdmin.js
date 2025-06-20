import React, { useEffect, useRef, useState } from "react";
import "../../src/component/sidebar.css";
import Swal from "sweetalert2";
import {
  NavLink,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { Box, Modal } from "@mui/material";
import { API_DUMMY_SMART } from "../utils/base_URL";
import axios from "axios";

function SidebarPantiAdmin({ toggleSidebar }) {
  const history = useHistory();
  const menuRefs = useRef([]);
  const inventarisRefs = useRef([]);
  const defaultRefs = useRef([]);
  const [activeMenu, setActiveMenu] = useState(null); // State untuk melacak menu aktif
  const location = useLocation();
  const [cabang, setCabang] = useState([]);
  const [idCabang, setIdCabang] = useState(0);
  const [cabangValid, setCabangValid] = useState("");
  const [idCabangValid, setIdCabangValid] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModal = (idCabang) => {
    if (idCabang) {
      console.log("ID Organisasi yang dipilih:", idCabang);

      // Tentukan URL berdasarkan menu yang dipilih
      let url = "";
      if (selectedMenu === "Daftar Cabang") {
        url = `/daftar-cabang/${idCabang}`;
      } else if (selectedMenu === "Data Anak Asuh") {
        url = `/cabang/${idCabang}`;
      }

      // Navigasi ke halaman yang sesuai
      history.push(url);
    } else {
      alert("Silakan pilih organisasi terlebih dahulu");
    }
    closeModal();
  };

  const styleForm = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", // Persentase untuk fleksibilitas
    maxWidth: "500px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    overflowY: "auto",
    maxHeight: "90vh",
    // textAlign: "center", // Menempatkan konten di tengah
  };

  useEffect(() => {
    const fetchDataOrganization = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY_SMART}/api/user/customer/organization_ids`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        console.log("datas: ", response.data);
        setCabang(response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan:", error.response || error.message);
      }
    };

    fetchDataOrganization();
  }, []);

  const toggleMenu = (index) => {
    // Jika menu yang diklik sudah aktif, tutup menu; jika tidak, buka menu
    setActiveMenu(activeMenu === index ? null : index);
  };

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
    if (
      activeIndexInventaris !== -1 &&
      inventarisRefs.current[activeIndexInventaris]
    ) {
      inventarisRefs.current[activeIndexInventaris].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
    // INVENTARIS MENU
    const activeIndexDashboard = defaultItems.findIndex(
      (item) => location.pathname === item.path
    );
    if (
      activeIndexDashboard !== -1 &&
      inventarisRefs.current[activeIndexDashboard]
    ) {
      inventarisRefs.current[activeIndexDashboard].scrollIntoView({
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

  var datas;
  if (localStorage.getItem("rolename") === "Yayasan") {
    datas = {
      title: "Dashboard",
      icon: "fa-solid fa-palette",
      path: "/dashboard_yayasan",
      action: [],
    };
  } else {
    datas = {
      title: "Dashboard",
      icon: "fa-solid fa-palette",
      path: "/dashboard_panti",
      action: [],
    };
  }

  const defaultItems = [datas];

  const menuItems = [
    {
      header: "Tentang",
      items: [
        {
          title: "Tampilan Web",
          icon: "fa-solid fa-list",
          path: "/web",
          action: ["/add_web"],
        },
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
          action: ["/add_visimisi", "/edit_visimisi"],
        },
        {
          title: "Program",
          icon: "fas fa-calendar-alt",
          path: "/admin_program",
          action: ["/add_program", "/edit_program"],
        },
        {
          title: "Berita",
          icon: "fa-solid fa-newspaper",
          path: "/admin_berita",
          action: [
            "/admin_berita/add",
            "/admin_berita/edit",
            "/admin_berita/detail",
          ],
        },
        {
          title: "Komentar",
          icon: "fa-solid fa-comments",
          path: "/moderasi_komentar",
          action: ["/balas_komentar"],
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
          title: "Shift",
          icon: "fa-solid fa-clock",
          path: "/admin_shift",
          action: ["/add_shift", "/edit_shift"],
        },
        {
          title: "Fasilitas",
          icon: "fa-solid fa-building",
          path: "/admin_fasilitas",
          action: ["/admin_fasilitas/add", "/admin_fasilitas/edit"],
        },
        {
          title: "Profile",
          icon: "fa-solid fa-user-circle",
          path: "/profile",
          action: ["/profile/edit"],
        },
        {
          title: "Pesan Whatsapp",
          icon: "fab fa-whatsapp",
          path: "/message",
          action: ["/message/add"],
        },
      ],
    },
    {
      header: "Panti",
      items: [
        {
          title: "Anak Asuh",
          icon: "fa-solid fa-user",
          path: "/admin_anak_asuh",
          action: ["/add_anak_asuh", "/edit_anak_asuh"],
        },
        {
          title: "Orang Tua Asuh",
          icon: "fa-solid fa-user",
          path: "/admin_ortu_asuh",
          action: ["/add_ortu_asuh", "/edit_ortu_asuh"],
        },
        {
          title: "Pengurus",
          icon: "fa-solid fa-users",
          path: "/admin_pengurus",
          action: ["/pengurus/edit"],
        },
      ],
    },
    {
      header: "Presensi",
      items: [
        {
          title: "Laporan Harian",
          icon: "fa-solid fa-file",
          path: "/laporan_presensi/harian",
          action: [],
        },
        {
          title: "Laporan Bulanan",
          icon: "fa-solid fa-list",
          path: "/laporan_presensi/bulanan",
          action: [],
        },
        {
          title: "Laporan Tahunan",
          icon: "fa-solid fa-list",
          path: "/laporan_presensi/tahunan",
          action: [],
        },
      ],
    },
    {
      header: "Buku Tamu",
      items: [
        {
          title: "Buku Tamu",
          icon: "fa-solid fa-book",
          path: "/admin_buku_tamu",
          action: ["/add_buku_tamu", "/edit_buku_tamu"],
        },
      ],
    },
    {
      header: "Tahsin",
      items: [
        {
          title: "Tahsin",
          icon: "fa-solid fa-book",
          path: "/admin_tahsin",
          action: ["/add_buku_tamu", "/edit_buku_tamu"],
        },
        {
          title: "Tahsin Harian",
          icon: "fa-solid fa-book",
          path: "/rekap_tahsin_harian",
          action: ["/add_buku_tamu", "/edit_buku_tamu"],
        },
        {
          title: "Tahsin Mingguan",
          icon: "fa-solid fa-book",
          path: "/rekap_tahsin_mingguan",
          action: ["/add_buku_tamu", "/edit_buku_tamu"],
        },
      ],
    },
    {
      header: "Keuangan",
      items: [
        {
          title: "Donasi",
          icon: "fas fa-hand-holding-heart",
          path: "/donasi",
          action: ["/donasi/add", "/donasi/put"],
        },
        {
          title: "Dana Masuk",
          icon: "fas fa-plus",
          path: "/donasi_trx",
          action: ["/add_donasi_trx", "/edit_donasi_trx"],
        },
        {
          title: "Dana Keluar",
          icon: "fas fa-minus",
          path: "/admin_dana_keluar",
          action: ["/add_dana_keluar", "/edit_dana_keluar"],
        },
        // {
        //   title: "Laporan Keuangan",
        //   icon: "fa-solid fa-file-invoice-dollar",
        //   path: "/laporan_keuangan",
        //   action: [],
        // },
      ],
    },
  ];

  const menuItemsYayasan = [
    {
      header: "Cabang",
      items: [
        {
          title: "Daftar Cabang",
          icon: "fa-solid fa-book-open",
          path: "/daftar-cabang",
          action: [""],
        },
        // {
        //   title: "Buat Cabang Baru",
        //   icon: "fa-solid fa-plus",
        //   path: "/form-cabang-baru",
        //   action: [""],
        // },
      ],
      icon: <i class="fa-solid fa-angle-down"></i>,
    },
    // {
    //   header: "Keuangan",
    //   items: [
    //     {
    //       title: "Donasi",
    //       icon: "fas fa-hand-holding-heart",
    //       path: "/donasi",
    //       action: ["/donasi/add", "/donasi/put"],
    //     },
    //     {
    //       title: "Dana Masuk",
    //       icon: "fas fa-plus",
    //       path: "/donasi_trx",
    //       action: ["/add_donasi_trx", "/edit_donasi_trx"],
    //     },
    //     {
    //       title: "Dana Keluar",
    //       icon: "fas fa-minus",
    //       path: "/admin_dana_keluar",
    //       action: ["/add_dana_keluar", "/edit_dana_keluar"],
    //     },
    //   ],
    //   icon: <i class="fa-solid fa-angle-down"></i>,
    // },
    {
      header: "Donasi Masuk",
      items: [
        {
          title: "Donasi Harian",
          icon: "fa-solid fa-arrow-down",
          path: "/donasitrx_masuk_yayasan",
          action: [""],
        },
        {
          title: "Donasi Mingguan",
          icon: "fa-solid fa-arrow-down",
          path: "/donasitrx_masuk_mingguan_yayasan",
          action: [""],
        },
        {
          title: "Donasi Bulanan",
          icon: "fa-solid fa-arrow-down",
          path: "/donasitrx_masuk_bulanan_yayasan",
          action: [""],
        },
      ],
      icon: <i class="fa-solid fa-angle-down"></i>,
    },
    {
      header: "Biaya",
      items: [
        {
          title: "Biaya Harian",
          icon: "fa-solid fa-arrow-up",
          path: "/donasitrx_keluar_yayasan",
          action: [""],
        },
        {
          title: "Biaya Mingguan",
          icon: "fa-solid fa-arrow-up",
          path: "/donasitrx_keluar_mingguan_yayasan",
          action: [""],
        },
        {
          title: "Biaya Bulanan",
          icon: "fa-solid fa-arrow-up",
          path: "/donasitrx_keluar_bulanan_yayasan",
          action: [""],
        },
        // {
        //   title: "Laporan Donasi",
        //   icon: "fa-solid fa-list",
        //   path: "/laporan-donasi",
        //   action: [""],
        // },
      ],
      icon: <i class="fa-solid fa-angle-down"></i>,
    },
    {
      header: "Inventaris1",
      items: [
        {
          title: "Laporan Investaris",
          icon: "fa-solid fa-book-open",
          path: "/laporan-investariss",
          action: [""],
        },
        // {
        //   title: "Investaris Detail",
        //   icon: "fa-solid fa-book-open",
        //   path: "",
        //   action: [""],
        // },
      ],
      icon: <i class="fa-solid fa-angle-down"></i>,
    },
    {
      header: "Personalia",
      items: [
        {
          title: "Data Anak Asuh",
          icon: "fa-solid fa-book-open",
          path: "/cabang",
          action: [""],
        },
      ],
      icon: <i class="fa-solid fa-angle-down"></i>,
    },
    {
      header: "Domain",
      items: [
        {
          title: "Domain",
          icon: "fa-solid fa-book-open",
          path: "/domain",
          action: [""],
        },
      ],
      icon: <i class="fa-solid fa-angle-down"></i>,
    },
    // {
    //   header: "Organization",
    //   items: [
    //     {
    //       title: "Organization",
    //       icon: "fa-solid fa-book-open",
    //       path: "/user-organization",
    //       action: [""],
    //     },
    //   ],
    //   icon: <i class="fa-solid fa-angle-down"></i>,
    // },
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
      title: "Kondisi Barang",
      icon: "fa-solid fa-list",
      path: "/kondisi_barang_inventaris",
      action: ["/edit_kondisi_barang_inventaris"],
    },
    {
      title: "Lokasi Barang",
      icon: "fa-solid fa-list",
      path: "/lokasi_barang_inventaris",
      action: ["/edit_lokasi_barang_inventaris"],
    },
  ];

  const tampilanItems = [
    {
      title: "Web",
      icon: "fa-solid fa-list",
      path: "/web",
      action: ["/add_web"],
    },
  ];

  const komentarItems = [
    {
      title: "Komentar",
      icon: "fa-solid fa-comments",
      path: "/moderasi_komentar",
      action: ["/balas_komentar"],
    },
  ];

  const menuItemsPengurus = [
    {
      header: "Presensi",
      items: [
        {
          title: "Presensi",
          icon: "fa-solid fa-users",
          path: "/guru/presensi",
          action: [""],
        },
      ],
      icon: <i class="fa-solid fa-angle-down"></i>,
    },
    {
      header: "Tahsin",
      items: [
        {
          title: "Data Tahsin",
          icon: "fa-solid fa-book-open",
          path: "/guru/tahsin",
          action: [""],
        },
        // {
        //   title: "Data Tahsin Weakly",
        //   icon: "fa-solid fa-book-open",
        //   path: "/guru/tahsin/weakly",
        //   action: [""],
        // },
        {
          title: "Data Tahsin harian",
          icon: "fa-solid fa-book-open",
          path: "/guru/tahsin/harian",
          action: [""],
        },
        {
          title: "Data Tahsin Mingguan",
          icon: "fa-solid fa-book-open",
          path: "/guru/tahsin/mingguan",
          action: [""],
        },
        {
          title: "Data Tahsin Bulanan",
          icon: "fa-solid fa-book-open",
          path: "/guru/tahsin/bulanan",
          action: [""],
        },
        {
          title: "Data Tahsin Tahunan",
          icon: "fa-solid fa-book-open",
          path: "/guru/tahsin/tahunan",
          action: [""],
        },
        // {
        //   title: "Data Tahsin Daily",
        //   icon: "fa-solid fa-book-open",
        //   path: "/guru/tahsin/daily",
        //   action: [""],
        // },
      ],
      icon: <i class="fa-solid fa-angle-down"></i>,
    },
    {
      header: "Anak Asuh",
      items: [
        {
          title: "Data Anak Asuh",
          icon: "fa-solid fa-users",
          path: "/guru/anak_asuh",
          action: [""],
        },
      ],
      icon: <i class="fa-solid fa-angle-down"></i>,
    },
    {
      header: "Kitab",
      items: [
        {
          title: "Data Kitab",
          icon: "fa-solid fa-book-open",
          path: "/guru/kitab",
          action: [""],
        },
        // {
        //   title: "Data Kitab Weakly",
        //   icon: "fa-solid fa-book-open",
        //   path: "/guru/kitab/weakly",
        //   action: [""],
        // },
        {
          title: "Data Kitab Harian",
          icon: "fa-solid fa-book-open",
          path: "/guru/kitab/harian",
          action: [""],
        },
        {
          title: "Data Kitab Mingguan",
          icon: "fa-solid fa-book-open",
          path: "/guru/kitab/mingguan",
          action: [""],
        },
        {
          title: "Data Kitab Bulanan",
          icon: "fa-solid fa-book-open",
          path: "/guru/kitab/bulanan",
          action: [""],
        },
        {
          title: "Data Kitab Tahunan",
          icon: "fa-solid fa-book-open",
          path: "/guru/kitab/tahunan",
          action: [""],
        },
        // {
        //   title: "Data Kitab Daily",
        //   icon: "fa-solid fa-book-open",
        //   path: "/guru/kitab/daily",
        //   action: [""],
        // },
      ],
      icon: <i class="fa-solid fa-book-open"></i>,
    },
    {
      header: "Tahfidz",
      items: [
        {
          title: "Data Tahfidz",
          icon: "fa-solid fa-book-open",
          path: "/guru/tahfidz",
          action: [""],
        },
        // {
        //   title: "Data Tahfidz Weakly",
        //   icon: "fa-solid fa-book-open",
        //   path: "/guru/tahfidz/weakly",
        //   action: [""],
        // },
        {
          title: "Data Tahfidz Harian",
          icon: "fa-solid fa-book-open",
          path: "/guru/tahfidz/harian",
          action: [""],
        },
        {
          title: "Data Tahfidz Mingguan",
          icon: "fa-solid fa-book-open",
          path: "/guru/tahfidz/mingguan",
          action: [""],
        },
        {
          title: "Data Tahfidz Bulanan",
          icon: "fa-solid fa-book-open",
          path: "/guru/tahfidz/bulanan",
          action: [""],
        },
        {
          title: "Data Tahfidz Tahunan",
          icon: "fa-solid fa-book-open",
          path: "/guru/tahfidz/tahunan",
          action: [""],
        },
        // {
        //   title: "Data Tahfidz Daily",
        //   icon: "fa-solid fa-book-open",
        //   path: "/guru/tahfidz/daily",
        //   action: [""],
        // },
      ],
      icon: <i class="fa-solid fa-book-open"></i>,
    },
  ];

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
              {localStorage.getItem("rolename") == "Admin"
                ? "PANTI ASUHAN"
                : "LKSA"}
            </a>
            <div id="close-sidebar" onClick={toggleSidebar}>
              <i className="fas fa-times"></i>
            </div>
          </div>
          <div className="sidebar-menu1">
            <ul>
              {localStorage.getItem("rolename") != "Pengurus" ||
              localStorage.getItem("rolename") != "Guru" ? (
                defaultItems.map((data, index) => (
                  <li
                    key={index}
                    ref={(el) => (defaultRefs.current[index] = el)}
                    className={`body-menu ${
                      location.pathname === data.path ||
                      data.action.includes(location.pathname)
                        ? "bactive"
                        : ""
                    }`}
                  >
                    <NavLink to={data.path} style={{ background: "none" }}>
                      <i
                        className={`${data.icon} ${
                          location.pathname === data.path ||
                          data.action.includes(location.pathname)
                            ? "active"
                            : ""
                        }`}
                      ></i>
                      <span>{data.title}</span>
                    </NavLink>
                  </li>
                ))
              ) : (
                <></>
              )}
              {localStorage.getItem("rolename") == "Admin" ? (
                <>
                  {menuItems.map((menu, index) => (
                    <React.Fragment key={index}>
                      <li className="header-menu1">
                        <span>{menu.header}</span>
                      </li>
                      {menu.items.map((data, subIndex) => (
                        <li
                          key={subIndex}
                          className={`body-menu ${
                            location.pathname === data.path ||
                            data.action.includes(location.pathname)
                              ? "bactive"
                              : ""
                          }`}
                          ref={(el) => (menuRefs.current[subIndex] = el)}
                        >
                          <NavLink
                            to={data.path}
                            style={{ background: "none" }}
                          >
                            <i
                              className={`${data.icon} ${
                                location.pathname === data.path ||
                                data.action.includes(location.pathname)
                                  ? "active"
                                  : ""
                              }`}
                            ></i>
                            <span>{data.title}</span>
                          </NavLink>
                        </li>
                      ))}
                    </React.Fragment>
                  ))}
                  <li className="header-menu1">
                    <span>Inventaris</span>
                  </li>
                  {inventarisItems.map((data, index) => (
                    <li
                      key={index}
                      className={`body-menu ${
                        location.pathname === data.path ||
                        data.action.includes(location.pathname)
                          ? "bactive"
                          : ""
                      }`}
                      ref={(el) => (inventarisRefs.current[index] = el)}
                    >
                      <NavLink to={data.path} style={{ background: "none" }}>
                        <i
                          className={`${data.icon} ${
                            location.pathname === data.path ||
                            data.action.includes(location.pathname)
                              ? "active"
                              : ""
                          }`}
                        ></i>
                        <span>{data.title}</span>
                      </NavLink>
                    </li>
                  ))}
                  {/* <li className="header-menu1">
                    <span>Tampilan</span>
                  </li>
                  {tampilanItems.map((data, index) => (
                    <li
                      key={index}
                      className={`body-menu ${
                        location.pathname === data.path ||
                        data.action.includes(location.pathname)
                          ? "bactive"
                          : ""
                      }`}
                      ref={(el) => (inventarisRefs.current[index] = el)}>
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
                  <li className="header-menu1">
                    <span>Komentar</span>
                  </li>
                  {komentarItems.map((data, index) => (
                    <li
                      key={index}
                      className={`body-menu ${
                        location.pathname === data.path ||
                        data.action.includes(location.pathname)
                          ? "bactive"
                          : ""
                      }`}
                      ref={(el) => (inventarisRefs.current[index] = el)}>
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
                  ))} */}
                </>
              ) : localStorage.getItem("rolename") == "Yayasan" ? (
                <>
                  {menuItemsYayasan.map((menu, index) => (
                    <React.Fragment key={index}>
                      <li className="header-menu1">
                        <span>{menu.header}</span>
                      </li>
                      {menu.items.map((data, subIndex) => (
                        <li
                          key={subIndex}
                          className={`body-menu ${
                            location.pathname === data.path ||
                            data.action.includes(location.pathname)
                              ? "active"
                              : ""
                          }`}
                          ref={(el) => (menuRefs.current[subIndex] = el)}
                        >
                          <NavLink
                            to={data.path}
                            style={{ background: "none" }}
                            // onClick={(e) => {
                            //   if (
                            //     data.title === "Daftar Cabang" ||
                            //     data.title === "Data Anak Asuh"
                            //   ) {
                            //     e.preventDefault();
                            //     setSelectedMenu(data.title);
                            //     openModal();
                            //   }
                            // }}
                          >
                            <i
                              className={`${data.icon} ${
                                location.pathname === data.path ||
                                data.action.includes(location.pathname)
                                  ? "active"
                                  : ""
                              }`}
                            ></i>
                            <span>{data.title}</span>
                          </NavLink>
                        </li>
                      ))}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  {menuItemsPengurus.map((menu, index) => (
                    <React.Fragment key={index}>
                      <li className="header-menu1">
                        <span>{menu.header}</span>
                      </li>
                      {menu.items.map((data, subIndex) => (
                        <li
                          key={subIndex}
                          className={`body-menu ${
                            location.pathname === data.path ||
                            data.action.includes(location.pathname)
                              ? "active"
                              : ""
                          }`}
                          ref={(el) => (menuRefs.current[subIndex] = el)}
                        >
                          <NavLink
                            to={data.path}
                            style={{ background: "none" }}
                          >
                            <i
                              className={`${data.icon} ${
                                location.pathname === data.path ||
                                data.action.includes(location.pathname)
                                  ? "active"
                                  : ""
                              }`}
                            ></i>
                            <span>{data.title}</span>
                          </NavLink>
                        </li>
                      ))}
                    </React.Fragment>
                  ))}
                </>
              )}
            </ul>
          </div>
          {/* {localStorage.getItem("rolename") == "Admin" ? (
            <>
            </>
          ) : localStorage.getItem("rolename") == "Yayasan" ? (
            <>
              <div className="sidebar-brand">
                <a href="#" style={{ textAlign: "center" }}>
                  LKSA
                </a>
                <div id="close-sidebar" onClick={toggleSidebar}>
                  <i className="fas fa-times"></i>
                </div>
              </div>
              <div className="sidebar-menu1">
                <ul>
                  <div>
                    {defaultItems.map((data, index) => (
                      <li
                        key={index}
                        ref={(el) => (defaultRefs.current[index] = el)}
                        className={`body-menu ${
                          location.pathname === data.path ||
                          data.action.includes(location.pathname)
                            ? "bactive"
                            : ""
                        }`}>
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
                  </div>
                  {menuItemsYayasan.map((menu, index) => (
                    <React.Fragment key={index}>
                      <div>
                        <li
                          onClick={() => toggleMenu(index)}
                          className="header-menu1" style={{padding: "8px 10px"}}>
                          <span>{menu.header}</span>
                          <span>{menu.icon}</span>
                        </li>
                        {activeMenu === index && menu.items.map((data, subIndex) => (
                          <div className="menu">
                            <li
                              key={subIndex}
                              className={`body-menus ${
                                location.pathname === data.path ||
                                data.action.includes(location.pathname)
                                  ? "active"
                                  : ""
                              }`}
                              ref={(el) => (menuRefs.current[subIndex] = el)}>
                              <NavLink
                                to={data.path}
                                style={{ background: "none" }}>
                                <i
                                  className={`${data.icon} ${
                                    location.pathname === data.path ||
                                    data.action.includes(location.pathname)
                                      ? "active"
                                      : ""
                                  }`}></i>
                                <span className="submenu-nav">
                                  {data.title}
                                </span>
                              </NavLink>
                            </li>
                          </div>
                        ))}
                      </div>
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <></>
          )} */}
        </div>
        <div className="sidebar-footer">
          <button type="button" onClick={logout}>
            <i class="fa-solid fa-right-from-bracket"></i>
            <span> Keluar</span>
          </button>
        </div>
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleForm}>
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "black",
              }}
              aria-label="Close"
            >
              ✖
            </button>{" "}
            <br />
            <div className="row">
              <div className="mb-3 col-lg-12">
                <label className="form-label font-weight-bold text-start">
                  Organisasi
                </label>
                <select
                  className="form-control"
                  value={idCabang}
                  onChange={(e) => setIdCabang(e.target.value)}
                >
                  <option>Pilih</option>
                  {cabang.map((item, idx) => (
                    <option value={item.organization_id} key={idx}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleModal(idCabang)}
              className="btn-success btn-md"
            >
              Simpan
            </button>
          </Box>
        </Modal>
      </nav>
    </>
  );
}

export default SidebarPantiAdmin;
