import React, { useState, useEffect } from "react";
import "../../../css/absen.css";
import Foto from "../../../aset/pantiasuhan/image.png";

function AbsenPulang() {
  const username = "Ana"; // Contoh username
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("id-ID"));
      setCurrentDate(
        now.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
      setCurrentDay(now.toLocaleDateString("id-ID", { weekday: "long" }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="container-custom">
      <h1 className="title-custom text-center">PRESENSI PULANG</h1>
      <div className="row justify-content-center g-4 mt-4">
        {/* Card Profil */}
        <div className="col-auto">
          <div className="card profile-card-custom text-center">
            <img src={Foto} alt="Foto Profil" className="img-fluid" />
          </div>
        </div>

        {/* Kartu Informasi Presensi Digital */}
        <div className="col-auto">
          <div className="card presensi-card-custom text-center">
            <h2 className="mb-3">PRESENSI DIGITAL</h2>
            <h3 className="fw-bold display-4">{currentTime}</h3>
            <input
              type="text"
              className="form-control-custom"
              value={inputValue}
              onChange={handleInputChange}
            />
            <p className="mb-2 mt-2">
              {currentDay}, {currentDate}
            </p>
            <p className="fw-bold">{username}</p>
            <p className="text-success fw-bold">
              Berhasil Melakukan Presensi Pulang
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AbsenPulang;
