import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { uploadImageToS3 } from "../../../../../utils/uploadToS3";

function EditProfile() {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [nohp, setNohp] = useState("");
  const [nama, setNama] = useState("");
  const [city, setCity] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [bank_account_name, setBankAccountName] = useState("");
  const [bank_account_number, setBankAccountNumber] = useState("");
  const [bank_account, setBankAccount] = useState("");
  const [bank_name, setBankName] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const param = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("tokenpython");

    const fetchProfile = axios.get(`${API_DUMMY_SMART}/api/customer/profile`, {
      headers: {
        "auth-tgh": `jwt ${token}`,
      },
    });

    const fetchOrganization = axios.get(
      `${API_DUMMY_SMART}/api/customer/organization`,
      {
        headers: {
          "auth-tgh": `jwt ${token}`,
        },
      }
    );

    Promise.all([fetchProfile, fetchOrganization])
      .then(([profileRes, orgRes]) => {
        const profileData = profileRes.data.data;
        const orgData = orgRes.data.data;

        // Set data dari API customer/profile
        setAddress(profileData.address);
        setEmail(profileData.email);
        setNohp(profileData.hp);
        setNama(profileData.name);
        setImage(profileData.picture);

        // Set data tambahan dari API customer/organization
        setCity(orgData.city);
        setProvinsi(orgData.provinsi);
        setBankAccountName(orgData.bank_account_name);
        setBankAccountNumber(orgData.bank_account_number);
        setBankName(orgData.bank_name);

        console.log("Profile Data:", profileData);
        console.log("Organization Data:", orgData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const update = async (e) => {
    e.preventDefault();
    e.persist();
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
      let imageUrl;

      if (file) {
        imageUrl = await uploadImageToS3(file);
      } else {
        imageUrl = image;
      }

      // Data untuk update profil customer
      const profilePayload = {
        email: email,
        picture: imageUrl,
        name: nama,
        hp: nohp,
        active: 1,
        address: address,
      };

      // Data untuk update organisasi
      const organizationPayload = {
        name: nama,
        address: address,
        hp: nohp,
        email: email,
        city: city,
        provinsi: provinsi,
        bank_account_number: bank_account_number,
        bank_account_name: bank_account_name,
        bank_name: bank_name,
      };

      // Kirim request secara bersamaan
      const [profileResponse, organizationResponse] = await Promise.all([
        axios.put(`${API_DUMMY_SMART}/api/customer/profile`, profilePayload, {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }),
        axios.put(
          `${API_DUMMY_SMART}/api/customer/organization`,
          organizationPayload,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        ),
      ]);

      // Periksa respons API
      if (
        profileResponse.data.code === 200 &&
        organizationResponse.data.code === 200
      ) {
        setShow(false);
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Profile & Organisasi",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          history.push("/profile");
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Edit Data Gagal!",
          text: "Gagal memperbarui profil atau organisasi",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Edit Data Gagal!",
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
        console.error(error);
      }
    } finally {
      setIsLoading(false); // Matikan loading setelah selesai
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
      <div
        style={{ marginTop: "50px" }}
        className="page-content1 mb-3 app-main__outer"
        data-aos="fade-left"
      >
        <div
          className="container mt-3 mb-3 app-main__outer"
          data-aos="fade-left"
        >
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Edit Data</h1>
                    <hr />
                    <form onSubmit={update}>
                      <div className="row">
                        {/* Nama Panti Asuhan */}
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Nama Panti Asuhan
                          </label>
                          <input
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Nama Panti Asuhan"
                          />
                        </div>

                        {/* Email */}
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Email
                          </label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            required
                            placeholder="Masukkan Email Panti"
                          />
                        </div>

                        {/* No HP */}
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            No HP
                          </label>
                          <input
                            value={nohp}
                            onChange={(e) => setNohp(e.target.value)}
                            type="number"
                            className="form-control"
                            required
                            placeholder="Masukkan No HP"
                          />
                        </div>

                        {/* Alamat */}
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Alamat
                          </label>
                          <textarea
                            rows={4}
                            className="form-control"
                            placeholder="Masukkan Alamat"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          ></textarea>
                        </div>

                        {/* Kota */}
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Kota
                          </label>
                          <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Kota"
                          />
                        </div>

                        {/* Provinsi */}
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Provinsi
                          </label>
                          <input
                            value={provinsi}
                            onChange={(e) => setProvinsi(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Provinsi"
                          />
                        </div>

                        {/* Nomor Rekening */}
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Nomor Rekening
                          </label>
                          <input
                            value={bank_account_number}
                            onChange={(e) =>
                              setBankAccountNumber(e.target.value)
                            }
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Nomor Rekening"
                          />
                        </div>

                        {/* Nama Pemilik Rekening */}
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Nama Pemilik Rekening
                          </label>
                          <input
                            value={bank_account_name}
                            onChange={(e) => setBankAccountName(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Nama Pemilik Rekening"
                          />
                        </div>

                        {/* Nama Bank */}
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Nama Bank
                          </label>
                          <input
                            value={bank_name}
                            onChange={(e) => setBankName(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Nama Bank"
                          />
                        </div>

                        {/* Upload Gambar */}
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Gambar
                          </label>
                          <input
                            onChange={(e) =>
                              setFile(e.target.files ? e.target.files[0] : null)
                            }
                            type="file"
                            className="form-control"
                          />
                        </div>
                      </div>

                      {/* Tombol */}
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin_profile"
                        >
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
      <style>
        {`
        .ck-editor__editable {
          min-height: 400px;
        }
        `}
      </style>
    </div>
  );
}

export default EditProfile;
