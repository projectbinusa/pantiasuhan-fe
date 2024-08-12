import React from "react";
import Footer from "../../../../../component/Footer";
import Sidebar from "../../../../../component/Sidebar";
import Header from "../../../../../component/Header";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { API_DUMMY } from "../../../../../utils/base_URL";
import { useEffect } from "react";
import Swal from "sweetalert2";

function AddIsiKeteranganInformasi() {
  const [dokumen, setDokumen] = useState("");
  const [jenisKeterangan, setJenisKeterangan] = useState();
  const [keterangan, setKeterangan] = useState([]);
  const [pdfDokumen, setPdfDokumen] = useState(null);
  const [show, setShow] = useState(false);
  const param = useParams();
  const history = useHistory();

  const getKeterangan = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/jenis-keterangan/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Check if the data is an array
      if (Array.isArray(response.data.data)) {
        setKeterangan(response.data.data);
      } else {
        // If it's an object, access the array within the object
        setKeterangan(response.data.data.yourArrayPropertyName);
      }

      console.log(response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getKeterangan();
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API_DUMMY}/bawaslu/api/isi-keterangan-informasi/getBy/` + param.id
      )
      .then((ress) => {
        const response = ress.data.data;
        setPdfDokumen(response.pdfDokumen);
        setDokumen(response.dokumen);
        setJenisKeterangan(response.jenisKeterangan);
        console.log(ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]); // Added param.id as a dependency to the useEffect

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();

    try {
      const response = await axios.post(
        `${API_DUMMY}/bawaslu/api/isi-keterangan-informasi/add`,
        {
          dokumen: dokumen,
          pdfDokumen: pdfDokumen,
          jenisKeterangan: jenisKeterangan,
        },
        // formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      // Check the response status code
      if (response.status !== 201) {
        // Handle the error
        console.log(response.data);
        Swal.fire({
          icon: "error",
          title: "Gagal menambahkan data",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // Handle the successful response
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Data berhasil ditambahkan",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push(-1);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container mt-3 app-main__outer">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Tambah Data</h1>
              <hr />
              <form onSubmit={add}>
                <div className="row">
                  <div className="col-6">
                    <label className="form-label font-weight-bold">Jenis Keterangan</label>
                    <select
                      className="form-select form-select-sm"
                      aria-label="Small select example"
                      onChange={(e) => setJenisKeterangan(e.target.value)}
                      value={jenisKeterangan}>
                      <option selected>PIlih Jenis Informasi</option>
                      {keterangan.map((down) => {
                        return (
                          <option value={down.id}>{down.keterangan}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3 col-6">
                    <label for="exampleInputEmail1" className="form-label font-weight-bold">
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
                    <label for="exampleInputEmail1" className="form-label font-weight-bold">
                      File
                    </label>
                    <input
                      onChange={(e) => setPdfDokumen(e.target.files[0])}
                      type="file"
                      className="form-control"
                    />
                  </div> 
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


export default AddIsiKeteranganInformasi;