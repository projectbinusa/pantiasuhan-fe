import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Profile() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nohp, setNoHp] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState(0);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/customer/profile`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      const res = response.data.data;
      console.log("response: ", response.data.data);
      setNama(res.name);
      setEmail(res.email);
      setNoHp(res.hp);
      setAddress(res.address);
      setImage(res.picture)
      setId(res.id);
    } catch (error) {
      console.error("Terjadi Kesalahan: ", error.message || error);
    }
  };

  useEffect(() => {
    getAll();
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
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
        }`}
    >
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}
      >
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "5px" }}>
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="box-tabel">
            <div className="card shadow w-100">
              <div className="title card-header d-flex justify-content-between">
                <h1 className="fw-bold fs-3">Profile</h1>
                <div>
                  <button type="button" className="btn-primary btn-sm mr-2">
                    <a
                      style={{
                        color: "white",
                        textDecoration: "none",
                      }}
                      href={`/profile/edit/${id}`}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </a>
                  </button>
                </div>
              </div>
              <br />
              <div className="card-body">
                <img className={`w-75 d-block mr-auto ml-auto ${image === null ? "rounded-circle" : ""}`}
                  style={ image === null ? {} : { maxWidth: "400px", maxHeight: "400px" }}
                  src={ image === null ? "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png" : image }
                  alt="Foto Logo Panti"
                />
                <br />
                <br />
                <div className="mb-3">
                  <label className="form-label fw-bold">Nama Panti</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={nama}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={email}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">No HP</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={nohp}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Alamat</label>
                  <div
                    className="form-control"
                    style={{ height: "auto", background: "#e9ecef" }}
                    dangerouslySetInnerHTML={{ __html: address }}
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

export default Profile;