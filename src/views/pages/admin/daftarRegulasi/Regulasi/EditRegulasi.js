import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../../../../../component/Footer";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";
import Swal from "sweetalert2";
import { API_DUMMY } from "../../../../../utils/base_URL";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { menuClasses } from "@mui/material";

function EditRegulasi() {
  const [idMenuRegulasi, setIdMenuRegulasi] = useState(0);
  const [dokumen, setDokumen] = useState("");
  const [upload, setupload] = useState("");
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [regulasi, setRegulasi] = useState([]);
  const [regulasi1, setRegulasi1] = useState([]);
  const param = useParams();
  const [menuRegulasi, setMenuRegulasi] = useState("");

  const getMenuRegulasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/menu-regulasi/all?page=0&size=50`
      );
      setRegulasi(response.data.data);
      //   console.log(response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };



  useEffect(() => {
    axios
      .get(`${API_DUMMY}/bawaslu/api/regulasi/get/` + param.id)
      .then((ress) => {
        const response = ress.data.data;
        console.log(ress.data.data);
        setDokumen(response.dokumen);
        setIdMenuRegulasi(response.menuRegulasi.id);
        setupload(response.pdfDokumen);
        setMenuRegulasi(response.menuRegulasi.menuRegulasi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]);

  //edit regulasi
  const update = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_DUMMY}/bawaslu/api/regulasi/put/${param.id}`,
        {
          menuRegulasi: idMenuRegulasi,
          dokumen: dokumen,
          pdfDokumen: upload,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil Mengedit Data Regulasi",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push(
        `/${menuRegulasi}/${idMenuRegulasi}`
      );
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMenuRegulasi();
  }, []);
  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container mt-3 app-main__outer">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Edit Data</h1>
              <hr />
              <form onSubmit={update}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label for="exampleInputPassword1" className="form-label">
                      Menu Regulasi
                    </label>
                    <select
                      disabled
                      className="form-select form-select-sm"
                      aria-label="Small select example"
                      onChange={(e) => setIdMenuRegulasi(e.target.value)}
                      value={idMenuRegulasi}>
                      <option selected>PIlih Jenis Regulasi</option>
                      {regulasi.map((down) => {
                        return (
                          <option value={down.id}>{down.menuRegulasi}</option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mb-3 col-lg-6">
                    <label for="exampleInputPassword1" className="form-label">
                      Dokumen
                    </label>
                    <input
                      value={dokumen}
                      onChange={(e) => setDokumen(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label for="exampleInputPassword1" className="form-label">
                      PDF Dokumen
                    </label>
                    <input
                      value={upload}
                      onChange={(e) => setupload(e.target.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-danger mt-3 mr-3">
                  <a
                    href={`/${menuRegulasi}/${idMenuRegulasi}`}
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

export default EditRegulasi;
