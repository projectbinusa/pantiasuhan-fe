import React, { useState, useEffect } from 'react';
import FooterSekolah from '../../../component/FooterSekolah';
import axios from 'axios';
import { API_DUMMY } from '../../../utils/base_URL';
import NavbarSekolah from '../../../component/NavbarSekolah';

function KonsidisiSekolahView() {
  const [foto, setFoto] = useState("");
  const [isi, setIsi] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    axios.get(`${API_DUMMY}/smpn1bergas/api/kondisi_sekolah/all?page=0&size=1`)
      .then(response => {
        setFoto(response.data.data.content[0].foto);
        setIsi(response.data.data.content[0].deskripsi);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
      <div style={{ lineHeight: '1.8' }}>
        <div className="container">
          <hr style={{ marginTop: '50px', borderColor: '#ccc' }} />
          {foto !== "" ? (<img src={foto} className='image-style'/>) : (<></>)}
          <p style={{ fontSize: '1.2em', margin: '3rem 0', textAlign: "left" }}>
            {isi}
          </p>
        </div>
      </div>
      <FooterSekolah />
    </div>
  );
}

export default KonsidisiSekolahView;
