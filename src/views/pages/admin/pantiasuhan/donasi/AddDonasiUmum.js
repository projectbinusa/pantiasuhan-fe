import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AOS from "aos";
import { API_DUMMY_PYTHON } from "../../../../../utils/base_URL";

function TambahDonasiUmum() {
  const [name, setName] = useState("");
  const [hp, setHp] = useState(0);
  const [addres, setAddres] = useState("");
  const [image, setImage] = useState(null); // Uncomment when you add image functionality
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const history = useHistory();
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

  const add = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_DUMMY_PYTHON}/api/public/donation/1/proccess`,
        {
          name: name,
          hp: hp,
          address: addres,
        },
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      setIsModalOpen(true); // Show modal on success
    } catch (error) {
      console.log("Error details:", error); // Log the error
      if (error.response) {
        console.log("Error response:", error.response); // API error response
        if (error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        }
      } else if (error.request) {
        console.log("Error request:", error.request); // No response received
      } else {
        console.log("Error message:", error.message); // Other errors
      }
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="page-wrapper chiller-theme">
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="app-main__outer container mb-3" data-aos="fade-left">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Tambah Donasi</h1>
                    <hr />
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Name
                          </label>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Masukkan Name"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            No Hp
                          </label>
                          <input
                            onChange={(e) => setHp(e.target.value)}
                            placeholder="Masukkan nomor hp"
                            type="number"
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Alamat
                          </label>
                          <input
                            placeholder="Masukkan Alamat"
                            onChange={(e) => setAddres(e.target.value)}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/donasi-umum"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed bg-gray-900 items-center" style={{ transform:"translateY(-123%)", width:"30%", marginLeft:"35%" }}>
          <div className="bg-white rounded-lg shadow-lg p-2">
            {/* Header Modal */}
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h5 className="text-lg font-semibold">
                Data Berhasil Ditambahkan
              </h5>
              {/* <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times; 
              </button> */}
            </div>

            {/* Body Modal */}
            <div className="px-6 py-4">
              <p className="text-gray-700">
                Data donasi telah berhasil ditambahkan. Nomor donasi:{" "}
                <strong>123456</strong>
              </p>
            </div>

            {/* Footer Modal */}
            <div className="border-t px-6 py-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TambahDonasiUmum;
