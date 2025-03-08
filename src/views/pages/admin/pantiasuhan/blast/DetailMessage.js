import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";

function DetailMessage() {
  const [redaksi, setRedaksi] = useState("");
  const [receivers, setReceivers] = useState([]);
  const param = useParams();

  // get by id berita
  useEffect(() => {
    axios
      .get(`${API_DUMMY_SMART}/api/customer/blast/` + param.id, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((res) => {
        const list_data = res.data.data;
        console.log(list_data);
        setRedaksi(list_data?.redaksi);
        setReceivers(list_data?.receivers)
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  }, [param.id]);

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
      <div
        style={{ marginTop: "10px" }}
        className="page-content1 mt-3 mb-3 app-main__outer"
      >
        <div className="container box-tabel">
          <div className="card shadow w-100">
            <h1 className="title card-header fw-bold fs-3">Detail Pesan</h1>
            <br />
            <div className="card-body">
              <div className="row">
                <div className="mb-3 col-lg-12">
                  <label className="form-label font-weight-bold">
                    Redaksi Teks
                  </label>
                  <textarea value={redaksi} rows={6} className="form-control" disabled></textarea>
                </div>
                <div className="mb-3 col-lg-12">
                  <label className="form-label font-weight-bold">
                    No Whatsapp Penerima
                  </label>
                  <div>
                    {receivers.map((data, index) => (
                      <div key={index} className="d-flex align-items-center justify-content-between p-2 rounded mb-2">
                        <p className="m-0 font-weight-bold">{data}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button type="button" className="btn-kembali btn-danger mt-3 px-0">
              <a
                href="/message"
                style={{ color: "white", textDecoration: "none" }}
              >
                Kembali
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailMessage;
