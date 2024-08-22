import React, { useState } from 'react';
import NavbarSekolah from '../../../../component/NavbarSekolah';
import FooterSekolah from '../../../../component/FooterSekolah';

function VisiMisiSekolah() {
  const [isHovered, setIsHovered] = useState(false);

  const mediaStyle = {
    width: "100%",
    height: "400px",
    transition: "transform 0.3s ease-in-out",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
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
              alt="Visi dan Misi SMP Negeri 1 Bergas"
              style={mediaStyle}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.4)"
              }}
            />
          </div>
          <hr style={{ marginTop: '60px 0', borderColor: '#ccc' }} />

          <h2 style={{ fontSize: '2em', marginBottom: '20px', fontWeight: 'bold', textAlign: "center" }}>
            Visi & Sekolah
          </h2>
          <p style={{ fontSize: '1.2em', marginBottom: '20px', textAlign: "center" }}>
            “UNGGUL DALAM PRESTASI, SANTUN DALAM BERBUDI PEKERTI“
          </p>

          <h2 style={{ fontSize: '2em', marginBottom: '20px', fontWeight: 'bold', textAlign: "center" }}>
            Misi Sekolah
          </h2>
          <ol style={{ fontSize: '1.2em', marginBottom: '20px' }}>
            <li>Melaksanakan kegiatan-kegiatan secara efektif guna mencapai peningkatan/pengembangan isi (kurikulum).</li>
            <li>Melaksanakan pelatihan dan kegiatan yang bertujuan untuk menunjang peningkatan kinerja guru dan karyawan.</li>
            <li>Mengadakan pelatihan dan bimbingan agar proses pembelajaran berkualitas.</li>
            <li>Mengupayakan pengadaan, pemanfataan, dan pemeliharaan fasilitas pendidikan secara optimal.</li>
            <li>Mengupayakan kegiatan yang berhubungan dengan kompetisi kelulusan siswa.</li>
            <li>Melaksanakan manajemen berbasis sekolah secara efektif.</li>
            <li>Mengupayakan pengembangan pembiayaan pendidikan untuk mendukung kegiatan sekolah.</li>
            <li>Melaksanakan penelitian secara menyeluruh dan berkesinambungan.</li>
          </ol>

          <h2 style={{ fontSize: '2em', marginBottom: '20px', fontWeight: 'bold', textAlign: "center" }}>
            Tujuan Sekolah
          </h2>
          <ol style={{ fontSize: '1.2em', marginBottom: '20px' }}>
            <li>Meningkatkan/mengembangkan kurikulum.</li>
            <li>Meningkatkan/mengembangkan tenaga pendidik.</li>
            <li>Meningkatkan/mengembangkan proses.</li>
            <li>Meningkatkan/mengembangkan fasilitas pendidikan.</li>
            <li>Meningkatkan/mengembangkan kelulusan.</li>
            <li>Meningkatkan/mengembangkan manajemen dan kelembagaan.</li>
            <li>Meningkatkan/mengembangkan pembiayaan.</li>
            <li>Meningkatkan/mengembangkan penilaian.</li>
          </ol>
        </div>
      </div>
      <FooterSekolah />
    </div>
  );
}

export default VisiMisiSekolah;
