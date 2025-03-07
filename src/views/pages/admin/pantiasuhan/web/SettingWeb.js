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

function SettingWeb() {
  const [file, setFile] = useState(null);
  const [logo, setLogo] = useState("");
  const [bg, setBg] = useState("#ffffff");
  const [bg2, setBg2] = useState("#ffffff");
  const [font, setFont] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const param = useParams();

  const add = async (e) => {
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
      logo: await uploadImageToS3(file),
    };

    await axios
      .post(`${API_DUMMY}/api/admin/web`, data, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Setting Web",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          history.push("/web");
        }, 1500);
      })
      .catch((error) => {
        if (error.ressponse && error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: "Edit Data Gagal!",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(error);
        }
      });
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
                    <form onSubmit={add}>
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
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Font
                          </label>
                          <input
                            value={font}
                            onChange={(e) => setFont(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                          />
                        </div>

                        {/* Upload Logo */}
                        <div className="mb-3 col-lg-12">
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
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/web">
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

export default SettingWeb;
