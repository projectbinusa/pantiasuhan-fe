import React, { useState, useEffect } from 'react';
import FooterSekolah from '../../../../component/FooterSekolah';
import axios from 'axios';
import { API_DUMMY } from '../../../../utils/base_URL';
import NavbarSekolah2 from '../../../../component/NavbarSekolah2';
import NavbarSekolah from '../../../../component/NavbarSekolah';

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
      <NavbarSekolah2 />
      <main className="container-berita">
        <div className="header-berita">
          <ul>
            <li>
              <a href="/">
                <i class="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <i class="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>Kondisi Sekolah</span>
            </li>
          </ul>
        </div>
        <div style={{ lineHeight: '1.8' }}>
          <div className="container">
            {foto !== "" ? (<img src={foto} style={mediaStyle} className='image-style'/>) : (<></>)}
            <hr style={{ marginTop: '20px', borderColor: '#ccc' }} />
            <p style={{ fontSize: '1.2em', textAlign: "left" }}>
              {isi}
            </p>
          </div>
        </div>
      </main>
      <FooterSekolah />
    </div>
  );
}

export default KonsidisiSekolahView;
