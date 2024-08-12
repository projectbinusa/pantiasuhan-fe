import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_DUMMY } from '../../../../utils/base_URL';
import { TableContainer } from '@mui/material';
import Sidebar from '../../../../component/Sidebar';
import Header from '../../../../component/Header';
import Swal from 'sweetalert2';
import AOS from "aos";

function PageCarousel() {
  const [caraousel, setCarousel] = useState([]);

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/bawaslu/api/carousel/all`);
      setCarousel(response.data);
      console.log("ini daata carousel = " + response.data);
    } catch (error) {
      console.log("Terjadi Kesalahan ", error);
    }
  };

  const deleteData = async (id) => {
    Swal.fire({
      title: "Anda Ingin Menghapus Data ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cencel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_DUMMY}/bawaslu/api/carousel/` + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        Swal.fire({
          icon: "success",
          title: "Dihapus!",
          showConfirmButton: false,
        });
      }
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };

  useEffect(() => {
    getAll();
  })

  useEffect(() => {
    AOS.init();
  },[]);
  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
    <Header />
    <div className="app-main">
      <Sidebar />
      <div className="container box-tabel mt-3 app-main__outer"  data-aos="fade-left">
        <div className="main-card mb-3 card box-tabel">
          <div
            className="card-header pembungkus-text-button"
            style={{ display: "flex" }}
          >
            <p className="mt-3">Carousel</p>
            <div className="d-flex ml-auto gap-3">
              <div className="btn-actions-pane-right">
                <div
                  role="group"
                  className="btn-group-sm btn-group button-pembungkus"
                >
                  <button
                    id="button-tambah"
                    className="active btn-focus p-2 rounded button-tambah"
                  >
                    <a
                      href="/add-page-carousel"
                      className="text-light txt-tambah"
                      style={{ textDecoration: "none" }}
                    >
                      {" "}
                      Tambah Carousel
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <Paper> */}
          <TableContainer>
            <div
              className="table-responsive"
              style={{ overflowX: "auto", width: "100%" }}
            >
              <table
                className="align-middle mb-0 table table-borderless table-striped table-hover"
                style={{}}
              >
                <thead>
                  <tr>
                    <th className="nomor">
                      No
                    </th>
                    <th scope="col" style={{ minWidth: "150px" }}>
                      Nama Carousel
                    </th>
                    <th scope="col">Image</th>
                    <th className="text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {filteredList.map((pengumuman, index) => ( */}
                  {caraousel.map((crs, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="No : " className="nomor">
                          {index + 1}
                        </td>
                        <td data-label="author : ">{crs.namaCarousel}</td>
                        <td>
                          <img
                            style={{ width: "100px" }}
                            src={crs.foto}
                          />
                        </td>
                        <td data-label="Aksi : ">
                          <div className="aksi">
                            <button
                              type="button"
                              className=".responsive-buttons  btn-primary btn-sm mr-2"
                            >
                              <a
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                                href={`/edit-page-carousel/${crs.id}`}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </a>
                            </button>
                            <button
                              type="button"
                              className=" btn-danger  btn-sm"
                              onClick={() => deleteData(crs.id)}
                            >
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
          </TableContainer>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PageCarousel