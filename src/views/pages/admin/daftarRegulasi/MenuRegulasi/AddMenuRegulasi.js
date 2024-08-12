import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../../../../../component/Footer";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../../utils/base_URL";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function AddMenuRegulasi() {
  const [idJenisRegulasi, setIdJenisRegulasi] = useState(0);
  const [menuRegulasi, setMenuRegulasi] = useState("");
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [jenisRegulasi, setJenisRegulasi] = useState([]);
  const param = useParams();

  const getJenisRegulasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/jenis-regulasi/all`
      );
      setJenisRegulasi(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  // get by id jenis regulasi
  useEffect(() => {
    axios
      .get(`${API_DUMMY}/bawaslu/api/jenis-regulasi/get-by-id/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        console.log(ress.data.data);
        setIdJenisRegulasi(response.id);
        console.log(response.jenisRegulasiId.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]);

  const addData = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      await axios.post(
        `${API_DUMMY}/bawaslu/api/menu-regulasi/add`,
        {
          menuRegulasi: menuRegulasi,
          idJenisRegulasi: idJenisRegulasi,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push("/admin-regulasi/" + idJenisRegulasi);
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJenisRegulasi();
  }, []);
  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container mt-3 app-main__outer">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Tambah Data</h1>
              <hr />
              <form onSubmit={addData}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      Jenis Regulasi
                    </label>
                    <select
                      disabled
                      className="form-select form-select-sm"
                      aria-label="Small select example"
                      onChange={(e) => setIdJenisRegulasi(e.target.value)}
                      value={idJenisRegulasi}>
                      <option selected>PIlih Jenis Regulasi</option>
                      {jenisRegulasi.map((down) => {
                        return (
                          <option value={down.id}>{down.jenisRegulasi}</option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mb-3 col-lg-6">
                    <label
                      for="exampleInputPassword1"
                      className="form-label font-weight-bold">
                      Menu Regulasi
                    </label>
                    <input
                      value={menuRegulasi}
                      onChange={(e) => setMenuRegulasi(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-danger mt-3 mr-3">
                  <a
                    href={`/admin-regulasi/${idJenisRegulasi}`}
                    style={{ color: "white", textDecoration: "none" }}>
                    {" "}
                    Batal
                  </a>
                </button>
                <button type="submit" className="btn-primary mt-3">
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMenuRegulasi;
