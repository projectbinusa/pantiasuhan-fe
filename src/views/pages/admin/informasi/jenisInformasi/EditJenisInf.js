import React, { useEffect, useState } from 'react'
import Header from '../../../../../component/Header'
import Sidebar from '../../../../../component/Sidebar'
import { API_DUMMY } from '../../../../../utils/base_URL';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

function EditJenisInf() {
    const[namaInformasi, setNamaInformasi] = useState("");
    const param = useParams();
    const history = useHistory();

    useEffect(() => {
        axios
          .get(`${API_DUMMY}/bawaslu/api/jenis-informasi/getBy/` + param.id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((ress) => {
            const response = ress.data.data;
            setNamaInformasi(response.namaInformasi);
            console.log(response.namaInformasi);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      const update = async (e) => {
        e.preventDefault();
        await axios
          .put(`${API_DUMMY}/bawaslu/api/jenis-informasi/` + param.id, {
            namaInformasi, namaInformasi
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Berhasil Mengedit",
              showConfirmButton: false,
              timer: 1500,
            });
            history.push("/jenis-informasi");
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((error) => {
            console.log(error);
          });
      };
  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
    <Header />
    <div className="app-main">
      <Sidebar />
      <div className="container mt-3 app-main__outer">
        <div className="card shadow box-tabel">
          <div className="card-body">
            <h1 className="fs-4">Form Edit Data</h1>
            <hr />
            <form onSubmit={update}>
              <div className="row">
                <div className="mb-3 col-6">
                  <label for="exampleInputEmail1" className="form-label font-weight-bold">
                    Jenis Informasi
                  </label>
                  <input
                    value={namaInformasi}
                    onChange={(e) => setNamaInformasi(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <button type="submit" className="btn-danger mt-3 mr-3">
                  <a
                    href="/jenis-informasi"
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
  )
}

export default EditJenisInf