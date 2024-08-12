import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../../../component/Header";
import Sidebar from "../../../../component/Sidebar";
import { API_DUMMY } from "../../../../utils/base_URL";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddSetiapSaat() {
  const [dokumen, setDokumen] = useState("");
  const [pdfDokumen, setPdfDokumen] = useState("");
  const [jenisKeteranganId, setJenisKeteranganId] = useState(2); // Tidak perlu dalam array jika hanya satu nilai
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
        history.push("/admin-setiap-saat");
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

  // 
  // 
  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header/>
      {/* ... (Header, Sidebar, etc.) ... */}
      <div className="app-main">
      <Sidebar/>

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
                <div className="mb-3 col-6">
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
                    <option value="8">Organisasi Dan Administrasi</option>;
                    <option value="9">Peraturan & Kebijakan</option>;
                    <option value="10">MOU</option>;
                    <option value="11">Pemantau Pemilu</option>;
                    <option value="12">Rencana Strategi</option>;
                    <option value="13">Materi Rakor</option>;
                    <option value="14">Piagam Penghargaan</option>
                  </select>
                </div>
              </div>

              <button type="button" className="btn-danger mt-3 mr-3">
                <a href={`/admin-setiap-saat`} style={{ color: "white", textDecoration: "none" }}>
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

export default AddSetiapSaat;
