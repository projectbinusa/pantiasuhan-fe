import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Swal from "sweetalert2";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { uploadImageToS3 } from "../../../../../utils/uploadToS3";
import pantiasuhan from "../../../../../aset/pantiasuhan/pantiasuhan.png";

function FormBukuTamu() {
  const [nama, setNama] = useState("");
  const [noWa, setNoWa] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [image, setImage] = useState(null);
  const [tanggal, setTanggal] = useState("");
  const [catatan, setCatatan] = useState("");
  const [signature, setSignature] = useState(""); // State to store signature
  const history = useHistory();
  const param = useParams();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const ratio = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.scale(ratio, ratio);

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
  }, []);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(
      (e.clientX - rect.left) * (canvas.width / rect.width),
      (e.clientY - rect.top) * (canvas.height / rect.height)
    );
  };

  const handleDraw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    ctx.lineTo(
      (e.clientX - rect.left) * (canvas.width / rect.width),
      (e.clientY - rect.top) * (canvas.height / rect.height)
    );
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);

    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      const file = new File([blob], "signature.png", { type: "image/png" });
      setSignature(file);
    }, "image/png");
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    setSignature("");
  };
  console.log(signature);

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      let imageUrl = signature;
      if (signature) {
        imageUrl = await uploadImageToS3(signature);
      }

      await axios.post(`${API_DUMMY}/api/guestbook`, {
        no_wa: noWa,
        address: alamat,
        nama: nama,
        visit_date: tanggal,
        signature: imageUrl,
        note: catatan,
        description_donation: tujuan,
        organization_id: param.organization_id,
      });

      Swal.fire({
        icon: "success",
        title:
          "Terima Kasih Telah Berkunjung 💕 Kebaikan Anda Membawa Kebahagiaan 🌟",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        history.push("/");
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
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
            <h6>Hadirmu Membawa Kebahagiaan</h6>
          </header>
          <div className="header-donasi">
            <img
              src={pantiasuhan}
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
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Masukkan Nama"
                  className="form-control"
                />
              </div>
              <div className="mb-3 col-lg-12">
                <label className="form-label font-weight-bold">
                  No Whatsapp
                </label>
                <input
                  onChange={(e) => setNoWa(e.target.value)}
                  placeholder="Masukkan nomor Whatsapp"
                  type="number"
                  className="form-control"
                />
              </div>
              <div className="mb-3 col-lg-12">
                <label className="form-label font-weight-bold">Alamat</label>
                <textarea
                  className="form-control"
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Masukkan Alamat"
                  rows={4}
                ></textarea>
              </div>
              <div className="mb-3 col-lg-12">
                <label className="form-label font-weight-bold">
                  Tanggal Kunjungan
                </label>
                <input
                  type="date"
                  onChange={(e) => setTanggal(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3 col-lg-12">
                <label className="form-label font-weight-bold">Tujuan</label>
                <textarea
                  className="form-control"
                  onChange={(e) => setTujuan(e.target.value)}
                  placeholder="Masukkan Tujuan"
                  rows={4}
                ></textarea>
              </div>
              <div className="mb-3 col-lg-12">
                <label className="form-label font-weight-bold">
                  Tanda Tangan
                </label>
                <canvas
                  ref={canvasRef}
                  className="form-control"
                  style={{
                    marginBottom: "10px",
                    width: "100%",
                    height: "10rem",
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleDraw}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                ></canvas>
                <br />
                <button
                  type="button"
                  onClick={clearSignature}
                  className="btn-secondary"
                >
                  Bersihkan Tanda Tangan
                </button>
              </div>
              {/* {signature && (
                <div style={{ marginTop: "10px" }}>
                  <p>Generated Signature:</p>
                  <img src={signature} alt="Signature" style={{ maxWidth: "100%" }} />
                </div>
              )} */}
            </div>
          </div>
          <br /> <br />
        </div>
        <div className="fixed-donate-buttons">
          <button type="button" onClick={add} className="btn-primary">
            Kirim
          </button>
        </div>
      </section>
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
  // return (
  //   <div className="app-main__inner m-4">
  //     <div className="row">
  //       <div className="col-md-12">
  //         <div className="card shadow">
  //           <div className="card-body">
  //             <h1 className="fs-4">Form Buku Tamu</h1>
  //             <hr />
  //             <form onSubmit={add}>
  //               <div className="row">
  //                 <div className="mb-3 col-lg-12">
  //                   <label className="form-label font-weight-bold">Nama</label>
  //                   <input
  //                     value={nama}
  //                     onChange={(e) => setNama(e.target.value)}
  //                     type="text"
  //                     placeholder="Masukkan Nama"
  //                     className="form-control"
  //                   />
  //                 </div>
  //                 <div className="mb-3 col-lg-12">
  //                   <label className="form-label font-weight-bold">
  //                     No Whatsapp
  //                   </label>
  //                   <input
  //                     value={noWa}
  //                     onChange={(e) => setNoWa(e.target.value)}
  //                     type="number"
  //                     placeholder="Masukkan No Whatsapp"
  //                     className="form-control"
  //                   />
  //                 </div>
  //                 <div className="mb-3 col-lg-12">
  //                   <label className="form-label font-weight-bold">
  //                     Alamat
  //                   </label>
  //                   <textarea
  //                     rows={3}
  //                     className="form-control"
  //                     placeholder="Masukkan Alamat"
  //                     value={alamat}
  //                     onChange={(e) => setAlamat(e.target.value)}
  //                   ></textarea>
  //                 </div>
  //                 <div className="mb-3 col-lg-12">
  //                   <label className="form-label font-weight-bold">
  //                     Tujuan Kunjungan
  //                   </label>
  //                   <textarea
  //                     rows={3}
  //                     className="form-control"
  //                     placeholder="Masukkan Tujuan Kunjungan"
  //                     value={tujuan}
  //                     onChange={(e) => setTujuan(e.target.value)}
  //                   ></textarea>
  //                 </div>
  //                 <div className="mb-3 col-lg-12">
  //                   <label className="form-label font-weight-bold">
  //                     Tanggal Kunjungan
  //                   </label>
  //                   <input
  //                     className="form-control"
  //                     type="date"
  //                     value={tanggal}
  //                     onChange={(e) => setTanggal(e.target.value)}
  //                   />
  //                 </div>
  //                 {/* <div className="mb-3 col-lg-12">
  //                   <label className="form-label font-weight-bold">
  //                     Bukti Donasi
  //                   </label>
  //                   <input
  //                     type="file"
  //                     accept="image/*"
  //                     onChange={(e) => setImage(e.target.files[0])}
  //                     className="form-control"
  //                   />
  //                 </div> */}
  //                 <div className="mb-3 col-lg-12">
  //                   <label className="form-label font-weight-bold">
  //                     Catatan
  //                   </label>
  //                   <textarea
  //                     rows={3}
  //                     className="form-control"
  //                     placeholder="Masukkan Catatan"
  //                     value={catatan}
  //                     onChange={(e) => setCatatan(e.target.value)}
  //                   ></textarea>
  //                 </div>
  //               </div>
  //               <button type="submit" className="btn-primary mt-3">
  //                 Kirim
  //               </button>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default FormBukuTamu;
