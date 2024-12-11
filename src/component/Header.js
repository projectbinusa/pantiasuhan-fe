import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import { API_DUMMY } from "../utils/base_URL";
import axios from "axios";
import logo from "../aset/smpn1bergas.png";

function Header({ toggleSidebar }) {
  const [isSticky, setIsSticky] = useState(false);
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // const [informasi, setInformasi] = useState([]);
  // const getInformasi = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/bawaslu/api/jenis-informasi/all`,
  //       {
  //         headers: {
  //           "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
  //         },
  //       }
  //     );
  //     setInformasi(response.data.data);
  //     console.log(response.data.data);
  //   } catch (error) {
  //     console.error("Terjadi Kesalahan", error);
  //   }
  // };

  // const [regulasi, setRegulasi] = useState([]);
  // const getRegulasi = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY}/bawaslu/api/jenis-regulasi/all`,
  //       {
  //         headers: {
  //           "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
  //         },
  //       }
  //     );
  //     setRegulasi(response.data.data);
  //     console.log(response.data.data);
  //   } catch (error) {
  //     console.error("Terjadi Kesalahan", error);
  //   }
  // };

  // useEffect(() => {
  //   getInformasi();
  //   // getRegulasi();
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

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
          title: "Berhasil Logout",
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
  return (
    <>
      <div className="app-header header-shadow">
        <div className="app-header__logo">
          <img className="logosmpn1bergas" src={logo} />
          <div className="header__pane ml-auto">
            <div></div>
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              onClick={toggleSidebar}
              className="hamburger hamburger--elastic mobile-toggle-nav">
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
        <div className="app-header__menu">
          <span>
            <button
              onClick={logout}
              type="button"
              className="btn-shadow p-1 btn-danger btn-sm">
              <i className="fas fa-sign-out-alt d-none d-md-none d-lg-flex"></i>{" "}
              Logout
            </button>
          </span>
        </div>{" "}
        <div className="app-header__content">
          <div className="app-header-right">
            <button
              onClick={logout}
              type="button"
              className="btn-shadow p-1 btn-danger btn-sm">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
            <div className="header-btn-lg pr-0">
              <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left"></div>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default Header;
