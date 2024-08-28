import React from "react";
// import Header from "../../../../component/Header";
// import Sidebar from "../../../../component/Sidebar";
// import { API_DUMMY } from "../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Header from "../../../../../../component/Header";
import Sidebar from "../../../../../../component/Sidebar";

function AddGuru() {
  const [namaGuru, setNamaGuru] = useState("");
  const [image, setImage] = useState(null);
  const [mapel, setMapel] = useState("");
  const [nip, setNip] = useState("");
  const [riwayat, setRiwayat] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();

  //add
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("nama_guru", namaGuru);
    formData.append("mapel", mapel);
    formData.append("riwayat", riwayat);
    formData.append("nip", nip);
    formData.append("file", image);

    try {
      await axios.post(`${API_DUMMY}/smpn1bergas/api/guru/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/admin-guru");
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
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Nama Guru
                          </label>
                          <input
                            value={namaGuru}
                            onChange={(e) => setNamaGuru(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Guru"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            NIP
                          </label>
                          <input
                            value={nip}
                            onChange={(e) => setNip(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan NIP"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Riwayat
                          </label>
                          <input
                            value={riwayat}
                            onChange={(e) => setRiwayat(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Riwayat"
                          />
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
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Mapel
                          </label>
                          <input
                            value={mapel}
                            onChange={(e) => setMapel(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Mapel"
                          />
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-guru">
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

export default AddGuru;
