import React from "react";
import NavbarSiswa from "../../../component/NavbarSiswa";
import "../../../css/dataabsen.css";

function DataAbsen() {
  return (
    <div>
      <NavbarSiswa />
      <div className="container">
        <h2 className="mb-4">Data Absensi</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Tanggal</th>
              <th scope="col">Jam Masuk</th>
              <th scope="col">Jam Pulang</th>
              <th scope="col">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark Otto</td>
              <td>2024-12-01</td>
              <td>08:00</td>
              <td>16:00</td>
              <td>On Time</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob Thornton</td>
              <td>2024-12-01</td>
              <td>08:15</td>
              <td>16:00</td>
              <td>Late</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry Bird</td>
              <td>2024-12-01</td>
              <td>08:00</td>
              <td>15:45</td>
              <td>Early Leave</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataAbsen;
