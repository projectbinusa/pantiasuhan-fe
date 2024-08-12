import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const SingleCardMenu = () => {
  const handleScrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  const menuItems = [
    { id: 'pengumuman', title: 'Pengumuman' },
    { id: 'berita-terbaru', title: 'Berita Terbaru' },
    { id: 'ekstra-kulikuler', title: 'Ekstra Kulikuler' },
    { id: 'prestasi', title: 'Prestasi' },
    { id: 'guru-dan-tenaga-kependidikan', title: 'Guru dan Tenaga Kependidikan' },
    { id: 'alumni', title: 'Alumni' },
    { id: 'hubungi-kami', title: 'Hubungi Kami' },
  ];

  return (
    <Grid container spacing={3} style={{ padding: '0 16px' }} direction="row">
      <Grid item xs={12} sm={6} md={4}>
        <Card style={{ maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Menu
            </Typography>
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant="outlined"
                color="primary"
                onClick={() => handleScrollToSection(item.id)}
                style={{ display: 'block', marginTop: 10 }}
              >
                {item.title}
              </Button>
            ))}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Card style={{ maxWidth: 600, display: 'flex', flexDirection: 'column' }}>
          <img
            src="path-to-your-image.jpg" // Replace with the path to your image
            alt="Kepala Sekolah"
            style={{ width: '100%', height: 'auto', borderRadius: '8px 8px 0 0' }}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Kata Sambutan dari Kepala Sekolah
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Selamat datang di sekolah kami! Kami sangat senang Anda bergabung dengan kami dan berharap Anda mendapatkan pengalaman belajar yang bermanfaat dan menyenangkan.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 16 }}
              href="/kata-sambutan" // Replace with the link to the detailed page
            >
              Lihat Selengkapnya
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SingleCardMenu;
