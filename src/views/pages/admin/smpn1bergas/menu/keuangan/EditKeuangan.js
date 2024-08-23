import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Header from "../../../../../../component/Header";
import Sidebar from "../../../../../../component/Sidebar";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import AOS from "aos";
import axios from "axios";

function EditKeuangan() {
  const [judul, setJudul] = useState("");
  const [image, setImage] = useState(null);
  const [categoryKeuangan, setCategoryKeuangan] = useState("");
  const [isi, setIsi] = useState("");

  const param = useParams();
  const history = useHistory();

  const updateBerita = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("isi", isi);
    formData.append("categoryKeuangan", categoryKeuangan);
    formData.append("file", image);

    await axios
      .put(`${API_DUMMY}/smpn1bergas/api/keuangan/put/` + param.id, formData, {
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
        setTimeout(() => {
        history.push("/admin-keuangan");
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
      .get(`${API_DUMMY}/smpn1bergas/api/keuangan/get/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setJudul(response.judul);
        setIsi(response.isi);
        setCategoryKeuangan(response.category);
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
                  <div className="mb-3 col-lg-6">
                    {/*  */}
                    <label className="form-label font-weight-bold">
                      Kategori Keuangan
                    </label>
                    <select
                            value={categoryKeuangan}
                            className="form-control"
                            aria-label="Small select example"
                            onChange={(e) =>
                              setCategoryKeuangan(e.target.value)
                            }>
                            <option selected>Pilih Kategori Keuangan</option>
                            <option value="BOS">BOS</option>
                            <option value="APBD">APBD</option>
                            <option value="Komite">Komite</option>
                          </select>
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
                    <label className="form-label font-weight-bold">Judul</label>
                    <input
                      value={judul}
                      onChange={(e) => setJudul(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan judul"
                    />
                  </div>
                  <div className="col-lg-12">
                    {/*  */}
                    <label className="form-label font-weight-bold">Isi</label>
                    <div className="">
                      <textarea
                        value={isi}
                        onChange={(e) => setIsi(e.target.value)}
                        className="form-control"
                        placeholder="Masukkan isi"
                        id="floatingTextarea2"
                        rows="5"></textarea>
                    </div>
                  </div>
                </div>
                <button type="button" className="btn-danger mt-3">
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    href="/admin-keuangan">
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

export default EditKeuangan;
