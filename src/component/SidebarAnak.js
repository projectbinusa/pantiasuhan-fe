import React, { useEffect, useRef, useState } from "react";
import "../../src/component/sidebar.css"; // Assuming you have the CSS in this file
import Swal from "sweetalert2";
import {
  NavLink,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

function SidebarAnak({ toggleSidebar }) {
  const history = useHistory();
  const location = useLocation();
  const menuRefs = useRef([]);

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
      title: "Laporan Harian",
      icon: "fa-solid fa-book-open",
      path: "/laporan-harian",
      action: [],
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
              </li>
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

export default SidebarAnak;
