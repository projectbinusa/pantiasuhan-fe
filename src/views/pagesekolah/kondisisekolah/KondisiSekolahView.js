import React, { useState } from 'react';
import NavbarSekolah from '../../../component/NavbarSekolah';
import FooterSekolah from '../../../component/FooterSekolah';

function KonsidisiSekolahView() {
  const [isHovered, setIsHovered] = useState(false);

  const mediaStyle = {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    borderRadius: '10px',
  };

  return (
    <div>
      <NavbarSekolah />
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.8' }}>
        <div style={{ maxWidth: '1000px', margin: '50px auto 0', padding: '20px' }}>
          <div
            style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src="https://lh5.googleusercontent.com/p/AF1QipPiTYMPukmrWn57NP0O_90hGlAwYH1dxd-Tv39r=w2048-h2048-k-no"
              alt="SMP Negeri 1 Bergas"
              style={mediaStyle}
            />
          </div>
          <hr style={{ marginTop: '60px', borderColor: '#ccc' }} />
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
