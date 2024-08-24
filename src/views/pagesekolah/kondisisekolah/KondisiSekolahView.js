import React, { useState, useEffect } from 'react';
import FooterSekolah from '../../../component/FooterSekolah';
import NavbarSekolah2 from '../../../component/NavbarSekolah2';
import axios from 'axios';
import { API_DUMMY } from '../../../utils/base_URL';

function KonsidisiSekolahView() {
  const [data, setData] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    axios.get(`${API_DUMMY}/smpn1bergas/api/kondisi_sekolah/all`)
      .then(response => {
        setData(response.data);
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
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.8' }}>
        <div style={{ maxWidth: '1000px', margin: '50px auto 0', padding: '20px' }}>
          <div
            style={{ textAlign: 'center', marginBottom: '40px', position: 'relative', overflow: 'hidden' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={data.foto || "https://lh5.googleusercontent.com/p/AF1QipPiTYMPukmrWn57NP0O_90hGlAwYH1dxd-Tv39r=w2048-h2048-k-no"}
              alt="SMP Negeri 1 Bergas"
              style={mediaStyle}
            />
          </div>
          <hr style={{ marginTop: '60px', borderColor: '#ccc' }} />
          {data.map((item, index) => (
            <p key={index} style={{ fontSize: '1.2em', marginBottom: '20px' }}>
              {item.isi}
            </p>
          ))}
        </div>
      </div>
      <FooterSekolah />
    </div>
  );
}

export default KonsidisiSekolahView;
