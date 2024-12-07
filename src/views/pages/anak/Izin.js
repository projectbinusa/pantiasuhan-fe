import React, { useState } from "react";
import NavbarSiswa from "../../../component/NavbarSiswa";

function Izin() {
  const [keterangan, setKeterangan] = useState("");

  const handleChange = (event) => {
    setKeterangan(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send to backend or log the data
    console.log("Keterangan Izin: ", keterangan);
  };

  return (
    <div>
      <NavbarSiswa />
      <div className="container">
        <h2 className="mb-4">Form Izin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="keterangan" className="form-label">
              Keterangan Izin
            </label>
            <textarea
              className="form-control"
              id="keterangan"
              rows="3"
              value={keterangan}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Izin;
