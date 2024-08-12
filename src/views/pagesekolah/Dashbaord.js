import React from 'react';
import Navbar from '../../component/NavbarSekolah';
import Footer from '../../component/Footer';
import SingleCardMenu from './SingleCardMenu'; // Adjust the import path as necessary
import Card from './Card'; // Import the custom Card component
import { Grid } from '@mui/material';

const contentStyle = {
  paddingTop: '50px',
  marginTop: '50px', // Ensure content is below the navbar
};

const sectionStyle = {
  marginBottom: '40px',
};

function Dashboard() {
  return (
    <div>
      <Navbar />
      <div style={contentStyle}>
        <Grid spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            <SingleCardMenu />
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            <section id="pengumuman" style={sectionStyle}>
              <h1>Pengumuman</h1>
              <Card
                title="Pengumuman 1"
                content="Detail tentang Pengumuman 1."
              />
              <Card
                title="Pengumuman 2"
                content="Detail tentang Pengumuman 2."
              />
            </section>
            <section id="berita-terbaru" style={sectionStyle}>
              <h1>Berita Terbaru</h1>
              <Card
                title="Berita Terbaru 1"
                content="Detail tentang Berita Terbaru 1."
              />
              <Card
                title="Berita Terbaru 2"
                content="Detail tentang Berita Terbaru 2."
              />
            </section>
            <section id="ekstra-kulikuler" style={sectionStyle}>
              <h1>Ekstra Kulikuler</h1>
              <Card
                title="Ekstra Kulikuler 1"
                content="Detail tentang Ekstra Kulikuler 1."
              />
              <Card
                title="Ekstra Kulikuler 2"
                content="Detail tentang Ekstra Kulikuler 2."
              />
            </section>
            <section id="prestasi" style={sectionStyle}>
              <h1>Prestasi</h1>
              <Card
                title="Prestasi 1"
                content="Detail tentang Prestasi 1."
              />
              <Card
                title="Prestasi 2"
                content="Detail tentang Prestasi 2."
              />
            </section>
            <section id="guru-dan-tenaga-kependidikan" style={sectionStyle}>
              <h1>Guru dan Tenaga Kependidikan</h1>
              <Card
                title="Guru 1"
                content="Detail tentang Guru 1."
              />
              <Card
                title="Tenaga Kependidikan 1"
                content="Detail tentang Tenaga Kependidikan 1."
              />
            </section>
            <section id="alumni" style={sectionStyle}>
              <h1>Alumni</h1>
              <Card
                title="Alumni 1"
                content="Detail tentang Alumni 1."
              />
              <Card
                title="Alumni 2"
                content="Detail tentang Alumni 2."
              />
            </section>
            <section id="hubungi-kami" style={sectionStyle}>
              <h1>Hubungi Kami</h1>
              <p><strong>Email:</strong> info@example.com</p>
              <p><strong>Alamat:</strong> Jl. Contoh No. 123, Kota Contoh, Indonesia</p>
              <p><strong>Telepon:</strong> +62 123 456 789</p>
            </section>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
