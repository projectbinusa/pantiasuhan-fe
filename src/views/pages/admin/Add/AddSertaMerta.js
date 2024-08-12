import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../../../component/Header";
import Sidebar from "../../../../component/Sidebar";
import { API_DUMMY } from "../../../../utils/base_URL";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddSertaMerta() {
  const [dokumen, setDokumen] = useState("");
  const [pdfDokumen, setPdfDokumen] = useState("");
  const [jenisKeteranganId, setJenisKeteranganId] = useState(1); // Tidak perlu dalam array jika hanya satu nilai
  const history = useHistory();

  const add = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_DUMMY}/bawaslu/api/isi-keterangan-informasi/add`,
        {
          dokumen: dokumen,
          pdfDokumen: pdfDokumen,
          jenisKeteranganId: jenisKeteranganId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Data Berhasil Ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        history.push("/admin-serta-merta");
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error.response);
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: error.response.data.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
     <Header/>
     <div className="app-main">
      <Sidebar/>
    
      {/* ... (Header, Sidebar, etc.) ... */}
      <div className="container mt-3 app-main__outer">
        <div className="card shadow">
          <div className="card-body">
            <h1 className="fs-4">Form Tambah Data</h1>
            <hr />
            <form onSubmit={add}>
              <div className="row">
                <div className="mb-3 col-6">
                  <label
                    htmlFor="dokumen"
                    className="form-label font-weight-bold"
                  >
                    Keterangan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dokumen"
                    value={dokumen}
                    onChange={(e) => setDokumen(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-6 ">
                  <label
                    htmlFor="pdfDokumen"
                    className="form-label font-weight-bold"
                  >
                    Link Google Drive
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pdfDokumen"
                    value={pdfDokumen}
                    onChange={(e) => setPdfDokumen(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-12 ">
                  <label
                    htmlFor="pdfDokumen"
                    className="form-label font-weight-bold"
                  >
                    Jenis Keterangan
                  </label>
                  <select
                    className="form-select form-select-sm"
                    aria-label="Small select example"
                    value={jenisKeteranganId}
                    onChange={(e) => setJenisKeteranganId(e.target.value)}
                  >
                    <option value="">Pilih Jenis Informasi</option>
                    <option value="1">Putusan Pelanggaran</option>;
                    <option value="2">Sengketa Proses Pemilu</option>;
                    <option value="3">Pemungutan Suara Ulang</option>;
                    <option value="4">Organisasi Dan Adminstrasi</option>;
                    <option value="5">Perselisihan Hasil Pemilu</option>;
                    <option value="6">Sosialisasi</option>;
                    <option value="7">Piagam Penghargaan</option>
                  </select>
                </div>
              </div>

              <button type="button" className="btn-danger mt-3 mr-3">
                <a href={`/admin-serta-merta`} style={{ color: "white", textDecoration: "none" }}>
                  Batal
                </a>
              </button>
              <button type="submit" className="btn-primary mt-3">
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default AddSertaMerta;
