import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import AOS from "aos";
import { API_DUMMY_SMART } from "../../../../../utils/base_URL";
import { API_DUMMY } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { uploadImageToS3 } from "../../../../../utils/uploadToS3";

function AddPengurus() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rfidNumber, setRFIDNumber] = useState("");
  const [unique_id, setUniqueId] = useState("");
  const [parentName, setParentName] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [education, setEducation] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [address, setAddress] = useState("");
  const [parent_id, setParentId] = useState(0);
  const [foto, setFoto] = useState(null);
  const [listFosterParent, setListFosterParent] = useState([]);
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const history = useHistory();

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

  useEffect(() => {
    AOS.init();
  }, []);

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  // const validateForm = () => {
  //   if (
  //     !name ||
  //     !password ||
  //     !rfidNumber ||
  //     !unique_id ||
  //     !parentName ||
  //     !birthPlace ||
  //     !birthDate ||
  //     !education
  //   ) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Semua kolom wajib diisi!",
  //       showConfirmButton: true,
  //     });
  //     return false;
  //   }
  //   if (education === "Pilih") {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Pilih pendidikan yang valid!",
  //       showConfirmButton: true,
  //     });
  //     return false;
  //   }
  //   return true;
  // };

  const add = async (e) => {
    e.preventDefault();

    // if (!validateForm()) return;

    try {
      let imageUrl = foto;

      if (foto) {
        imageUrl = await uploadImageToS3(foto);
        console.log("URL Gambar berhasil di-upload:", imageUrl);
      }

      const payload = {
        name,
        password,
        rfid_number: rfidNumber,
        unique_id,
        parent_name: parentName,
        birth_place: birthPlace,
        birth_date: birthDate,
        email: email,
        address: address,
        hp: hp,
        parent_id: parent_id,
        education,
        picture: imageUrl,
        gender: gender,
      };

      console.log("Payload yang dikirim ke backend:", payload);

      const response = await axios.post(
        `${API_DUMMY_SMART}/api/customer/member`,
        payload,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      console.log("Respons dari backend:", response.data);

      if (
        response.data &&
        response.data.status === "200 OK" &&
        response.data.message === "success"
      ) {
        Swal.fire({
          icon: "success",
          title: "Data Berhasil Ditambahkan",
          showConfirmButton: false,
          timer: 1500,
        });

        // Ensure the response data is correct
        console.log("Data yang diterima:", response.data);

        setTimeout(() => {
          history.push("/admin_pengurus");
        }, 1500);
      } else {
        const errorMessage = response.data?.message || "Tambah Data Gagal";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error respons:", error.response?.data || error.message);

      Swal.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          error.message ||
          "Tambah Data Gagal!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

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
                    <h1 className="fs-4">Form Tambah Data</h1>
                    <hr />
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Pengurus
                          </label>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Masukkan Nama Pengurus"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
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
                          <label className="form-label font-weight-bold">
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
                          <label className="form-label font-weight-bold">
                            Pendidikan
                          </label>
                          <select
                            className="form-control"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                          >
                            <option>Pilih</option>
                            <option value="SD/MI">SD/MI</option>
                            <option value="SMP/Mts">SMP/Mts</option>
                            <option value="SMA/SMK/MA">SMA/SMK/MA</option>
                            <option value="Kuliah">Kuliah</option>
                          </select>
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Password
                          </label>
                          <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan Password Pengurus"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
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
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            NIK
                          </label>
                          <input
                            value={unique_id}
                            onChange={(e) => setUniqueId(e.target.value)}
                            type="number"
                            placeholder="Masukkan NIK Pengurus"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            No Handphone
                          </label>
                          <input
                            value={hp}
                            onChange={(e) => setHp(e.target.value)}
                            type="number"
                            placeholder="Masukkan No Handphone Pengurus"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Alamat
                          </label>
                          <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            placeholder="Masukkan Alamat Pengurus"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Email
                          </label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Masukkan Email Pengurus"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Foto
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFoto(e.target.files[0])}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-6">
                          <label className="form-label font-weight-bold">
                            Jenis Kelamin
                          </label>
                          <div className="d-flex">
                            <div className="mr-5">
                              <input
                                type="radio"
                                value="laki-laki"
                                checked={gender === "laki-laki"}
                                name="gender"
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <label className="ml-2">Laki-laki</label>
                            </div>
                            <div className="mr-5">
                              <input
                                type="radio"
                                value="perempuan"
                                checked={gender === "perempuan"}
                                name="gender"
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <label className="ml-2">Perempuan</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin_pengurus"
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

export default AddPengurus;
