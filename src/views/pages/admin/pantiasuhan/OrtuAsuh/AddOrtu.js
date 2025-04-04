import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import AsyncSelect from "react-select/async";
import Select from "react-select";

function AddOrtu() {
  const [name, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const [namaAnak, setNamaAnak] = useState("");
  const [idAnak, setIDAnak] = useState(null);
  const [birth_place_parents, setBirthPlaceParents] = useState("");
  const [birth_date_parents, setBirthDateParents] = useState("");
  const [income_parents, setIncomeParents] = useState("");
  const [phone_parents, setPhoneParents] = useState("");
  const [work, setWork] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const history = useHistory();

  const add = async (e) => {
    e.preventDefault();
    e.persist();
    setIsLoading(true);
    Swal.fire({
      title: "Loading...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const datas = {
      name: name,
      address: alamat,
      phone_parents: phone_parents || "0",
      birth_place_parents: birth_place_parents,
      birth_date_parents: birth_date_parents,
      income_parents: income_parents,
      work: work || "-",
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

  const handleSantriChange = (selectedOptions) => {
    if (selectedOptions && selectedOptions.length > 0) {
      // Mengambil ID dan Nama dari semua anak yang dipilih
      const ids = selectedOptions.map((option) => option.value);
      const names = selectedOptions.map((option) => option.label);

      setIDAnak(ids); // Menyimpan array ID
      setNamaAnak(names); // Menyimpan array Nama
    } else {
      setIDAnak([]); // Kosongkan jika tidak ada yang dipilih
      setNamaAnak([]);
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

  const incomeOptions = [
    { value: "1jt-3jt", label: "1jt - 3jt" },
    { value: "4jt-10jt", label: "4jt - 10jt" },
    { value: "10jt-50jt", label: "10jt - 50jt" },
    { value: "50jt-up", label: "50jt ke atas" },
  ];

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
                            Nama
                          </label>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={birth_place_parents}
                            onChange={(e) =>
                              setBirthPlaceParents(e.target.value)
                            }
                            placeholder="Masukkan Nama Tempat Lahir"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label  font-weight-bold ">
                            Tanggal Lahir
                          </label>
                          <input
                            value={birth_date_parents}
                            onChange={(e) =>
                              setBirthDateParents(e.target.value)
                            }
                            type="date"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Range Penghasilan
                          </label>
                          <Select
                            options={incomeOptions}
                            onChange={(selectedOption) =>
                              setIncomeParents(
                                selectedOption ? selectedOption.value : ""
                              )
                            }
                            value={incomeOptions.find(
                              (option) => option.value === income_parents
                            )}
                            placeholder="Pilih Pendapatan"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            No HP
                          </label>
                          <input
                            value={phone_parents}
                            onChange={(e) => setPhoneParents(e.target.value)}
                            type="number"
                            className="form-control"
                            placeholder="Masukkan No Handphone"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Pekerjaan
                          </label>
                          <input
                            value={work}
                            onChange={(e) => setWork(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Masukkan Pekerjaan"
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
                            isMulti
                          />
                        </div>
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
