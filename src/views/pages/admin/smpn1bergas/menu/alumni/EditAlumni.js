import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";
import Header from "../../../../../../component/Header";
import Sidebar from "../../../../../../component/Sidebar";
import { API_DUMMY } from "../../../../../../utils/base_URL";

function EditAlumni() {
  const [namaAlumni, setNamaAlumni] = useState("");
  const [file, setFile] = useState("");
  const [biografi, setBiografi] = useState("");
  const param = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/alumni/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setNamaAlumni(response.nama);
        setBiografi(response.biografi);
        setFile(response.image);
        console.log("alumni : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //edit pengumuman
  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", namaAlumni);
    formData.append("biografi", biografi);
    formData.append("file", file);

    await axios
      .put(`${API_DUMMY}/smpn1bergas/api/alumni/put/` + param.id, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Alumni",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-alumni");
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
        <div className="container mt-3 app-main__outer" data-aos="fade-left">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Edit Data</h1>
              <hr />
              <form onSubmit={update}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      Nama Alumni
                    </label>
                    <input
                      value={namaAlumni}
                      onChange={(e) => setNamaAlumni(e.target.value)}
                      type="text"
                      className="form-control"
                      required
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      Image
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="form-control"
                      required
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      Biografi
                    </label>
                    <input
                      value={biografi}
                      onChange={(e) => setBiografi(e.target.value)}
                      type="text"
                      className="form-control"
                      required
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
                <button type="button" className="btn-danger mt-3 mr-3">
                  <a
                    href="/admin-alumni"
                    style={{ color: "white", textDecoration: "none" }}>
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

export default EditAlumni;
