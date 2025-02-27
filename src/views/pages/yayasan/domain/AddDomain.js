import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY_SMART } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";
import { uploadImageToS3 } from "../../../../utils/uploadToS3";
import AsyncSelect from "react-select/async";

function AddDomain() {
  const [nama, setNama] = useState("");
  const [organization, setOrganization] = useState("");
  const [idOrganization, setIdOrganization] = useState(null);

  const history = useHistory();

  const add = async (e) => {
    e.preventDefault();
    e.persist();
    // let imageUrl = foto;

    // if (foto) {
    //   imageUrl = await uploadImageToS3(foto);
    // }

    const datas = {
      name: nama,
      organization_id: Number(idOrganization),
    };
    try {
      await axios.post(`${API_DUMMY_SMART}/api/user/domain`, datas, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push("/domain");
      }, 1500);
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }
  };

  const fetchOrganization = async (inputValue) => {
    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/user/organization/organization_ids?filter=${inputValue}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      return response.data.data.map((member) => ({
        value: member.id,
        label: member.name,
      }));
    } catch (error) {
      console.error("Error searching members:", error);
      return [];
    }
  };

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setIdOrganization(selectedOption.value);
      setOrganization(selectedOption.label);
    } else {
      setIdOrganization(null);
      setOrganization("");
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  //   useEffect(() => {
  //     const fetchDataAnak = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${API_DUMMY_SMART}/api/user/domain`,
  //           {
  //             headers: {
  //               "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
  //             },
  //           }
  //         );
  //         setListAnak(response.data.data);
  //       } catch (error) {
  //         console.error("Terjadi Kesalahan saat mengambil data lokasi:", error);
  //       }
  //     };
  //     fetchDataAnak()
  //   }, [])

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

  return (
    <div
      c
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
      }`}
    >
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}
      >
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow">
                <div className="card-body">
                  <h1 className="fs-4">Form Tambah Data</h1>
                  <hr />
                  <form onSubmit={add}>
                    <div className="row">
                      <div className="mb-3 col-lg-6">
                        <label
                          for="exampleInputEmail1"
                          className="form-label  font-weight-bold "
                        >
                          Nama
                        </label>
                        <input
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Masukkan Nama"
                        />
                      </div>
                      {/* <div className="mb-3 col-lg-6">
                        <label
                          for="exampleInputEmail1"
                          className="form-label  font-weight-bold "
                        >
                          Organization_id
                        </label>
                        <input
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          type="number"
                          className="form-control"
                          placeholder="Masukkan Organization"
                        />
                      </div> */}
                      <div className="mb-3 col-lg-6">
                        <label className="form-label font-weight-bold">
                          Organization
                        </label>
                        <AsyncSelect
                          cacheOptions
                          defaultOptions
                          loadOptions={fetchOrganization}
                          onChange={handleChange}
                          placeholder="Cari Organisasi..."
                          noOptionsMessage={() => "Organisasi tidak ditemukan"}
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            menu: (base) => ({
                              ...base,
                              position: "absolute",
                              zIndex: 9999,
                              backgroundColor: "white",
                            }),
                          }}
                        />
                      </div>
                    </div>

                    <button type="button" className="btn-danger mt-3 mr-3">
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="/domain"
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
    // </div>
  );
}

export default AddDomain;
