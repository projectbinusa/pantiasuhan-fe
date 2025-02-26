import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import "ckeditor5/ckeditor5.css";
import { API_DUMMY_SMART } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function AddCabang() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hp, setHp] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState("fa-solid fa-eye-slash");
  const [passwordType, setPasswordType] = useState("password");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  //add
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      name,
      active,
      email,
      address,
      hp,
      password,
    };
    try {
      await axios.post(`${API_DUMMY_SMART}/api/user/customer`, data, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`, // Token auth-tgh
        },
      });
      // //console.log(unique_id);
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      // //console.log(data);
      setTimeout(() => {
        window.location.reload();
        history("/cabang");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    AOS.init();
  }, []);

  const [sidebarToggled, setSidebarToggled] = useState(true);

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  const handleResize = () => {
    if (window.innerWidth < 800) {
      setSidebarToggled(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
      }`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}>
        <i className="fas fa-bars"></i>
      </a>
      {/* <Header toggleSidebar={toggleSidebar} /> */}
      {/* <div className="app-main"> */}
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div
        style={{ marginTop: "10px" }}
        className="page-content1 mb-3 app-main__outer"
        data-aos="fade-left">
        <div
          className="container mt-3 mb-3 app-main__outer"
          data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Tambah Data</h1>
                    <hr />
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Nama Cabang
                          </label>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukan Nama Cabang"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            HP
                          </label>
                          <input
                            value={hp}
                            onChange={(e) => setHp(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan No HP"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Kota/Kabupaten
                          </label>
                          <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Kabupaten / Kota"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Email
                          </label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Email"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Password
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="form-control form-control-lg bg-light fs-6"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="input-group mb-5 d-flex justify-content-between">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="showPassword"
                                onChange={() => setShowPassword(!showPassword)} // Mengubah nilai showPassword saat checkbox diubah
                              />
                              <label
                                htmlFor="showPassword"
                                className="form-check-label text-secondary">
                                <small>Tampilkan Password</small>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin_sambutan">
                          Batal
                        </a>
                      </button>
                      <button type="submit" className="btn-primary mt-3">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        .ck-editor__editable {
          min-height: 400px;
        }
        `}
      </style>
    </div>
  );
}

export default AddCabang;
