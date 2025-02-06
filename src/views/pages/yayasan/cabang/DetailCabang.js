import React, { useEffect, useState } from "react";
import SidebarYayasan from "../../../../component/SidebarYayasan";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";
import axios from "axios";
import { API_DUMMY_SMART } from "../../../../utils/base_URL";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function DetailCabang() {
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [data, setData] = useState(null);
  const param = useParams();

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/user/lksa/organization/` + param.id,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      console.log("Response dari API:", response.data);

      if (response.data.data.length > 0) {
        setData(response.data.data[0]);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  return (
    <div
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
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
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="ktp-card card1">
            <div className="card shadow w-100 border-none">
              <div className="card-body">
                <div className="ktp-header">
                  <h2 className="ktp-title">Detail Cabang</h2>
                </div>
                {data ? (
                  <div className="ktp-details">
                    <div className="ktp-row">
                      <div className="ktp-info">
                        <h4>Nama Panti</h4>
                        <p>{data?.nama_cabang}</p>
                      </div>
                      <div className="ktp-info">
                        <h4>Lokasi</h4>
                        <p>{data?.lokasi}</p>
                      </div>
                    </div>
                    <div className="ktp-row">
                      <div className="ktp-info">
                        <h4>Jumlah Anak Asuh</h4>
                        <p>{data?.jumlah_anak_asuh}</p>
                      </div>
                      <div className="ktp-info">
                        <h4>No. HP</h4>
                        <p>{data?.hp}</p>
                      </div>
                    </div>
                    <div className="ktp-row">
                      <div className="ktp-info">
                        <h4>Email</h4>
                        <p>{data?.email}</p>
                      </div>
                      <div className="ktp-info">
                        <h4>Saldo</h4>
                        <p>Rp {data?.saldo}</p>
                      </div>
                    </div>
                    <div className="ktp-row">
                      <div className="ktp-info">
                        <h4>Informasi Rekening</h4>
                        <p>
                          {data?.nama_bank} - {data?.nomor_rekening}
                        </p>
                      </div>
                    </div>
                    <div className="ktp-info">
                      <h4>Maps</h4>
                      <iframe
                        title="Location Map"
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.9824873682737!2d110.45976957379189!3d-6.9885941684384205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708cdb5955f7fd%3A0x2dd118c3e56d1f3a!2sPanti%20Asuhan%20Muhammadiyah!5e1!3m2!1sid!2sid!4v1733301705391!5m2!1sid!2sid`}
                        style={{ width: "100%", height: "200px", border: "0" }}
                        allowFullScreen=""
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .ktp-card {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            max-width: 650px;
            margin: auto;
            border: 2px solid #28a745;
            border-radius: 15px;
            padding: 25px;
            background-color: #f8f9fa;
          }
          .ktp-header {
            text-align: center;
            margin-bottom: 1.5rem;
          }
          .ktp-title {
            font-family: "Poppins", sans-serif;
            font-size: 1.8rem;
            font-weight: bold;
            color: #28a745;
          }
          .ktp-details {
            font-family: "Poppins", sans-serif;
          }
          .ktp-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1.5rem;
          }
          .ktp-info {
            width: 48%;
          }
          .ktp-info h4 {
            font-size: 1.1rem;
            font-weight: bold;
            color: #3c763d;
          }
          .ktp-info p {
            font-size: 1rem;
            color: #555;
          }
          .ktp-info p, .ktp-info h4 {
            padding: 0.5rem;
            border-radius: 8px;
          }
          .ktp-info h4 {
            background-color: #e9f7e3;
          }
          .ktp-info p {
            background-color: #f1f8f4;
          }
          iframe {
            border-radius: 8px;
          }
          .ktp-footer {
            text-align: center;
            margin-top: 2rem;
          }
        `}
      </style>
    </div>
  );
}

export default DetailCabang;
