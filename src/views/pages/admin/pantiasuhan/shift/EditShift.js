import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import AOS from "aos";
import { API_DUMMY_SMART } from "../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import dayjs from "dayjs";

function EditShift() {
  const [name, setName] = useState("");
  const [waktuMasuk, setWaktuMasuk] = useState("");
  const [waktuPulang, setWaktuPulang] = useState("");
  const [active, setActive] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [level, setLevel] = useState("");
  const history = useHistory();
  const param = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_DUMMY_SMART}/api/customer/shift/` + param.id, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setName(response.name);
        setWaktuMasuk(response.waktu_masuk);
        setWaktuPulang(response.waktu_pulang);
        setActive(response.active);
        setDeskripsi(response.description);
        setLevel(response.level);
        console.log("shift : ", ress.data.data.waktu_masuk);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleWaktuMasukChange = (e) => {
    setWaktuMasuk(e.target.value);
  };

  const handleWaktuPulangChange = (e) => {
    setWaktuPulang(e.target.value);
  };

  // Fungsi untuk memastikan format waktu benar
  const formatTime = (time) => {
    if (!time) return "00:00:00"; // Jika kosong, beri nilai default

    const [hours, minutes] = time.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`; // Tambah detik
  };

  const formattedWaktuMasuk = formatTime(waktuMasuk);
  const formattedWaktuPulang = formatTime(waktuPulang);

  const update = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    Swal.fire({
      title: "Loading...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const data = {
      name: name,
      waktu_masuk: formattedWaktuMasuk,
      waktu_pulang: formattedWaktuPulang,
      active: active,
      description: deskripsi || "-",
      level: level,
    };

    try {
      const response = await axios.put(`${API_DUMMY_SMART}/api/customer/shift/` + param.id, data, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })

      if (response.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil Mengedit Data Shift",
          showConfirmButton: false,
          timer: 1500,
        });

        // Redirect setelah berhasil
        setTimeout(() => {
          history.push("/admin_shift");
        }, 1500);
      } else {
        // Handle respons lain dengan pesan error
        Swal.fire({
          icon: "error",
          title: "Edit Data Gagal!",
          text: response.data.message, // Tambahkan pesan error dari respons
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
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
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

  // const handleWaktuMasukChange = (e) => {
  //   const waktuMasuk = e.target.value;
  //   const formattedTime = dayjs(`1970-01-01T${waktuMasuk}`).format("HH:mm");

  //   setWaktuMasuk(formattedTime);
  // };

  // const handleWaktuPulangChange = (e) => {
  //   const waktuPulang = e.target.value;
  //   const formattedTime = dayjs(`1970-01-01T${waktuPulang}`).format("HH:mm");

  //   setWaktuPulang(formattedTime);
  // };

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
      {/* <Header toggleSidebar={toggleSidebar} /> */}
      {/* <div className="app-main"> */}
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow">
                <div className="card-body">
                  <h1 className="fs-4">Form Edit Data</h1>
                  <hr />
                  <form onSubmit={update}>
                    <div className="row">
                      <div className="mb-3 col-lg-12">
                        <label className="form-label font-weight-bold">
                          Nama
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="name"
                          className="form-control"
                          required
                          placeholder="Masukkan Name"
                        />
                      </div>
                      <div className="mb-3 col-lg-12">
                        <label className="form-label font-weight-bold">
                          Waktu Masuk
                        </label>
                        <input
                          className="form-control"
                          type="time"
                          placeholder="Masukkan Waktu Masuk"
                          step="60"
                          value={waktuMasuk}
                          onChange={handleWaktuMasukChange}
                        />
                      </div>
                      <div className="mb-3 col-lg-12">
                        <label className="form-label font-weight-bold">
                          Waktu Pulang
                        </label>
                        <input
                          className="form-control"
                          type="time"
                          placeholder="Masukkan Waktu Pulang"
                          step="60"
                          value={waktuPulang}
                          onChange={handleWaktuPulangChange}
                        />
                      </div>
                      <div className="mb-3 col-lg-12">
                        <label className="form-label font-weight-bold">
                          Deskripsi
                        </label>
                        <input
                          value={deskripsi}
                          onChange={(e) => setDeskripsi(e.target.value)}
                          type="text"
                          className="form-control"
                          required
                          placeholder="Masukkan Deskripsi"
                        />
                      </div>
                      <div className="mb-3 col-lg-12">
                        <label className="form-label font-weight-bold">
                          Level
                        </label>
                        <select
                          className="form-control"
                          value={level}
                          onChange={(e) => setLevel(e.target.value)}>
                          <option>Pilih</option>
                          <option value="santri">Santri</option>
                          <option value="pengurus">Pengurus</option>
                          <option value="guru">Guru</option>
                        </select>
                      </div>
                    </div>
                    <button type="button" className="btn-danger mt-3 mr-3">
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="/admin_shift">
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
    // </div>
  );
}

export default EditShift;
