import React, { useState } from "react";
import "../../../css/login.css";
import logo from "../../../aset/smpn1bergas.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { API_DUMMY } from "../../../utils/base_URL";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, seRole] = useState("admin");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
      role: role,
    };
    try {
      const response = await axios.post(`${API_DUMMY}/login`, data);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Login Sebagai Adminn",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-berita");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        localStorage.setItem("id", response.data.userData.id);
        localStorage.setItem("role", response.data.userData.role);
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Username / Password Salah",
      });
      console.error(error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-image">
          <img
            src="https://static.vecteezy.com/system/resources/previews/010/998/284/non_2x/3d-password-input-illustration-design-free-png.png"
            alt="Password Illustration"
          />
        </div>
        <div className="login-form">
          <div className="login-logo">
            <img src={logo} alt="School Logo" className="login-scholl" />
          </div>
          <h2>Login</h2>
          <p>Selamat Datang Kembali</p>
          <form onSubmit={handleLogin} >
            <div className="form-group">
              <input
                type="text"
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                aria-label="Username"
              />
            </div>
            <div className="form-group">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                aria-label="Password"
              />
            </div>
            <div className="form-checkbox">
              <input
                type="checkbox"
                id="show-password"
                checked={passwordVisible}
                onChange={togglePasswordVisibility}
                aria-label="Show Password"
              />
              <label htmlFor="show-password"><small>Tampilkan Password</small></label>
            </div>
            <button className="btn btn-lg btn-primary w-100 fs-6" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
