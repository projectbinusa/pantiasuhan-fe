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

function EditVisiMisi() {
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
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
                          <textarea
                            value={visi}
                            onChange={(e) => setVisi(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Visi"></textarea>
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
                            Misi
                          </label>
                          <textarea
                            value={misi}
                            onChange={(e) => setMisi(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Misi"></textarea>
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
