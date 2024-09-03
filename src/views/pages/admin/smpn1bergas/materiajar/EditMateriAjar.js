import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import AOS from "aos";
import axios from "axios";

function EditMateriAjar() {
  const [tingkat, setTingkat] = useState("");
  const [mapel, setMapel] = useState("");
  const [file, setFile] = useState(null);
  const [judul, setJudul] = useState("");
  const [penyusun, setPenyusun] = useState("");
  const [jenis, setJenis] = useState("");

  const param = useParams();
  const history = useHistory();

  const updateBerita = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("tingkat", tingkat);
    formData.append("mapel", mapel);
    formData.append("penyusun", penyusun);
    formData.append("judul", judul);
    formData.append("file", file);
    formData.append("jenis", jenis);

    await axios
      .put(
        `${API_DUMMY}/smpn1bergas/api/materi_ajar/put/` + param.id,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Materi Ajar",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-materi-ajar");
        setTimeout(() => {
          window.location.reload();
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
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/materi_ajar/get/` + param.id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setTingkat(response.tingkat);
        setMapel(response.mapel);
        setPenyusun(response.penyusun);
        setJudul(response.judul);
        setJenis(response.jenis);
        setPenyusun(response.penyusun);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container mt-3 app-main__outer" data-aos="fade-left">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Edit Data</h1>
              <hr />
              <form onSubmit={updateBerita}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputEmail1"
                      className="form-label font-weight-bold">
                      Tingkat
                    </label>
                    <input
                      value={tingkat}
                      onChange={(e) => setTingkat(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Tingkat"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputEmail1"
                      className="form-label font-weight-bold">
                      Judul
                    </label>
                    <input
                      value={judul}
                      onChange={(e) => setJudul(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Judul"
                    />
                  </div>
                  <div className="mb-3 co-lg-6">
                    <label className="form-label font-weight-bold">File</label>
                    <input
                      onChange={(e) =>
                        setFile(e.target.files ? e.target.files[0] : null)
                      }
                      type="file"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-lg-12">
                    <label className="form-label font-weight-bold">Mapel</label>
                    <input
                      value={mapel}
                      onChange={(e) => setMapel(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Mapel"
                    />
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label font-weight-bold">
                      Penyusun
                    </label>
                    <div className="">
                      <input
                        value={penyusun}
                        onChange={(e) => setPenyusun(e.target.value)}
                        className="form-control"
                        placeholder="Masukkan Penyusun"
                        id="floatingTextarea2"
                        rows="5"
                      />
                    </div>
                  </div>
                    <div className="col-lg-12">
                      <label className="form-label font-weight-bold">
                        Jenis
                      </label>
                      <div className="">
                        <input
                          value={jenis}
                          onChange={(e) => setJenis(e.target.value)}
                          className="form-control"
                          placeholder="Masukkan Jenis"
                          id="floatingTextarea2"
                          rows="5"
                        />
                      </div>
                    </div>
                </div>
                <button type="button" className="btn-danger mt-3">
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    href="/admin-materi-ajar">
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
  );
}

export default EditMateriAjar;
