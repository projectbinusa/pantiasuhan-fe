import React, { useEffect, useRef, useState } from "react";
import "../../src/component/sidebar.css";
import Swal from "sweetalert2";
import {
  NavLink,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

function SidebarPantiAdmin({ toggleSidebar }) {
  const history = useHistory();
  const menuRefs = useRef([]);
  const inventarisRefs = useRef([]);
  const defaultRefs = useRef([]);
  const [activeMenu, setActiveMenu] = useState(null); // State untuk melacak menu aktif
  const location = useLocation();

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
      header: "Admin",
      items: [
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
    //     {
    //       title: "Laporan Keuangan",
    //       icon: "fa-solid fa-file-invoice-dollar",
    //       path: "/laporan_keuangan",
    //       action: [],
    //     },
    //   ],
    // },
  ];

  const menuItemsYayasan = [
    {
      header: "CABANG",
      items: [
        {
          title: "Daftar Cabang",
          icon: "fa-solid fa-book-open",
          path: "/daftar-cabang",
          action: [""],
        },
        // {
        //   title: "Organization",
        //   icon: "fa-solid fa-book-open",
        //   path: "/user-organization",
        //   action: [""],
        // },
        // {
        //   title: "Buat Cabang Baru",
        //   icon: "fa-solid fa-list",
        //   path: "/add-cabang",
        //   action: [""],
        // },
      ],
      icon: <i class="fa-solid fa-angle-down"></i>,
    },
    // {
    //   header: "KEUANGAN",
    //   items: [
    //     {
    //       title: "Data Keuangan",
    //       icon: "fa-solid fa-book-open",
    //       path: "",
    //       action: [""],
    //     },
    //     {
    //       title: "Laporan Keuangan",
    //       icon: "fa-solid fa-book-open",
    //       path: "",
    //       action: [""],
    //     },
    //   ],
    //   icon: <i class="fa-solid fa-angle-down"></i>,
    // },
    {
      header: "Donasi",
      items: [
        {
          title: "Donasi Masuk",
          icon: "fa-solid fa-book-open",
          path: "/donasitrx_masuk_yayasan",
          action: [""],
        },
        {
          title: "Donasi Keluar",
          icon: "fa-solid fa-book-open",
          path: "donasitrx_keluar_yayasan",
          action: [""],
        },
        {
          title: "Laporan Donasi",
          icon: "fa-solid fa-list",
          path: "/laporan-donasi",
          action: [""],
        },
      ],
      icon: <i class="fa-solid fa-angle-down"></i>,
    },
    {
      header: "INVENTARIS",
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
      header: "PERSONALIA",
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
          {localStorage.getItem("rolename") == "Admin" ? (
            <>
              {" "}
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
                  {localStorage.getItem("rolename") != "Yayasan" ? (
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
                          ref={(el) => (inventarisRefs.current[index] = el)}>
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
                            <span>{data.title}</span>
                          </NavLink>
                        </li>
                      ))}
                    </>
                  ) : (
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
            </>
          ) : localStorage.getItem("rolename") == "Yayasan" ? (
            <>
              {" "}
              <div className="sidebar-brand">
                <a
                  href="#"
                  style={{
                    textAlign: "center",
                    color: "#0d9c1e",
                    fontSize: "25px",
                  }}>
                  LKSA JATENG
                </a>
                <div id="close-sidebar" onClick={toggleSidebar}>
                  <i className="fas fa-times"></i>
                </div>
              </div>
              <div className="sidebar-menu1" style={{ marginBottom: "30px" }}>
                <ul>
                  <br />
                  <div
                    style={{
                      paddingLeft: "25px",
                      paddingRight: "25px",
                    }}>
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
                      <div
                        style={{ paddingLeft: "25px", paddingRight: "25px" }}>
                        <li
                          onClick={() => toggleMenu(index)}
                          className="header-menu1">
                          <span>{menu.header}</span>
                          <span>{menu.icon}</span>
                        </li>
                        {activeMenu === index && menu.items.map((data, subIndex) => (
                          <div className="menu">
                            <li
                              key={subIndex}
                              className={`body-menu ${
                                location.pathname === data.path ||
                                data.action.includes(location.pathname)
                                  ? "active"
                                  : ""
                              }`}
                              ref={(el) => (menuRefs.current[subIndex] = el)}>
                              <NavLink
                                to={data.path}
                                style={{ background: "none" }}>
                                {/* <i
                                  className={`${data.icon} ${
                                    location.pathname === data.path ||
                                    data.action.includes(location.pathname)
                                      ? "active"
                                      : ""
                                  }`}></i> */}
                                <span className="title-sidebar">
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
          )}
        </div>
        <div className="sidebar-footer">
          <button type="button" onClick={logout}>
            <i class="fa-solid fa-right-from-bracket"></i>
            <span> Keluar</span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default SidebarPantiAdmin;
