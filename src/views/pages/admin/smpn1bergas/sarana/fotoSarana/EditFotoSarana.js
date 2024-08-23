import React from "react";
// import Header from "../../../../component/Header";
// import Sidebar from "../../../../component/Sidebar";
// import { API_DUMMY } from "../../../../utils/base_URL";
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

function EditFotoSarana() {
  const [image, setImage] = useState(null);
  const [idSarana, setIdSarana] = useState("");
  const [sarana, setSarana] = useState([]);
  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/sarana/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setIdSarana(response.sarana.id);
        setImage(response.foto);
        console.log("foto-sarana : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //edit pengumuman
  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id_sarana", idSarana);
    formData.append("file", image);

    await axios
      .put(
        `${API_DUMMY}/smpn1bergas/api/foto_sarana/put/` + param.id,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Foto Sarana",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-foto-sarana");
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

  const getsarana = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/sarana/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSarana(response.data.data.content);
      console.log(response.data.data.content);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getsarana();
  }, []);

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
                    <h1 className="fs-4">Form Tambah Data</h1>
                    <hr />
                    <form onSubmit={update}>
                      <div className="row">
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
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          {/* a */}
                          <label className="form-label  font-weight-bold ">
                            sarana
                          </label>
                          <select
                            value={idSarana}
                            className="form-control"
                            aria-label="Small select example"
                            onChange={(e) => setIdSarana(e.target.value)}>
                            <option selected>Pilih sarana</option>
                            {sarana.map((down) => {
                              return (
                                <option value={down.id}>{down.nama_sarana}</option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-foto-sarana">
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

export default EditFotoSarana;
