import React, { useEffect, useState } from "react";
// import Header from "../../../../component/Header";
// import Sidebar from "../../../../component/Sidebar";
// import Footer from "../../../../component/Footer";
// import { API_DUMMY } from "../../../../utils/base_URL";
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
import { Editor } from "@tinymce/tinymce-react";


function EditKondisiSekolah() {
  //   const [galery, setGalery] = useState("");
  const [foto, setFile] = useState(null);
  const [deskripsi, setDeskripsi] = useState("");
  const param = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/kondisi_sekolah/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        // setGalery(response.galery);
        setDeskripsi(response.deskripsi);
        setFile(response.foto);
        console.log("galery : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //edit pengumuman
  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("deskripsi", deskripsi);
    formData.append("file", foto);

    await axios
      .put(
        `${API_DUMMY}/smpn1bergas/api/kondisi_sekolah/put/` + param.id,
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
          title: "Berhasil Mengedit Data Kondisi Sekolah",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-kondisi-sekolah");
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

  const handleEditorChange = (deskripsi, editor) => {
    setDeskripsi(deskripsi);
  };

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
              <form onSubmit={update}>
                <div className="row">
                  {/* <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      Judul
                    </label>
                    <input
                      value={galery}
                      onChange={(e) => setGalery(e.target.value)}
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
                      Image
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="form-control"
                      required
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 col-lg-12">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      deskripsi
                    </label>
                    <Editor
                            apiKey="gpl" // Optional, but recommended for production
                            value={deskripsi}
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
                    href="/admin-kondisi-sekolah"
                    style={{ color: "white", textDecoration: "none" }}>
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

export default EditKondisiSekolah;
