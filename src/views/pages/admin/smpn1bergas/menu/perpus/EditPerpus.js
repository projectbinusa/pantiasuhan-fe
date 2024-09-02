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
import { Editor } from "@tinymce/tinymce-react";

function EditPerpus() {
  const [namaBuku, setNamaBuku] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [image, setImage] = useState(null);
  const [tahun, setTahun] = useState("");
  const [no, setNo] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/perpustakaan/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setPengarang(response.pengarang);
        setNamaBuku(response.nama_buku);
        setSinopsis(response.sinopsis);
        setTahun(response.tahun);
        setNo(response.no);
        setImage(response.foto);
        // setImage(response.foto);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updatePerpus = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("nama_buku", namaBuku);
    formData.append("pengarang", pengarang);
    formData.append("sinopsis", sinopsis);
    formData.append("tahun", tahun);
    formData.append("no", no);
    formData.append("file", image);

    await axios
      .put(
        `${API_DUMMY}/smpn1bergas/api/perpustakaan/put/` + param.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Perpustakaan",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-perpustakaan");
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

  const handleEditorChange = (sinopsis, editor) => {
    setSinopsis(sinopsis);
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
                    <h1 className="fs-4">Form Update Data</h1>
                    <hr />
                    <form onSubmit={updatePerpus}>
                      <div className="row">
                        <div className="mb-3 col-lg-6">
                          {/* a */}
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Pengarang Buku
                          </label>
                          <input
                            value={pengarang}
                            onChange={(e) => setPengarang(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Pengarang Buku"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          {/* a */}
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Nama/Judul Buku
                          </label>
                          <input
                            value={namaBuku}
                            onChange={(e) => setNamaBuku(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama/Judul Buku"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          {/* a */}
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Tahun
                          </label>
                          <input
                            value={tahun}
                            onChange={(e) => setTahun(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Tahun Buku"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          {/* a */}
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Nomor Buku
                          </label>
                          <input
                            value={no}
                            onChange={(e) => setNo(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nomor Buku"
                          />
                        </div>
                        <div className="mb-3 co-lg-6">
                          {/* a */}
                          <label className="form-label font-weight-bold">
                            Gambar
                          </label>
                          <input
                            required
                            type="file"
                            className="form-control"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          {/* a */}
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Sinopsis
                          </label>
                          <Editor
                            apiKey="9wwwxape64nujah8uedbwphp3hquyrcgyankbwa7wvcxokpf"
                            value={sinopsis}
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
                          href="/admin-perpustakaan">
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

export default EditPerpus;
