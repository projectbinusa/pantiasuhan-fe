import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import Header from "../../../../../../component/Header";
import Sidebar from "../../../../../../component/Sidebar";

function DetailSejarah() {
  const [judul, setJudul] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [isi, setIsi] = useState("");
  const param = useParams();

  // get by id berita
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/sejarah/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const list_data = res.data.data;
        setCreatedDate(list_data.createdDate);
        setUpdateDate(list_data.updatedDate);
        setJudul(list_data.judul);
        setIsi(list_data.isi);
      })
      .catch((error) => {
        alert("Terjadi Kesalahan " + error);
      });
  }, [param.id]);

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="box-tabel">
            <form className="card shadow w-100">
              <h1 className="title card-header fw-bold fs-3">Detail</h1>
              <br />
              <div className="card-body">
                <div class="mb-3">
                  <label class="form-label fw-bold">Judul Berita</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={judul}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Isi Sejarah</label>
                  <div
                    className="form-control"
                    style={{ minHeight: "100px", background: "#e9ecef" }}
                    dangerouslySetInnerHTML={{ __html: isi }}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Dibuat</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={format(
                      new Date(createdDate || new Date()),
                      "dd MMMM yyyy",
                      { locale: idLocale }
                    )}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Update</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={format(
                      new Date(updateDate || new Date()),
                      "dd MMMM yyyy",
                      { locale: idLocale }
                    )}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn-kembali btn-danger mt-3 mr-3">
                <a
                  href="/admin-sejarah"
                  style={{ color: "white", textDecoration: "none" }}>
                  {" "}
                  Kembali
                </a>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailSejarah;