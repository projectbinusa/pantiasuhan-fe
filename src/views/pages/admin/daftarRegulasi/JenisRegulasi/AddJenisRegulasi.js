import React, { useState } from "react";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import axios from "axios";
import { API_DUMMY } from "../../../../../utils/base_URL";

function AddJenisRegulasi() {
  const [jenisRegulasi, setJenisRegulasi] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();

  //add rejenis regulasi
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      await axios.post(`${API_DUMMY}/bawaslu/api/jenis-regulasi/add`, {
        jenisRegulasi: jenisRegulasi
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // //console.log(unique_id);
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      // //console.log(data);
      setTimeout(() => {
        history.push("/jenis-regulasi");
        window.location.reload();
      }, 1500);
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
                  <div className="mb-3 col-6">
                    {/*  */}
                    <label for="exampleInputEmail1" className="form-label font-weight-bold">
                      Jenis Regulasi
                    </label>
                    <input
                      value={jenisRegulasi}
                      onChange={(e) => setJenisRegulasi(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-danger mt-3 mr-3">
                  <a
                    href="/jenis-regulasi"
                    style={{ color: "white", textDecoration: "none" }}>
                    {" "}
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

export default AddJenisRegulasi;
