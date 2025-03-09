import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import AsyncSelect from "react-select/async";

function AddOrtu() {
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [alamat, setAlamat] = useState("");
  const [namaAnak, setNamaAnak] = useState("");
  const [idAnak, setIDAnak] = useState(null);
  const [birthPlaceFather, setBirthPlaceFather] = useState("");
  const [birthDateFather, setBirthDateFather] = useState("");
  const [pekerjaanFather, setPekerjaanFather] = useState("");
  const [penghasilanFather, setPenghasilanFather] = useState("");
  const [nohpFather, setNoHpFather] = useState("");
  const [birthPlaceMother, setBirthPlaceMother] = useState("");
  const [birthDateMother, setBirthDateMother] = useState("");
  const [pekerjaanMother, setPekerjaanMother] = useState("");
  const [penghasilanMother, setPenghasilanMother] = useState("");
  const [nohpMother, setNoHpMother] = useState("");
  const [foto, setFoto] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const history = useHistory();

  const add = async (e) => {
    e.preventDefault();
    e.persist();
    setIsLoading(true);
    const datas = {
      father_name: fatherName,
      mother_name: motherName,
      address: alamat,
      phone_father: nohpFather || "0",
      birth_place_father: birthPlaceFather,
      birth_date_father: birthDateFather,
      income_father: penghasilanFather || "-",
      work_father: pekerjaanFather || "-",
      phone_mother: nohpMother || "0",
      birth_place_mother: birthPlaceMother,
      birth_date_mother: birthDateMother,
      income_mother: penghasilanMother || 0.0,
      work_mother: pekerjaanMother || "-",
      id_anak: idAnak,
      nama_anak: namaAnak,
    };

    try {
      await axios.post(`${API_DUMMY}/api/admin/foster_parent`, datas, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      });
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
      if (error.response && error.response.status === 401) {
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const fetchSantri = async (inputValue) => {
    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/customer/member?filter=${inputValue}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      return response.data.data.map((member) => ({
        value: member.id,
        label: member.name,
      }));
    } catch (error) {
      console.error("Error searching members:", error);
      return [];
    }
  };

  const handleSantriChange = (selectedOption) => {
    if (selectedOption) {
      setIDAnak(selectedOption.value);
      setNamaAnak(selectedOption.label);
    } else {
      setIDAnak(null);
      setNamaAnak("");
    }
  };

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
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
      }`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}>
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div
        className="page-content1"
        style={{ marginTop: "10px", minHeight: "100vh" }}>
        <div className="app-main__outer container mb-3" data-aos="fade-left">
          <div className="app-main__inner">
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
                            className="form-label  font-weight-bold ">
                            Nama Ayah
                          </label>
                          <input
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Ayah"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Nama Ibu
                          </label>
                          <input
                            value={motherName}
                            onChange={(e) => setMotherName(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Nama Ibu"
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
                            Tempat Lahir (Ayah)
                          </label>
                          <input
                            value={birthPlaceFather}
                            onChange={(e) =>
                              setBirthPlaceFather(e.target.value)
                            }
                            placeholder="Masukkan Nama Tempat Lahir Ayah"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label  font-weight-bold ">
                            Tanggal Lahir (Ayah)
                          </label>
                          <input
                            value={birthDateFather}
                            onChange={(e) => setBirthDateFather(e.target.value)}
                            type="date"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Pekerjaan (Ayah)
                          </label>
                          <input
                            value={pekerjaanFather}
                            onChange={(e) => setPekerjaanFather(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Pekerjaan Ayah"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Penghasilan (Ayah)
                          </label>
                          <input
                            value={penghasilanFather}
                            onChange={(e) =>
                              setPenghasilanFather(e.target.value)
                            }
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Penghasilan Ayah"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            No HP (ayah)
                          </label>
                          <input
                            value={nohpFather}
                            onChange={(e) => setNoHpFather(e.target.value)}
                            type="number"
                            className="form-control"
                            placeholder="Masukkan No Handphone Ayah"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label  font-weight-bold ">
                            Tempat Lahir (Ibu)
                          </label>
                          <input
                            value={birthPlaceMother}
                            onChange={(e) =>
                              setBirthPlaceMother(e.target.value)
                            }
                            placeholder="Masukkan Nama Tempat Lahir Ibu"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label  font-weight-bold ">
                            Tanggal Lahir (Ibu)
                          </label>
                          <input
                            value={birthDateMother}
                            onChange={(e) => setBirthDateMother(e.target.value)}
                            type="date"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Pekerjaan (Ibu)
                          </label>
                          <input
                            value={pekerjaanMother}
                            onChange={(e) => setPekerjaanMother(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Pekerjaan Ibu"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Penghasilan (Ibu)
                          </label>
                          <input
                            value={penghasilanMother}
                            onChange={(e) =>
                              setPenghasilanMother(e.target.value)
                            }
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Penghasilan Ibu"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            No HP (Ibu)
                          </label>
                          <input
                            value={nohpMother}
                            onChange={(e) => setNoHpMother(e.target.value)}
                            type="number"
                            className="form-control"
                            placeholder="Masukkan No Handphone Ibu"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label  font-weight-bold ">
                            Anak Asuh
                          </label>
                          <AsyncSelect
                            cacheOptions
                            defaultOptions
                            loadOptions={fetchSantri}
                            onChange={handleSantriChange}
                            placeholder="Cari Anak Asuh..."
                            noOptionsMessage={() => "Anak Asuh tidak ditemukan"}
                          />
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
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin_ortu_asuh">
                          Batal
                        </a>
                      </button>
                      <button
                        type="submit"
                        className="btn-primary mt-3"
                        disabled={isLoading}>
                        {isLoading ? "Loading..." : "Submit"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOrtu;
