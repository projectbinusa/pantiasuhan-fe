import axios from "axios";
import React, { useState } from "react";
import "../../../css/login.css";
import { API_DUMMY } from "../../../utils/base_URL";
import Swal from "sweetalert2";
import Ikon from "../../../aset/ikon-web.png"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_DUMMY}/register`, {
        username,
        password,
        role,
      });

      if (response.data === "Username already taken") {
        Swal.fire({
          icon: "error",
          title: "Username sudah terdaftar. Pilih username lain.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setShow(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil Register",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/login");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setShow(false);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan saat mendaftar. Coba lagi nanti.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <div className="containeriimg d-flex justify-content-center align-items-center min-vh-100">
        {/* <!----------------------- Login Container --------------------------> */}

        <div style={{background:" rgb(241, 246, 249)",
                 border: "1px solid blue", boxShadow: "rgba(47, 60, 95, 0.24) 0px 6px 10px"}}
          id="responsive-login"
          className="row border rounded-5 p-3 bg-white  box-area padding-login"
        >
          {/* <!--------------------------- Left Box -----------------------------> */}

          <div id="gambar"
            className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box img-login"

          >
            <div className="featured-image mb-3 img-login-register">
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/form-4721284-3927997.png"
                className="img-fluid img-login"
                style={{ width: "250px" }}
              />
            </div>
          </div>

          {/* <!-------------------- ------ Right Box ----------------------------> */}

          <div className="col-md-6 right-box max-h-screen">
            <form onSubmit={handleSubmit} className="row align-items-center">
              <div className="header-text text-center">
                <h2>
                  <img
                    style={{ width: "40px",  }}
                    src={Ikon}

                  />{" "}
                  Register
                </h2>
                <p>Buat Akun Sekarang Agar Bisa Login</p>
              </div>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg bg-light fs-6"
                  name="Username"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type={showPassword ? "text" : "password"} // Menampilkan atau menyembunyikan password berdasarkan nilai showPassword
                  id="password"
                  className="form-control form-control-lg bg-light fs-6"
                  name="Password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="hidden"
                  className="form-control form-control-lg bg-light fs-6"
                  required
                  value="admin"
                />
              </div>
              <p style={{ fontSize: "13px" }}>
                * Password Harus Minimal 8 Karakter Dan Ada Huruf Besar Dan
                Kecil
              </p>
              <div className="form-group mb-3 d-flex justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="showPassword"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label
                    htmlFor="showPassword"
                    className="form-check-label text-secondary"
                  >
                    <small>Tampilkan Password</small>
                  </label>
                </div>
              </div>
              <div className="input-group mb-3">
                <button
                  type="submit"
                  name="submit"
                  className="btn btn-lg btn-primary w-100 fs-6"
                >
                  Register
                </button>
              </div>
              <div className="row">
                <small>
                  Sudah Memiliki Akun Silahkan <a href="/login">Login</a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
