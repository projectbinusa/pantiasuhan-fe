import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarSiswa from "../../../component/NavbarSiswa";
import "../../../css/dataabsen.css";
import { API_DUMMY } from "../../../utils/base_URL";

function DataAbsen() {
  const [absensiData, setAbsensiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/siswa/presensi`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        if (response.data.code === 200) {
          setAbsensiData(response.data.data);
          console.log("data: ", response.data.data);
        } else {
          console.error("Failed to fetch data:", response.data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <NavbarSiswa />
      <div className="container-absen">
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
            {absensiData.length > 0 ? (
              absensiData.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.nama_siswa || "N/A"}</td>
                  <td>{item.created_date || "N/A"}</td>
                  <td>{item.jam_masuk || "N/A"}</td>
                  <td>{item.jam_pulang || "N/A"}</td>
                  <td>{item.description || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Tidak ada data absensi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataAbsen;
