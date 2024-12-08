import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarSiswa from "../../../component/NavbarSiswa";
import "../../../css/dataabsen.css";
import { API_DUMMY_PYTHON } from "../../../utils/base_URL";
import AOS from "aos";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";

function EditTahsin() {
  const [pojokAwal, setPojokAwal] = useState("");
  const [pojokAkhir, setPojokAkhir] = useState("");
  const [juzAkhir, setJuzAkhir] = useState("");
  const [juzAwal, setJuzAwal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const history = useHistory();
  const param = useParams();

  const edit = async (e) => {
    e.preventDefault();
    e.persist();
    const datas = {
      description: deskripsi,
      start_juz: juzAwal,
      end_juz: juzAkhir,
      start_pojok: pojokAwal,
      end_pojok: pojokAkhir,
    }
    try {
      await axios.put(
        `${API_DUMMY_PYTHON}/api/siswa/tahsin/${param.id}`, datas,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiEdit",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push("/anak_tahsin");
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
    axios
      .get(`${API_DUMMY_PYTHON}/api/siswa/tahsin/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setJuzAkhir(response.end_juz);
        setJuzAwal(response.start_juz);
        setPojokAwal(response.start_pojok);
        setPojokAkhir(response.end_pojok);
        setDeskripsi(response.description);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <NavbarSiswa />
      <div className="container-absen">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow">
                <div className="card-body">
                  <h1 className="fs-4">Form Edit Data</h1>
                  <hr />
                  <form onSubmit={edit}>
                    <div className="row">
                      <div className="mb-3 col-lg-6">
                        <label
                          for="exampleInputEmail1"
                          className="form-label  font-weight-bold "
                        >
                          Pojok Awal
                        </label>
                        <input
                          value={pojokAwal}
                          onChange={(e) => setPojokAwal(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Pojok Awal"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label
                          for="exampleInputEmail1"
                          className="form-label  font-weight-bold "
                        >
                          Pojok Akhir
                        </label>
                        <input
                          value={pojokAkhir}
                          onChange={(e) => setPojokAkhir(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Pojok Akhir"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label
                          for="exampleInputEmail1"
                          className="form-label  font-weight-bold "
                        >
                          Juz Awal
                        </label>
                        <input
                          value={juzAwal}
                          onChange={(e) => setJuzAwal(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Juz Awal"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label
                          for="exampleInputEmail1"
                          className="form-label  font-weight-bold "
                        >
                          Juz Akhir
                        </label>
                        <input
                          value={juzAkhir}
                          onChange={(e) => setJuzAkhir(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Juz Akhir"
                        />
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label
                          for="exampleInputEmail1"
                          className="form-label  font-weight-bold "
                        >
                          Deskripsi
                        </label>
                        <input
                          value={deskripsi}
                          onChange={(e) => setDeskripsi(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Deskripsi"
                        />
                      </div>
                    </div>
                    <button type="button" className="btn-danger mt-3 mr-3">
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="/anak_tahsin"
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
  );
}

export default EditTahsin;
