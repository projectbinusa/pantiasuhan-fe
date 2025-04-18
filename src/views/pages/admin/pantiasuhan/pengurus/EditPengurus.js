import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";

function EditPengurus() {
  const [nama, setNama] = useState("");
  const [rfidNumber, setRFIDNumber] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [lits, setLists] = useState(null);
  const [namaOrangTua, setNamaOrangTua] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [education, setEducation] = useState("");
  const [address, setAddress] = useState("");
  const [hp, setHp] = useState("");
  const [listFosterParent, setListFosterParent] = useState([]);
  const [parent_id, setParentId] = useState(0);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const param = useParams();
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY_SMART}/api/customer/member/${param.id}`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        const resp = response.data.data;
        setNama(resp.name);
        setRFIDNumber(resp.rfid_number);
        setUniqueId(resp.unique_id);
        setBirthPlace(resp.birth_place); // Update for birth place
        setBirthDate(resp.birth_date); // Update for birth date
        setEducation(resp.education); // Update for education
        setNamaOrangTua(resp.parent_name); // Update for parent's name
        setAddress(resp.address);
        setHp(resp.hp);
        setParentId(resp.parent_id);
        setGender(resp.gender);
      } catch (error) {
        console.error("Terjadi Kesalahan", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // console.log("nama: ", namaOrangTua);
  }, []);

  const put = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.

    // Prepare the payload
    const payload = {
      name: nama,
      rfid_number: rfidNumber,
      unique_id: uniqueId,
      birth_place: birthPlace,
      birth_date: birthDate,
      education: education,
      hp: hp,
      address: address,
      parent_name: namaOrangTua,
      parent_id: parent_id,
      education: education,
      gender: gender,
    };
    setIsLoading(true);
    Swal.fire({
      title: "Loading...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    try {
      // Make the PUT request
      await axios.put(
        `${API_DUMMY_SMART}/api/customer/member/${param.id}`,
        payload,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`, // Include auth header.
          },
        }
      );

      // Success feedback
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiPerbarui",
        showConfirmButton: false,
        timer: 1500,
      });

      // Redirect after success
      setTimeout(() => {
        history.push("/admin_pengurus");
      }, 1500);
    } catch (error) {
      // Check for specific error responses
      if (error.response) {
        console.error("Error Response Data:", error.response.data); // Log server error details.

        if (error.response.status === 401) {
          localStorage.clear(); // Clear invalid token.
          history.push("/login"); // Redirect to login.
        } else {
          Swal.fire({
            icon: "error",
            title: "Edit Data Gagal!",
            text: error.response.data?.message || "Terjadi kesalahan.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        // General error fallback
        console.error("Error Details:", error);
        Swal.fire({
          icon: "error",
          title: "Edit Data Gagal!",
          text: "Tidak dapat terhubung ke server.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } finally {
      setIsLoading(false); // Matikan loading setelah selesai
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/admin/foster_parent`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        setListFosterParent(response.data.data);
      } catch (error) {
        console.error("Terjadi Kesalahan", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
        }`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}>
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="app-main__outer container mb-3" data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Edit Data</h1>
                    <hr />
                    <form onSubmit={put}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <label className="form-label  font-weight-bold ">
                            Pengurus
                          </label>
                          <input
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan Nama Pengurus"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label  font-weight-bold ">
                            Tempat Lahir
                          </label>
                          <input
                            value={birthPlace}
                            onChange={(e) => setBirthPlace(e.target.value)}
                            placeholder="Masukkan Nama Tempat Lahir"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label  font-weight-bold ">
                            Tanggal Lahir
                          </label>
                          <input
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            type="date"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label  font-weight-bold ">
                            Pendidikan
                          </label>
                          <select
                            className="form-control"
                            value={education || "Pilih"}
                            onChange={(e) => setEducation(e.target.value)}>
                            <option>Pilih</option>
                            <option value="SD/MI">SD/MI</option>
                            <option value="SMP/Mts">SMP/Mts</option>
                            <option value="SMA/SMK/MA">SMA/SMK/MA</option>
                            <option value="Kuliah">Kuliah</option>
                          </select>
                        </div>
                        {/* <div className="mb-3 col-lg-12">
                          <label className="form-label  font-weight-bold ">
                            Nama Orang Tua
                          </label>
                          <select
                            value={parent_id}
                            className="form-control"
                            aria-label="Small select example"
                            onChange={(e) => {
                              const selectedId = e.target.value;
                              setParentId(selectedId);
                              const selected = listFosterParent.find(
                                (data) => String(data.id) === String(selectedId)
                              );
                              setNamaOrangTua(selected ? selected.name : "");
                            }}
                          >
                            <option value="">Pilih</option>
                            {listFosterParent.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </div> */}
                        <div className="mb-3 co-lg-12">
                          <label className="form-label font-weight-bold">
                            RFID Number
                          </label>
                          <input
                            value={rfidNumber}
                            onChange={(e) => setRFIDNumber(e.target.value)}
                            placeholder="Masukkan RFID Number Pengurus"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 co-lg-12">
                          <label className="form-label font-weight-bold">
                            No Handphone
                          </label>
                          <input
                            type="number"
                            value={hp}
                            onChange={(e) => setHp(e.target.value)}
                            placeholder="Masukan No Hp"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            NIK
                          </label>
                          <input
                            value={uniqueId}
                            onChange={(e) => setUniqueId(e.target.value)}
                            placeholder="Masukkan uniqueId Pengurus"
                            disabled
                            className="form-control"
                          />{" "}
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Alamat
                          </label>
                          <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Masukkan alamat"
                            className="form-control"
                          />{" "}
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Jenis Kelamin
                          </label>
                          <div className="form-check">
                            <input
                              type="radio"
                              name="gender"
                              value="laki-laki"
                              checked={gender === "laki-laki"}
                              onChange={(e) => setGender(e.target.value)}
                              className="form-check-input"
                            />
                            <label className="form-check-label">
                              Laki-laki
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              type="radio"
                              name="gender"
                              value="perempuan"
                              checked={gender === "perempuan"}
                              onChange={(e) => setGender(e.target.value)}
                              className="form-check-input"
                            />
                            <label className="form-check-label">
                              Perempuan
                            </label>
                          </div>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin_pengurus">
                          Batal
                        </a>
                      </button>
                      <button type="submit" className="btn-primary mt-3" disabled={isLoading}>
                        {isLoading ? <span className="loader"></span> : "Kirim"}
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

export default EditPengurus;
