import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../../../component/SidebarPantiAdmin";

function EditKondisiBarang() {
  const history = useHistory();
  const param = useParams();
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [kondisi, setKondisi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/admin/kondisi_barang/` + param.id, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        console.log("kondisi: ", ress.data.data.kondisi_barang);
        setKondisi(response.kondisi_barang);
        setDeskripsi(response.deskripsi)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  //add
  const put = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.put(
        `${API_DUMMY}/api/admin/kondisi_barang/${param.id}`,
        {
          kondisi_barang: kondisi,
          deskripsi: deskripsi
        },
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Berhasil Mengedit Kondisi",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push("/kondisi_barang_inventaris");
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
    } finally {
      setIsLoading(false); // Matikan loading setelah selesai
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
                    <form onSubmit={put}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <label
                            for="exampleInputEmail1"
                            className="form-label  font-weight-bold ">
                            Kondisi Barang
                          </label>
                          <input
                            onChange={(e) => setKondisi(e.target.value)}
                            type="text"
                            value={kondisi}
                            className="form-control"
                            placeholder="Masukkan Kondisi Barang"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label
                            for="exampleInputEmail1"
                            className="form-label font-weight-bold "
                          >Deskripsi</label>
                          <textarea rows={3} onChange={(e) => setDeskripsi(e.target.value)}
                            className="form-control" placeholder="Masukkan Deskripsi" value={deskripsi}></textarea>
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/kondisi_barang_inventaris">
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
    </div>
  );
}

export default EditKondisiBarang;
