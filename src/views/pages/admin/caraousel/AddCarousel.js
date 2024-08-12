import React, {useEffect, useState } from "react";
import Footer from "../../../../component/Footer";
import Header from "../../../../component/Header";
import Sidebar from "../../../../component/Sidebar";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/base_URL";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";

function AddCarousel() {
  const [namaCarousel, setNamaCarousel] = useState("");
  const [image, setImage] = useState("");
  const history = useHistory();
  const [show, setShow] = useState(false);

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("namaCarousel", namaCarousel);
    try {
      await axios.post(`${API_DUMMY}/bawaslu/api/carousel/add`, formData, {
        headers: {
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
      history.push("/admin-page-carousel");
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

  useEffect(() => {
    AOS.init();
  },[]);

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container mt-3 app-main__outer"  data-aos="fade-left">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Tambah Data</h1>
              <hr />
              <form onSubmit={add}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label for="exampleInputPassword1" className="form-label font-weight-bold">
                      Nama Carousel
                    </label>
                    <input
                      value={namaCarousel}
                      onChange={(e) => setNamaCarousel(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Masukkan Nama Carousel"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label for="exampleInputPassword1" className="form-label font-weight-bold">
                      Image
                    </label>
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-danger mt-3 mr-3">
                  <a
                    href="/admin-page-carousel"
                    style={{ color: "white", textDecoration: "none" }}
                  >
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

export default AddCarousel;
