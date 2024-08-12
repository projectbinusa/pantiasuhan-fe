import React from "react";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";
import Footer from "../../../../../component/Footer";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";

function DetailPermohonanInformasi() {
  const [namaPemohon, setNamaPemohon] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [alamatPemohon, setAlamatPemohon] = useState("");
  const [nomorIdentitasPemohon, setNomorIdentitasPemohon] = useState("");
  const [jenisIdentitas, setJenisIdentitas] = useState("");
  const [noTlp, setNoTlp] = useState("");
  const [email, setEmail] = useState("");
  const [rincianYangDiButuhkan, setRincianYangDiButuhkan] = useState("");
  const [tujuanPenggunaanInformasi, setTujuanPenggunaanInformasi] =
    useState("");
  const [caraMemperolahInformasi, setCaraMemperolahInformasi] = useState("");
  const [fotoIdentitas, setFotoIdentitas] = useState("");
  const [caraMendapatSalinanInformasi, setCaraMendapatSalinanInformasi] =
    useState("");
  const param = useParams();
  const history = useHistory();

  //permohonan informasi
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/bawaslu/api/permohonan-informasi/get/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const list_data = res.data.data;
        setCreatedDate(list_data.createdDate);
        setUpdateDate(list_data.updatedDate);
        setNamaPemohon(list_data.namaPemohon);
        setAlamatPemohon(list_data.alamatPemohon);
        setNomorIdentitasPemohon(list_data.nomorIdentitasPemohon);
        setJenisIdentitas(list_data.jenisIdentitas);
        setNoTlp(list_data.noTlp);
        setEmail(list_data.email);
        setRincianYangDiButuhkan(list_data.rincianYangDibutuhkan);
        setTujuanPenggunaanInformasi(list_data.tujuanPenggunaanInformasi);
        setCaraMemperolahInformasi(list_data.caraMemperolehInformasi);
        setFotoIdentitas(list_data.fotoIdentitas);
        setCaraMendapatSalinanInformasi(list_data.caraMendapatSalinanInformasi);
      })
      .catch((error) => {
        if (error.ressponse && error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        } else {
          console.log(error);
        }
      });
  }, [param.id]);

  useEffect(() => {
    AOS.init();
  },[]);

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container mt-3 mb-3 app-main__outer"  data-aos="fade-left">
          <div className="box-tabel">
            <form className="card shadow w-100">
              <h2 className="title fw-bold fs-3 card-header">Detail</h2>
              <br />
              <div className="card-body">
                {fotoIdentitas === null ? (
                  <img
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="rounded d-block w-100 mr-auto ml-auto"
                    src="https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"
                  />
                ) : (
                  <img
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                    className="rounded d-block w-100 mr-auto ml-auto"
                    src={fotoIdentitas}
                  />
                )}
                <br />
                <br />
                <div class="mb-3">
                  <label class="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    disabled
                    value={email}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Alamat</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={alamatPemohon}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">No Telphon</label>
                  <input
                    type="number"
                    class="form-control"
                    disabled
                    value={noTlp}
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
                <div class="mb-3">
                  <label class="form-label fw-bold">Nama Pemohon</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={namaPemohon}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Alamat Pemohon</label>
                  <textarea
                    disabled
                    class="form-control"
                    defaultValue={alamatPemohon}
                    rows="5"
                    readOnly
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">
                    Nomor Identitas Pemohon
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={nomorIdentitasPemohon}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">Jenis Identitas</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={jenisIdentitas}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">No Telephone</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={noTlp}
                  />
                </div>
               <div class="mb-3">
                  <label class="form-label fw-bold">
                    Tujuan Penggunaan Informasi
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={tujuanPenggunaanInformasi}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">
                    Cara Memperoleh Informasi
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={caraMemperolahInformasi}
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold">
                    Cara Mendapatkan Salinan
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    value={caraMendapatSalinanInformasi}
                  />
                </div>
              </div>
              <button type="submit" className="btn-kembali btn-danger mt-3 mr-3">
                  <a
                    href="/adminn-permohonan-informasi"
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

export default DetailPermohonanInformasi;
