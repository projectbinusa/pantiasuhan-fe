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

function EditTenagaKependidikan() {
  const [status, setStatus] = useState("");
  //   const [image, setImage] = useState(null);
  const [nama, setNama] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    axios
.get(`${API_DUMMY}/smpn1bergas/api/tenaga_kependidikan/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setNama(response.nama);
        setStatus(response.status);
        console.log("tenaga kependidikan : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const update = async (e) => {
    e.preventDefault();

    const data = {
      nama: nama,
      status: status,
    };

    await axios
      .put(`${API_DUMMY}/smpn1bergas/api/tenaga_kependidikan/put/` + param.id, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Tenaga Kependidikan",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-tenaga-kependidikan");
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
                            Nama
                          </label>
                          <input
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Nama"
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
                            Status
                          </label>
                          <textarea
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Status"></textarea>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-tenaga-kependidikan">
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

export default EditTenagaKependidikan;