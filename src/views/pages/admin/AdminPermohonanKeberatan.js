import React from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import Swal from "sweetalert2";
//
import { useEffect, useState } from "react";
import "../../../../../src/css/adminBerita.css";

function AdminPermohonankeberatan() {
  const [list, setList] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState(0);
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [nomorIdentitas, setNomorIdentitas] = useState("");
  const [jenisIdentitas, setJenisIdentitas] = useState("");
  const [kasusPosisi, setKasusPosisi] = useState("");
  const [tujuanPenggunaanInformasi, setTujuanPenggunaanInformasi] =
    useState("");
  const [alasan, setAlasan] = useState("");
  const [tandaPengenal, setTandaPengenal] = useState("");

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/permohonan-keberatan`
      );
      setList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("terjadi kesalahan", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const deleteData = async (id) => {
    Swal.fire({
      title: "Apakah Anda Ingin Menghapus?",
      text: "Perubahan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_DUMMY}/bawaslu/api/permohonan-keberatan/` + id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Dihapus!",
              showConfirmButton: false,
              timer: 1500,
            });

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          });
      }
    });
  };

  const put = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("nama", nama);
    formData.append("alamat", alamat);
    formData.append("noTelp", noTelp);
    formData.append("nomorIdentitas", nomorIdentitas);
    formData.append("jenisIdentitas", jenisIdentitas);
    formData.append("kasusPosisi", kasusPosisi);
    formData.append("tujuanPenggunaanInformasi", tujuanPenggunaanInformasi);
    formData.append("alasan", alasan);
    formData.append("tandaPengenal", tandaPengenal);

    try {
      const response = await axios.put(
        `${API_DUMMY}/bawaslu/api/permohonan-keberatan/` + id,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) {
        setShowEdit(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        // Handle unexpected status code
        console.log("Unexpected status code:", response.status);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Handle Unauthorized error
        console.log("Unauthorized. Please log in again.");
      } else {
        // Handle other errors
        console.log("Error:", err.message);
      }
    }
  };

  const getById = async (id) => {
    await axios
      .get(`${API_DUMMY}/bawaslu/api/permohonan-keberatan/` + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setId(res.data.data.id);
        setEmail(res.data.data.email);
        setNama(res.data.data.nama);
        setAlamat(res.data.data.alamat);
        setNoTelp(res.data.data.noTelp);
        setNomorIdentitas(res.data.data.nomorIndentitas);
        setJenisIdentitas(res.data.data.jenisIdentitas);
        setKasusPosisi(res.data.data.kasusPosisi);
        setTujuanPenggunaanInformasi(res.data.data.tujuanPenggunaanInformasi);
        setAlasan(res.data.data.alasan);
        setTandaPengenal(res.data.data.tandaPengenal);

        console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Keslahan" + error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="breadcrumb-area bg-black bg-relative">
        <div
          className="banner-bg-img"
          style={{
            backgroundImage: `url('https://www.solverwp.com/demo/html/itechie/assets/img/bg/1.webp') `,
          }}
        ></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-8">
              <div className="breadcrumb-inner text-center">
                <h2
                  className="judul"
                  style={{ color: "white", fontWeight: 700, fontSize: 60 }}
                >
                  Admin Permohonan Keberatan
                </h2>
                <ul className="page-list">
                  <li>
                    <a href="/" style={{ textDecoration: "none" }}>
                      Home
                    </a>
                  </li>
                  <li>Berita</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container mt-5 mb-5">
          <div className="card mb-4 shadow">
            <div className="card-header w-max bg-primary text-light">
              <div style={{ display: "flex" }}>
                <div className="col">
                  <h4>Berita</h4>
                </div>
              </div>
            </div>
            <table className="table table-hover overflow-x-auto w-100">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Email</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Alamat</th>
                  <th scope="col">No Telp</th>
                  <th scope="col">Tags</th>
                  <th scope="col">Nomor identitas</th>
                  <th scope="col">Jenis identitas</th>
                  <th scope="col"> Kasus Posisi</th>
                  <th scope="col">Tujuan Penggunaa Informasi</th>
                  <th scope="col">Alasan</th>
                  <th scope="col">Tanda Pengenal</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {list.map((informasi, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="No : " className="text-llef">
                        <p>{index + 1} </p>
                      </td>
                      <td data-label="email : " className="text-llef">
                        <p>{informasi.email} </p>
                      </td>
                      <td data-label="nama : " className="text-llef">
                        <p>{informasi.nama}</p>
                      </td>

                      <td data-label="alamat : " className="text-llef">
                        <p>{informasi.alamat}</p>
                      </td>
                      <td data-label="No telp : " className="text-llef">
                        <p>{informasi.noTelp} </p>
                      </td>

                      <td data-label="Nomor identits : " className="text-llef">
                        <p>{informasi.nomorIndentitas} </p>
                      </td>
                      <td data-label="jenis identitas : " className="text-llef">
                        <p>{informasi.jenisIdentitas} </p>
                      </td>
                      <td data-label="kasus posisi : " className="text-llef">
                        <p>{informasi.kasusPosisi} </p>
                      </td>
                      <td
                        data-label="tujuan penggunaan informasi : "
                        className="text-llef"
                      >
                        <p>{informasi.tujuanPenggunaanInformasi}</p>
                      </td>
                      <td data-label="alasan : " className="text-llef">
                        <p>{informasi.alasan} </p>
                      </td>
                      <td data-label="tanda pengenal : " className="text-llef">
                        <p>{informasi.tandaPengenal} </p>
                      </td>

                      <td data-label="aksi : " className="text-llef">
                        <div className="d-flex">
                          <button
                            onClick={() => {
                              setShowEdit(true);
                              getById(informasi.id);
                            }}
                            className="bg-primary text-light"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            type="button"
                            style={{
                              border: "none",
                              padding: "7px",
                              paddingLeft: "13px",
                              paddingRight: "1    3px",
                              borderRadius: "5px",
                              marginRight: "10px",
                            }}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => deleteData(informasi.id)}
                            className="bg-danger text-light"
                            style={{
                              border: "none",
                              padding: "7px",
                              paddingLeft: "13px",
                              paddingRight: "13px",
                              borderRadius: "5px",
                              marginRight: "10px",
                            }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* modal edit data */}
      <div
        show={showEdit}
        onHide={!showEdit}
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form onSUbmit={put} className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Modal Edit Data
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  placeholder="nama"
                  aria-label="Author"
                  aria-describedby="basic-addon1"
                  fileName={nama}
                  onChange={(e) => setNama(e.target.files[0])}
                />
              </div>
              <div className="input-group mb-3">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="alamat"
                  aria-label="alamat"
                  aria-describedby="basic-addon1"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="noTelp"
                  aria-label="noTelp"
                  aria-describedby="basic-addon1"
                  value={noTelp}
                  onChange={(e) => setNoTelp(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="nomorIdentitas"
                  aria-describedby="basic-addon1"
                  value={nomorIdentitas}
                  onChange={(e) => setNomorIdentitas(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="jenisIdentitas"
                  aria-label="jenisIdentitas"
                  aria-describedby="basic-addon1"
                  value={jenisIdentitas}
                  onChange={(e) => setJenisIdentitas(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="kasusPosisi"
                  aria-label="kasusPosisi"
                  aria-describedby="basic-addon1"
                  value={kasusPosisi}
                  onChange={(e) => setKasusPosisi(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="tujuanPenggunaanInformasi"
                  aria-label="tujuanPenggunaanInformasi"
                  aria-describedby="basic-addon1"
                  value={tujuanPenggunaanInformasi}
                  onChange={(e) => setTujuanPenggunaanInformasi(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="alasan"
                  aria-label="alasan"
                  aria-describedby="basic-addon1"
                  value={alasan}
                  onChange={(e) => setAlasan(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="tandaPengenal"
                  aria-label="tandaPengenal"
                  aria-describedby="basic-addon1"
                  value={tandaPengenal}
                  onChange={(e) => setTandaPengenal(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setShowEdit(false)}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default AdminPermohonankeberatan;
