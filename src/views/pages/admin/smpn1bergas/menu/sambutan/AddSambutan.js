import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Header from "../../../../../../component/Header";
import Sidebar from "../../../../../../component/Sidebar";
import { Editor } from "@tinymce/tinymce-react";


function AddSambutan() {
  const [judulSambutan, setJudulSambutan] = useState("");
  const [isiSambutan, setIsiSambutan] = useState("");
  const [file, setFile] = useState(null);
  const [nip, setNip] = useState("");
  const [namaKepsek, setNamaKepsek] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();

  //add
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      const formData = new FormData();
      formData.append("isi", isiSambutan);
      formData.append("nama", namaKepsek);
      formData.append("judul", judulSambutan);
      formData.append("nip", nip);
      formData.append("file", file);
      // const data = {
      //   isi: isiSambutan,
      //   nama: judulSambutan,
      //   nip: nip,
      // };
      await axios.post(`${API_DUMMY}/smpn1bergas/api/sambutan/add`, formData, {
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
      history.push("/admin-sambutan");
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

  const handleEditorChange = (isiSambutan, editor) => {
    setIsiSambutan(isiSambutan);
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
                            Judul Sambutan
                          </label>
                          <input
                            value={judulSambutan}
                            onChange={(e) => setJudulSambutan(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Judul Sambutan"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Nama Kepala Sekolah
                          </label>
                          <input
                            value={namaKepsek}
                            onChange={(e) => setNamaKepsek(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Nama Kepala Sekolah"
                          />
                        </div>
                        {/* <div className="mb-3 co-lg-6">
                          {/* a */}
                        {/* <label className="form-label font-weight-bold">
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
                          /> */}
                        {/* </div> */}
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Isi Sambutan
                          </label>
                          <Editor
                            apiKey="gpl" // Optional, but recommended for production
                            value={isiSambutan}
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
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            NIP
                          </label>
                          <input
                            value={nip}
                            onChange={(e) => setNip(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan NIP"
                          />
                        </div>
                        <div className="mb-3 co-lg-6">
                          {/* a */}
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
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-sambutan">
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

export default AddSambutan;
