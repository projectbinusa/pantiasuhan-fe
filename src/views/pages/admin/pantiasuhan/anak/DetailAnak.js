import React, { useEffect, useState } from "react";
import { Box, Grid, Modal, Pagination } from "@mui/material";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { API_DUMMY } from "../../../../../utils/base_URL";
import axios from "axios";
import AOS from "aos";

const formatDate = (value) => {
  const date = new Date(value);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
}

function DetailAnak() {
  const param = useParams();
  const [datas, setDatas] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/admin/siswa/${param.id}`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        const resp = response.data.data;
        console.log(resp);
        setDatas(resp)
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
            <h1 className="title card-header fw-bold fs-3">Detail Anak Asuh</h1>
            <br />
            <div className="card-body">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <img
                    style={{ width: "100%" , maxHeight: "80vh"}}
                    src={datas?.picture}
                    alt=""
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#005b9f",
                    }}>
                    {datas?.name}
                  </h2>
                  <h2
                    style={{
                      fontSize: "1rem",
                      fontWeight: "700",
                    }}>
                    TTL :
                  </h2>
                  <p>{datas?.birth_place}, {formatDate(datas?.birth_date)}</p>
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
  )
}

export default DetailAnak;