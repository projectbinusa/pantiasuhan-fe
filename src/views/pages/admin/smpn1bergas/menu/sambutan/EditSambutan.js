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
import { CKEditor } from "@ckeditor/ckeditor5-react";
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
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

function EditSambutan() {
  const [judulSambutan, setJudulSambutan] = useState("");
  //   const [image, setImage] = useState(null);
  const [isiSambutan, setIsiSambutan] = useState("");
  const [nip, setNip] = useState("");
  const [file, setFile] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/sambutan/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setIsiSambutan(response.isi);
        setJudulSambutan(response.nama);
        setNip(response.nip);
        console.log("sambutan : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("isi", isiSambutan);
    formData.append("nama", judulSambutan);
    formData.append("nip", nip);
    formData.append("file", file);

    await axios
      .put(`${API_DUMMY}/smpn1bergas/api/sambutan/put/` + param.id, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Sambutan",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-sambutan");
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
        <div className="app-main__outer" data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Edit Data</h1>
                    <hr />
                    <form onSubmit={update}>
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
                          <CKEditor
                            data={isiSambutan}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setIsiSambutan(data);
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

export default EditSambutan;
