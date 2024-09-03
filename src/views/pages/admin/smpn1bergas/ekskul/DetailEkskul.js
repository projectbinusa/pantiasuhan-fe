import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DetailEkskul() {
  const [name, setName] = useState("");
  const [tempat, setTempat] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [prestasi, setPrestasi] = useState("");
  const [pembimbing, setPembimbing] = useState("");
  const [koordinator, setKoordinator] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState("");
  const param = useParams();

  // get by id berita
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/ekstrakulikuler/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const response = res.data.data;
        console.log("ekskul: ", res.data.data)
        setName(response.name);
        setKoordinator(response.koordinator);
        setPembimbing(response.pembimbing);
        setJadwal(response.jadwal);
        setTempat(response.tempat);
        setDeskripsi(response.deskripsi);
        setPrestasi(response.prestasi);
        setFile(response.foto);
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
                {file === null ? (
                  <img
                    className="rounded-circle w-75 mr-auto ml-auto d-block"
                    src="https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"
                  />
                ) : (
                  <img
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="w-75 d-block mr-auto ml-auto"
                    src={file}
                  />
                )}
                <br />
                <br />
                <div className="mb-3 col-lg-12">
                  <label className="form-label font-weight-bold">
                    Ekstrakulikuler
                  </label>
                  <input
                    value={name}
                    type="text"
                    className="form-control"
                    required
                    disabled
                    placeholder="Masukkan Ekstrakulikuler"
                  />
                </div>
                <div className="mb-3 col-lg-12">
                  <label className="form-label font-weight-bold">
                    Pembimbing
                  </label>
                  <input
                    value={pembimbing}
                    type="text"
                    className="form-control"
                    required
                    disabled
                    placeholder="Masukkan Pembimbing"
                  />
                </div>
                <div className="mb-3 col-lg-12">
                  <label className="form-label font-weight-bold">
                    Koordinator
                  </label>
                  <input
                    value={koordinator}
                    type="text"
                    className="form-control"
                    required
                    disabled
                    placeholder="Masukkan Koordinator"
                  />
                </div>
                <div className="mb-3 col-lg-12">
                  <label className="form-label font-weight-bold">Jadwal</label>
                  <input
                    value={jadwal}
                    type="text"
                    className="form-control"
                    required
                    disabled
                    placeholder="Masukkan Jadwal"
                  />
                </div>
                <div className="mb-3 col-lg-12">
                  <label className="form-label font-weight-bold">Tempat</label>
                  <input
                    value={tempat}
                    type="text"
                    className="form-control"
                    required
                    disabled
                    placeholder="Masukkan Tempat"
                  />
                </div>
                <div className="mb-3 col-lg-12">
                  <label className="form-label font-weight-bold">
                    Deskripsi
                  </label>
                  <textarea
                    value={deskripsi}
                    type="text"
                    className="form-control"
                    required
                    disabled
                    placeholder="Masukkan Deskripsi"></textarea>
                </div>
                <div className="mb-3 col-lg-12">
                  <label className="form-label font-weight-bold">
                    Prestasi
                  </label>
                  <input
                    value={prestasi}
                    type="text"
                    className="form-control"
                    required
                    disabled
                    placeholder="Masukkan Prestasi"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn-kembali btn-danger mt-3 mr-3">
                <a
                  href="/admin-ekstrakulikuler"
                  style={{ color: "white", textDecoration: "none" }}>
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

export default DetailEkskul;
