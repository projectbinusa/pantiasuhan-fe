import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";

function DetailMessage() {
  const [judulBerita, setJudulBerita] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [author, setAuthor] = useState("");
  const [isiBerita, setIsiBerita] = useState("");
  const [categoryBerita, setCategoryBerita] = useState("");
  const [image, setImage] = useState("");
  const param = useParams();

  // get by id berita
  useEffect(() => {
    axios
      .get(`${API_DUMMY_SMART}/api/customer/berita/` + param.id, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((res) => {
        const list_data = res.data.data;
        setCreatedDate(list_data.created_date);
        setUpdateDate(list_data.updated_date);
        setJudulBerita(list_data.judul_berita);
        setAuthor(list_data.author);
        setIsiBerita(list_data.isi_berita);
        setImage(list_data.image);
        setCategoryBerita(list_data.category);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  }, [param.id]);

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
      <div
        style={{ marginTop: "10px" }}
        className="page-content1 mt-3 mb-3 app-main__outer"
      >
        <div className="container box-tabel">
          <div className="card shadow w-100">
            <h1 className="title card-header fw-bold fs-3">Detail</h1>
            <br />
            <div className="card-body">
              {image === null ? (
                <img
                  className="rounded-circle w-75 mr-auto ml-auto d-block"
                  src="https://via.placeholder.com/500x400"
                />
              ) : (
                <img
                  style={{ width: "100%", maxHeight: "400px" }}
                  className="w-75 d-block mr-auto ml-auto"
                  src={image}
                />
              )}
              <br />
              <br />
              <div className="row">
                <div className="mb-3 col-lg-12">
                  <label className="form-label font-weight-bold">
                    Judul Berita
                  </label>
                  <input
                    value={judulBerita}
                    disabled
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Judul Berita"
                  />
                </div>
                <div className="mb-3 col-lg-12">
                  <label className="form-label font-weight-bold">
                    Kategori Berita
                  </label>
                  <input
                    value={categoryBerita}
                    type="text"
                    disabled
                    className="form-control"
                    placeholder="Masukkan Kategori Berita"
                  />
                </div>
                <div className="mb-3 col-lg-12">
                  <label
                    for="exampleInputEmail1"
                    className="form-label  font-weight-bold "
                  >
                    Penulis Berita
                  </label>
                  <input
                    value={author}
                    disabled
                    type="disabled"
                    className="form-control"
                    placeholder="Masukkan Penulis Berita"
                  />
                </div>
                <div className="mb-3 col-lg-12">
                  <label className="form-label font-weight-bold">
                    Isi Berita
                  </label>
                  <div
                    style={{
                      background: "#E9EFEC",
                      borderRadius: "8px",
                      padding: "4px",
                      paddingLeft: "5px",
                    }}
                    dangerouslySetInnerHTML={{ __html: isiBerita }}
                  />
                </div>
              </div>
            </div>
            <button type="button" className="btn-kembali btn-danger mt-3 px-0">
              <a
                href="/admin_berita"
                style={{ color: "white", textDecoration: "none" }}
              >
                Kembali
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailMessage;
