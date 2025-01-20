import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Card, CardContent } from "@mui/material";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { useParams } from "react-router-dom";
import { API_DUMMY_BYRTGHN } from "../../../../../utils/base_URL";
import axios from "axios";
import AOS from "aos";

// Function to format date
const formatDate = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

function DetailAnak() {
  const param = useParams();
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY_BYRTGHN}/api/customer/member/${param.id}`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        const resp = response.data.data;
        console.log(resp);
        setDatas(resp);
      } catch (error) {
        console.error("Terjadi Kesalahan", error);
      }
    };

    fetchData();
  }, [param.id]);

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
    <div className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""}`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}
      >
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div style={{ marginTop: "10px" }} className="page-content1 mt-3 mb-3 app-main__outer">
        <div className="container box-tabel">
          <main className="container card shadow">
            <h1 className="title card-header fw-bold fs-3">Detail Anak Asuh</h1>
            <br />
            <div className="card-body">
              <Grid container spacing={3}>
                {/* Image Section */}
                <Grid item xs={12} md={6}>
                  <Box>
                    <img
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "80vh",
                        objectFit: "cover",
                      }}
                      src={datas?.picture}
                      alt="Anak Asuh"
                    />
                  </Box>
                </Grid>

                {/* Details Section */}
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ padding: 2 }}>
                    <CardContent>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: "#005b9f",
                          marginBottom: 2,
                        }}
                      >
                        {datas?.name}
                      </Typography>

                      {/* Stack all fields vertically on small screens */}
                      <Grid container spacing={3}>
                        {/* Tempat/Tanggal Lahir */}
                        <Grid item xs={12}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            Tempat/Tanggal Lahir:
                          </Typography>
                          <Typography variant="body2">
                            {datas?.birth_place}, {(datas?.birth_date)}
                          </Typography>
                        </Grid>

                        {/* RFID Number */}
                        <Grid item xs={12}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            RFID Number:
                          </Typography>
                          <Typography variant="body2">
                            {datas?.rfid_number}
                          </Typography>
                        </Grid>

                        {/* Unique ID */}
                        <Grid item xs={12}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            Unique ID:
                          </Typography>
                          <Typography variant="body2">
                            {datas?.unique_id}
                          </Typography>
                        </Grid>

                        {/* Alamat */}
                        <Grid item xs={12}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            Alamat:
                          </Typography>
                          <Typography variant="body2">{datas?.address}</Typography>
                        </Grid>

                        {/* Email */}
                        <Grid item xs={12}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            Email:
                          </Typography>
                          <Typography variant="body2">{datas?.email}</Typography>
                        </Grid>

                        {/* Education */}
                        <Grid item xs={12}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            Pendidikan:
                          </Typography>
                          <Typography variant="body2">{datas?.education}</Typography>
                        </Grid>

                        {/* Parent Name */}
                        <Grid item xs={12}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            Nama Orang Tua Kandung:
                          </Typography>
                          <Typography variant="body2">{datas?.parent_name}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DetailAnak;
