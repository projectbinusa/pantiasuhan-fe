import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";

function DetailProgram() {
    const [namaprogram, setNamaProgram] = useState("");
    const [judulProgram, setJudulProgram] = useState("");
    const [tujuan, setTujuan] = useState("");
    const param = useParams();

    useEffect(() => {
        axios
          .get(`${API_DUMMY}/smpn1bergas/api/program/get/` + param.id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            const response = res.data.data;
            setNamaProgram(response.namaProgram);
            setJudulProgram(response.judulProgram);
            setTujuan(response.tujuan);
        })
        .catch((error) => {
          alert("Terjadi Kesalahan " + error);
        });
    }, [param.id]);

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="box-tabel">
            <form className="card shadow w-100">
              <h1 className="title card-header fw-bold fs-3">Detail</h1>
              <br />
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">Nama Program</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={namaprogram}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Judul Program</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={judulProgram}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Tujuan</label>
                  <div className="form-control" style={{ height:"auto", background: "#e9ecef" }} dangerouslySetInnerHTML={{ __html: tujuan }} />
                </div>
              </div>
              <button
                type="submit"
                className="btn-kembali btn-danger mt-3 mr-3">
                <a
                  href="/admin-program"
                  style={{ color: "white", textDecoration: "none" }}>
                  {" "}
                  Kembali
                </a>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProgram;
