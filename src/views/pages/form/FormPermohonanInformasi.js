import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import "../../../css/FormPermohonanInformasi.css";
import info from "../../../aset/undraw_settings_tab_mgiw.svg";
import Footer from "../../../component/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../utils/base_URL";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { async } from "q";
import AOS from "aos";

const FormPermohonanInformasi = () => {
  const [alamatPemohon, setAlamatPemohon] = useState("");
  // const [caraMendapatSalinanInformasi, setCaraMendapatSalinanInformasi] = useState("");
  const [caraMemperolehInformasi, setCaraMemperolehnInformasi] = useState("");
  const [tujuanPenggunaanInformasi, setTujuanPenggunaanInformasi] =
    useState("");
  const [email, setEmail] = useState("");
  const [namaPemohon, setNamaPemohon] = useState("");
  const [noTlp, setNoTlp] = useState("");
  const [nomorIdentitasPemohon, setNomorIdentitasPemohon] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [rincianYangDibutuhkan, setRincianYangDibutuhkan] = useState("");
  const [fotoIdentitas, setFotoIdentitas] = useState("");
  const [jenisIdentitas, setJenisIdentitasPemohon] = useState("");
  const [show, setShow] = useState(false);

  const Add = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("namaPemohon", namaPemohon);
    formData.append("alamatPemohon", alamatPemohon);
    formData.append("pendidikan", pendidikan);
    formData.append("email", email);
    formData.append("noTlp", noTlp);
    formData.append("nomorIdentitasPemohon", nomorIdentitasPemohon);
    // formData.append("tujuanInformasi", tujuanInformasi);
    formData.append("rincianYangDibutuhkan", rincianYangDibutuhkan);
    // formData.append("pekerjaan", pekerjaan);
    formData.append("tujuanPenggunaanInformasi", tujuanPenggunaanInformasi);
    formData.append("caraMemperolehInformasi", caraMemperolehInformasi);
    // formData.append("caraMendapatSalinanInformasi", caraMendapatSalinanInformasi);
    formData.append("fotoIdentitas", fotoIdentitas);
    formData.append("jenisIdentitas", jenisIdentitas);

    try {
      await axios.post(
        `${API_DUMMY}/bawaslu/api/permohonan-informasi/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil Mengajukan Permohonan Informasi",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
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
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
            className="form text-center">
            <div className="form-permohonan section-title text-center">
              <h5
                id="text1-gabung"
                className="sub-title double-line text-center">
                Bawaslu Boyolali
              </h5>
              <h2 id="text2-gabung" className="title text-center">
                Form Permohonan Informasi
              </h2>
              {/* <p className="content">Dcidunt eget semper nec quam. Sed hendrerit. acfelis Nunc egestas augue
                        atpellentesque laoreet</p> */}
            </div>
            {/* <div className="info">
              <img src={info} className="img" id="img" />
            </div> */}
          </div>
          <div className="spacer"></div>

          <form
            onSubmit={Add}
            className="option"
            style={{ marginTop: "100px" }}>
            <div>
              <div data-aos="fade-right">
                {""}
                <label
                  for="exampleInputPassword1"
                  className="form-label font-weight-bold">
                  Nama Pemohon :
                </label>
                <input
                  value={namaPemohon}
                  onChange={(e) => {
                    if (e.target.value.length <= 31) {
                      setNamaPemohon(e.target.value);
                    }
                  }}
                  type="text"
                  className={`form-control ${namaPemohon.length >= 31 ? "border-danger bg-danger-subtle": "" }`}
                />
                <p className="pp">0 of 30 max characters</p>
                <br></br>
                <label
                  for="exampleInputPassword1"
                  className="form-label font-weight-bold">
                  Alamat Pemohon :
                </label>{" "}
                <textarea
                  className={`textarea ${alamatPemohon.length >= 61 ? "border-danger bg-danger-subtle": "" }`}
                  id="textarea"
                  value={alamatPemohon}
                  onChange={(e) => {
                    if (e.target.value.length <= 61) {
                      setAlamatPemohon(e.target.value);
                    }
                  }}
                />
                <p className="pp">0 of 60 max characters</p>
                <br />
                <br />
                <label
                  for="exampleInputPassword1"
                  className="form-label font-weight-bold">
                  Nomor Identitas :{" "}
                </label>{" "}
                <input
                  type="number"
                  className={`form-control ${
                    nomorIdentitasPemohon.length >= 31 ? "border-danger bg-danger-subtle" : ""
                  }`}
                  id=""
                  value={nomorIdentitasPemohon}
                  onChange={(e) => {
                    if (e.target.value.length <= 31) {
                      setNomorIdentitasPemohon(e.target.value);
                    }
                  }}
                />
                <p className="pp">0 of 30 max characters</p>
                <br></br>
                <br></br>
                <label
                  for="exampleInputPassword1"
                  className="form-label font-weight-bold">
                  Jenis Identitas :
                </label>
                <select
                  value={jenisIdentitas}
                  onChange={(e) => setJenisIdentitasPemohon(e.target.value)}
                  className="form-select"
                  aria-label="Default select example">
                  <option selected>Pilih Jenis Identitas </option>
                  <option value="1">KTP (Kartu Tanda Penduduk)</option>
                  <option value="2">SIM (Surat Izin Mengemudi)</option>
                  <option value="3">KTM (Surat Tanda Mahasiswa)</option>
                </select>
                <br />
                <br />
                {/* <p>Pekerjaan:</p>
                <input
                  type="text"
                  className={`form-control ${noTlp.length >= 31 ? "border-danger bg-danger-subtle" : ""}`}
                  id=""
                  value={pekerjaan}
   onChange={(e) => {
                        if (e.target.value.length <= 31) {
                          setNamaPemohon(e.target.value);
                        }
                      }}                />
                <p className="pp">0 of 60 max characters</p> */}
                <br></br>
                <br></br>
                <label
                  for="exampleInputPassword1"
                  className="form-label font-weight-bold">
                  Nomor Tlp/Hp :{" "}
                </label>
                <input
                  className={`form-control ${
                    noTlp.length >= 31 ? "border-danger bg-danger-subtle" : ""
                  }`}
                  id=""
                  type="number"
                  value={noTlp}
                  onChange={(e) => {
                    if (e.target.value.length <= 31) {
                      setNoTlp(e.target.value);
                    }
                  }}
                />
                <p className="pp">0 of 30 max characters</p>
                <br></br>
                <label
                  for="exampleInputPassword1"
                  className="form-label font-weight-bold">
                  Email :{" "}
                </label>
                <input
                  className={`form-control ${
                    email.length >= 31 ? "border-danger bg-danger-subtle" : ""
                  }`}
                  id=""
                  type="email"
                  value={email}
                  onChange={(e) => {
                    if (e.target.value.length <= 31) {
                      setEmail(e.target.value);
                    }
                  }}
                />{" "}
                <p className="pp">0 of 30 max characters</p>
                <br></br>
              </div>
            </div>
            <div data-aos="fade-left" className="tujuan">
              <label
                for="exampleInputPassword1"
                className="form-label font-weight-bold">
                Tujuan Penggunaan Informasi :{" "}
              </label>
              <textarea
                value={tujuanPenggunaanInformasi}
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    setTujuanPenggunaanInformasi(e.target.value);
                  }
                }}
                className={`textarea ${tujuanPenggunaanInformasi.length >= 100 ? "border-danger bg-danger-subtle": "" }`}
                id="textarea"
              />
              <p className="pp">0 of 100 max characters</p>
              <br></br>
              <label
                for="exampleInputPassword1"
                className="form-label font-weight-bold">
                Cara Memperoleh Informasi :
              </label>
              <select id="responsive-select"
                value={caraMemperolehInformasi}
                onChange={(e) =>
                    setCaraMemperolehnInformasi(e.target.value)}
                className="form-select responsive-select"
                aria-label="Default select example">
                <option selected>Pilih Cara Memperoleh Informasi </option>
                <option value="mengambil sendiri">Mengambil Langsung</option>
                <option value="pos">POS</option>
                <option value="kurir">Kurir</option>
                <option value="fax">FAX</option>
                <option value="email">Email</option>
              </select>
              <br></br>
              <br></br>
              <br></br>
              <label
                for="exampleInputPassword1"
                className="form-label font-weight-bold">
                Upload Foto identitas :{" "}
              </label>{" "}
              <input
                type="file"
                onChange={(e) => setFotoIdentitas(e.target.files[0])}
              />
              <br></br>
              <label className="form-label font-weight-bold">
                Jaminan Perlindungan Data Pribadi:
              </label>
              <ol>
                <li>
                  Permintaan data pribadi untuk kepentingan pelayanan informasi
                </li>
                <li>
                  Bawaslu tidak akan memberikan data pribadi pemohon kepada
                  pihak ketiga.
                </li>
                <li>
                  Bawaslu akan memberitahukan kepada pemohon jika terjadi
                  kebocoran perlindungan data pribadi dan mengupayakan
                  pemulihannya.
                </li>
                <li>
                  Bawaslu akan memberikan sanksi kepada oknum internal yang
                  mengambil data pribadi pemohon untuk di luar kepentingan
                  pelayanan informasi.
                </li>
                <li>
                  Pemohon dapat menyampaikan pengaduan/keberatan bagi pemohon
                  atas dugaan tidak terlindunginya data pribadi pemohon.
                </li>
                <li>
                  Bawaslu akan memusnahkan data pribadi pemohon setelah lima
                  tahun atau di bawah lima tahun atas permintaan pemohon dengan
                  alasan yang dibenarkan oleh peraturan per-UU-an
                </li>
              </ol>
              <br></br>
              <div id="div-button" className="div-button">
                {" "}
                <button id="btn-kirim" type="submit" className="submit">
                  Kirim
                </button>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FormPermohonanInformasi;
