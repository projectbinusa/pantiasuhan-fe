import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import AOS from "aos";
import axios from "axios";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";

function EditOrtu() {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");

  const param = useParams();
  const history = useHistory();

  const updateBerita = (e) => {
    e.preventDefault();
    e.persist();

    const data = {
      name: nama,
      address: alamat,
      url_image: ""
    };

    axios
      .put(`${API_DUMMY_PYTHON}/api/admin/foster_parent/` + param.id, data, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Diperbarui",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          history.push("/admin_ortu_asuh");
        }, 1500);
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

  useEffect(() => {
    axios
      .get(`${API_DUMMY_PYTHON}/api/admin/foster_parent/` + param.id, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setNama(response.name);
        setAlamat(response.address);
      })
      .catch((error) => {
        console.log(error);
      });
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
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
        }`}
    >
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}
      >
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div style={{ marginTop: "10px" }} className="page-content1 absolute">
        <div
          className=" container mt-3 mb-3 app-main__outer"
          data-aos="fade-left"
        >
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Edit Data</h1>
              <hr />
              <form onSubmit={updateBerita}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputEmail1"
                      className="form-label  font-weight-bold "
                    >
                      Nama
                    </label>
                    <input
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Nama"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">
                      Alamat
                    </label>
                    <input
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Alamat"
                    />
                  </div>
                  {/* <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">
                      Image
                    </label>
                    <input
                      onChange={(e) => {
                        if (setImage) {
                          setImage(e.target.files[0]);
                        } else {
                          setImageUrl(e.target.value);
                        }
                      }}
                      type="file"
                      className="form-control"
                    />
                    {imageUrl && (
                      <div className="mt-3">
                        <img
                          src={imageUrl}
                          alt="Current Image"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      </div>
                    )}
                  </div> */}
                </div>
                <button type="button" className="btn-danger mt-3">
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    href="/admin_ortu_asuh"
                  >
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
  );
}

export default EditOrtu;
