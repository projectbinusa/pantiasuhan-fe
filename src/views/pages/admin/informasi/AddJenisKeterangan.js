import React from "react";
import Footer from "../../../../component/Footer";
import Sidebar from "../../../../component/Sidebar";
import Header from "../../../../component/Header";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../utils/base_URL";
import { useEffect } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

function AddJenisKeterangan() {
  const [keterangan, setKeterangan] = useState("");
  const [jenisInformasi, setJenisInformasi] = useState();
  const [show, setShow] = useState(false);
  const [informasi, setInformasi] = useState([]);
  const param = useParams();
  const { namaInformasi } = useParams();
  const history = useHistory();

  const getInformasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/jenis-informasi/all`
      );
      setInformasi(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/bawaslu/api/jenis-informasi/getBy/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setJenisInformasi(response.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getInformasi();
  }, []);

  const add = async (e) => {
    e.preventDefault();
    e.persist();
    try {
      await axios.post(
        `${API_DUMMY}/bawaslu/api/jenis-keterangan/add`,
        {
          keterangan: keterangan,
          jenisInformasi: jenisInformasi,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // //console.log(unique_id);
      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push(`/admin-informasi/${informasi.length > 0 && informasi[0].namaInformasi }/${param.id}`)
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

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
              <form onSubmit={add}>
                <div className="row">
                  <div className="col-lg-6 mb-2">
                    <label className="form-label font-weight-bold">Jenis Informasi</label>
                    <select disabled
                      className="form-select form-select-sm"
                      aria-label="Small select example"
                      onChange={(e) => setJenisInformasi(e.target.value)} value={jenisInformasi}>
                      <option selected>PIlih Jenis Informasi</option>
                      {informasi.map((down) => {
                        return (
                          <option value={down.id}>{down.namaInformasi}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label for="exampleInputEmail1" className="form-label font-weight-bold">
                      Keterangan
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
                    />
                  </div>
                </div>
                <button type="button" className="btn-danger mt-3 mr-3">
                  <a
                    href={`/admin-informasi/${informasi.length > 0 && informasi[0].namaInformasi}/${param.id}`}
                    style={{ color: "white", textDecoration: "none" }}>
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

export default AddJenisKeterangan;
