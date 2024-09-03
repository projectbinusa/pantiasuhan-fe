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

function AddSarana() {
  const [namaSarana, setNamaSarana] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [category, setCategory] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();

  //add
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("nama_sarana", namaSarana);
    formData.append("deskripsi", deskripsi);
    formData.append("category", category);

    try {
      await axios.post(`${API_DUMMY}/smpn1bergas/api/sarana/add`, formData, {
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
      setTimeout(() => {
        history.push("/admin-sarana");
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
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
        <div className="container mt-3 mb-3 app-main__outer" data-aos="fade-left">
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
                          <label className="form-label font-weight-bold">
                            Nama Sarana
                          </label>
                          <input
                            value={namaSarana}
                            onChange={(e) => setNamaSarana(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Sarana"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Deskripsi Sarana
                          </label>
                          <div className="">
                            <textarea
                              value={deskripsi}
                              onChange={(e) => setDeskripsi(e.target.value)}
                              className="form-control"
                              placeholder="Masukkan Deskripsi sarana"
                              id="floatingTextarea2"
                              rows="5"></textarea>
                          </div>
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label  font-weight-bold ">
                            Kategori Sarana
                          </label>
                          <select
                            value={category}
                            className="form-control"
                            aria-label="Small select example"
                            onChange={(e) =>
                              setCategory(e.target.value)
                            }>
                            <option selected>Pilih Kategori Sarana</option>
                            <option value="Standar">Standar</option>
                            <option value="Ruang Kantor">Ruang Kantor</option>
                            <option value="Ruang Kelas">Ruang Kelas</option>
                            <option value="Ruang Laboratorium">Ruang Laboratorium</option>
                            <option value="Sarana Olahraga">Sarana Olahraga</option>
                            <option value="Sarana Ibadah">Sarana Ibadah</option>
                            <option value="Sarana Kesehatan">Sarana Kesehatan</option>
                            <option value="Perpustakaan">Perpustakaan</option>
                            <option value="Sarana Protokol Kesehatan">Sarana Protokol Kesehatan</option>
                          </select>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-sarana">
                          Batal
                        </a>
                      </button>
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

export default AddSarana;
