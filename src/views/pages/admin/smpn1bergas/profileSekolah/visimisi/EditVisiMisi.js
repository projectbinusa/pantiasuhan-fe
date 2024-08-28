import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Header from "../../../../../../component/Header";
import Sidebar from "../../../../../../component/Sidebar";
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

function EditVisiMisi() {
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/visiMisi/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setVisi(response.visi);
        setMisi(response.misi);
        setTujuan(response.tujuan);
        console.log("misi : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const update = async (e) => {
    e.preventDefault();

    const data = {
      visi: visi,
      misi: misi,
      tujuan: tujuan,
    };

    await axios
      .put(`${API_DUMMY}/smpn1bergas/api/visiMisi/put/` + param.id, data, {
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
        history.push("/admin-visimisi");
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
                            Visi
                          </label>
                          <CKEditor
                            data={visi}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setVisi(data);
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
                            Misi
                          </label>
                          <CKEditor
                            data={misi}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setMisi(data);
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
                            Tujuan
                          </label>
                          <CKEditor
                            data={tujuan}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setTujuan(data);
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
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-visimisi">
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

export default EditVisiMisi;
