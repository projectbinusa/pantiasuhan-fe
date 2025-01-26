import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { API_DUMMY_SMART } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function EditCabang() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hp, setHp] = useState("");
  const [password, setPassword] = useState("");

  const [active, setActive] = useState("");
  const [organization_id, setOrganization_id] = useState("");
  const param = useParams();
  const history = useHistory();

  const update = async (e) => {
    e.preventDefault();

    const req = {
      name: name,
      address: address,
      hp: hp,
      password: password,
      active: active,
      organization_id: organization_id,
    };
    //console.log(req);

    await axios
      .put(`${API_DUMMY_SMART}/api/user/customer/` + param.id, req, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`, // Token auth-tgh
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
          history("/userCustomer");
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [sidebarToggled, setSidebarToggled] = useState(true);

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  useEffect(() => {
    axios
      .get(`${API_DUMMY_SMART}/api/user/customer/` + param.id, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((res) => {
        const response = res.data.data;
        axios
          .get(`${API_DUMMY_SMART}/api/user/organization`, {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          })
          .then((ress) => {
            setName(response.name);
            setHp(response.hp);
            setAddress(response.address);
            setOrganization_id(response.organization_id);
            setPassword(response.password);
            setActive(response.active);
            //console.log(response.address);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");
  const [memberId, setMemberId] = useState(0);

  const handleChange = async (e) => {
    const query = e.target.value;
    setValue(query);

    try {
      const response = await fetch(
        `${API_DUMMY_SMART}/api/user/organization?name=${query}`,
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

  const handleClick = (e, id) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setOrganization_id(id);
    setSuggestionsActive(false);
  };

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(
        `Id = ${suggestions[suggestionIndex].id}, Email = ${suggestions[suggestionIndex].email}, Nama = ${suggestions[suggestionIndex].name}`
      );
      setOrganization_id(suggestions[suggestionIndex].id);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    return (
      <div
        className="card border-secondary border-top-0"
        style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0, width: 200 }}>
        <ul className="list-group list-group-flush" style={{ width: 300 }}>
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
                  onClick={(e) => handleClick(e, data.id)}>
                  Id = {data.id}, Email = {data.email}, Nama = {data.name}
                </li>
              ))}
            </>
          ) : (
            <>
              <li className="list-group-item ">Id Tidak Ditemukan</li>
            </>
          )}
        </ul>
      </div>
    );
  };

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
      {/* <Header toggleSidebar={toggleSidebar} /> */}
      {/* <div className="app-main"> */}
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div
        style={{ marginTop: "10px" }}
        className="page-content1 mb-3 app-main__outer"
        data-aos="fade-left">
        <div
          className="container mt-3 mb-3 app-main__outer"
          data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Tambah Data</h1>
                    <hr />
                    <form onSubmit={update}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Nama Cabang
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
                            HP
                          </label>
                          <input
                            value={hp}
                            onChange={(e) => setHp(e.target.value)}
                            type="text"
                            className="form-control"
                            required
                            placeholder="Masukkan No HP"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Organisasi
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            autoComplete="off"
                            value={value}
                            onKeyDown={handleKeyDown}
                            onChange={handleChange}
                            label="Organization_id"
                            required
                          />
                          {suggestionsActive && <Suggestions />}
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin_sambutan">
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

export default EditCabang;
