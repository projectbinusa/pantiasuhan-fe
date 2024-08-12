import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/base_URL";
import AOS from "aos";
import Sidebar from "../../../../component/Sidebar";
import Header from "../../../../component/Header";

function PutLibrary() {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const history = useHistory();
  const param = useParams();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/bawaslu/api/library/ById/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const responseData = response.data.data;
        setPhotoUrl(responseData.photoUrl);
        setName(responseData.name);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        } else {
          console.log(error);
        }
      });
  }, [param.id]);

  const update = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${API_DUMMY}/bawaslu/api/library/` + param.id,
        {
          name,
          photoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Library",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin-library");
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
        <div className="container mt-3 app-main__outer" data-aos="fade-left">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Update Data</h1>
              <hr />
              <form onSubmit={update}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      Nama
                    </label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Masukkan Nama"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      Photo Url
                    </label>
                    <input
                      required
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      value={photoUrl}
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Masukkan Photo Url"
                    />
                  </div>
                </div>
                <button type="button" className="btn-danger mt-3 mr-3">
                  <a
                    href="/admin-library"
                    style={{ color: "white", textDecoration: "none" }}>
                    {" "}
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

export default PutLibrary;
