import React, { useEffect } from "react";
import "../../../css/FormKeberatan.css";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import info from "../../../aset/undraw_settings_tab_mgiw.svg";
import RI from "../../../aset/Bawaslu-RI-300x73-1.png";
import jateng from "../../../aset/bawaslu-jateng-300x73-1.png";
import dkpp from "../../../aset/dkpp-300x73-1.png";
import KPU from "../../../aset/KPU-300x73-1.png";
import MAHKAMAH from "../../../aset/MAHKAMAKONSTITUSI-300x73-1.png";
import { useState } from "react";
import { API_DUMMY } from "../../../utils/base_URL";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";

const FormPermohonaKeberatan = () => {
  const [namaPemohon, setNamaPemohon] = useState("");
  const [kasusPosisi, setKasusPosisi] = useState("");
  const [noTlp, setNoTlp] = useState("");
  const [email, setEmail] = useState("");
  const [jenisIdentitas, setJenisIdentitas] = useState("");
  const [alasanPengajuanKeberatan, setAlasanPengajuanKeberatan] = useState("");
  const [alamatPemohon, setAlamatPemohon] = useState("");
  // const [alasan, setAlasan] = useState("");
  const [nomorIdentitasPemohon, setNomorIdentitasPemohon] = useState("");
  const [fotoIdentitas, setFotoIdentitas] = useState("");
  const [tujuanPenggunaanInformasi, setTujuanPenggunaanInformasi] =
    useState("");
  const [show, setShow] = useState(false);

  const add = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("namaPemohon", namaPemohon);
    formData.append("kasusPosisi", kasusPosisi);
    formData.append("email", email);
    formData.append("noTlp", noTlp);
    formData.append("jenisIdentitas", jenisIdentitas);
    formData.append("alasanPengajuanKeberatan", alasanPengajuanKeberatan);
    formData.append("alamatPemohon", alamatPemohon);
    // formData.append("alasan", alasan);
    formData.append("tujuanPenggunaanInformasi", tujuanPenggunaanInformasi);
    formData.append("nomorIdentitasPemohon", nomorIdentitasPemohon);
    formData.append("fotoIdentitas", fotoIdentitas); // Upload gambar jika dipilih

    try {
      await axios.post(
        `${API_DUMMY}/bawaslu/api/permohonan-keberatan/add`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil Ditambahkan",
        showConfirmButton: false,
        // timer: 1500,
      });
      console.log(formData);
      setTimeout(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AOS.init();
  },[]);
  return (
    <>
      <div>
        <Navbar />
        <div className="head">
          <div className="form text-center">
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="bottom-bottom"
              className="form-permohonan section-title text-center">
              <h5
                id="text1-gabung"
                className="sub-title double-line text-center">
                Bawaslu Boyolali
              </h5>
              <h2 id="text2-gabung" className="title text-center">
                Form Permohonan Keberatan
              </h2>
              {/* <p className="content">Dcidunt eget semper nec quam. Sed hendrerit. acfelis Nunc egestas augue
                        atpellentesque laoreet</p> */}
            </div>
            {/* <div className="info">
              <img src={info} className="img" id="img" />
            </div> */}
          </div>
          <div className="optionn">
            <div>
              <form className="option" onSubmit={add}>
                <div className="display-akhir">
                  <div data-aos="fade-right">
                    {" "}
                    <label
                      for="exampleInputPassword1"
                      className={`form-label font-weight-bold`}>
                      Nama Pemohon :
                    </label>{" "}
                    <input
                      className={`input form-control ${
                        namaPemohon.length >= 31
                          ? "border-danger bg-danger-subtle"
                          : ""
                      }`}
                      type="text"
                      value={namaPemohon}
                      onChange={(e) => {
                        if (e.target.value.length <= 31) {
                          setNamaPemohon(e.target.value);
                        }
                      }}
                    />
                    <p className="pp">0 of 30 max characters</p>
                    <br></br>
                    <label
                      for="exampleInputPassword1"
                      className={`form-label font-weight-bold`}>
                      Alamat Pemohon :
                    </label>{" "}
                    <textarea
                      className={`textarea ${
                        alamatPemohon.length >= 61
                          ? "border-danger bg-danger-subtle"
                          : ""
                      }`}
                      value={alamatPemohon}
                      onChange={(e) => {
                        if (e.target.value.length <= 61) {
                          setAlamatPemohon(e.target.value);
                        }
                      }}
                    />
                    <p className="pp">0 of 60 max characters</p>
                    <br></br>
                    <label
                      for="exampleInputPassword1"
                      className={`form-label font-weight-bold`}>
                      Jenis Identitas Pemohon :
                    </label>{" "}
                    <select
                      onChange={(e) => setJenisIdentitas(e.target.value)}
                      value={jenisIdentitas}
                      className="form-select"
                      aria-label="Default select example">
                      <option selected>Pilih Jenis Identitas</option>
                      <option value="KTP">KTP (Kartu Tanda Penduduk)</option>
                      <option value="SIM">SIM (Surat Izin Mengemudi)</option>
                      <option value="KTM">KTM (Surat Tanda Mahasiswa)</option>
                    </select>
                    <p className="pp">0 of 30 max characters</p>
                    <br></br>
                    <br></br>
                    <label
                      for="exampleInputPassword1"
                      className={`form-label font-weight-bold`}>
                      Nomor Tlp/Hp :{" "}
                    </label>{" "}
                    <input
                      className={`form-control ${noTlp.length >= 31 ? "border-danger bg-danger-subtle" : ""}`}
                      type="number"
                      value={noTlp}
                      onChange={(e) => {
                        if (e.target.value.length <= 31) {
                          setNoTlp(e.target.value);
                        }
                      }}
                    />
                    <p className="pp">0 of 30 max characters</p>
                    <br />
                    <label
                      for="exampleInputPassword1"
                      className={`form-label font-weight-bold`}>
                      Kasus Posisi :{" "}
                    </label>{" "}
                    <textarea
                      className={`textarea ${
                        kasusPosisi.length >= 100
                          ? "border-danger bg-danger-subtle"
                          : ""
                      }`}
                      type="text"
                      value={kasusPosisi}
                      onChange={(e) => {
                        if (e.target.value.length <= 100) {
                          setKasusPosisi(e.target.value);
                        }
                      }}
                    />
                    <p className="pp">0 of 100 max characters</p>
                  </div>
                  <div data-aos="fade-left" className="div-email">
                    <label
                      for="exampleInputPassword1"
                      className={`form-label font-weight-bold`}>
                      Nomor Identitas Pemohon :{" "}
                    </label>{" "}
                    <input
                      className={`form-control ${nomorIdentitasPemohon.length >= 31 ? "border-danger bg-danger-subtle" : ""}`}
                      type="number"
                      value={nomorIdentitasPemohon}
                      onChange={(e) => {
                        if (e.target.value.length <= 31) {
                          setNomorIdentitasPemohon(e.target.value);
                        }
                      }}
                    />
                    <p className="pp">0 of 30 max characters</p>
                    <br></br>
                    <label
                      for="exampleInputPassword1"
                      className={`form-label font-weight-bold`}>
                      Email :{" "}
                    </label>{" "}
                    <input
                      className={`form-control ${email.length >= 31 ? "border-danger bg-danger-subtle" : ""}`}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        if (e.target.value.length <= 31) {
                          setEmail(e.target.value);
                        }
                      }}
                    />
                    <p className="pp">0 of 30 max characters</p>
                    <br></br>
                    <br></br>
                    <label
                      for="exampleInputPassword1"
                      className={`form-label font-weight-bold`}>
                      Tujuan Penggunaan Informasi :
                    </label>{" "}
                    <textarea
                      className={`textarea ${
                        tujuanPenggunaanInformasi.length >= 100
                          ? "border-danger bg-danger-subtle"
                          : ""
                      }`}
                      value={tujuanPenggunaanInformasi}
                      onChange={(e) => {
                        if (e.target.value.length <= 100) {
                          setTujuanPenggunaanInformasi(e.target.value);
                        }
                      }}
                    />
                    <p className="pp">0 of 100 max characters</p>
                    <br></br>
                    <label
                      for="exampleInputPassword1"
                      className={`form-label font-weight-bold`}>
                      Alesan Pengajuan Keberatan :{" "}
                    </label>{" "}
                    <select
                      value={alasanPengajuanKeberatan}
                      onChange={(e) =>
                        setAlasanPengajuanKeberatan(e.target.value)
                      }
                      className="form-select"
                      aria-label="Default select example">
                      <option selected>Pilih Pengajuan Keberatan</option>
                      <option value="Permohonan Informasi Ditolak">
                        Permohonan Informasi Ditolak
                      </option>
                      <option value="Informasi Berkala Tidak Disediakan">
                        Informasi Berkala Tidak Disediakan
                      </option>
                      <option value="Permintaan Informasi Tidak Ditanggapi">
                        Permintaan Informasi Tidak Ditanggapi
                      </option>
                      <option value="Permintaan Informasi Ditanggapi Tidak Sebagaimana Diminta">
                        Permintaan Informasi Ditanggapi Tidak Sebagaimana
                        Diminta
                      </option>
                      <option value="Permintaan Yang Tidak Dipenuhi">
                        Permintaan Yang Tidak Dipenuhi
                      </option>
                      <option value="Biaya Yang Dikenakan Tidak Wajar">
                        Biaya Yang Dikenakan Tidak Wajar
                      </option>
                      <option value="Informasi Yang Disampaikan Melebihi Jangka Waktu Yang Tertentu">
                        Informasi Yang Disampaikan Melebihi Jangka Waktu Yang
                        Tertentu
                      </option>
                    </select>
                    <br></br>
                    <br></br>
                    <label
                      for="exampleInputPassword1"
                      className={`form-label font-weight-bold`}>
                      Upload Foto Identitas Pemohon :
                    </label>{" "}
                    <div className="input-type">
                      {" "}
                      <div className="input-type">
                        <input
                          type="file"
                          onChange={(e) => setFotoIdentitas(e.target.files[0])}
                        />
                      </div>
                      <div>
                        {" "}
                      </div>
                    </div>
                        <br />
                        <button type="submit" className="btn-kirim">
                          Kirim
                        </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default FormPermohonaKeberatan;
