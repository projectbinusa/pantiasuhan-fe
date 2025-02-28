import React, { useEffect, useState } from "react";
import { API_DUMMY_SMART } from "../../../../utils/base_URL";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import AOS from "aos";
import axios from "axios";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";
import AsyncSelect from "react-select/async";

function EditDomain() {
  const [nama, setNama] = useState("");
  const [organization, setOrganization] = useState("");
  const [idOrganization, setIdOrganization] = useState(null);
  const param = useParams();
  const history = useHistory();
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const updateDomain = async (e) => {
    e.preventDefault();
    e.persist();

    const datas = {
      name: nama,
      organization_id: Number(idOrganization),
    };

    try {
      await axios.put(
        `${API_DUMMY_SMART}/api/user/domain/` + param.name,
        datas,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Data Berhasil Diperbarui",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        history.push("/domain");
      }, 1500);
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
        console.error(error);
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${API_DUMMY_SMART}/api/user/domain/` + param.name, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setNama(response.name);
        setIdOrganization(response.organization_id);

        // Set nilai awal dari AsyncSelect berdasarkan ID organisasi
        setSelectedOrganization({
          value: response.organization_id,
          label: response.name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setIdOrganization(selectedOption.value);
      setSelectedOrganization(selectedOption);
    } else {
      setIdOrganization(null);
      setSelectedOrganization(null);
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

  // const handleChange = (selectedOption) => {
  //   if (selectedOption) {
  //     setIdOrganization(selectedOption.value);
  //     setOrganization(selectedOption.label);
  //   } else {
  //     setIdOrganization(null);
  //     setOrganization("");
  //   }
  // };

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

  return (
    <div
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
      <div style={{ marginTop: "10px" }} className="page-content1 absolute">
        <div
          className=" container mt-3 mb-3 app-main__outer"
          data-aos="fade-left"
        >
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Edit Data</h1>
              <hr />
              <form onSubmit={updateDomain}>
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
                    <label className="form-label font-weight-bold">
                      Organization
                    </label>
                    <input
                      value={Organization}
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
                      value={selectedOrganization} // Menampilkan organisasi yang sudah ada sebelum diedit
                      placeholder="Cari Organisasi..."
                      noOptionsMessage={() => "Organisasi tidak ditemukan"}
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
  );
}

export default EditDomain;
