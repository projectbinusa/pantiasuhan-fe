import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { API_DUMMY } from "../../../../../utils/base_URL";

function Web() {
  const [logo, setLogo] = useState("");
  const [bg, setBg] = useState("");
  const [bg2, setBg2] = useState("");
  const [font, setFont] = useState("");
  const [id, setId] = useState("");
  const [datas, setDatas] = useState(null);

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/admin/web`, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      });

      const res = response.data.data;
      if (res) {
        setDatas(res);
        setLogo(res.logo);
        setFont(res.font);
        setBg(res.background);
        setBg2(res.background2);
        setId(res.id);
      }
    } catch (error) {
      console.error("Terjadi Kesalahan:", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const [sidebarToggled, setSidebarToggled] = useState(true);
  const toggleSidebar = () => setSidebarToggled(!sidebarToggled);

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
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="box-tabel">
            <div className="card shadow w-100">
              <div className="title card-header d-flex justify-content-between">
                <h1 className="fw-bold fs-3">Web</h1>
                {datas && Object.keys(datas).length > 0 ? (
                  <button type="button" className="btn-primary btn-sm mr-2">
                    <a
                      href={`/web/edit/${id}`}
                      style={{ color: "white", textDecoration: "none" }}>
                      <i className="fa-solid fa-pen-to-square"></i> Edit
                    </a>
                  </button>
                ) : (
                  <button className="btn-focus p-2 rounded">
                    <a
                      href="/seting_tampilan_web"
                      style={{ color: "white", textDecoration: "none" }}>
                      Seting Tampilan Web
                    </a>
                  </button>
                )}
              </div>
              <div className="card-body">
                <img
                  className="w-75 d-block mx-auto"
                  style={{
                    maxWidth: "400px",
                    maxHeight: "400px",
                    borderRadius: logo ? "0" : "50%",
                  }}
                  src={
                    logo ||
                    "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"
                  }
                  alt="Logo Web"
                />
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Warna Background 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={bg || ""}
                    disabled
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
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Warna Background 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={bg2 || ""}
                    disabled
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
                <div className="mb-3">
                  <label className="form-label fw-bold">Font</label>
                  <input
                    type="text"
                    className="form-control"
                    value={font || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Web;
