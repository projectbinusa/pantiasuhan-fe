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

function DetailAlumni() {
  const [namaAlumni, setNamaAlumni] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [kontak, setKontak] = useState("");
  const [tahunLulus, setTahunLulus] = useState("");
  const [profesi, setProfesi] = useState("");
  const [biografi, setBiografi] = useState("");
  const [image, setImage] = useState("");
  const param = useParams();

  // get by id berita
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/smpn1bergas/api/alumni/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setCreatedDate(response.createdDate);
        setUpdateDate(response.updatedDate);
        setNamaAlumni(response.nama);
        setBiografi(response.biografi);
        setKontak(response.kontak);
        setProfesi(response.profesi);
        setTahunLulus(response.tahunLulus);
        setImage(response.foto);
        console.log("alumni : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
                {image === null ? (
                  <img
                    className="rounded-circle w-75 mr-auto ml-auto d-block"
                    src="https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"
                  />
                ) : (
                  <img
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="w-75 d-block mr-auto ml-auto"
                    src={image}
                  />
                )}
                <br />
                <br />
                <div class="mb-3">
                  <label class="form-label fw-bold">Nama Alumni</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={namaAlumni}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">kontak</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={kontak}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">
                    Sekolah/Pekerjaan Sekarang
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={profesi}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Biografi</label>
                  <div
                    className="form-control"
                    style={{ height: "auto", background: "#e9ecef" }}
                    dangerouslySetInnerHTML={{ __html: biografi }}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tahun Lulus</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={tahunLulus}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Tanggal Lulus</label>
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
                  href="/admin-alumni"
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

export default DetailAlumni;
