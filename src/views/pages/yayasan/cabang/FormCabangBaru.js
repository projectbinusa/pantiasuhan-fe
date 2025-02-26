import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import AOS from "aos";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../utils/base_URL";
import { uploadImageToS3 } from "../../../../utils/uploadToS3";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function FormCabangBaru() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [address, setAddress] = useState("");
  const [bankName, setBankName] = useState("");
  const [domain, setDomain] = useState("");
  const [bankAccountName, setBankAccountName] = useState(null);
  const [bankAccountNumber, setBankAccountNumber] = useState(null);
  const [provinsi, setProvinsi] = useState(null);
  const [kota, setKota] = useState(null);
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    AOS.init();
  }, []);

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  const userId = localStorage.getItem("id")
  const add = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: name,
        address: address,
        hp: noHp,
        email: email,
        password: password,
        active: true
      };

      const response = await axios.post(`${API_DUMMY_SMART}/api/user/customer`, payload, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      });

      // console.log("Respons dari backend:", response.data);
      if (response.data && response.data.data) {
        const id = response.data.data.id;
        console.log(response.data.data.id);
        console.log(response.data.data);
        const customerId = response.data.data.id

        if (response.data && response.data.status === "200 OK" && response.data.message === "success") {
          const payloadorganization = {
            name: name,
            customer_id: customerId,
            address: address,
            hp: noHp,
            email: email,
            city: kota,
            provinsi: provinsi,
            balance: 0.0,
            bank_account_number: bankAccountNumber,
            bank_account_name: bankAccountName,
            bank_name: bankName,
            domain: domain
          }
          console.log(payloadorganization);

          const responseOrganization = await axios.post(`${API_DUMMY_SMART}/api/user/organization`, payloadorganization, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          });
          const organizationId = responseOrganization.data.data.id;
          console.log(responseOrganization.data.data.id);
          if (responseOrganization.data && responseOrganization.data.status === "200 OK" && responseOrganization.data.message === "success") {
            try {
              const responseCustomer = await axios.put(`${API_DUMMY_SMART}/api/user/customer/${customerId}`, { organization_id: organizationId }, {
                headers: {
                  "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
                },
              });
              console.log(responseCustomer);
              await axios.put(`${API_DUMMY_SMART}/api/user/organization_ids/${userId}`, { organization_ids: `${organizationId}` }, {
                headers: {
                  "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
                },
              }).then((res) => {
                axios.post(`${API_DUMMY_SMART}/api/user/refresh_token`, {}, {
                  headers: {
                    "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
                  },
                }).then((resp) => {
                  console.log(resp);
                  console.log(resp.data.data.token);
                  const respon = resp.data.data;
                  localStorage.setItem("tokenpython", respon.token)
                  localStorage.setItem("organizationids", respon.organization_ids)
                  Swal.fire({
                    icon: "success",
                    title: "Data Berhasil Ditambahkan",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  setTimeout(() => {
                    history.push("/daftar-cabang");
                  }, 1500);
                }).catch((err) => {
                  console.log(err);
                })
                console.log(res);
              }).catch((err) => {
                console.log(err);
              })
              // try {
              //   const res = await axios.put(`${API_DUMMY_SMART}/api/user/organization_ids/${userId}`, { organization_ids: `${organizationId}` }, {
              //     headers: {
              //       "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
              //     },
              //   });
              //   console.log(res);
              //   const ress = await axios.post(`${API_DUMMY_SMART}/api/user/refresh_token`, {
              //     headers: {
              //       "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
              //     },
              //   });
              //   console.log(ress);

              //   Swal.fire({
              //     icon: "success",
              //     title: "Data Berhasil Ditambahkan",
              //     showConfirmButton: false,
              //     timer: 1500,
              //   });

              //   console.log("Data yang diterima:", response.data);

              //   // setTimeout(() => {
              //   //   history.push("/daftar-cabang");
              //   // }, 1500);
              // } catch (err) {
              //   console.error("Error respons:", err);
              // }

            } catch (err) {
              console.error("Error respons:", err);
            }
          }
        } else {
          const errorMessage = response.data?.message || "Tambah Data Gagal";
          throw new Error(errorMessage);
        }
      }
    } catch (error) {
      console.error("Error respons:", error.response?.data || error.message);

      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || error.message || "Tambah Data Gagal!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""}`}>
      <a id="show-sidebar" className="btn1 btn-lg" onClick={toggleSidebar} style={{ color: "white", background: "#3a3f48" }}>
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
                    <h1 className="fs-4">Form Cabang Baru</h1>
                    <hr />
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">Nama</label>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Masukkan Nama "
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">No Handphone</label>
                          <input
                            value={noHp}
                            onChange={(e) => setNoHp(e.target.value)}
                            placeholder="Masukkan No Handphone" type="number"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">Email</label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukkan Email"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">Password</label>
                          <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan Password"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">Domain Website</label>
                          <input
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            placeholder="Masukkan Domain Website"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">Nama Bank</label>
                          <input
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            placeholder="Masukkan Nama Bank "
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">Nama Akun Bank</label>
                          <input
                            value={bankAccountName}
                            onChange={(e) => setBankAccountName(e.target.value)}
                            placeholder="Masukkan Nama Akun Bank "
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">Nomor Akun Bank</label>
                          <input
                            value={bankAccountNumber}
                            onChange={(e) => setBankAccountNumber(e.target.value)}
                            placeholder="Masukkan Nomor Akun Bank "
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">Provinsi</label>
                          <input
                            value={provinsi}
                            onChange={(e) => setProvinsi(e.target.value)}
                            placeholder="Masukkan Provinsi"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">Kota</label>
                          <input
                            value={kota}
                            onChange={(e) => setKota(e.target.value)}
                            placeholder="Masukkan Kota "
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">Alamat</label>
                          <textarea className="form-control" rows={5} placeholder="Masukkan Alamat" onChange={(e) => setAddress(e.target.value)}></textarea>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a style={{ color: "white", textDecoration: "none" }} href="/admin_anak_asuh">
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

export default FormCabangBaru;
