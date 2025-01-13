import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";

function EditAnak() {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [rfidNumber, setRFIDNumber] = useState("");
  const [nik, setNIK] = useState("");
  const [lits, setLists] = useState(null);

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
          `${API_DUMMY}/api/admin/siswa/${param.id}`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        const resp = response.data.data;
        setNama(resp.name)
        setUsername(resp.username)
        setRFIDNumber(resp.rfid_number)
        setNIK(resp.nik)
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

  //add
  const add = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      await axios.put(
        `${API_DUMMY}/api/admin/siswa/${param.id}`,
        {
          name: nama,
          username: username,
          rfid_number: rfidNumber,
          nik: nik
        },
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiPerbarui",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push("/admin_anak_asuh");
      }, 1500);
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Edit Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }
  };

  useEffect(() => {
    AOS.init();
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
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <label className="form-label  font-weight-bold ">
                            Anak Asuh
                          </label>
                          <input
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Masukkan Nama Anak Asuh" className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Username
                          </label>
                          <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Masukkan Username Anak Asuh" className="form-control"
                          />
                        </div>
                        <div className="mb-3 co-lg-12">
                          <label className="form-label font-weight-bold">
                            RFID Number
                          </label>
                          <input
                            value={rfidNumber}
                            onChange={(e) => setRFIDNumber(e.target.value)}
                            placeholder="Masukkan RFID Number Anak Asuh" className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            NIK
                          </label>
                          <input
                            value={nik}
                            onChange={(e) => setNIK(e.target.value)}
                            placeholder="Masukkan NIK Anak Asuh" className="form-control"
                          />                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin_anak_asuh">
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
