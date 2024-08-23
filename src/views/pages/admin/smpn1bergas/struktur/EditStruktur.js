import React from "react";
// import Header from "../../../../component/Header";
// import Sidebar from "../../../../component/Sidebar";
// import { API_DUMMY } from "../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";

function EditStruktur() {
  const [image, setImage] = useState(null);
  const [tugas, setTugas] = useState("");
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [jenis, setJenis] = useState("");
  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/kegiatan/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setImage(response.foto);
        setTugas(response.tugas);
        setNama(response.nama);
        setJenis(response.jenis);
        setJabatan(response.jabatan);
        console.log("stuktur : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //edit pengumuman
  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("tugas", tugas);
    formData.append("nama", nama);
    formData.append("jabatan", jabatan);
    formData.append("jenis", jenis);

    await axios
      .put(`${API_DUMMY}/smpn1bergas/api/struktur/put/` + param.id, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Struktur",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-stuktur");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        if (error.ressponse && error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        } else {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="app-main__outer" data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Tambah Data</h1>
                    <hr />
                    <form onSubmit={update}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Tugas
                          </label>
                          <input
                            value={tugas}
                            onChange={(e) => setTugas(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Tugas"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Nama Struktur
                          </label>
                          <input
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Struktur"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Jabatan
                          </label>
                          <input
                            value={jabatan}
                            onChange={(e) => setJabatan(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Jabatan"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Jenis Struktur
                          </label>
                          <select
                            value={jenis}
                            className="form-control"
                            aria-label="Small select example"
                            onChange={(e) => setJenis(e.target.value)}>
                            <option selected>Pilih Jenis Struktur</option>
                            <option value="WAKA SARANA PRASARANA">
                              WAKA SARANA PRASARANA
                            </option>
                            <option
                              value="SEKERTARIS WAKA">
                              SEKERTARIS WAKA
                            </option>
                          </select>
                        </div>
                        <div className="mb-3 co-lg-6">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Gambar
                          </label>
                          <input
                            onChange={(e) =>
                              setImage(
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                            type="file"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-stuktur">
                          Batal
                        </a>
                      </button>{" "}
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
    </div>
  );
}

export default EditStruktur;
