import React, { useEffect, useState } from "react";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../../utils/base_URL";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import AOS from "aos";
import axios from "axios";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { uploadImageToS3 } from "../../../../../utils/uploadToS3";
import AsyncSelect from "react-select/async";
import Select from "react-select";

function EditOrtu() {
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
  const [selectedAnak, setSelectedAnak] = useState(null);

  const formatDate = (dateString) => {
    return dateString.split(" ")[0]; // Ambil bagian sebelum spasi
  };

  const incomeOptions = [
    { value: "1jt-3jt", label: "1jt - 3jt" },
    { value: "4jt-10jt", label: "4jt - 10jt" },
    { value: "10jt-50jt", label: "10jt - 50jt" },
    { value: "50jt-up", label: "50jt ke atas" },
  ];

  const param = useParams();

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
      const ids = selectedOptions.map((option) => option.value);
      const names = selectedOptions.map((option) => option.label);

      setIDAnak(ids); // Simpan ID dalam array
      setNamaAnak(names); // Simpan Nama dalam array
      setSelectedAnak(selectedOptions);
    } else {
      setIDAnak([]);
      setNamaAnak([]);
      setSelectedAnak([]);
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
        console.log("Response Data:", response);

        setAlamat(response.address);
        setBirthDateParents(response.birth_date_parents);
        setBirthPlaceParents(response.birth_place_parents);
        setIncomeParents(response.income_parents);
        setName(response.name);
        setPhoneParents(response.phone_parents);
        setWork(response.work);

        // Pastikan response.id_anak adalah array jika ada banyak anak
        if (response.id_anak && response.nama_anak) {
          const anakData = response.id_anak.map((id, index) => ({
            value: id,
            label: response.nama_anak[index], // Ambil nama anak yang sesuai dengan index
          }));

          setSelectedAnak(anakData);
          setIDAnak(response.id_anak);
          setNamaAnak(response.nama_anak);
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const updateBerita = async (e) => {
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
      await axios.put(
        `${API_DUMMY}/api/admin/foster_parent/` + param.id,
        datas,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

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
    } finally {
      setIsLoading(false);
    }
  };

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
      <div style={{ marginTop: "10px" }} className="page-content1 absolute">
        <div
          className=" container mt-3 mb-3 app-main__outer"
          data-aos="fade-left">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Edit Data</h1>
              <hr />
              <form onSubmit={updateBerita}>
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
                      onChange={(e) => setBirthPlaceParents(e.target.value)}
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
                      onChange={(e) => setBirthDateParents(e.target.value)}
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
                      isMulti
                      cacheOptions
                      defaultOptions
                      loadOptions={fetchSantri}
                      value={selectedAnak} // Data anak yang sudah dipilih
                      onChange={handleSantriChange} // Mengubah data saat user memilih anak baru
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
  );
}

export default EditOrtu;
