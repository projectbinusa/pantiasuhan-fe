import React from "react";
import { Card, CardContent, Typography, Grid, Link } from "@mui/material";

const announcements = [
  {
    id: 1,
    title: "Pengumuman 1",
    link: "/pengumuman1",
    text: "Ini pengumuman pertama",
  },
  {
    id: 2,
    title: "Pengumuman 2",
    link: "/pengumuman2",
    text: "Ini pengumuman kedua",
  },
  {
    id: 3,
    title: "Pengumuman 3",
    link: "/pengumuman3",
    text: "Ini pengumuman ketiga",
  },
  {
    id: 4,
    title: "Pengumuman 4",
    link: "/pengumuman4",
    text: "Ini pengumuman keempat",
  },
  {
    id: 5,
    title: "Pengumuman 5",
    link: "/pengumuman5",
    text: "Ini pengumuman kelima",
  },
];

const SingleCardMenu = () => {
  return (
    <Grid container spacing={3} style={{ padding: "0 16px" }} direction="row">
      <Grid item xs={12} sm={6} md={6}>
        <Card style={{ maxWidth: 600 }}>
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
                style={{ fontWeight: "bold" }}
              >
                Pengumuman
              </Typography>
            </div>
            <CardContent style={{ padding: "16px" }}>
              {announcements.map((announcement, index) => (
                <div key={announcement.id}>
                  <Link
                    href={announcement.link}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        marginBottom: "8px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      {announcement.text}
                    </Typography>
                  </Link>
                  {index < announcements.length - 1 && (
                    <hr
                      style={{
                        border: "none",
                        borderBottom: "1px solid #000000",
                        margin: "16px 0",
                      }}
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <div style={{ maxWidth: 600, padding: "16px", borderRadius: "8px" }}>
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png"
            alt="Kepala Sekolah"
            style={{
              width: "40%",
              height: "auto",
              borderRadius: "8px",
              display: "block",
              margin: "0 auto 16px",
            }}
          />
          <div style={{ padding: "16px" }}>
            <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
              Sambutan Kepala Sekolah
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Assalamu'alaikum Warahmatullahi Wabarakatuh,
              Puji syukur kita panjatkan kehadirat Allah SWT yang telah memberikan rahmat dan karunia-Nya sehingga kita dapat melaksanakan tugas dan aktivitas kita sehari-hari dengan baik.
              <Link href="/sambutan"> ...Baca selengkapnya</Link>
            </Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default SingleCardMenu;
