import React, { useEffect, useState } from "react";
import Header from "../../../../component/Header";
import Sidebar from "../../../../component/Sidebar";
import Footer from "../../../../component/Footer";
import { API_DUMMY } from "../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";

function EditPengumuman() {
  const [author, setAuthor] = useState("");
  const [isiPengumuman, setIsiPengumuman] = useState("");
  const [file, setFile] = useState("");
  const [judulPengumuman, setJudulPengumuman] = useState("");
  const [tags, setTags] = useState("");
  const param = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/bawaslu/api/pengumuman/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setAuthor(response.author);
        setIsiPengumuman(response.isiPengumuman);
        setJudulPengumuman(response.judulPengumuman);
        setTags(response.tags);
        setFile(response.image);
        console.log("pengumuman : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //edit pengumuman
  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("author", author);
    formData.append("isiPengumuman", isiPengumuman);
    formData.append("judulPengumuman", judulPengumuman);
    formData.append("file", file);
    formData.append("tags", tags);

    await axios
      .put(`${API_DUMMY}/bawaslu/api/pengumuman/` + param.id, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Pengumuman",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-pengumuman");
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
  },[]);

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container mt-3 app-main__outer"  data-aos="fade-left">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Edit Data</h1>
              <hr />
              <form onSubmit={update}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label for="exampleInputPassword1" className="form-label font-weight-bold">
                      Judul Pengumuman
                    </label>
                    <input
                      value={judulPengumuman}
                      onChange={(e) => setJudulPengumuman(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label for="exampleInputEmail1" className="form-label font-weight-bold">
                      Penulis Pengumuman
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label for="exampleInputPassword1" className="form-label font-weight-bold">
                      Image
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label for="exampleInputPassword1" className="form-label font-weight-bold">
                      Tags
                    </label>
                    <input
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 col-lg-12">
                    <label for="exampleInputPassword1" className="form-label font-weight-bold">
                      Isi Pengumuman
                    </label>
                    <textarea
                      value={isiPengumuman}
                      onChange={(e) => setIsiPengumuman(e.target.value)}
                      className="form-control"
                      placeholder="Masukkan isi berita"
                      id="floatingTextarea2"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
                <button type="button" className="btn-danger mt-3 mr-3">
                  <a
                    href="/admin-pengumuman"
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

export default EditPengumuman;
