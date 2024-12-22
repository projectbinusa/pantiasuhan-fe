import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";

import { API_DUMMY_PYTHON } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { uploadImageToS3 } from "../../../../../utils/uploadToS3";

function EditGalery() {
  const [judul, setJudul] = useState("");
  const [file, setFile] = useState(null);
  const [deskripsi, setDeskripsi] = useState("");
  const [show, setShow] = useState("");
  const param = useParams();
  const history = useHistory();

  const [sidebarToggled, setSidebarToggled] = useState(true);

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

  useEffect(() => {
    axios
      .get(`${API_DUMMY_PYTHON}/api/admin/galery/` + param.id, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setJudul(response.judul);
        setDeskripsi(response.deskripsi);
        setFile(response.foto);
        console.log("galery : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const update = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      let imageUrl = file;

      if (file) {
        imageUrl = await uploadImageToS3(file);
      }
      const response = await axios.put(
        `${API_DUMMY_PYTHON}/api/admin/galery/${param.id}`,
        {
          judul: judul,
          deskripsi: deskripsi,
          foto: imageUrl,
        },
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`, // Authentication token
          },
        }
      );

      // Periksa respons yang berhasil
      if (response.data.code === 200) {
        setShow(false); // Hide modal atau reset form
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Galery",
          showConfirmButton: false,
          timer: 1500,
        });

        // Redirect setelah berhasil
        setTimeout(() => {
          history.push("/admin_galery");
        }, 1500);
      } else {
        // Handle respons lain dengan pesan error
        Swal.fire({
          icon: "error",
          title: "Edit Data Gagal!",
          text: response.data.message, // Tambahkan pesan error dari respons
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      // Handle error, terutama untuk masalah autentikasi
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          text: error.message, // Tambahkan pesan error dari error
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error); // Log error untuk debugging
      }
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
      }`}
    >
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}
      >
        <i className="fas fa-bars"></i>
      </a>
      {/* <Header toggleSidebar={toggleSidebar} /> */}
      {/* <div className="app-main"> */}
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
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
                      className="form-label font-weight-bold"
                    >
                      Judul
                    </label>
                    <input
                      value={judul}
                      onChange={(e) => setJudul(e.target.value)}
                      type="text"
                      className="form-control"
                      required
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">
                      Gambar
                    </label>
                    <input
                      onChange={(e) =>
                        setFile(e.target.files ? e.target.files[0] : null)
                      }
                      type="file"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold"
                    >
                      Deskripsi
                    </label>
                    <textarea
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                      type="text"
                      className="form-control"
                      required
                      id="exampleInputPassword1"
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

export default EditGalery;
