import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import AOS from "aos";
import axios from "axios";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { uploadImageToS3 } from "../../../../../utils/uploadToS3";

function EditOrtu() {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [namaAnak, setNamaAnak] = useState("");
  const [idAnak, setIDAnak] = useState(0);
  const [listAnak, setListAnak] = useState([]);
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [penghasilan, setPenghasilan] = useState("");
  const [nohp, setNoHp] = useState("");
  const [foto, setFoto] = useState("");
  const [image, setImage] = useState("");

  const param = useParams();
  const history = useHistory();

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

  const updateBerita = async (e) => {
    e.preventDefault();
    e.persist();
  
    const datas = {
      name: nama,
      address: alamat,
      phone: nohp,
      birth_place: birthPlace,
      birth_date: birthDate,
      income: penghasilan,
      work: pekerjaan,
      id_anak: idAnak,              
      nama_anak: namaAnak
    };
  
    try {
      await axios.put(`${API_DUMMY}/api/admin/foster_parent/` + param.id, datas, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      });
  
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Diperbarui",
        showConfirmButton: false,
        timer: 1500,
      });
  
      setTimeout(() => {
        history.push("/admin_ortu_asuh");
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Edit Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error(error);
      }
    }
  };
    
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/admin/foster_parent/` + param.id, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        console.log(response);
        
        setNama(response.name);
        setAlamat(response.address);
        setBirthDate(response.birth_date);
        setBirthPlace(response.birth_place);
        setPekerjaan(response.work);
        setPenghasilan(response.income);
        setIDAnak(response.id_anak);
        setNamaAnak(response.nama_anak)
        setNoHp(response.phone);
        // setImage(response)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

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
      <div style={{ marginTop: "10px" }} className="page-content1 absolute">
        <div
          className=" container mt-3 mb-3 app-main__outer"
          data-aos="fade-left"
        >
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Edit Data</h1>
              <hr />
              <form onSubmit={updateBerita}>
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
                    <label className="form-label font-weight-bold">
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
                  {/* <div className="mb-3 col-lg-6">
                    <label className="form-label font-weight-bold">
                      Gambar
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFoto(e.target.files[0])}
                      className="form-control"
                    />
                  </div> */}
                </div>
                <button type="button" className="btn-danger mt-3">
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
  );
}

export default EditOrtu;
