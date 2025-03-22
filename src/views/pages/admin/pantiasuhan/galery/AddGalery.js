import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { API_DUMMY } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { uploadImageToS3, uploadImageToS31 } from "../../../../../utils/uploadToS3";

const AddGalery = () => {
  const [judul, setJudul] = useState("");
  const [foto, setFoto] = useState([null]);
  const [deskripsi, setDeskripsi] = useState("");
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const history = useHistory();
  const [show, setShow] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleFileChange = (index, file) => {
    const updatedfoto = [...foto];
    updatedfoto[index] = file;
    setFoto(updatedfoto);
  };

  const addFileInput = () => {
    setFoto([...foto, null]);
  };


  const removeFileInput = (index) => {
    const updatedfoto = foto.filter((_, i) => i !== index);
    setFoto(updatedfoto);
  };

  const add = async (e) => {
    e.preventDefault();
    try {
      let files = [];
      if (foto && foto.length > 0) {
        files = await uploadImageToS31(foto.filter((file) => file !== null));
      }

      const response = await axios.post(
        `${API_DUMMY}/api/admin/galery`,
        {
          judul,
          deskripsi,
          foto: files,
        },
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      if (response.data.code === 200) {
        setShow(false); // Hide modal atau reset form
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Ditambahkan",
          showConfirmButton: false,
          timer: 1000, // Percepat timer
        });

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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Ubah FileList ke array
    setFoto(files); // Simpan semua file dalam state
  };

  return (
    <div
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
      }`}>
      <button
        id="show-sidebar"
        className="btn btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}>
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
                          required
                        />
                      </div>
                      {/* <div className="mb-3 col-lg-6">
                        <label className="form-label font-weight-bold">
                          Gambar
                        </label>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          className="form-control"
                        />
                      </div> */}
                      {foto.map((file, index) => (
                        <>
                          <div className="mb-3 col-lg-6">
                            <label>{`Foto ${index + 1}`}</label>
                            <div className="d-flex align-items-center">
                              <input
                                type="file"
                                onChange={(e) =>
                                  handleFileChange(index, e.target.files[0])
                                }
                              />
                              {index === foto.length - 1 ? (
                                <button
                                  className="btn-success ms-2"
                                  onClick={addFileInput}>
                                  +
                                </button>
                              ) : (
                                <button
                                  className="btn-danger ms-2"
                                  onClick={() => removeFileInput(index)}>
                                  Hapus
                                </button>
                              )}
                            </div>
                          </div>
                          <br />
                        </>
                      ))}
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
                          required></textarea>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger mt-3 mr-3"
                      onClick={() => (window.location.href = "/admin-galery")}>
                      Batal
                    </button>
                    <button type="submit" className="btn btn-primary mt-3">
                      Submit
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
