import React, { useEffect, useState } from "react";
import "../../src/component/sidebar.css"; // Assuming you have the CSS in this file
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Sidebar1({ toggleSidebar }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const history = useHistory();
  const logout = () => {
    Swal.fire({
      title: "Keluar Dari Akun Anda ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Success Logout",
          showConfirmButton: false,
          timer: 1500,
        });
        //Untuk munuju page selanjutnya
        history.push("/login");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        localStorage.clear();
      }
    });
  };
  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  //   const toggleSidebar = () => {
  //     setSidebarToggled(!sidebarToggled);
  //   };

  const menuItems = [
    {
      title: "Berita",
      icon: "fa-regular fa-rectangle-list",
      path: "/admin-berita",
      //   badge: { text: "New", type: "warning" },
      //   submenu: ["Dashboard 1", "Dashboard 2", "Dashboard 3"],
    },
    {
      title: "Kontak",
      icon: "fa-solid fa-id-card",
      path: "/admin-kontak",
    },
    {
      title: "Alumni",
      icon: "fa-solid fa-book-open",
      path: "/admin-alumni",
    },
    {
      title: "Perpustakaan",
      icon: "fa-solid fa-book",
      path: "/admin-perpustakaan",
    },
    {
      title: "Kotak Saran",
      icon: "fas fa-comment-dots",
      path: "/admin-kotak-saran",
    },
    {
      title: "Meteri Ajar",
      icon: "fas fa-file-alt",
      path: "/admin-materi-ajar",
    },
    {
      title: "Galeri",
      icon: "fa-solid fa-images",
      path: "/admin-galery",
    },
    {
      title: "Keuangan",
      icon: "fa-solid fa-circle-dollar-to-slot",
      path: "/admin-keuangan",
    },
  ];

  const profileItem = [
    {
      title: "Sejarah",
      icon: "fas fa-comment-dots",
      path: "/admin-sejarah",
    },
    {
      title: "Visi Misi",
      icon: "fa-solid fa-list",
      path: "/admin-visimisi",
    },
    {
      title: "Prestasi",
      icon: "fa-solid fa-medal metismenu-icon",
      path: "/admin-prestasi",
    },
  ];

  const siswaItem = [
    {
      title: "Osis",
      icon: "fa-solid fa-users",
      path: "/admin-osis",
    },
    {
      title: "Ekstrakurikuler",
      icon: "fa-solid fa-people-robbery",
      path: "/admin-ekstrakulikuler",
    },
  ];

  const saprasItem = [
    {
      title: "Sarana",
      icon: "fas fa-tools",
      path: "/admin-sarana",
    },
    {
      title: "Kegiatan",
      icon: "fas fa-calendar-alt",
      path: "/admin-kegiatan",
    },
    {
      title: "Struktur",
      icon: " fas fa-sitemap",
      path: "/admin-struktur",
    },
    {
      title: "Program",
      icon: "fas fa-tasks",
      path: "/admin-program",
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
      {/* <div
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
      }`}> */}

      <nav id="sidebar" className="sidebar-wrapper">
        <div className="sidebar-content">
          <div className="sidebar-brand">
            <a href="#">SMPN1 Bergas</a>
            <div id="close-sidebar" onClick={toggleSidebar}>
              <i className="fas fa-times"></i>
            </div>
          </div>
          {/* <div className="sidebar-header">
            <div className="user-pic">
              <img className="img-responsive img-rounded" src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg" alt="User" />
            </div>
            <div className="user-info">
              <span className="user-name">
                Jhon <strong>Smith</strong>
              </span>
              <span className="user-role">Administrator</span>
              <span className="user-status">
                <i className="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div> */}
          <div className="sidebar-menu1">
            <ul>
              {/* <li className="header-menu1">
                <span>Menu</span>
              </li>
              {menuItems.map((item, index) => (
                <li
                  className={`sidebar-dropdown ${
                    activeDropdown === index ? "active" : ""
                  }`}
                  key={index}>
                  <a href="#" onClick={() => handleDropdownClick(index)}>
                    <i className={item.icon}></i>
                    <span>{item.title}</span>
                    {item.badge && (
                      <span
                        className={`badge badge-pill badge-${item.badge.type}`}>
                        {item.badge.text}
                      </span>
                    )}
                  </a>
                  <div
                    className="sidebar-submenu"
                    style={{
                      display: activeDropdown === index ? "block" : "none",
                    }}>
                    <ul>
                      {item.submenu.map((subitem, subindex) => (
                        <li key={subindex}>
                          <a href="#">{subitem}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))} */}
              <li className="header-menu1">
                <span>Menu</span>
              </li>{" "}
              {menuItems.map((data, index) => (
                <li key={index}>
                  <a href={data.path}>
                    <i class={data.icon}></i>
                    <span>{data.title}</span>
                    {/* <span class="badge badge-pill badge-primary">Beta</span> */}
                  </a>
                </li>
              ))}
              <li className="header-menu1">
                <span>Profile Sekolah</span>
              </li>
              {profileItem.map((data, index) => (
                <li key={index}>
                  <a href={data.path}>
                    <i class={data.icon}></i>
                    <span>{data.title}</span>
                    {/* <span class="badge badge-pill badge-primary">Beta</span> */}
                  </a>
                </li>
              ))}
              <li className="header-menu1">
                <span>Kesiswaan</span>
              </li>
              {siswaItem.map((data, index) => (
                <li key={index}>
                  <a href={data.path}>
                    <i class={data.icon}></i>
                    <span>{data.title}</span>
                    {/* <span class="badge badge-pill badge-primary">Beta</span> */}
                  </a>
                </li>
              ))}
              <li className="header-menu1">
                <span>Sarana Prasana</span>
              </li>
              {saprasItem.map((data, index) => (
                <li key={index}>
                  <a href={data.path}>
                    <i class={data.icon}></i>
                    <span>{data.title}</span>
                    {/* <span class="badge badge-pill badge-primary">Beta</span> */}
                  </a>
                </li>
              ))}
              {/* <li>
                <a href="#">
                  <i class="fa fa-calendar"></i>
                  <span>Calendar</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-folder"></i>
                  <span>Examples</span>
                </a>
              </li> */}
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
      {/* </div> */}
    </>
  );
}

export default Sidebar1;
