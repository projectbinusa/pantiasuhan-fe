import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Header from "../../../../../../component/Header";
import Sidebar from "../../../../../../component/Sidebar";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import AOS from "aos";
import axios from "axios";

import "ckeditor5/ckeditor5.css";

function EditOsis() {
  const [nama, setNama] = useState("");
  const [image, setImage] = useState(null);
  const [kelas, setKelas] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tahunJabat, setTahunJabat] = useState("");
  const [tahunTuntas, setTahunTuntas] = useState("");

  const param = useParams();
  const history = useHistory();

  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("jabatan", jabatan);
    formData.append("kelas", kelas);
    formData.append("tahunJabat", tahunJabat);
    formData.append("tahunTuntas", tahunTuntas);
    formData.append("file", image);

    await axios
      .put(`${API_DUMMY}/smpn1bergas/api/osis/put/` + param.id, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Osis",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-osis");
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
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/osis/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setKelas(response.kelas);
        setNama(response.nama);
        setJabatan(response.jabatan);
        setTahunJabat(response.tahunJabat);
        setTahunTuntas(response.tahunTuntas);
        setImage(response.foto);
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
              <form onSubmit={update}>
                <div className="row">
                  <div className="mb-3 col-lg-12">
                    {/*  */}
                    <label className="form-label font-weight-bold">Nama</label>
                    <input
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Nama"
                    />
                  </div>
                  <div className="mb-3 col-lg-12">
                    {/*  */}
                    <label
                      for="exampleInputEmail1"
                      className="form-label font-weight-bold">
                      Kelas
                    </label>
                    <input
                      value={kelas}
                      onChange={(e) => setKelas(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Kelas"
                    />
                  </div>
                  <div className="mb-3 co-lg-6">
                    {/*  */}
                    <label className="form-label font-weight-bold">
                      Gambar
                    </label>
                    <input
                      onChange={(e) =>
                        setImage(e.target.files ? e.target.files[0] : null)
                      }
                      type="file"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-lg-12">
                    {/*  */}
                    <label
                      for="exampleInputEmail1"
                      className="form-label font-weight-bold">
                      Jabatan
                    </label>
                    <input
                      value={jabatan}
                      onChange={(e) => setJabatan(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Kelas"
                    />
                  </div>
                  <div className="mb-3 col-lg-12">
                    {/*  */}
                    <label
                      for="exampleInputEmail1"
                      className="form-label font-weight-bold">
                      Tahun Jabat
                    </label>
                    <input
                      value={tahunJabat}
                      onChange={(e) => setTahunJabat(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Tahun Jabat"
                    />
                  </div>
                  <div className="mb-3 col-lg-12">
                    {/*  */}
                    <label
                      for="exampleInputEmail1"
                      className="form-label font-weight-bold">
                      Tahun Tuntas
                    </label>
                    <input
                      value={tahunTuntas}
                      onChange={(e) => setTahunTuntas(e.target.value)}
                      type="number"
                      className="form-control"
                      placeholder="Masukkan Tahun Tuntas"
                    />
                  </div>
                </div>
                <button type="button" className="btn-danger mt-3">
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    href="/admin-osis">
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

export default EditOsis;
