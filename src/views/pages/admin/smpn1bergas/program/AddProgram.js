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

function AddProgram() {
  const [judul, setJudul] = useState("");
  const [nama, setNama] = useState("");
  const [tujuan, setTujuan] = useState("");
  const history = useHistory();
  const param = useParams();

  const add = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("judulPrgram", judul);
    // formData.append("namaProgram", nama);
    // formData.append("tujuan", tujuan);
    const data = {
      judulProgram: judul,
      namaProgram: nama,
      tujuan: tujuan  ,
    };

    await axios
      .post(`${API_DUMMY}/smpn1bergas/api/program/add`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Program",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-program");
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
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Nama Program
                          </label>
                          <input
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Program"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          {/* a */}
                          <label className="form-label  font-weight-bold ">
                            Kategori Keuangan
                          </label>
                          <select
                            value={judul}
                            className="form-control"
                            aria-label="Small select example"
                            onChange={(e) => setJudul(e.target.value)}>
                            <option selected>Pilih Kategori Program</option>
                            <option value="Pengembangan">Pengembangan</option>
                            <option value="Perawatan Rutin">
                              Perawatan Rutin
                            </option>
                            <option value="Sewa Layanan">Sewa Layanan</option>
                          </select>
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Tujuan
                          </label>
                          <input
                            value={tujuan}
                            onChange={(e) => setTujuan(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Kegiatan"
                          />
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-program">
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

export default AddProgram;
