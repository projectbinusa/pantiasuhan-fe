import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";
import AOS from "aos";
import "ckeditor5/ckeditor5.css";
import { API_DUMMY_SMART } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

function EditOrganization() {
  const [customer_id, setCustomer_id] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hp, setHp] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [balance, setBalance] = useState("");
  const [bank_account_number, setBank_account_number] = useState("");
  const [bank_account_name, setBank_account_name] = useState("");
  const [bank_name, setBank_name] = useState("");
  const param = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${API_DUMMY_SMART}/api/user/organization/` + param.id, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setName(response.name);
        setCustomer_id(response.customer_id);
        setHp(response.hp);
        setAddress(response.address);
        setCity(response.city);
        setProvinsi(response.provinsi);
        setBalance(response.balance);
        setBank_account_name(response.bank_account_name);
        setBank_account_number(response.bank_account_number);
        setBank_name(response.bank_name);
        setEmail(response.email);
        console.log("organization : ", ress.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //put
  const put = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      customer_id: customer_id,
      hp: hp,
      email: email,
      address: address,
      city: city,
      provinsi: provinsi,
      balance: balance,
      bank_account_number: bank_account_number,
      bank_account_name: bank_account_name,
      bank_name: bank_name,
    };

    await axios
      .put(`${API_DUMMY_SMART}/api/user/organization/` + param.id, data, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          history.push("/user-organization");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const [sidebarToggled, setSidebarToggled] = useState(true);

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  const handleClick = (e, id) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setCustomer_id(id);
    setSuggestionsActive(false);
  };

  const Suggestions = () => {
    return (
      <div
        className="card border-secondary border-top-0"
        style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
      >
        <ul className="list-group list-group-flush">
          {suggestions.length != 0 ? (
            <>
              {suggestions.map((data, index) => (
                <li
                  className={
                    index === suggestionIndex
                      ? "list-group-item  list-group-item-action active"
                      : "list-group-item  list-group-item-action"
                  }
                  key={index}
                  onClick={(e) => handleClick(e, data.id)}
                >
                  {data.name}
                </li>
              ))}
            </>
          ) : (
            <>
              <li className="list-group-item ">Customer Tidak Ditemukan</li>
            </>
          )}
        </ul>
      </div>
    );
  };

  const handleChange = async (e) => {
    const query = e.target.value;
    setValue(query);

    try {
      const response = await fetch(
        `${API_DUMMY_SMART}/api/user/customer?name=${query}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`, // Token auth-tgh
          },
        }
      );

      if (query.length > 0 && response.ok) {
        const res = await response.json();
        setSuggestions(res.data);
        setSuggestionsActive(true);
      } else {
        setSuggestionsActive(false);
      }
    } catch (err) {
      console.log(err);
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
      {/* <Header toggleSidebar={toggleSidebar} /> */}
      {/* <div className="app-main"> */}
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div
        style={{ marginTop: "10px" }}
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
                    <form onSubmit={put}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Nama Organisasi
                          </label>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukan Nama Cabang"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Pilih Cabang
                          </label>
                          <input
                            onChange={handleChange}
                            value={value}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Pilih Cabang"
                          />
                          {suggestionsActive && <Suggestions />}
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Alamat
                          </label>
                          <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Alamat"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Kota/Kabupaten
                          </label>
                          <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Kabupaten / Kota"
                          />
                        </div>
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
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            No Hp
                          </label>
                          <input
                            value={hp}
                            onChange={(e) => setHp(e.target.value)}
                            type="number"
                            className="form-control"
                            required
                            placeholder="Masukkan Hp"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Email
                          </label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Email"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Nomor Rekening
                          </label>
                          <input
                            value={bank_account_number}
                            onChange={(e) =>
                              setBank_account_number(e.target.value)
                            }
                            type="number"
                            className="form-control"
                            required
                            placeholder="Masukkan Nomor Rekening"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Nama Bank
                          </label>
                          <input
                            value={bank_name}
                            onChange={(e) => setBank_name(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Nama Bank"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Nama Rekening
                          </label>
                          <input
                            value={bank_account_name}
                            onChange={(e) =>
                              setBank_account_name(e.target.value)
                            }
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan Nama Rekening"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Saldo
                          </label>
                          <input
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                            type="number"
                            className="form-control"
                            required
                            placeholder="Masukkan Jumlah Saldo"
                          />
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin_sambutan"
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

export default EditOrganization;
