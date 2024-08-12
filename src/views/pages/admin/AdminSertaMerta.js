import React, { useState, useEffect } from "react";
import Header from "../../../component/Header";
import Sidebar from "../../../component/Sidebar";
import { Pagination, TableContainer } from "@mui/material";
import { API_DUMMY } from "../../../utils/base_URL";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import "../../../css/gabung.css"
import AOS from "aos";

function AdminSertaMerta() {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState([]); // Set initial value here

  console.log("ini admin");
  const { id } = useParams();

  const getById = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/jenis-keterangan/1/isi-informasi?page=0&size=100&sortBy=id&sortOrder=desc`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Handle response data as needed
      const result = response.data;

      if (result.status === "success") {
        const selectedDataItem = result.data.content;
        setSelectedData(selectedDataItem);
        setPaginationInfo(result.data);

        // Filter data based on search term
        const filteredData = selectedDataItem.filter((item) =>
          item.dokumen.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Set the initial table data
        setTableData(filteredData);
        setCurrentPage(1);
      } else {
        console.error("Error fetching data:", result.message);
        // Set default data or show an error message
        setTableData([{ dokumen: "Default Document" }]);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
      // Set default data or show an error message
      setTableData([{ dokumen: "Default Document" }]);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    getById();
  }, []);
  const handleChange = async (event) => {
    const selectedId = event.target.value;
    setSelectedValue(selectedId);

    if (selectedId) {
      fetchData(selectedId, 1, searchTerm);
    } else {
      // Handle the case where no option is selected
      console.log("Pilih Keterangan Terlebih Dahulu!");
      // You can set some state or display a message to the user
      setTableData([]); // Clear table data
    }
  };

  const fetchData = async (selectedId, page, searchTerm) => {
    const response = await fetch(
      `${API_DUMMY}/bawaslu/api/jenis-keterangan/${selectedId}/isi-informasi?page=${page - 1
      }&size=10&sortBy=id&sortOrder=desc`
    );
    const result = await response.json();

    if (result.status === "success") {
      const selectedDataItem = result.data.content;
      setSelectedData(selectedDataItem);
      setPaginationInfo(result.data);

      // Filter data based on search term
      const filteredData = selectedDataItem.filter((item) =>
        item.dokumen.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Set the initial table data
      setTableData(filteredData);
      setCurrentPage(page);
    } else {
      console.error("Error fetching selected data:", result.message);
      setSelectedData(null);
      setTableData([]);
      setPaginationInfo({});
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchData(selectedValue, value, searchTerm);
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
        axios.delete(
          `${API_DUMMY}/bawaslu/api/isi-keterangan-informasi/` + id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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
    AOS.init();
  },[]);

  return (
    <div>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div id="app-main" className="app-main">
          <Sidebar />
          <div id="container" className="container mt-3 app-main__outer"  data-aos="fade-left">
          <div class=" row g-3 align-items-center d-lg-none d-md-none d-flex" >
            <div class="col-auto" style={{paddingLeft:"17px"}}>
              <select
                className="form-select form-select-xl"style={{width:"360px"}}
                onChange={handleChange}
                // value={rowsPerPage}
                // alfy
              >
               <option value="">Pilih Jenis Informasi</option>
                    <option value="1">Putusan Pelanggaran</option>;
                    <option value="2">Sengketa Proses Pemilu</option>;
                    <option value="3">Pemungutan Suara Ulang</option>;
                    <option value="4">Organisasi Dan Adminstrasi</option>;
                    <option value="5">Perselisihan Hasil Pemilu</option>;
                    <option value="6">Sosialisasi</option>;
                    <option value="7">Piagam Penghargaan</option>

              </select>
            </div>
          </div>
            <div id="main-card" className="main-card box-tabel mb-3 card">
              <div className="">
              <div className=" mb-3 d-lg-none d-md-none d-flex">
            <div className="card-header " style={{ display: "block" }}>
              <p className="mt-3">Admin Informasi Serta Merta</p>
              <div className="d-block ml-auto mr-auto">
                <input
                  type="search"
                  className="form-control widget-content-right w-75 d-lg-block d-none d-md-none"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleChange}
                />
                <div className="align-items">
                  <div role="group" className="btn-group-sm btn-group">
                    <button className="active btn-focus p-2 rounded">
                      <a
                        style={{ color: "white", textDecoration: "none" }}
                        href="/add-berita-admin"
                      >
                        Tambah Data
                      </a>
                    </button>
                  </div>
                </div>
              </div>
              </div>
            </div>
                {/* Laptop */}
                <div id="card-header" className="card-header d-lg-flex d-none d-md-flex">
                Admin Serta Merta
                <div className="d-flex ml-auto gap-3">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Small select example"
                    onChange={handleChange}
                  >
                     <option value="">Pilih Jenis Informasi</option>
                    <option value="1">Putusan Pelanggaran</option>;
                    <option value="2">Sengketa Proses Pemilu</option>;
                    <option value="3">Pemungutan Suara Ulang</option>;
                    <option value="4">Organisasi Dan Adminstrasi</option>;
                    <option value="5">Perselisihan Hasil Pemilu</option>;
                    <option value="6">Sosialisasi</option>;
                    <option value="7">Piagam Penghargaan</option>

                  </select>
                  <div className="btn-actions-pane-right">
                    <div
                      id="butoon"
                      role="group"
                      className="btn-group-sm btn-group"
                    >
                      <button
                        id="button"
                        className="active btn-focus p-2 rounded"
                      >
                        <a
                            href="/tambah-informasi-serta-merta"
                            className="text-light"
                            style={{ textDecoration: "none" }}
                          >
                            {" "}
                            Tambah Data
                          </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              </div>
              <TableContainer>
                <div
                  className="table-responsive"
                  style={{ overflowY: "auto", maxHeight: "60vh" }}
                >
                  <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Dokumen</th>
                        <th className="text-center">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((inf, index) => (
                        <tr key={index}>
                          <td data-label="No" className="t">
                            {(currentPage - 1) * 10 + index + 1}
                          </td>
                          <td data-label="Dokumen" className="t">
                            {inf.dokumen}
                          </td>
                          <td data-label="Aksi : " className="pt-3 pb-3 aksi">
                            <div className="d-flex justify-content-center">
                              <button
                                type="button"
                                className=".responsive-buttons btn-primary btn-sm mr-2"
                              >
                                <a
                                  style={{
                                    color: "white",
                                    textDecoration: "none",
                                  }}
                                  href={`/ubah-isi-informasi/${inf.id}`}
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </a>
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteData(inf.id)}
                                className="mr-2 btn-danger btn-sm"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>

                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TableContainer>
              <div className="card-header mt-3 d-flex justify-content-center">
                <Pagination
                  count={paginationInfo.totalPages || 1}
                  page={currentPage}
                  onChange={handlePageChange}
                  showFirstButton
                  showLastButton
                  color="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSertaMerta;
