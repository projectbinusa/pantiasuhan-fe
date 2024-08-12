import React, { useEffect, useState } from "react";
import Navbar from "../../../../component/Navbar";
import Footer from "../../../../component/Footer";
import { API_DUMMY } from "../../../../utils/base_URL";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function AdminFormInformasi() {
    const [handleShowAdd, setHadleShowAdd] = useState(false);
    const [handleShowEdit, setHadleShowEdit] = useState(false);
    const [handleCloseEdit, setCloseEdit] = useState(true);
    const [handleCloseAdd, setCloseAdd] = useState(true);
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [list, setList] = useState([]);
    const [nama, setNama]= useState("");
    const [pekerjaan, setPekerjaan]= useState("");
    const [pendidikan, setPendidikan]= useState("");
    const [alamat, setAlamat]= useState("");
    const [email, setEmail]= useState("");
    const [noHp, setNoHp]= useState("");
    const [tujuanInformasi, setTujuanInformasi]= useState("");
    const [rincianInformasi, setRincianInformasi]= useState("");
    const [diTunjukanKepada, setDiTunjukanKepada]= useState("");
    const [caraMemperolahInformasi, setCaraMemperolehInformasi]= useState("");
    const [caraCaraMendapatkanInformasi, setCaraMendapatkanInformasi]= useState("");
    const [file, setFile]= useState("");
    const history = useHistory();
    const [id, setId] = useState(0);

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/bawaslu/api/permohonan-informasi`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });
      setList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  const add = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("alamat", alamat);
    formData.append("pendidikan", pendidikan);
    formData.append("pekerjaan", pekerjaan);
    formData.append("email", email);
    formData.append("noHp", noHp);
    formData.append("tujuanInformasi", tujuanInformasi);
    formData.append("pekerjaan", pekerjaan);
    formData.append("rincianInformasi", rincianInformasi);
    formData.append("diTunjukanKepada", diTunjukanKepada);
    formData.append("caraMemperolahInformasi", caraMemperolahInformasi);
    formData.append("file", file); // Upload gambar jika dipilih

    try {
      await axios.post(`${API_DUMMY}/bawaslu/api/permohonan-informasi/add`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil Ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        history.push("/admin-permohonan-informsi");
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const put = async (e) => {
    e.preventDefault();
    e.persist();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("alamat", alamat);
    formData.append("pendidikan", pendidikan);
    formData.append("pekerjaan", pekerjaan);
    formData.append("email", email);
    formData.append("noHp", noHp);
    formData.append("tujuanInformasi", tujuanInformasi);
    formData.append("pekerjaan", pekerjaan);
    formData.append("rincianInformasi", rincianInformasi);
    formData.append("diTunjukanKepada", diTunjukanKepada);
    formData.append("caraMemperolahInformasi", caraMemperolahInformasi);
    formData.append("file", file); // Upload gambar jika dipilih

    try {
      const response = await axios.put(
        `${API_DUMMY}/bawaslu/api/permohonan-keberatan/` + id,
        formData
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
          history.push("/admin-permohonan-informsi");
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
      .get(`${API_DUMMY}/bawaslu/api/permohonan-informasi/` + id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setNama(res.data.data.nama);
        setEmail(res.data.data.email);
        setPendidikan(res.data.data.pendidikan);
        setPekerjaan(res.data.data.pekerjaan);
        setNoHp(res.data.data.noHp);
        setAlamat(res.data.data.alamat);
        setDiTunjukanKepada(res.data.data.ditujukanKepada);
        setRincianInformasi(res.data.data.rincianInformasi);
        setTujuanInformasi(res.data.data.tujuanInformasi);
        setNoHp(res.data.data.noHp);
        setFile(res.data.data.tandaPengenal);
        setId(res.data.data.id);
        console.log(res.data.data);
      })
      .catch((error) => {
        alert("Terjadi Keslahan" + error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5">
        <div className="card mb-4 shadow">
          <div className="card-header w-max bg-primary text-light">
            <div style={{ display: "flex" }}>
              <div className="col">
                <h4>Permohonan Informasi</h4>
              </div>
            </div>
          </div>
          <div style={{overflowX:"scroll"}}>
          <table className="table table-hover overflow-x-auto w-100">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Nama</th>
                <th scope="col" style={{ width: "120px" }}>
                  No Hp
                </th>
                <th scope="col">Pekerjaan</th>
                <th scope="col">Pendidikan</th>
                <th scope="col">Rincian Informasi</th>
                <th scope="col">Tanda Pengenal</th>
                <th scope="col">Tujuan Informasi</th>
                <th scope="col">Alamat</th>
                <th scope="col">Email</th>
                <th scope="col">Cara Memperoleh Informasi</th>
                <th scope="col">Cara Mendapatkan Informasi</th>
                <th scope="col">Di Tunjukan Kepada</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {list.map((informasi, index) => {
                return (
                  <tr key={index}>
                    <td data-cell="dokumen">
                      <p>{index + 1}</p>
                    </td>
                    <td data-cell="dokumen">
                      <p>{informasi.nama}</p>
                    </td>
                    <td data-cell="dokumen">
                      <p>{informasi.noHp}</p>
                    </td>
                    <td data-cell="dokumen">
                      <p>{informasi.pekerjaan}</p>
                    </td>
                    <td data-cell="dokumen">
                      <p src={informasi.pendidikan}></p>
                    </td>
                    <td data-cell="dokumen">
                      <p>{informasi.rincianInformasi}</p>
                    </td>
                    <td data-cell="dokumen">
                      <img src={informasi.tandaPengenal}/>
                    </td>
                    <td data-cell="dokumen">
                      <p>{informasi.tujuanInformasi}</p>
                    </td>
                    <td data-cell="dokumen">
                      <p>{informasi.alamat}</p>
                    </td>
                    <td data-cell="dokumen">
                      <p>{informasi.email}</p>
                    </td>
                    <td data-cell="dokumen">
                      <p>{informasi.caraMemperolehInformasi}</p>
                    </td>
                    <td data-cell="dokumen">
                      <p>{informasi.caraMendapatInformasi}</p>
                    </td>
                    <td data-cell="dokumen">
                      <p>{informasi.ditujukanKepada}</p>
                    </td>
                    <td>
                      <div className="d-flex">
                        <button
                          onClick={() => {
                            setShowEdit(true);
                            getById(informasi.id);
                          }}
                          className="bg-primary text-light"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          type="button"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="bg-danger text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}>
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


      {/* <!-- Modal --> */}
      <div
            show={showEdit}
            onHide={!showEdit}
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true">
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
                    aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nama"
                      aria-label="Author"
                      aria-describedby="basic-addon1"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      placeholder="Image"
                      aria-label="Author"
                      aria-describedby="basic-addon1"
                      fileName={file}
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Cara Memperolah Informasi"
                      aria-label="Cara Memperolah Informasi"
                      aria-describedby="basic-addon1"
                      value={caraMemperolahInformasi}
                      onChange={(e) => setCaraMemperolehInformasi(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Cara Mendapatkan Informasi"
                      aria-label="Cara Mendapatkan Informasi"
                      aria-describedby="basic-addon1"
                      value={caraCaraMendapatkanInformasi}
                      onChange={(e) => setCaraMendapatkanInformasi(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="DiTunjukan Kepada"
                      aria-label="DiTunjukan Kepada"
                      aria-describedby="basic-addon1"
                      value={diTunjukanKepada}
                      onChange={(e) => setDiTunjukanKepada(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="No Hp"
                      aria-label="No Hp"
                      aria-describedby="basic-addon1"
                      value={noHp}
                      onChange={(e) => setNoHp(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pekerjaan"
                      aria-label="Pekerjaan"
                      aria-describedby="basic-addon1"
                      value={pekerjaan}
                      onChange={(e) => setPekerjaan(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pendidikan"
                      aria-label="Pendidikan"
                      aria-describedby="basic-addon1"
                      value={pendidikan}
                      onChange={(e) => setPendidikan(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Rincian Informasi"
                      aria-label="Rincian Informasi"
                      aria-describedby="basic-addon1"
                      value={rincianInformasi}
                      onChange={(e) => setRincianInformasi(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tujuan Informasi"
                      aria-label="Tujuan Informasi"
                      aria-describedby="basic-addon1"
                      value={tujuanInformasi}
                      onChange={(e) => setTujuanInformasi(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    onClick={() => setShowEdit(false)}
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal">
                    Batal
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

export default AdminFormInformasi;
