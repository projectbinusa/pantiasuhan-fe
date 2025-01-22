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
import { API_DUMMY_BYRTGHN } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";

function EditAnak() {
  const [nama, setNama] = useState("");
  const [rfidNumber, setRFIDNumber] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [lits, setLists] = useState(null);
  const [namaOrangTua, setNamaOrangTua] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [education, setEducation] = useState("");

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
          `${API_DUMMY_BYRTGHN}/api/customer/member/${param.id}`,
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
      nama_orang_tua: namaOrangTua,
    };

    try {
      // Make the PUT request
      await axios.put(
        `${API_DUMMY_BYRTGHN}/api/customer/member/${param.id}`,
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
        history.push("/admin_anak_asuh");
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
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
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
                            Anak Asuh
                          </label>
                          <input
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan Nama Anak Asuh"
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
                            onChange={(e) => setEducation(e.target.value)}
                          >
                            <option value="Pilih">Pilih</option>
                            <option value="SD/MI">SD/MI</option>
                            <option value="SMP/Mts">SMP/Mts</option>
                            <option value="SMA/SMK/MA">SMA/SMK/MA</option>
                            <option value="Kuliah">Kuliah</option>
                          </select>
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label  font-weight-bold ">
                            Nama Orang Tua Kandung
                          </label>
                          <input
                            value={namaOrangTua}
                            onChange={(e) => setNamaOrangTua(e.target.value)}
                            placeholder="Masukkan Nama Orang Tua Kandung"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 co-lg-12">
                          <label className="form-label font-weight-bold">
                            RFID Number
                          </label>
                          <input
                            value={rfidNumber}
                            onChange={(e) => setRFIDNumber(e.target.value)}
                            placeholder="Masukkan RFID Number Anak Asuh"
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
                            placeholder="Masukkan uniqueId Anak Asuh"
                            className="form-control"
                          />{" "}
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin_anak_asuh"
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
    </div>
  );
}

export default EditAnak;
