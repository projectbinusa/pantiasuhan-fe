import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Swal from "sweetalert2";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";
import { Pagination, TableContainer } from "@mui/material";
import AOS from "aos";

function AdminSop() {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState([]);
  const [default1, setDefault] = useState("SOP");

  const { id } = useParams();

  const getByDaftarSop = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/tabel-sop/all-terbaru?daftarSop=${default1}&page=0&size=100&sortBy=created_date&sortOrder=desc`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = response.data;

      if (result.status === "success") {
        const selectedDataItem = result.data.content;
        setSelectedData(selectedDataItem);
        setPaginationInfo(result.data);

        const filteredData = selectedDataItem.filter((item) =>
          String(item.namaDokumen)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );

        setTableData(filteredData);
        setCurrentPage(1);
      } else {
        console.error("Error fetching data:", result.message);
        setTableData([{ namaDokumen: "Default Document" }]);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
      setTableData([{ namaDokumen: "Default Document" }]);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    getByDaftarSop();
  }, []);

  const handleChange = async (event) => {
    const selectedId = event.target.value;
    setSelectedValue(selectedId);

    if (selectedId) {
      fetchData(selectedId, 1, searchTerm);
    } else {
      console.log("Pilih Daftar SOP Terlebih Dahulu!");
      setTableData([]);
    }
  };

  const fetchData = async (selected, page, searchTerm) => {
    const response = await fetch(
      `${API_DUMMY}/bawaslu/api/tabel-sop/all-terbaru?daftarSop=${selected}&page=${
        page - 1
      }&size=10&sortBy=created_date&sortOrder=desc`
    );
    const result = await response.json();

    if (result.status === "success") {
      const selectedDataItem = result.data.content;
      setSelectedData(selectedDataItem);
      setPaginationInfo(result.data);

      const filteredData = selectedDataItem.filter((item) =>
        item.dokumen.toLowerCase().includes(searchTerm.toLowerCase())
      );

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
      title: "Anda Ingin Menghapus Data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API_DUMMY}/bawaslu/api/tabel-sop/delete/` + id, {
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
      }, 500);
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
          <div id="container" className="container mt-3 app-main__outer"  data-aos="fade-lef">
          <div clasName="row g-3 align-items-center">
            <div class="col-auto" style={{paddingLeft:"10px"}}>
              <select
                className="form-select form-select-xl d-lg-none d-md-none d-flex"  style={{width:"360px"}}
                onChange={handleChange}
              >
               <option disabled>Pilih Jenis Informasi</option>
                    <option value="SOP">SOP</option>;
              </select>
            </div>
          </div>
            <div id="main-card" className="main-card mb-3 card box-tabel">
            <div className=" mb-3 d-lg-none d-md-none d-flex">
            <div className="card-header " style={{ display: "block" }}>
              <p className="mt-3">Admin Informasi SOP</p>
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
                      {/* a */}
                    </button>
                  </div>
                </div>
              </div>
              </div>
            </div>
              <div id="card-header" className="card-header d-lg-flex d-none d-md-flex">
                Admin Informasi SOP
                <div className="d-flex ml-auto gap-3">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Small select example"
                    onChange={handleChange}
                  >
                    <option disabled>Pilih Jenis Informasi</option>
                    <option value="SOP">SOP</option>;
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
                          href="/add-sop-admin"
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
              <TableContainer>
                <div
                  className="table-responsive"
                  style={{ overflowY: "auto", maxHeight: "60vh" }}
                >
                  <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                    <thead>
                      <tr>
                        <th className="text-center">
                          No
                        </th>
                        <th scope="col">
                          Dokumen
                        </th>
                        <th className="text-center">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((sop, index) => (
                        <tr key={index}>
                          <td data-label="No" className="text-center">
                            {(currentPage - 1) * 10 + index + 1}
                          </td>
                          <td data-label="Dokumen">{sop.namaDokumen}</td>
                          <td data-label="Aksi : " className="pt-3 pb-3 aksi">
                            <div className="d-flex justify-content-center">
                              <a
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                                href={`/put-admin/sop/${sop.id}`}
                              >
                                <button
                                  type="button"
                                  className="btn-sm btn-primary mr-2"
                                >
                                  <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                              </a>
                              <button
                                type="button"
                                onClick={() => deleteData(sop.id)}
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

export default AdminSop;
