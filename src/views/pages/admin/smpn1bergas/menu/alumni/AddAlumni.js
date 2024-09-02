import React from "react";
// import Header from "../../../../component/Header";
// import Sidebar from "../../../../component/Sidebar";
// import { API_DUMMY } from "../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import Header from "../../../../../../component/Header";
import Sidebar from "../../../../../../component/Sidebar";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import { Editor } from "@tinymce/tinymce-react";

function AddAlumni() {
  const [namaAlumni, setNamaAlumni] = useState("");
  const [kontak, setKontak] = useState("");
  const [profesi, setProfesi] = useState("");
  const [tahunLulus, setTahunLulus] = useState("");
  const [riwayat, setRiwayat] = useState("");
  const [nip, setNip] = useState("");
  const [image, setImage] = useState(null);
  const [biografi, setBiografi] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();

  //add
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    // formData.append("author", author);
    formData.append("nama", namaAlumni);
    formData.append("biografi", biografi);
    formData.append("kontak", kontak);
    formData.append("profesi", profesi);
    formData.append("tahunLulus", tahunLulus);
    // formData.append("riwayat", riwayat);
    // formData.append("nip", nip);
    formData.append("file", image);

    try {
      await axios.post(`${API_DUMMY}/smpn1bergas/api/alumni/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
      history.push("/admin-alumni");
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
  }, []);

  const handleEditorChange = (biografi, editor) => {
    setBiografi(biografi);
  };

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="app-main__outer" data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Tambah Data</h1>
                    <hr />
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Nama Alumni
                          </label>
                          <input
                            value={namaAlumni}
                            onChange={(e) => setNamaAlumni(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Nama Alumni"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputPassword1"
                            className="form-label font-weight-bold">
                            No Handphone
                          </label>
                          <input
                            value={kontak}
                            onChange={(e) => setKontak(e.target.value)}
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
                            Sekolah / Pekerjaan Saat Ini
                          </label>
                          <input
                            value={profesi}
                            onChange={(e) => setProfesi(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            id="exampleInputPassword1"
                          />
                        </div>
                        {/* <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputPassword1"
                            className="form-label font-weight-bold">
                            Riwayat
                          </label>
                          <input
                            value={riwayat}
                            onChange={(e) => setRiwayat(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            id="exampleInputPassword1"
                          />
                        </div> */}
                        <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputPassword1"
                            className="form-label font-weight-bold">
                            Tahun Lulus
                          </label>
                          <input
                            value={tahunLulus}
                            onChange={(e) => setTahunLulus(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            id="exampleInputPassword1"
                          />
                        </div>
                        {/* <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputPassword1"
                            className="form-label font-weight-bold">
                            NIP
                          </label>
                          <input
                            value={nip}
                            onChange={(e) => setNip(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            id="exampleInputPassword1"
                          />
                        </div> */}
                        <div className="mb-3 co-lg-6">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Gambar
                          </label>
                          <input
                            onChange={(e) =>
                              setImage(
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                            type="file"
                            className="form-control"
                            required
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Biografi
                          </label>
                          <Editor
                            apiKey="gpl" // Optional, but recommended for production
                            value={biografi}
                            init={{
                              height: 500,
                              menubar: false,
                              plugins: [
                                "advlist",
                                "anchor",
                                "autolink",
                                "help",
                                "image",
                                "link",
                                "lists",
                                "searchreplace",
                                "table",
                                "wordcount",
                              ],
                              toolbar:
                                "undo redo | blocks | " +
                                "bold italic forecolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help | image",
                              content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                            onEditorChange={handleEditorChange}
                          />
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-alumni">
                          Batal
                        </a>
                      </button>{" "}
                      <button type="submit" className="btn-primary mt-3">
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
    </div>
  );
}

export default AddAlumni;
