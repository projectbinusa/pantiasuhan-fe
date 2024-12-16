import React, { useEffect, useState } from "react";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import AOS from "aos";
import { API_DUMMY_PYTHON } from "../../../../../utils/base_URL";
import { Pagination } from "@mui/material";

function DetailDonasi() {
  const [datas, setDatas] = useState(null);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const param = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.byrtagihan.com/api/customer/donation/${param.id}`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        const resp = response.data.data;
        setDatas(resp)
        console.log(resp);
      } catch (error) {
        console.error("Terjadi Kesalahan", error);
      }
    };

    fetchData();
  }, []);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY_PYTHON}/api/admin/donation-rtx?page=${currentPage}&limit=${rowsPerPage}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      // Pastikan struktur response sesuai
      const { data, pagination } = response.data;
      console.log(response);


      // Set data dan pagination
      setList(data);
      setPaginationInfo({
        totalPages: pagination.total_page || 1,
        totalElements: pagination.total || 0,
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error.response || error.message);
    }
  };

  const [sidebarToggled, setSidebarToggled] = useState(true);

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  const handleResize = () => {
    if (window.innerWidth < 800) {
      setSidebarToggled(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    getAll(currentPage);
  }, [currentPage, rowsPerPage]);

  useEffect(() => {
    if (currentPage > paginationInfo.totalPages) {
      setCurrentPage(paginationInfo.totalPages || 1);
    }
  }, [paginationInfo.totalPages, currentPage]);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredList = searchTerm
    ? list.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    : list;

  return (
    <div className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
      }`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}>
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div style={{ marginTop: "10px" }} className="page-content1 mt-3 mb-3 app-main__outer">
        <div className="container box-tabel">
          <main className="card shadow">
            <h1 className="title card-header fw-bold fs-3">Detail Donasi</h1>
            <br />
            <div className="card-body">
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#005b9f", // Biru lebih gelap
                }}
              >
                {datas?.name}
              </h2> <br />
              <div
                style={{
                  fontSize: "1rem",
                  color: "#666",
                  marginBottom: "15px",
                }}
                dangerouslySetInnerHTML={{ __html: datas?.description }}
              />
            </div>
          </main>
          <div className="container box-table mt-3 app-main__outer" data-aos="fade-left">
            <div className="ml-2 row g-3 align-items-center d-lg-none d-md-flex rows-rspnv">
              <div className="col-auto">
                <label className="form-label mt-2">Rows per page:</label>
              </div>
              <div className="col-auto">
                <select
                  className="form-select form-select-xl w-auto"
                onChange={handleRowsPerPageChange}
                value={rowsPerPage}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
            <div className="search">
              <input
                type="search"
                className="form-control widget-content-right w-100 mt-2 mb-2 d-lg-none d-md-block"
                placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              />
            </div>
            <div className="main-card box-tabel mb-3 card">
              <div className="card-header" style={{ display: "flex" }}>
                <p className="mt-3">Donasi</p>
                <div className="ml-2 row g-3 align-items-center d-lg-flex d-none d-md-none">
                  <div className="col-auto">
                    <label className="form-label mt-2">Rows per page:</label>
                  </div>
                  <div className="col-auto">
                    <select
                      className="form-select form-select-sm"
                    onChange={handleRowsPerPageChange}
                    value={rowsPerPage}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex ml-auto gap-3">
                  <input
                      type="search"
                      className="form-control widget-content-right w-75 d-lg-block d-none d-md-none"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                </div>
              </div>
              <div
                className="table-responsive-3"
                style={{ overflowX: "auto", maxWidth: "100%" }}
              >
                <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th>Tanggal</th>
                      <th>Nama</th>
                      <th>No Handphone</th>
                      <th>Alamat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList.map((item, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                        <td>{item.name}</td>
                        <td><div dangerouslySetInnerHTML={{ __html: item.description }} /></td>
                        <td>{item.total_income}</td>
                        <td>{item.total_outcome}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-header mt-3 d-flex justify-content-center">
                  <Pagination
                    count={paginationInfo.totalPages}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
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

export default DetailDonasi