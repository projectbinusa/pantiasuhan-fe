import React, { useEffect, useRef, useState } from "react";
import { API_DUMMY_ABSEN, API_DUMMY_SMART } from "../../../utils/base_URL";
import "../../../css/absen.css";
import logo from "../../../aset/pantiasuhan/logo.png";
import panti from "../../../aset/pantiasuhan/pantiasuhan.png";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
// import { API_DUMMY } from "../../../../../src/utils/baseURL";

const AbsenPulang = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const inputRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [picture, setPicture] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const shiftId = searchParams.get("shift_id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      rfid_number: cardNumber,
      type: 2, // Type 1 untuk berangkat
      shift_id: shiftId,
    };

    try {
      const response = await fetch(
        `${API_DUMMY_SMART}/api/absensi/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setUserName(result.data.name || "Default User");
        setPicture(
          result.data.picture ||
            "https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg"
        );
        setDatetime(result.data.datetime || "-");
        setDescription(result.data.description || "-");
        setSuccessMessage("Berhasil melakukan presensi!");
        setErrorMessage("");
        setCardNumber("");
      } else {
        setErrorMessage(result.message || "Presensi gagal.");
        setSuccessMessage("");
        setCardNumber("");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Terjadi kesalahan saat presensi. Silakan coba lagi.");
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    if (errorMessage) {
      inputRef.current.focus();
    }
  }, [errorMessage]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${panti})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}>
      <div className="container text-white py-4">
        <h2 className="text-center fw-bold mb-3">PRESENSI PULANG</h2>
        <div className="row justify-content-center g-4">
          {/* Tanggal */}
          <div className="col-lg-4 col-md-6 col-sm-12 text-center">
            <div
              style={{
                backgroundColor: "white",
                border: "2px solid white",
              }}
              className="shadow card h-100">
              <div
                className="card-body d-flex justify-content-center align-items-center"
                style={{ backgroundColor: "white" }}>
                <img
                  style={{ width: "80%" }}
                  src={
                    picture ||
                    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                  }
                  alt="User"
                />
              </div>
            </div>
          </div>

          {/* Jam Digital */}
          <div className="col-lg-8 col-md-6 col-sm-12 text-center">
            <div
              style={{
                backgroundColor: "rgba(45, 45, 45, 0.904)",
                border: "2px solid white",
                borderRadius: "5px",
                padding: "15px",
              }}
              className="shadow">
              <form onSubmit={handleSubmit}>
                <img style={{ width: "17%" }} src={logo} alt="Logo" />
                <h3 className="fw-bold">PRESENSI DIGITAL</h3>
                <h2 className=" fw-bold">{formatTime(currentTime)}</h2>
                <input
                  type="password"
                  id="card_number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  ref={inputRef}
                />
                <h2 className="display-6">{formatDate(currentTime)}</h2>
                <h4 className="fw-bold">{userName || "Anak"}</h4>
                <h4 className={`text-${errorMessage ? "danger" : "light"}`}>
                  {errorMessage ||
                    description ||
                    "Berhasil Melakukan Presensi Pulang"}
                </h4>
                <h4>Jam Presensi: {datetime}</h4>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbsenPulang;
