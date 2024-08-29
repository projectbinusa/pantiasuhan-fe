import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";

function AddEkskul() {
  const [name, setName] = useState("");
  const [tempat, setTempat] = useState("");
  const [jadwal, setJadwal] = useState("");
  const [prestasi, setPrestasi] = useState("");
  const [pembimbing, setPembimbing] = useState("");
  const [koordinator, setKoordinator] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();

  //add
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      const formData = new FormData();
      formData.append("koordinator", koordinator);
      formData.append("pembimbing", pembimbing);
      formData.append("jadwal", jadwal);
      formData.append("tempat", tempat);
      formData.append("name", name);
      formData.append("deskripsi", deskripsi);
      formData.append("prestasi", prestasi);
      formData.append("file", file);
      //   const data = {
      //     name: name,
      //   };
      await axios.post(
        `${API_DUMMY}/smpn1bergas/api/ekstrakulikuler/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push("/admin-ekstrakulikuler");
        window.location.reload();
      }, 1500);
      console.log("name: ", name);
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
                          <label className="form-label font-weight-bold text-left">
                            Ekstrakulikuler
                          </label>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Ekstrakulikuler"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold text-left">
                            Pembimbing
                          </label>
                          <input
                            value={pembimbing}
                            onChange={(e) => setPembimbing(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Pembimbing"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold text-left">
                            Koordinator
                          </label>
                          <input
                            value={koordinator}
                            onChange={(e) => setKoordinator(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Koordinator"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold text-left">
                            Jadwal
                          </label>
                          <input
                            value={jadwal}
                            onChange={(e) => setJadwal(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Jadwal"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold text-left">
                            Tempat
                          </label>
                          <input
                            value={tempat}
                            onChange={(e) => setTempat(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Tempat"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold text-left">
                            Deskripsi
                          </label>
                          <textarea
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Deskripsi"></textarea>
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold text-left">
                            Prestasi
                          </label>
                          <input
                            value={prestasi}
                            onChange={(e) => setPrestasi(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Prestasi"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold text-left">
                            Gambar
                          </label>
                          <input
                            onChange={(e) => setFile(e.target.files[0])}
                            type="file"
                            className="form-control"
                            required
                            placeholder="Masukkan Gambar"
                          />
                        </div>
                        {/* <div className="mb-3 co-lg-6">
                          {/* a */}
                        {/* <label className="form-label font-weight-bold text-left">
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
                            required
                          /> */}
                        {/* </div> */}
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-ekstrakulikuler">
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

export default AddEkskul;
