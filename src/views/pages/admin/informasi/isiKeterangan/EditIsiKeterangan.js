import React, { useEffect } from "react";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";
import Footer from "../../../../../component/Footer";
import { useState } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";
import axios from "axios";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";

function EditIsiKeterangan() {
  const [jenisKeterangan, setJenisKeterangan] = useState("");
  const [jenisKeteranganId, setJenisKeteranganId] = useState();
  const [dokumen, setDokumen] = useState("");
  const [keterangan, setKeterangan] = useState([]);
  const [pdfDokumen, setPdfDokumen] = useState("");
  const param = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `${API_DUMMY}/bawaslu/api/isi-keterangan-informasi/getBy/` + param.id
      )
      .then((ress) => {
        const response = ress.data.data;
        setPdfDokumen(response.pdfDokumen);
        setDokumen(response.dokumen);
        setJenisKeteranganId(response.jenisKeterangan); // Fix: Corrected the function call here
        console.log(ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]); // Added param.id as a dependency to the useEffect

  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("upload", pdfDokumen);

    await axios
      .put(
        `${API_DUMMY}/bawaslu/api/isi-keterangan-informasi/` + param.id , {
          dokumen: dokumen,
          pdfDokumen: pdfDokumen,
          jenisKeteranganId: jenisKeteranganId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
            // "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data",
          showConfirmButton: false,
          timer: 1500,
        });
        // history.push("");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getKeterangan = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/jenis-keterangan/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setKeterangan(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getKeterangan();
  }, []);

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container mt-3 app-main__outer">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Edit Data</h1>
              <hr />
              <form onSubmit={update}>
                <div className="row">
                  <div className="col-6">
                    <label className="form-label">Jenis Keterangan</label>
                    {/* <input
                      className="form-control"
                      type="text"
                      value={jenisKeteranganId}
                      onChange={(e) => setJenisKeteranganId(e.target.value)}
                    /> */}
                    <select disabled
                      className="form-select form-select-sm"
                      aria-label="Small select example"
                      onChange={(e) => setJenisKeteranganId(e.target.value)}
                      value={jenisKeteranganId}>
                      <option selected>PIlih Jenis Informasi</option>
                      {keterangan.map((down) => {
                        return (
                          <option value={down.id}>{down.keterangan}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3 col-6">
                    <label for="exampleInputEmail1" className="form-label">
                      Dokumen
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={dokumen}
                      onChange={(e) => setDokumen(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-6">
                    <label for="exampleInputEmail1" className="form-label">
                     Link Dokumen
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={pdfDokumen}
                      onChange={(e) => setPdfDokumen(e.target.value)}
                    />
                  </div>
                  {/* <div className="mb-3 col-6">
                    <label for="exampleInputEmail1" className="form-label">
                      File
                    </label>
                    <input
                      onChange={(e) => setPdfDokumen(e.target.files[0])}
                      type="file"
                      className="form-control"
                    />
                  </div> */}
                </div>
                <button type="button" className="btn-danger mt-3 mr-3">
                  <a href="" style={{ color: "white", textDecoration: "none" }}>
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

export default EditIsiKeterangan;
