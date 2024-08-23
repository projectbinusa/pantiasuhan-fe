import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_DUMMY } from '../../../../utils/base_URL';
import NavbarSekolah from '../../../../component/NavbarSekolah';
import FooterSekolah from '../../../../component/FooterSekolah';

function VisiMisiSekolah() {
  const [visiMisiData, setVisiMisiData] = useState({
    visi: '',
    misi: [],
    tujuan: []
  });
  const [isHovered, setIsHovered] = useState(false);

  const mediaStyle = {
    width: "100%",
    height: "400px",
    transition: "transform 0.3s ease-in-out",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
  };

  useEffect(() => {
    const fetchVisiMisiData = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/visiMisi/all`);
        const data = response.data.data || {}; // Ensure data is not undefined
        setVisiMisiData({
          visi: data.visi || '', // Default to empty string
          misi: data.misi || [], // Default to empty array
          tujuan: data.tujuan || [] // Default to empty array
        });
      } catch (error) {
        console.log("Error fetching visi misi data:", error);
      }
    };

    fetchVisiMisiData();
  }, []);

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

          {visiMisiData.visi && (
            <>
              <h2 style={{ fontSize: '2em', marginBottom: '20px', fontWeight: 'bold', textAlign: "center" }}>
                Visi Sekolah
              </h2>
              <p style={{ fontSize: '1.2em', marginBottom: '20px', textAlign: "center" }}>
                {visiMisiData.visi}
              </p>
            </>
          )}

          {visiMisiData.misi.length > 0 && (
            <>
              <h2 style={{ fontSize: '2em', marginBottom: '20px', fontWeight: 'bold', textAlign: "center" }}>
                Misi Sekolah
              </h2>
              <ol style={{ fontSize: '1.2em', marginBottom: '20px' }}>
                {visiMisiData.misi.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </>
          )}

          {visiMisiData.tujuan.length > 0 && (
            <>
              <h2 style={{ fontSize: '2em', marginBottom: '20px', fontWeight: 'bold', textAlign: "center" }}>
                Tujuan Sekolah
              </h2>
              <ol style={{ fontSize: '1.2em', marginBottom: '20px' }}>
                {visiMisiData.tujuan.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </>
          )}
        </div>
      </div>
      <FooterSekolah />
    </div>
  );
}

export default VisiMisiSekolah;
