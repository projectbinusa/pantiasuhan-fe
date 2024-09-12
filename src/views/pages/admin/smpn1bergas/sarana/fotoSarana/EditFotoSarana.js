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
import Sidebar1 from "../../../../../../component/Sidebar1";

function EditFotoSarana() {
  const [image, setImage] = useState(null);
  const [idSarana, setIdSarana] = useState("");
  const [sarana, setSarana] = useState([]);
  const history = useHistory();
  const param = useParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/foto_sarana/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setIdSarana(response.sarana.id);
        setImage(response.foto);
        console.log("foto-sarana : ", ress.data.data);
        console.log("id sarana : ", ress.data.data.sarana.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //edit pengumuman
  const update = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("id_sarana", idSarana);
    formData.append("file", image);

    await axios
      .put(
        `${API_DUMMY}/smpn1bergas/api/foto_sarana/put/` + param.id,
        {
          id_sarana: idSarana
        },
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        if (image) {
          axios.put(`${API_DUMMY}/smpn1bergas/api/foto_sarana/put/foto/` + param.id, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }).catch((err) => {
            console.log(err);
          })
        }
        setShow(false);
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Diperbarui",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-sarana");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        // console.log("Berhasil diperbarui", response.data);
      })
      .catch((error) => {
        if (error.ressponse && error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        } else {
          Swal.fire({
            icon: "error",
            title: "Edit Data Gagal!",
            showConfirmButton: false,
            timer: 1500,
          });
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

  const [sidebarToggled, setSidebarToggled] = useState(true);

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  const handleResize = () => {
    if (window.innerWidth < 800) {
      setSidebarToggled(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
      }`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}>
        <i className="fas fa-bars"></i>
      </a>
      {/* <Header toggleSidebar={toggleSidebar} /> */}
      {/* <div className="app-main"> */}
      <Sidebar1 toggleSidebar={toggleSidebar} />
      <div
        style={{ marginTop: "50px" }}
        className="page-content1 mb-3 app-main__outer"
        data-aos="fade-left">
        <div
          className="container mt-3 mb-3 app-main__outer"
          data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Tambah Data</h1>
                    <hr />
                    <form onSubmit={update}>
                      <div className="row">
                        <div className="mb-3 col-lg-6">
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
                                <option value={down.id}>
                                  {down.nama_sarana}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin-sarana">
                          Batal
                        </a>
                      </button>
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
