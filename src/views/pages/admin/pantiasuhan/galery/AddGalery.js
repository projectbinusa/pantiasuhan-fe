import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { API_DUMMY } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { uploadImageToS3 } from "../../../../../utils/uploadToS3";

const AddGalery = () => {
  const [judul, setJudul] = useState("");
  const [foto, setFoto] = useState(null);
  const [deskripsi, setDeskripsi] = useState("");
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = foto;

      // Jalankan upload gambar dan request API secara bersamaan
      const uploadPromise = foto
        ? uploadImageToS3(foto)
        : Promise.resolve(null);

      // Mulai proses upload gambar terlebih dahulu
      const [uploadedImageUrl] = await Promise.all([uploadPromise]);

      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl;
      }

      // Kirim data ke API
      const response = await axios.post(
        `${API_DUMMY}/api/admin/galery`,
        {
          judul: judul || "-",
          deskripsi: deskripsi || "-",
          foto: imageUrl,
        },
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      // Periksa respons yang berhasil
      if (response.data.code === 200) {
        setShow(false); // Hide modal atau reset form
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Ditambahkan",
          showConfirmButton: false,
          timer: 1000, // Percepat timer
        });

        // Redirect lebih cepat
        setTimeout(() => {
          history.push("/admin_galeri");
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    } finally {
      setIsLoading(false); // Matikan loading setelah selesai
    }
  };

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  const handleResize = () => {
    if (window.innerWidth < 800) {
      setSidebarToggled(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
        }`}
    >
      <button
        id="show-sidebar"
        className="btn btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}
      >
        <i className="fas fa-bars"></i>
      </button>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow">
                <div className="card-body">
                  <h1 className="fs-4">Form Tambah Data</h1>
                  <hr />
                  <form onSubmit={add}>
                    <div className="row">
                      <div className="mb-3 col-lg-6 ">
                        <label className="form-label font-weight-bold">
                          Judul
                        </label>
                        <input
                          value={judul}
                          onChange={(e) => setJudul(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Judul"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label font-weight-bold">
                          Gambar
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setFoto(e.target.files[0])}
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3 col-lg-12">
                        <label className="form-label font-weight-bold">
                          Deskripsi
                        </label>
                        <textarea
                          rows={4}
                          value={deskripsi}
                          onChange={(e) => setDeskripsi(e.target.value)}
                          className="form-control"
                          placeholder="Masukkan Deskripsi"
                        ></textarea>
                      </div>
                    </div>
                    <button type="button" className="btn-danger mt-3 mr-3">
                      <a
                        href="/admin_galeri"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Batal
                      </a>
                    </button>
                    <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
                      {isLoading ? <span className="loader"></span> : "Kirim"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGalery;
