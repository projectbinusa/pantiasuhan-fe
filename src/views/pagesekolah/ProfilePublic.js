import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_DUMMY_SMART } from "../../utils/base_URL";
import Navbar from "../../component/Navbar";

function ProfilePublic() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nohp, setNoHp] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState(0);

  const [balance, setBalance] = useState(0);
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankName, setBankName] = useState("");

  const getAll = async () => {
    try {
      const token = localStorage.getItem("tokenpython");

      const [profileResponse, organizationResponse] = await Promise.all([
        axios.get(`${API_DUMMY_SMART}/api/customer/profile`, {
          headers: { "auth-tgh": `jwt ${token}` },
        }),
        axios.get(`${API_DUMMY_SMART}/api/customer/organization`, {
          headers: { "auth-tgh": `jwt ${token}` },
        }),
      ]);

      const profileData = profileResponse.data.data;
      setNama(profileData.name);
      setEmail(profileData.email);
      setNoHp(profileData.hp);
      setAddress(profileData.address);
      setImage(profileData.picture);
      setId(profileData.id);

      const orgData = organizationResponse.data.data;
      setBalance(orgData.balance);
      setBankAccountNumber(orgData.bank_account_number);
      setBankAccountName(orgData.bank_account_name);
      setBankName(orgData.bank_name);
    } catch (error) {
      console.error("Terjadi Kesalahan: ", error.message || error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <br /> <br /> <br /> <br />
      <div className="container mt-3 mb-3">
        <div className="box-tabel">
          <div className="card shadow w-100">
            <div className="title card-header d-flex justify-content-between">
              <h1 className="fw-bold fs-3">Profile</h1>
              <div>
                {/* <button type="button" className="btn-primary btn-sm mr-2">
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    href={`/profile/edit/${id}`}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </a>
                </button> */}
              </div>
            </div>
            <br />
            <div className="card-body">
              <div className="row">
                {/* Kolom untuk Foto */}
                <div className="col-md-4 text-center">
                  <img
                    className={`w-75 d-block mx-auto ${
                      image === null ? "rounded-circle" : ""
                    }`}
                    style={
                      image === null
                        ? {}
                        : { maxWidth: "400px", maxHeight: "400px" }
                    }
                    src={
                      image === null
                        ? "https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"
                        : image
                    }
                    alt="Foto Logo Panti"
                  />
                </div>

                {/* Kolom untuk Input Data */}
                <div className="col-md-8">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Nama Panti</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      value={nama}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      value={email}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">No HP</label>
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      value={nohp}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Alamat</label>
                    <div
                      className="form-control"
                      style={{ height: "auto", background: "#e9ecef" }}
                      dangerouslySetInnerHTML={{ __html: address }}
                    />
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

export default ProfilePublic;
