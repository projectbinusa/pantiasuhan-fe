import React, { useEffect, useState } from "react";
import Header from "../../../../component/Header";
import Sidebar from "../../../../component/Sidebar";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import AOS from "aos";

function EditBeritaAdmin() {
  const [author, setAuthor] = useState("");
  const [judulBerita, setJudulBerita] = useState("");
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const [category, setCategory] = useState([]);
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
    formData.append("categoryId", categoryId);
    formData.append("file", image);

    await axios
      .put(`${API_DUMMY}/bawaslu/api/berita/put/` + param.id, formData, {
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

  //get by id category
  const getAllCategoryId = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/category-berita/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategory(response.data.data.content);
      console.log(response.data.data.content);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/bawaslu/api/berita/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setAuthor(response.author);
        setJudulBerita(response.judulBerita);
        setIsiBerita(response.isiBerita);
        setCategoryId(response.categoryBerita);
      })
      .catch((error) => {
        console.log(error);
      });
    getAllCategoryId();
  }, []);

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
              <form onSubmit={updateBerita}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    {/*  */}
                    <label className="form-label font-weight-bold">Category</label>
                    <select
                      className="form-control"
                      aria-label="Small select example"
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option selected>Pilih Category</option>
                      {category.map((down) => {
                        return <option value={down.id}>{down.category}</option>;
                      })}
                    </select>
                  </div>
                  <div className="mb-3 col-lg-6">
                    {/*  */}
                    <label for="exampleInputEmail1" className="form-label font-weight-bold">
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
                    <label className="form-label font-weight-bold">Gambar</label>
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
                    <label className="form-label font-weight-bold">Judul Berita</label>
                    <input
                      value={judulBerita}
                      onChange={(e) => setJudulBerita(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan judul berita"
                    />
                  </div>
                  <div className="col-lg-12">
                    {/*  */}
                    <label className="form-label font-weight-bold">Isi Berita</label>
                    <div className="">
                      <textarea
                        value={isiBerita}
                        onChange={(e) => setIsiBerita(e.target.value)}
                        className="form-control"
                        placeholder="Masukkan isi berita"
                        id="floatingTextarea2"
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <button type="button" className="btn-danger mt-3">
                    <a
                      style={{ color: "white", textDecoration: "none" }}
                      href="/admin-berita"
                    >
                      Batal
                    </a>
                  </button>
                  {" "}
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