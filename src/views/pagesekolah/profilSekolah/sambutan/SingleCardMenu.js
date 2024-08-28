import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Link } from "@mui/material";
import kepsek from "../../../../aset/smpn1bergas/kepsek.jpg";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import "../../../../css/sambutan/sambutan.css"

const SingleCardMenu = () => {
  const [pengumuman, setPengumuman] = useState([]);
  const [sambutan, setSambutan] = useState([]);

  // GET ALL PENGUMUMAN
  const getAll = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/berita/by-category?category=Info%20Sekolah&order=asc&page=0&size=5&sort=created_date`);
      setPengumuman(response.data.data.content);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  // GET ALL SAMBUTAN
  const getAllSambutan = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/sambutan/all?page=0&size=1`);
      setSambutan(response.data.data.content);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllSambutan();
  }, []);

  return (
    <Grid container direction="row">
      <Grid item xs={12} sm={12} md={6} data-aos="fade-right"
        data-aos-anchor-placement="bottom-bottom">
        <Card>
          <CardContent style={{ padding: "0" }}>
            <div
              style={{
                backgroundColor: "#0d47a1",
                color: "white",
                padding: "16px",
                borderRadius: "8px 8px 0 0",
                marginBottom: "16px",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                style={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif" }}
              >
                Pengumuman
              </Typography>
            </div>
            <CardContent style={{ padding: "16px" }}>
              {pengumuman.length > 0 ? (
                pengumuman.map((info, idx) => (
                  <div key={idx}>
                    <a href={'/detail-info-' + info.id} style={{ color: "#002147", textDecoration: "none" }}>
                      <Typography
                        variant="h6"
                        style={{
                          marginBottom: "8px",
                          fontWeight: "600",
                          fontSize: "1rem",
                          fontFamily: "'Poppins', sans-serif",
                          textTransform: "uppercase"
                        }}
                        className="content-pengumuman"
                      >
                        {info.judulBerita}
                      </Typography>
                    </a>
                    {idx < pengumuman.length - 1 && (
                      <hr
                        style={{
                          border: "none",
                          borderBottom: "1px solid #000000",
                          margin: "16px 0",
                        }}
                      />
                    )}
                  </div>
                ))
              ) : (<></>)}
            </CardContent>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6} data-aos="fade-left"
        data-aos-anchor-placement="bottom-bottom">
        <div className="berita-style">
          {sambutan.length > 0 ? (
            sambutan.map((sambutann) => (
              <img
                src={sambutann.foto}
                alt="Kepala Sekolah"
                style={{
                  width: "40%",
                  height: "auto",
                  borderRadius: "8px",
                  display: "block",
                  margin: "0 auto 16px",
                }} />
            ))) : (
            <img
              src={kepsek}
              alt="Kepala Sekolah"
              style={{
                width: "40%",
                height: "auto",
                borderRadius: "8px",
                display: "block",
                margin: "0 auto 16px",
              }}
            />)}
          < div style={{ padding: "16px" }}>
            {sambutan.length > 0 ? (
              sambutan.map((sambutann) => (
                <>
                <Typography variant="h6" component="div" style={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif" }}>
                  {sambutann.judul}
                </Typography>
                  <Typography variant="body2" color="textSecondary" style={{ fontFamily: "'Poppins', sans-serif" }} className="content-sambutan">
                    {sambutann.isi}
                  </Typography>
                  <Link href="/sambutan" style={{ fontSize: "14px" }}>Baca selengkapnya</Link>
                </>
              ))
            ) : (<></>)}
          </div>
        </div>
      </Grid>
    </Grid >
  );
};

export default SingleCardMenu;
