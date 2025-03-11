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

function EditStokBarang() {
  const history = useHistory();
  const param = useParams();
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [stok, setStok] = useState("");
  const [idBarang, setIdBarang] = useState("");
  const [barang, setBarang] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/admin/barang`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        setBarang(response.data.data);
      } catch (error) {
        console.error("Terjadi Kesalahan saat mengambil data barang:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/admin/stok_barang/` + param.id, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setStok(response.jumlah_stok);
        setIdBarang(response.barang_id)
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
    Swal.fire({
      title: "Loading...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    try {
      await axios.put(
        `${API_DUMMY}/api/admin/stok_barang/${param.id}`,
        {
          jumlah_stok: stok,
          barang_id: idBarang,
        },
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Berhasil Mengedit Stok",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push("/stok_barang_inventaris");
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
                          <label className="form-label font-weight-bold">Nama Barang
                          </label>
                          <select
                            className="form-control"
                            aria-label="Small select example"
                            onChange={(e) => {
                              const selectedId = e.target.value;
                              setIdBarang(selectedId);
                            }}>
                            <option value="">
                              Pilih Barang
                            </option>
                            {barang.map((data, index) => (
                              <option key={index} value={data.id}>
                                {data.nama_barang}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Stok
                          </label>
                          <input placeholder="Masukkan Stok Barang" className="form-control" value={stok}
                            onChange={(e) => setStok(e.target.value)} />
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/stok_barang_inventaris">
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

export default EditStokBarang;