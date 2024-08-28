import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import AOS from "aos";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

function EditBeritaAdmin() {
  const [author, setAuthor] = useState("");
  const [judulBerita, setJudulBerita] = useState("");
  const [image, setImage] = useState(null);
  const [categoryBerita, setCategoryBerita] = useState("");
  const [isiBerita, setIsiBerita] = useState("");

  const param = useParams();
  const history = useHistory();

  const updateBerita = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("author", author);
    formData.append("judulBerita", judulBerita);
    formData.append("isiBerita", isiBerita);
    formData.append("category", categoryBerita);
    formData.append("file", image);

    await axios
      .put(`${API_DUMMY}/smpn1bergas/api/berita/put/` + param.id, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Berita",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-berita");
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
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/berita/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setAuthor(response.author);
        setJudulBerita(response.judulBerita);
        setIsiBerita(response.isiBerita);
        setCategoryBerita(response.category);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
              <form onSubmit={updateBerita}>
                <div className="row">
                  <div className="mb-3 col-lg-12">
                    {/*  */}
                    <label className="form-label font-weight-bold">
                      Katagori Berita
                    </label>
                    <select
                      value={categoryBerita}
                      className="form-control"
                      aria-label="Small select example"
                      onChange={(e) => setCategoryBerita(e.target.value)}>
                      <option selected>Pilih Category</option>
                      <option value="Berita Sekolah">Berita Sekolah</option>
                      <option value="Info Sekolah">Info Sekolah</option>
                      <option value="Agenda Sekolah">Agenda Sekolah</option>
                    </select>
                  </div>
                  <div className="mb-3 col-lg-12">
                    {/*  */}
                    <label
                      for="exampleInputEmail1"
                      className="form-label font-weight-bold">
                      Penulis Berita
                    </label>
                    <input
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan penulis berita"
                    />
                  </div>
                  <div className="mb-3 co-lg-6">
                    {/*  */}
                    <label className="form-label font-weight-bold">
                      Gambar
                    </label>
                    <input
                      onChange={(e) =>
                        setImage(e.target.files ? e.target.files[0] : null)
                      }
                      type="file"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-lg-12">
                    {/*  */}
                    <label className="form-label font-weight-bold">
                      Judul Berita
                    </label>
                    <input
                      value={judulBerita}
                      onChange={(e) => setJudulBerita(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan judul berita"
                    />
                  </div>
                  <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Isi Berita
                          </label>
                          <CKEditor
                            data={isiBerita}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setIsiBerita(data);
                            }}
                            editor={ClassicEditor}
                            config={{
                              toolbar: [
                                "undo",
                                "redo",
                                "|",
                                "heading",
                                "|",
                                "bold",
                                "italic",
                                "|",
                                "link",
                                "insertTable",
                                "mediaEmbed",
                                "|",
                                "bulletedList",
                                "numberedList",
                                "indent",
                                "outdent",
                              ],
                              plugins: [
                                Bold,
                                Essentials,
                                Heading,
                                Indent,
                                IndentBlock,
                                Italic,
                                Link,
                                List,
                                MediaEmbed,
                                Paragraph,
                                Table,
                                Undo,
                              ],
                              // initialData: "<h1>Hello from CKEditor 5!</h1>",
                            }}
                          />
                        </div>
                </div>
                <button type="button" className="btn-danger mt-3">
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    href="/admin-berita">
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
  );
}

export default EditBeritaAdmin;
