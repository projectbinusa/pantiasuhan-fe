import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../../utils/base_URL";
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
  const [organization, setOrganization] = useState([]);
  const [organizationId, setOrganizationId] = useState("");
  const [signature, setSignature] = useState(""); // State to store signature
  const history = useHistory();
  const param = useParams();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const convertToInternational = (phoneNumber) => {
    if (phoneNumber.startsWith("0")) {
      return "+62" + phoneNumber.slice(1);
    }
    return phoneNumber;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Mengatur resolusi tinggi untuk menghindari blur
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

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handleStart = (e) => {
    e.preventDefault();
    setIsDrawing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleMove = (e) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getCoordinates(e);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleEnd = () => {
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
    setSignature(null);
  };

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const isFetching = useRef(false); // Gunakan useRef agar tidak memicu re-render

  const fetchData = async (pageNum) => {
    if (isFetching.current || !hasMore) return; // Mencegah pemanggilan ganda

    isFetching.current = true; // Set fetching agar tidak double request
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/public/organization?page=${pageNum}`,
        {
          headers: {
            "x-origin": window.location.hostname,
          },
        }
      );

      const newData = response.data.data;
      const pagination = response.data.pagination;
      const hasNextPage = pagination.page < pagination.total_page;

      setOrganization((prev) => [...prev, ...newData]);
      setHasMore(hasNextPage);

      console.log("Fetched Page:", pageNum);
      console.log("Next Page Exists:", hasNextPage);

      if (hasNextPage) {
        setPage(pageNum + 1);
      }
    } catch (error) {
      console.error("Terjadi Kesalahan saat mengambil data:", error);
    }

    isFetching.current = false; // Reset fetching flag
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(page); // Ambil data pertama kali
  }, [page]);

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      let imageUrl = signature;
      if (signature) {
        imageUrl = await uploadImageToS3(signature);
      }

      await axios.post(
        `${API_DUMMY}/api/guestbook`,
        {
          no_wa: convertToInternational(noWa),
          address: alamat,
          nama: nama,
          // visit_date: tanggal,
          signature: imageUrl,
          note: catatan,
          description_donation: tujuan,
          // organization_id: organizationId,
        },
        {
          headers: {
            "x-origin": window.location.hostname,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title:
          "Terima Kasih Telah Berkunjung 💕 Kebaikan Anda Membawa Kebahagiaan 🌟",
        showConfirmButton: false,
        timer: 1500,
      });

      // setTimeout(() => {
      //   history.push("/");
      // }, 1500);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Tambah Data Gagal!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
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
                  rows={4}></textarea>
              </div>
              {/* <div className="mb-3 col-lg-12">
                <label
                  for="exampleInputEmail1"
                  className="form-label font-weight-bold ">
                  Panti Asuhan
                </label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  options={organization.map((data) => ({
                    value: data.id,
                    label: data.name,
                  }))}
                  onChange={(e) => setOrganizationId(e.value)}
                  isLoading={isLoading}
                />
              </div> */}
              {/* <div className="mb-3 col-lg-12">
                <label className="form-label font-weight-bold">
                  Tanggal Kunjungan
                </label>
                <input
                  type="date"
                  onChange={(e) => setTanggal(e.target.value)}
                  className="form-control"
                />
              </div> */}
              <div className="mb-3 col-lg-12">
                <label className="form-label font-weight-bold">Tujuan</label>
                <textarea
                  className="form-control"
                  onChange={(e) => setTujuan(e.target.value)}
                  placeholder="Masukkan Tujuan"
                  rows={4}></textarea>
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
                    touchAction: "none", // Mencegah scroll saat menggambar di HP
                  }}
                  onMouseDown={handleStart}
                  onMouseMove={handleMove}
                  onMouseUp={handleEnd}
                  onMouseLeave={handleEnd}
                  onTouchStart={handleStart}
                  onTouchMove={handleMove}
                  onTouchEnd={handleEnd}></canvas>
                <br />
                <button
                  type="button"
                  onClick={clearSignature}
                  className="btn-secondary">
                  Bersihkan Tanda Tangan
                </button>
              </div>
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
}

export default FormBukuTamu;
