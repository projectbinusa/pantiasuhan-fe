import React, { useState } from "react";
import "../../../css/login.css";
import { API_DUMMY, API_DUMMY_PYTHON, API_DUMMY_SMART_DEV } from "../../../utils/base_URL";
import { useHistory } from "react-router-dom";
import Ikon from "../../../aset/ikon-web.png";
import Swal from "sweetalert2";
import axios from "axios";
import logo from "../../../aset/pantiasuhan/logo.png";

function LoginSiswa() {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const [role, seRole] = useState("admin");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      uniqueId: uniqueId,
      password: password,
      role: role,
    };
    const datapython = {
      uniqueId: uniqueId,
      password: password,
    };
    try {
      const response = await axios.post(`${API_DUMMY_SMART_DEV}/api/member/login`, datapython);;

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Login Sebagai Anak",
          showConfirmButton: false,
          timer: 1500,
        });
        // const responsepython = await axios.post(`${API_DUMMY_PYTHON}/api/signin/admin`, datapython);
        // console.log(responsepython);


        localStorage.setItem("id", response.data.data.id);
        localStorage.setItem("role", response.data.data.role);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("tokenpython", response.data.data.token);
        setTimeout(() => {
          history.push("/siswa/data-absen");
        }, 1500);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Username atau Password Salah",
      });
      console.error(error);
    }
  };

  return (
    <div className="container iimg d-flex justify-content-center align-items-center min-vh-100">
      <div
        style={{
          background: " rgb(241, 246, 249)",
          border: "1px solid blue",
          boxShadow: "rgba(47, 60, 95, 0.24) 0px 6px 10px",
        }}
        id="responsive-login"
        className="row border rounded-5 p-3 bg-white box-area padding-login">
        <div
          id="gambar"
          className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box img-login">
          <div className="featured-image mb-3 img-login">
            <img
              src="https://static.vecteezy.com/system/resources/previews/010/998/284/non_2x/3d-password-input-illustration-design-free-png.png"
              className="img-fluid img-login"
              style={{ width: "250px" }}
            />
          </div>
        </div>
        <div className="col-md-6 right-box">
          <form onSubmit={handleLogin} className="row align-items-center">
            <div
              className="header-text mb-4 text-center "
              style={{ marginTop: "20px" }}>
              <h2>
                <img style={{ width: "50px" }} src={logo} /> Login
              </h2>
              <p>Selamat Datang Kembali</p>
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg bg-light fs-6"
                required
                placeholder="Unique ID"
                value={uniqueId}
                onChange={(e) => setUniqueId(e.target.value)}
              />
            </div>
            <div className="input-group mb-1">
              <input
                type={showPassword ? "text" : "password"} // Menampilkan atau menyembunyikan password berdasarkan nilai showPassword
                id="password"
                className="form-control form-control-lg bg-light fs-6"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
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
            <div className="input-group mb-3">
              <button
                type="submit"
                className="btn btn-lg btn-primary w-100 fs-6">
                Login
              </button>
            </div>
            {/* <div className="row">
            <small>
              Belum Memiliki Akun ? Silahkan <a href="/register">Register</a>
            </small>
          </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginSiswa;
