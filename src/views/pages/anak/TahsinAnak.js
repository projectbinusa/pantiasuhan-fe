import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarSiswa from "../../../component/NavbarSiswa";
import "../../../css/dataabsen.css";
import { API_DUMMY_PYTHON } from "../../../utils/base_URL";
import Swal from "sweetalert2";

function TahsinAnak() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteData = async (id) => {
    Swal.fire({
      title: "Apakah Anda Ingin Menghapus?",
      text: "Perubahan data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_DUMMY_PYTHON}/api/siswa/tahsin/` + id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("tokenpython")}`,
            },
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Dihapus!",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Hapus Data Gagal!",
              showConfirmButton: false,
              timer: 1500,
            });
            console.log(err);
          });
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY_PYTHON}/api/siswa/tahsin`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        if (response.data.code === 200) {
          setDatas(response.data.data);
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
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "start"}}>
          <h2 className="mb-4">Data Tahsin</h2>
          <div role="group" className="btn-group-sm btn-group">
            <button className="active btn-focus p-2 rounded">
              <a
                style={{ color: "white", textDecoration: "none" }}
                href="/add_anak_tahsin"
              >
                Tambah Tahsin
              </a>
            </button>
          </div>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Nama</th>
              <th scope="col">Tanggal</th>
              <th scope="col">Pojok Awal - Pojok Akhir</th>
              <th scope="col">Juz Awal - Juz Akhir</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {datas.length > 0 ? (
              datas.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.nama_siswa || "N/A"}</td>
                  <td>{item.created_date || "N/A"}</td>
                  <td>{item.start_pojok} - {item.end_pojok}</td>
                  <td>{item.start_juz} - {item.end_juz}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        type="button"
                        className="btn-primary btn-sm mr-2"
                      >
                        <a
                          style={{
                            color: "white",
                            textDecoration: "none",
                          }}
                          href={`/edit_anak_tahsin/${item.id}`}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </a>
                      </button>
                      <button
                        onClick={() => deleteData(item.id)}
                        type="button"
                        className="btn-danger btn-sm"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Tidak ada data tahsin
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TahsinAnak;
