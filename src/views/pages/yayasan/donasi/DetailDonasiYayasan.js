import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import AOS from "aos";
import { Grid, Pagination } from "@mui/material";
import Swal from "sweetalert2";
import { API_DUMMY_SMART } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function DetailDonasiYayasan() {
  const [datas, setDatas] = useState(null);
  const [incomeTrx, setIncomeTrx] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const [outcomeTrx, setOutcomeTrx] = useState([]);
  const [currentPageOutcome, setCurrentPageOutcome] = useState(1);
  const [rowsPerPageOutcome, setRowsPerPageOutcome] = useState(5);
  const [paginationInfoOutcome, setPaginationInfoOutcome] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTermOutcome, setSearchTermOutcome] = useState("");

  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY_SMART}/api/user/donation/${param.id}`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        const resp = response.data.data;
        setDatas(resp);
      } catch (error) {
        console.error("Terjadi Kesalahan", error);
      }
    };

    fetchData();
  }, []);

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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

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

  const filteredList = incomeTrx.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  useEffect(() => {
    if (currentPageOutcome > paginationInfoOutcome.totalPages) {
      setCurrentPageOutcome(paginationInfoOutcome.totalPages || 1);
    }
  }, [paginationInfoOutcome.totalPages, currentPageOutcome]);

  const handleRowsPerPageChangeOutcome = (event) => {
    setRowsPerPageOutcome(parseInt(event.target.value, 10));
    setCurrentPageOutcome(1);
  };

  const handleSearchChangeOutcome = (event) => {
    setSearchTermOutcome(event.target.value);
    setCurrentPageOutcome(1);
  };

  const filteredListOutcome = outcomeTrx.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
        }`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}>
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div
        style={{ marginTop: "10px" }}
        className="page-content1 mt-3 mb-3 app-main__outer">
        <div className="container box-tabel">
          <main className="container card shadow">
            <h1 className="title card-header fw-bold fs-3">Detail Donasi</h1>
            <br />
            <div className="card-body">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <img
                    style={{ width: "100%" }}
                    src={datas?.url_image}
                    alt=""
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* <h2
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                    }}>
                    Nama:
                  </h2> */}
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#005b9f",
                    }}>
                    {datas?.name}
                  </h2>{" "}
                  <h2
                    style={{
                      fontSize: "1rem",
                      fontWeight: "700",
                    }}>
                    Deskripsi:
                  </h2>
                  {/* <br /> */}
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "#666",
                      marginBottom: "15px",
                    }}
                    dangerouslySetInnerHTML={{ __html: datas?.description }}
                  />
                  <h2
                    style={{
                      fontSize: "1rem",
                      fontWeight: "700",
                    }}>
                    Total Hasil:
                  </h2>
                  <p>{datas?.total_income}</p>
                  <h2
                    style={{
                      fontSize: "1rem",
                      fontWeight: "700",
                    }}>
                    Total Pendapatan:
                  </h2>
                  <p>{datas?.total_outcome}</p>
                </Grid>
              </Grid>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DetailDonasiYayasan;
