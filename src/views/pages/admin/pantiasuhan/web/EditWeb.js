import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { uploadImageToS3 } from "../../../../../utils/uploadToS3";
import { SketchPicker } from "react-color";

function EditWeb() {
  const [file, setFile] = useState(null);
  const [logo, setLogo] = useState("");
  const [bg, setBg] = useState("#ffffff"); // Default warna putih
  const [bg2, setBg2] = useState("#ffffff");
  const [font, setFont] = useState("");
  const history = useHistory();
  const param = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/admin/web/` + param.id, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setLogo(response.logo || "");
        setBg(response.background || "#ffffff");
        setBg2(response.background2 || "#ffffff");
        setFont(response.font || "");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const update = async (e) => {
    e.preventDefault();

    let imageUrl;

    if (file) {
      imageUrl = await uploadImageToS3(file);
    } else {
      imageUrl = logo;
    }

    const data = {
      font: font,
      background: bg,
      background2: bg2,
      logo: imageUrl,
    };
    try {
      const response = await axios.put(`${API_DUMMY}/api/admin/web/` + param.id, data, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      if (response.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Setting Web",
          showConfirmButton: false,
          timer: 1500,
        });

        // Redirect setelah berhasil
        setTimeout(() => {
          history.push("/web");
        }, 1500);
      } else {
        // Handle respons lain dengan pesan error
        Swal.fire({
          icon: "error",
          title: "Edit Data Gagal!",
          text: response.data.message, // Tambahkan pesan error dari respons
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Edit Data Gagal!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    } finally {
      setIsLoading(false); // Matikan loading setelah selesai
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

  useEffect(() => {
    if (font) {
      // Hapus link lama jika ada
      const existingLink = document.getElementById("dynamic-font");
      if (existingLink) {
        document.head.removeChild(existingLink);
      }

      // Buat link baru untuk Google Fonts
      const link = document.createElement("link");
      link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s/g, "+")}:wght@400&display=swap`;
      link.rel = "stylesheet";
      link.id = "dynamic-font";
      document.head.appendChild(link);

      // Ubah variable CSS agar font berlaku di seluruh aplikasi
      document.documentElement.style.setProperty("--custom-font", `'${font}', serif`);
    }
  }, [font]);


  return (
    <div
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
        }`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}>
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div
        style={{ marginTop: "50px" }}
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
                    <h1 className="fs-4">Setting Web</h1>
                    <hr />

                    <form onSubmit={update}>
                      <div className="row">
                        {/* Warna Background1 */}
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Warna Background1
                          </label>
                          <SketchPicker
                            color={bg}
                            onChangeComplete={(color) => setBg(color.hex)}
                          />
                          <div
                            style={{
                              width: "100px",
                              height: "30px",
                              backgroundColor: bg || "#ffffff",
                              marginTop: "10px",
                              border: "1px solid #000",
                            }}></div>
                        </div>

                        {/* Warna Background2 */}
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Warna Background2
                          </label>
                          <SketchPicker
                            color={bg2}
                            onChangeComplete={(color) => setBg2(color.hex)}
                          />
                          <div
                            style={{
                              width: "100px",
                              height: "30px",
                              backgroundColor: bg2 || "#ffffff",
                              marginTop: "10px",
                              border: "1px solid #000",
                            }}></div>
                        </div>

                        {/* Font */}
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Font
                          </label>
                          <select
                            className="form-control"
                            value={font}
                            onChange={(e) => setFont(e.target.value)}>
                            <option value="Poppins">Poppins</option>
                            <option value="Roboto">Roboto</option>
                            <option value="Open Sans">Open Sans</option>
                            <option value="Lato">Lato</option>
                          </select>
                        </div>

                        {/* Upload Logo */}
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Logo
                          </label>
                          <input
                            onChange={(e) =>
                              setFile(e.target.files ? e.target.files[0] : null)
                            }
                            type="file"
                            className="form-control"
                          />
                        </div>
                      </div>

                      {/* Tombol */}
                      <button
                        type="button"
                        className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/web">
                          Batal
                        </a>
                      </button>
                      <button type="submit" className="btn-primary mt-3" disabled={isLoading}>
                        {isLoading ? <span className="loader"></span> : "Kirim"}
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

export default EditWeb;
