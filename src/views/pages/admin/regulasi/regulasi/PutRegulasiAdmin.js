import React, { useState, useEffect } from "react";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Swal from "sweetalert2";
import AOS from "aos";


function PutRegulasiAdmin() {
  const [link, setLink] = useState("");
  const [namaDokumen, setNamaDokumen] = useState("");
  const [daftarRegulasi, setDaftarRegulasi] = useState("");
  const history = useHistory();
  const { id } = useParams();

  const getById = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/tabel-regulasi/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data.data;
      console.log(data);

      setNamaDokumen(data.namaDokumen || "");
      setLink(data.pdfDokumen || "");
      setDaftarRegulasi(data.daftarRegulasi || "");
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getById();
  }, []);

  useEffect(() => {
    AOS.init();
  },[]);

  const updateData = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_DUMMY}/bawaslu/api/tabel-regulasi/put/${id}`,
        {
          daftarRegulasi: daftarRegulasi,
          namaDokumen: namaDokumen,
          pdfDokumen: link,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Data Berhasil Diubah",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        history.push("/regulasi-admin");
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

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container mt-3 app-main__outer"  data-aos="fade-left">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Ubah Data</h1>
              <hr />
              <form onSubmit={updateData}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label className="form-label  font-weight-bold ">
                      Daftar Regulasi
                    </label>
                    <select
                      className="form-control"
                      aria-label="Small select example"
                      value={daftarRegulasi}
                      onChange={(e) => setDaftarRegulasi(e.target.value)}
                    >
                        <option>PIlih Daftar Regulasi</option>
                        <option value="Undang-Undang">Undang-Undang</option>;
                        <option value="Peraturan Pemerintah">Peraturan Pemerintah</option>;
                        <option value="Peraturan Mahkamah Agung">Peraturan Mahkamah Agung</option>;
                        <option value="Peraturan Komisi Informasi">Peraturan Komisi Informasi</option>;
                        <option value="Peraturan Menteri">Peraturan Menteri</option>;
                        <option value="Perbawaslu">Perbawaslu</option>;
                        <option value="Penetapan PPID">Penetapan PPID</option>;
                        <option value="Surat Edaran">Surat Edaran</option>;
                        <option value="Instruksi Kabupaten">Instruksi Kabupaten</option>;
                    </select>
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputEmail1"
                      className="form-label  font-weight-bold "
                    >
                      Nama Dokumen Regulasi
                    </label>
                    <input
                      value={namaDokumen}
                      onChange={(e) => setNamaDokumen(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan nama dokumen"
                    />
                  </div>
                  <div className="mb-3 co-lg-12">
                    <label className="form-label font-weight-bold">
                      Link Drive Dokumen
                    </label>
                    <input
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan link drive dokumen"
                    />
                  </div>
                </div>
                <button type="button" className="btn-danger mt-3">
                    <a
                      style={{ color: "white", textDecoration: "none" }}
                      href="/regulasi-admin"
                    >
                      Batal
                    </a>
                  </button>
                  {" "}
                  <button type="submit" className="btn-primary mt-3">
                    Ubah
                  </button>

                <div className="d-flex justify-content-between">

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PutRegulasiAdmin;
