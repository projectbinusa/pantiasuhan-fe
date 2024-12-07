import React, { useEffect, useRef, useState } from "react";
import { API_DUMMY_PYTHON } from "../../../utils/base_URL";
import "../../../css/absen.css";
import logo from "../../../aset/pantiasuhan/logo.png";
import panti from "../../../aset/pantiasuhan/pantiasuhan.png";
// import { API_DUMMY } from "../../../../../src/utils/baseURL";

const AbsenMasuk = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const inputRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [picture, setPicture] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      rfid_number: cardNumber,
      type: 1, // Type 1 untuk berangkat
    };

    try {
      const response = await fetch(
        `${API_DUMMY_PYTHON}/api/siswa/absen_masuk`,
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
        const { name, picture, datetime, description } = result; // Destructuring response
        setUserName(name || "Default User");
        setPicture(
          picture ||
            "https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg"
        );
        setDatetime(datetime || "-");
        setDescription(description || "-");
        setSuccessMessage("Berhasil melakukan presensi!");
        setErrorMessage("");
        setCardNumber("");
      } else {
        setErrorMessage(result.error || "Presensi gagal.");
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
        height: "110vh",
      }}>
      <div className="container text-white vh-100 py-4">
        <h2 className="text-center fw-bold mb-3">PRESENSI MASUK</h2>
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
                <h4 className="fw-bold">PRESENSI DIGITAL</h4>
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
                <h4 className={`text-${errorMessage ? "danger" : "success"}`}>
                  {description ||
                    errorMessage ||
                    "Berhasil Melakukan Presensi Masuk"}
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

export default AbsenMasuk;
