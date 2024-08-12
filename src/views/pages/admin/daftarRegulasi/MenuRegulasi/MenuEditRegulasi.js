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

function MenuEditRegulasi() {
  const [idJenisRegulasi, setIdJenisRegulasi] = useState();
  const [menuRegulasi, setMenuRegulasi] = useState("");
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [jenisRegulasi, setJenisRegulasi] = useState([]);
  const param = useParams();

  // get jenis regulasi
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

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/bawaslu/api/menu-regulasi/get/` + param.id)
      .then((ress) => {
        const response = ress.data.data;
        setMenuRegulasi(response.menuRegulasi);
        setIdJenisRegulasi(response.jenisRegulasiId.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]);

  const update = async (e) => {
    e.preventDefault();

    const reqs = {
      idJenisRegulasi: idJenisRegulasi,
      menuRegulasi: menuRegulasi,
    };

    try {
      await axios.put(
        `${API_DUMMY}/bawaslu/api/menu-regulasi/put/${param.id}?idJenisRegulasi=${idJenisRegulasi}&menuRegulasi=${menuRegulasi}`,
        reqs,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil Mengedit Data",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/admin-regulasi/" + menuRegulasi);
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
              <form onSubmit={update}>
                <div className="row">
                  <div className="mb-3 col-lg-6">
                    <label for="exampleInputPassword1" className="form-label">
                      Jenis Regulasi
                    </label>
                    <select
                      disabled
                      className="form-select form-select-sm"
                      aria-label="Small select example"
                      onChange={(e) => setIdJenisRegulasi(e.target.value)}
                      value={idJenisRegulasi}>
                      <option selected>Pilih Jenis Regulasi</option>
                      {jenisRegulasi.map((down) => {
                        return (
                          <option value={down.id}>{down.jenisRegulasi}</option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mb-3 col-lg-6">
                    <label for="exampleInputPassword1" className="form-label">
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

export default MenuEditRegulasi;
