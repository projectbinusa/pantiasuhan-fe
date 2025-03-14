import React, { useEffect, useState } from "react";
import { Grid, Typography, Card, CardContent } from "@mui/material";
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
};

function DetailOrtu() {
  const param = useParams();
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/api/admin/foster_parent/${param.id}`,
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
    <div
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
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
            <h1 className="title card-header fw-bold fs-3">
              Detail Orang Tua Asuh
            </h1>
            <br />
            <div className="card-body">
              <Grid container spacing={3}>
                {/* Details Section */}
                <Grid item xs={12} md={12}>
                  <Card variant="outlined" sx={{ padding: 2 }}>
                    <CardContent>
                      {/* <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: "#005b9f",
                          marginBottom: 2,
                        }}
                      >
                        {datas?.father_name}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: "#005b9f",
                          marginBottom: 2,
                        }}
                      >
                        {datas?.mother_name}
                      </Typography> */}

                      {/* Side-by-side details */}
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            Nama:
                          </Typography>
                          <Typography variant="body2">{datas?.name}</Typography>
                        </Grid>
                        {/* Birth Place and Date */}
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            Tempat/Tanggal Lahir:
                          </Typography>
                          <Typography variant="body2">
                            {datas?.birth_place_parents},{" "}
                            {formatDate(datas?.birth_date_parents)}
                          </Typography>
                        </Grid>
                        {/* Income */}
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            Pekerjaan :
                          </Typography>
                          <Typography variant="body2">{datas?.work}</Typography>
                        </Grid>

                        {/* Total Income */}
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            Pendapatan :
                          </Typography>
                          <Typography variant="body2">
                            Rp {datas?.income_parents}
                          </Typography>
                        </Grid>

                        {/* Address */}
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            Alamat:
                          </Typography>
                          <Typography variant="body2">
                            {datas?.address}
                          </Typography>
                        </Grid>

                        {/* Phone Ayah */}
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            No. Telepon:
                          </Typography>
                          <Typography variant="body2">
                            {datas?.phone_parents}
                          </Typography>
                        </Grid>
                      </Grid>

                      {/* Child's Name */}
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 700, marginTop: 2 }}>
                        Nama Anak:
                      </Typography>
                      <ul>
                        {datas?.nama_anak.map((data, index) => (
                          <li>{data}</li>
                        ))}
                      </ul>
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

export default DetailOrtu;
