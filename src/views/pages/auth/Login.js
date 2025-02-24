import React, { useEffect, useState } from "react";
import "../../../css/login.css";
import { API_DUMMY_SMART } from "../../../utils/base_URL";
import { useHistory } from "react-router-dom";
import Ikon from "../../../aset/ikon-web.png";
import Swal from "sweetalert2";
import axios from "axios";
import logo from "../../../aset/pantiasuhan/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, seRole] = useState("admin");
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [type_token, setType_token] = useState("Admin");

  useEffect(() => {
    const token = localStorage.getItem("tokenpython");
    const rolename = localStorage.getItem("rolename");
    if (token && rolename === "Admin") {
      window.location.href = "/dashboard_panti"; // Redirect langsung
    } else if (token && rolename === "Yayasan") {
      window.location.href = "/dashboard_yayasan"; // Redirect langsung
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const datapython = {
      email: email,
      password: password,
    };

    try {
      if (type_token === "Yayasan") {
        const response = await axios.post(`${API_DUMMY_SMART}/api/user/login`, datapython);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: `Berhasil Login Sebagai Yayasan`,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            localStorage.setItem("id", response.data.data.id);
            localStorage.setItem("typetoken", response.data.data.type_token);
            localStorage.setItem("tokenpython", response.data.data.token);
            localStorage.setItem("rolename", response.data.data.role_name);
            localStorage.setItem("roleid", response.data.data.role_id);
            localStorage.setItem("organizationids", response.data.data.organization_ids);
            if (response.data.data.role_name === "Yayasan") {
              history.push("/dashboard_yayasan");
            } else {
              history.push("/dashboard_panti");
            }
          });
        }
      } else {
        const resp = await axios.post(`${API_DUMMY_SMART}/api/customer/login`, datapython);
        console.log(resp);

        if (resp.status === 200) {
          Swal.fire({
            icon: "success",
            title: `Berhasil Login Sebagai Admin`,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            localStorage.setItem("id", resp.data.data.id);
            localStorage.setItem("typetoken", resp.data.data.type_token);
            localStorage.setItem("tokenpython", resp.data.data.token);
            localStorage.setItem("rolename", "Admin");
            localStorage.setItem("organization_id", resp.data.data.organization_id);
            history.push("/dashboard_panti");
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Username atau Password Salah",
      });
      console.error(error);
    }
  };

  const handleOptionChange = (event) => {
    setType_token(event.target.value);
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
            <div className="selector">
              <div className="selector-item">
                <input
                  type="radio"
                  id="radio1"
                  name="selector"
                  className="selector-item_radio"
                  checked={type_token === "Admin"}
                  value="Admin"
                  onChange={handleOptionChange}
                />
                <label htmlFor="radio1" className="selector-item_label">
                  Admin
                </label>
              </div>
              <div className="selector-item">
                <input
                  type="radio"
                  id="radio2"
                  name="selector"
                  className="selector-item_radio"
                  checked={type_token === "Yayasan"}
                  value="Yayasan"
                  onChange={handleOptionChange}
                />
                <label htmlFor="radio2" className="selector-item_label">
                  Yayasan
                </label>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg bg-light fs-6"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
      <style>
        {`
        .selector {
    position: relative;
    width: 100%;
    height: 65px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 9999px;
}
        .selector-item_label {
        position: relative;
    height: 60%;
    width: 100%;
    text-align: center;
    border-radius: 9999px;
    font-size: 15px;
    font-family: Poppins, sans-serif;
    font-weight: 700;
    transition-duration: .5s;
    transition-property: transform, box-shadow;
    transform: none;
        }
    .selector-item_radio {
    appearance: none;
    display: none;
}

.selector-item_radio:checked+.selector-item_label {
    background-color: #005b9f;
    color: white;
    box-shadow: 0 0 4px #00000080, 0 2px 4px #00000080;
    transform: translateY(-2px);
    padding: 0.5rem 2rem;
}
        `}
      </style>
    </div>
  );
}

export default Login;
