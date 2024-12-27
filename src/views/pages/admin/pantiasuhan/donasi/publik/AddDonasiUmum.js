import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AOS from "aos";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../../../../../../aset/BNILogo.png";
import { Box, Modal, Typography } from "@mui/material";
import { API_DUMMY_SMART_DEV } from "../../../../../../utils/base_URL";

function TambahDonasiUmum() {
  const [name, setName] = useState("");
  const [hp, setHp] = useState(0);
  const [addres, setAddres] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [vaNumber, setVaNumber] = useState("");
  const [datas, setDatas] = useState(null);

  const history = useHistory();
  const param = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY_SMART_DEV}/api/public/donation/${param.id}`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
              "x-origin": "mccsemarang.com"
            },
          }
        );
        const resp = response.data.data;
        setDatas(resp);
      } catch (error) {
        console.error("Terjadi Kesalahan", error);
      }
    };

    fetchData();
  }, [param.id]);

  const add = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_DUMMY_SMART_DEV}/api/public/donation/${param.id}/proccess`,
        {
          name: name,
          hp: hp,
          address: addres,
        },
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            "x-origin": "mccsemarang.com"
          },
        }
      );
      if (response.status === 200) {
        setIsModalOpen(true); // Show modal on success
        setVaNumber(response.data.data);
        console.log("response: ", response.data.data);
        // setTimeout(() => {
        //   history.push(`/donasiumum/panduan/${param.id}`);
        // }, 1500);
      }
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <main className="section-donasi">
      <section className="body-donasi">
        <div className="container-donasi">
          <header className="header-back">
            <h6>{datas?.name}</h6>
          </header>
          <div className="header-donasi">
            <img
              src={
                datas?.url_image !== ""
                  ? datas?.url_image
                  : "https://via.placeholder.com/500x250"
              }
              alt="Foto Donasi"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="content-donasi">
            <div className="row">
              <div className="mb-3 col-lg-12">
                <label className="form-label font-weight-bold">Nama</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan Nama"
                  className="form-control"
                />
              </div>
              <div className="mb-3 col-lg-12">
                <label className="form-label font-weight-bold">No Hp</label>
                <input
                  onChange={(e) => setHp(e.target.value)}
                  placeholder="Masukkan nomor hp"
                  type="number"
                  className="form-control"
                />
              </div>
              <div className="mb-3 col-lg-12">
                <label className="form-label font-weight-bold">Alamat</label>
                <input
                  placeholder="Masukkan Alamat"
                  onChange={(e) => setAddres(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed-donate-buttons">
          {/* <button type="button" className="btn-danger mt-3 mr-3">
            <a
              style={{ color: "white", textDecoration: "none" }}
              href="/donasiumum"
            >
              Batal
            </a>
          </button> */}
          <button type="button" onClick={add} className="btn-primary">
            Lanjut pembayaran
          </button>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <div className="content-donasi">
              <div className="content-img">
                <img src={logo} />
              </div>{" "}
              <br />
              <div style={{ display: "flex", marginTop: "5%", gap: "1rem" }}>
                <div style={{ lineHeight: "1.1" }}>
                  <p>Nama Bank </p>
                  {/* <p>Nama Akun </p> */}
                  <p>Biaya Admin </p>
                  <p>No VA</p>
                </div>
                <div style={{ lineHeight: "1.1" }}>
                  <p>Bank Negara Indonesia</p>
                  {/* <p>Rara</p> */}
                  <p>Rp. 0</p>
                  <p style={{ fontWeight: "bold" }}>
                    {vaNumber}{" "}
                    <i
                      style={{ color: "blue", cursor: "pointer" }}
                      className="fa-regular fa-copy"
                      onClick={() => {
                        navigator.clipboard.writeText(vaNumber);
                        alert("Nomor VA berhasil disalin!");
                      }}></i>
                  </p>
                </div>
              </div>{" "}
              <br /> <br />
              <p className="thanks">
                Terima kasih atas donasi Anda! Dukungan Anda sangat berarti dan
                akan membawa perubahan positif bagi mereka yang membutuhkan.
                ❤️🙏
              </p>
            </div>
          </Box>
        </Modal>
      )}

      <style>
        {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
          font-family: "Poppins", sans-serif
        }

        body {
          background-color: #f8f8f8;
          color: #333;
        }

        .header-back {
          position: fixed;
          background-color: #1e88e5;
          top: 0;
          left: 0;
          width: 100%;
          text-align: center;
          padding: 10px 0;
          z-index: 1000;
          font-size: 24px;
          font-weight: bold;
        }

        .header-back h6{
          color: #fff;
        }

        .container-donasi {
          max-width: 500px;
          margin: 40px auto 0;
          background-color: #fff;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          min-height: 100vh;
        }

        .content-donasi {
          padding: 15px;
        }

        .content-donasi h2 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #222;
        }

        .donation-amount {
          color: #005b9f;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          font-family: "Poppins", sans-serif
        }

        .story-section h3,
        .dana-masuk h3 {
          font-size: 16px;
          color: #444;
        }

        .story-section p,
        .dana-masuk p {
          font-size: 14px;
          color: #555;
          margin-top: 5px;
          font-family: "Poppins", sans-serif;
        }

        .fixed-donate-buttons {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          // gap: 10px;
          padding: 10px 0;
          background-color: #f8f8f8;
          z-index: 1000;
        }

        .fixed-donate-buttons button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
          font-size: 14px;
          font-family: "Poppins", sans-serif;
          width: 100%;
          max-width: 500px;
        }

        .fixed-donate-buttons button a {
        font-family: "Poppins", sans-serif;
        }
        `}
      </style>
    </main>
  );
}

export default TambahDonasiUmum;
