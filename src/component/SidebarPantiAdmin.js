import React, { useEffect, useRef } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function SidebarPantiAdmin({ toggleSidebar }) {
  const history = useHistory();
  const location = useLocation();
  const menuRefs = useRef([]);
  const inventarisRefs = useRef([]);
  const defaultRefs = useRef([]);

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

  const defaultItems = [
    {
      title: "Dashboard",
      icon: "fa-solid fa-palette",
      path: "/dashboard_panti",
      action: ["/edit_barang_inventaris"],
    }
  ]

  const menuItems = [
    {
      header: "Admin",
      items: [
        {
          title: "Sambutan",
          icon: "fa-solid fa-book-open",
          path: "/admin_sambutan",
        },
        {
          title: "Visi Misi",
          icon: "fa-solid fa-list",
          path: "/admin_visimisi",
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
          action: ["/admin_berita/add", "/admin_berita/edit", "/admin_berita/detail"],
        },
        {
          title: "Galeri",
          icon: "fa-solid fa-images",
          path: "/admin_galeri",
        },
        {
          title: "Kontak",
          icon: "fa-solid fa-id-card",
          path: "/admin_kontak",
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
        },
        {
          title: "Orang Tua Asuh",
          icon: "fa-solid fa-user",
          path: "/admin_ortu_asuh",
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
        },
      ],
    },
    {
      header: "Keuangan",
      items: [
        {

          title: "Keuangan",
          icon: "fa-solid fa-wallet",
          path: "/admin_keuangan",
        },
        {
          title: "Donasi",

          icon: "fas fa-hand-holding-heart",
          path: "/donasi",
        },
        // {
        //   title: "Dana Masuk",
        //   icon: "fas fa-plus",
        //   path: "/donasi_trx",
        //   action: ["/add_donasi_trx", "/edit_donasi_trx"],
        // },
        {
          title: "Dana Keluar",
          icon: "fas fa-minus",
          path: "/admin_dana_keluar",
        },
        {
          title: "Laporan Keuangan",
          icon: "fa-solid fa-file-invoice-dollar",
          path: "/laporan_keuangan",
        },
      ],
    },
  ];

  const inventarisItems = [
    {
      title: "Barang Inventaris",
      icon: "fa-solid fa-list",
      path: "/barang_inventaris",
    },
    {
      title: "Kategori Barang",
      icon: "fa-solid fa-list",
      path: "/kategori_barang_inventaris",
    },
    {
      title: "Status Barang",
      icon: "fa-solid fa-list",
      path: "/status_barang_inventaris",
    },
    {
      title: "Kondisi Barang",
      icon: "fa-solid fa-list",
      path: "/kondisi_barang_inventaris",
    },
    {
      title: "Lokasi Barang",
      icon: "fa-solid fa-list",
      path: "/lokasi_barang_inventaris",
    },
  ];

  return (
    <>
      <style>
        {`
          .sidebar-wrapper {
            width: 250px;
            background-color: #333;
            color: white;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            padding-top: 20px;
            padding-bottom: 20px;
          }

          .sidebar-content {
            flex: 1;
            overflow-y: auto;
          }

          .sidebar-brand {
            text-align: center;
            padding-bottom: 20px;
            font-size: 1.5rem;
          }

          .sidebar-menu1 {
            list-style: none;
            padding-left: 0;
          }

          .sidebar-menu1 li {
            margin-bottom: 15px;
          }

          .sidebar-menu1 li a {
            display: flex;
            align-items: center;
            padding: 10px;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
          }

          .sidebar-menu1 li a:hover,
          .sidebar-menu1 li a.active {
            background-color: #2E5077;
          }

          .sidebar-menu1 li a i {
            margin-right: 10px;
          }

          .sidebar-footer {
            margin-top: auto;
            text-align: center;
          }

          .sidebar-footer button {
            width: 100%;
            padding: 10px;
            background-color: #f44336;
            color: white;
            border: none;
            cursor: pointer;
          }

          .sidebar-footer button:hover {
            background-color: #d32f2f;
          }
        `}
      </style>

      <nav id="sidebar" className="sidebar-wrapper">
        <div className="sidebar-content">
          <div className="sidebar-brand">
            <a href="#">PANTI ASUHAN</a>
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
                >
                  <NavLink to={data.path} style={{ background: "none" }}>
                    <i
                      className={`${data.icon} ${location.pathname === data.path ||
                        data.action.includes(location.pathname)
                        ? "active"
                        : ""
                        }`}
                    ></i>
                    <span>{data.title}</span>
                  </NavLink>
                </li>
              ))}
              {menuItems.map((menu, index) => (
                <React.Fragment key={index}>
                  <li className="header-menu1">
                    <span>{menu.header}</span>
                  </li>
                  {menu.items.map((data, subIndex) => (
                    <li
                      key={subIndex}
                      ref={(el) => (menuRefs.current[subIndex] = el)}
                    >
                      <NavLink to={data.path} style={{ background: "none" }}>
                        <i
                          className={`${data.icon} ${location.pathname === data.path ||
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
            </ul>

            <ul>
              {inventarisItems.map((data, index) => (

                <li
                  key={index}
                  ref={(el) => (inventarisRefs.current[index] = el)}
                >
                  <NavLink to={data.path} style={{ background: "none" }}>
                    <i
                      className={`${data.icon} ${location.pathname === data.path ||
                        data.action.includes(location.pathname)
                        ? "active"
                        : ""
                        }`}
                    ></i>
                    <span>{data.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sidebar-footer">
          <button onClick={logout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </nav>
    </>
  );
}

export default SidebarPantiAdmin;
