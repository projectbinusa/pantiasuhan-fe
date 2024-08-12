import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/base_URL";
import Header from "../../../../component/Header";
import Sidebar from "../../../../component/Sidebar";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import "../../../../css/gabung.css"

function DetailPengumuman() {
  const [author, setAuthor] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [judulPengumuman, setJudulPengumuman] = useState("");
  const [tags, setTags] = useState("");
  const [isiPengumuman, setIsiPengumuman] = useState("");
  const [file, setFile] = useState("");
  const param = useParams();

  //get by id pengumuman
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/bawaslu/api/pengumuman/get/` + param.id)
      .then((res) => {
        const list_data = res.data.data;
        setAuthor(list_data.author);
        setJudulPengumuman(list_data.judulPengumuman);
        setTags(list_data.tags);
        setIsiPengumuman(list_data.isiPengumuman);
        setFile(list_data.image);
        setCreatedDate(list_data.createdDate);
        setUpdateDate(list_data.updatedDate);
        console.log(res.data.data);
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
        <div className="container mt-3 app-main__outer mb-3">
          <div className="gap-5">
            <form className="card shadow  w-100">
              <h2 className="fs-3 text-center fw-bold card-header">Detail</h2>
              <br />
              <div className="card-body">
                {file === null ? (
                  <img
                    className="w-75 d-block mr-auto ml-auto"
                    src="https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"
                  />
                ) : (
                  <img
                    style={{
                      maxWidth: "400px",
                      maxHeight: "400px",
                      minWidth: "350px",
                      minHeight: "350px",
                    }}
                    className="w-75 d-block mr-auto ml-auto"
                    src={file}
                  />
                )}
                <br />
                <br />
                <div class="mb-3">
                  <label class="form-label">Tanggal Dibuat</label>
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
                  <label class="form-label">Tanggal Update</label>
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
                <div class="mb-3">
                  <label class="form-label">Penulis</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={author}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Judul Pengumuman</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={judulPengumuman}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Isi Pengumuman</label>
                  <textarea
                    disabled
                    class="form-control"
                    defaultValue={isiPengumuman}
                    rows="5"
                    readOnly
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Tags</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={tags}
                  />
                </div>

              </div>
              <button type="submit" className="btn-kembali btn-danger mt-3 mr-3">
                  <a
                    href="/admin-pengumuman"
                    style={{ color: "white", textDecoration: "none" }}
                  >
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

export default DetailPengumuman;
