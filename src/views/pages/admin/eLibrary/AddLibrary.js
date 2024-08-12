import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../utils/base_URL";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import AOS from "aos";
import Header from "../../../../component/Header";
import Sidebar from "../../../../component/Sidebar";

function AddLibrary() {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const history = useHistory();
  const [show, setShow] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    e.persist();
    try {
      await axios.post(
        `${API_DUMMY}/bawaslu/api/library/add`,
        { name: name, photoUrl: photoUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/admin-library");
      setTimeout(() => {
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
      {/* header */}
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container mt-3 app-main__outer" data-aos="fade-left">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Tambah Data</h1>
              <hr />
              <form onSubmit={add}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      Nama
                    </label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Masukkan Nama"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      Photo Url
                    </label>
                    <input
                      required
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      value={photoUrl}
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Masukkan Photo Url"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-danger mt-3 mr-3">
                  <a
                    href="/admin-library"
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

export default AddLibrary;
