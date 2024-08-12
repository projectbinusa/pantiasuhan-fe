import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../../../../utils/base_URL";
import Header from "../../../../component/Header";
import Sidebar from "../../../../component/Sidebar";
import { List } from "@mui/material";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import AOS from "aos";

function AdminLibrary() {
  const [list, setList] = useState([]);
  const history = useHistory();

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/bawaslu/api/library/all`);
      setList(response.data.data);
    } catch (error) {
      console.log("Terjadi Kesalahan ", error);
    }
  };

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
          .delete(`${API_DUMMY}/bawaslu/api/library/` + id, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
              history.push("/admin-library");
              window.location.reload();
            }, 1500);
          });
      }
    });
  };

  useEffect(() => {
    getAll();
    AOS.init();
  }, []);

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      // header
      <Header />
      <div className="app-main">
        <Sidebar />
        <div
          className="container box-tabel mt-3 app-main__outer"
          data-aos="fade-left">
          <div className="main-card mb-3 card box-tabel">
            <div
              className="card-header pembungkus-text-button"
              style={{ display: "flex" }}>
              <p className="mt-3">ELibrary</p>
              <div className="d-flex ml-auto gap-3">
                <div className="btn-actions-pane-right">
                  <div
                    role="group"
                    className="btn-group-sm btn-group button-pembungkus">
                    <button
                      id="button-tambah"
                      className="active btn-focus p-2 rounded button-tambah">
                      <a
                        href="/add-library-admin"
                        className="text-light txt-tambah"
                        style={{ textDecoration: "none" }}>
                        {" "}
                        Tambah Data
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="table-responsive-3"
              style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th className="text-long">Nama</th>
                    {/* <th className="text-center">
                  Isi Berita
                </th> */}
                    <th className="text-left">Url Image</th>
                    <th className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((library, no) => {
                    return (
                      <tr key={no}>
                        <td data-label="No" className="">
                          {no + 1}
                        </td>
                        <td data-label="Judul Berita" className="text-long">
                          {library.name}
                        </td>
                        <td data-label="Image" className="">
                          <img
                            src={library.photoUrl}
                            style={{ height: "4.5rem", width: "4.5rem" }}
                          />
                        </td>
                        <td data-label="Aksi">
                          <div className="aksi">
                            <button
                              type="button"
                              className="btn-primary btn-sm mr-2">
                              <a
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                                href={`/edit-library-admin/${library.id}`}>
                                {" "}
                                <i className="fa-solid fa-pen-to-square"></i>
                              </a>
                            </button>
                            <button
                              onClick={() => deleteData(library.id)}
                              type="button"
                              className="btn-danger btn-sm">
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLibrary;
