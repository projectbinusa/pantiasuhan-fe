import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";

function EditPrestasi() {
  const [penyelenggara, setPenyelenggara] = useState("");
  const [namaPeserta, setNamaPeserta] = useState("");
  const [image, setImage] = useState(null);
  const [skala, setSkala] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [judul, setJudul] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const param = useParams();

  //add
  const update = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("peyelenggara", penyelenggara);
    formData.append("nama_peserta", namaPeserta);
    formData.append("tanggal", tanggal);
    formData.append("skala", skala);
    formData.append("judul", judul);
    formData.append("file", image);

    try {
      await axios.put(`${API_DUMMY}/smpn1bergas/api/prestasi/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          penyelenggaraization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil Mengedit Data Prestasi",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/admin-prestasi");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/prestasi/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setPenyelenggara(response.peyelenggara);
        setJudul(response.judil);
        setSkala(response.skala);
        setTanggal(response.tanggal);
        setNamaPeserta(response.nama);
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
                        <div className="mb-3 col-lg-6">
                          {/* a */}
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Nama Prestasi
                          </label>
                          <input
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Prestasi"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          {/* a */}
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Penyelenggara
                          </label>
                          <input
                            value={penyelenggara}
                            onChange={(e) => setPenyelenggara(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Penyelenggara"
                          />
                        </div>
                        <div className="mb-3 co-lg-6">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Gambar
                          </label>
                          <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Nama Peserta
                          </label>
                          <input
                            value={namaPeserta}
                            onChange={(e) => setNamaPeserta(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan judul berita"
                          />
                        </div>
                        <div className="col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Tanggal Dilaksanakan
                          </label>
                          <div className="">
                            <input
                              type="date"
                              value={tanggal}
                              onChange={(e) => setTanggal(e.target.value)}
                              className="form-control"
                              placeholder="Masukkan Tanggal"
                              id="floatingTextarea2"
                            />
                          </div>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-prestasi">
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

export default EditPrestasi;
