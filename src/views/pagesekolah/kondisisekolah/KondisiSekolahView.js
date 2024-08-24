import React, { useState } from 'react';
import FooterSekolah from '../../../component/FooterSekolah';
import NavbarSekolah from '../../../component/NavbarSekolah';

function KonsidisiSekolahView() {
  return (
    <div>
      <NavbarSekolah />
      <div style={{ position: "relative", height: "100vh", overflow: "hidden", marginBottom: "3rem" }}>
        <img src="https://lh5.googleusercontent.com/p/AF1QipPiTYMPukmrWn57NP0O_90hGlAwYH1dxd-Tv39r=w2048-h2048-k-no" className="image-style" alt="banner" />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <div className="text-overlay-style">
          <p style={{ color: "white" }}>SMP NEGERI 1 BERGAS</p>
          <div className="header-prestasi">
            <ul>
              <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
              <li><i class="fas fa-angle-right"></i> Kondisi Sekolah</li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.8' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto 0', padding: '20px' }}>
          <hr style={{ borderColor: '#ccc' }} />
          <h1 style={{ fontWeight: "bold", marginBottom: '30px', fontSize: '2em' }}>Kondisi Sekolah</h1>
          <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
            <strong>SMP Negeri 1 Bergas</strong> didirikan pada tahun 1985 di Kabupaten Semarang, Jawa Tengah.
            Sejak awal berdirinya, sekolah ini memiliki tujuan mulia untuk menyediakan pendidikan berkualitas
            bagi masyarakat setempat. Dengan komitmen yang kuat terhadap keunggulan akademik dan pengembangan
            karakter siswa, SMP Negeri 1 Bergas telah menjadi salah satu sekolah menengah pertama terkemuka di wilayahnya.
          </p>
          <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
            Pada tahun 1990, SMP Negeri 1 Bergas mulai memperluas fasilitasnya dengan membangun gedung baru yang
            dilengkapi dengan laboratorium sains, perpustakaan, dan ruang multimedia. Hal ini memungkinkan sekolah
            untuk menawarkan kurikulum yang lebih komprehensif dan memberikan pengalaman belajar yang lebih interaktif
            bagi para siswa.
          </p>
          <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
            Tahun 2000 menjadi tonggak sejarah penting bagi SMP Negeri 1 Bergas dengan diresmikannya program
            pendidikan berbasis teknologi. Dengan adanya fasilitas komputer dan koneksi internet, siswa dapat
            mengakses informasi global dan mempersiapkan diri untuk tantangan dunia modern.
          </p>
          <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
            Hingga saat ini, SMP Negeri 1 Bergas terus berkembang dengan mengedepankan inovasi dalam metode pengajaran
            dan pembinaan karakter. Sekolah ini tidak hanya berfokus pada pencapaian akademik, tetapi juga pada
            pengembangan nilai-nilai moral dan sosial, sehingga lulusan SMP Negeri 1 Bergas diharapkan menjadi individu
            yang berintegritas dan siap berkontribusi bagi masyarakat.
          </p>
        </div>
      </div>
      <FooterSekolah />
    </div>
  );
}

export default KonsidisiSekolahView;
