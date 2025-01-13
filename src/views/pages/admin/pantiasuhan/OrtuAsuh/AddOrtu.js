import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { uploadImageToS3 } from "../../../../../utils/uploadToS3";

function AddOrtu() {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [namaAnak, setNamaAnak] = useState("");
  const [idAnak, setIDAnak] = useState(0);
  const [listAnak, setListAnak] = useState([]);
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [penghasilan, setPenghasilan] = useState("");
  const [status, setStatus] = useState("");
  const [nohp, setNoHp] = useState("");
  const [foto, setFoto] = useState("");

  const history = useHistory();

  const add = async (e) => {
    e.preventDefault();
    e.persist();
    let imageUrl = foto;

    if (foto) {
      imageUrl = await uploadImageToS3(foto);
    }

    const datas = {
      name: nama,
      address: alamat,
      url_image: imageUrl,
      phone: nohp,
      birth_place: birthPlace,
      birth_date: birthDate,
      income: penghasilan,
      work: pekerjaan,
      id_anak: idAnak,              
      nama_anak: namaAnak  
    }
    try {
      await axios.post(
        `${API_DUMMY}/api/admin/foster_parent`,
        datas,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push("/admin_ortu_asuh");
      }, 1500);
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchDataAnak = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/admin/siswa`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        setListAnak(response.data.data);
      } catch (error) {
        console.error("Terjadi Kesalahan saat mengambil data lokasi:", error);
      }
    };
    fetchDataAnak()
  }, [])

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
      c
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
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
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow">
                <div className="card-body">
                  <h1 className="fs-4">Form Tambah Data</h1>
                  <hr />
                  <form onSubmit={add}>
                    <div className="row">
                      <div className="mb-3 col-lg-6">
                        <label
                          for="exampleInputEmail1"
                          className="form-label  font-weight-bold "
                        >
                          Nama
                        </label>
                        <input
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Nama"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label
                          for="exampleInputEmail1"
                          className="form-label  font-weight-bold "
                        >
                          Alamat
                        </label>
                        <input
                          value={alamat}
                          onChange={(e) => setAlamat(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Alamat"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label  font-weight-bold ">
                          Tempat Lahir
                        </label>
                        <input
                          value={birthPlace}
                          onChange={(e) => setBirthPlace(e.target.value)}
                          placeholder="Masukkan Nama Tempat Lahir" className="form-control"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label  font-weight-bold ">
                          Tanggal Lahir
                        </label>
                        <input
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          type="date" className="form-control"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label
                          for="exampleInputEmail1"
                          className="form-label  font-weight-bold "
                        >
                          Pekerjaan
                        </label>
                        <input
                          value={pekerjaan}
                          onChange={(e) => setPekerjaan(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Pekerjaan"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label
                          for="exampleInputEmail1"
                          className="form-label  font-weight-bold "
                        >
                          Penghasilan
                        </label>
                        <input
                          value={penghasilan}
                          onChange={(e) => setPenghasilan(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Penghasilan"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label
                          for="exampleInputEmail1"
                          className="form-label  font-weight-bold "
                        >
                          Status Saat Ini
                        </label>
                        <input
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Status Saat Ini"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label
                          for="exampleInputEmail1"
                          className="form-label  font-weight-bold "
                        >
                          No HP
                        </label>
                        <input
                          value={nohp}
                          onChange={(e) => setNoHp(e.target.value)}
                          type="number"
                          className="form-control"
                          placeholder="Masukkan No Handphone"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label  font-weight-bold ">
                          Anak Asuh
                        </label>
                        <select
                          value={idAnak}
                          className="form-control"
                          aria-label="Small select example"
                          onChange={(e) => {
                            const selectedId = e.target.value;
                            setIDAnak(selectedId);
                            const selected = listAnak.find(
                              (data) => String(data.id) === String(selectedId)
                            );
                            setNamaAnak(
                              selected ? selected.name : ""
                            );
                          }}>
                          <option value="">
                            Pilih Anak
                          </option>
                          {listAnak.map((data, index) => (
                            <option key={index} value={data.id}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label font-weight-bold">
                          Gambar
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setFoto(e.target.files[0])}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <button type="button" className="btn-danger mt-3 mr-3">
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="/admin_ortu_asuh"
                      >
                        Batal
                      </a>
                    </button>
                    <button type="submit" className="btn-primary mt-3">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default AddOrtu;
