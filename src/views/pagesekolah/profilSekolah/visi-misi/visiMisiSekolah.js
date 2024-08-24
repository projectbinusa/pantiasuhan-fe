import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_DUMMY } from '../../../../utils/base_URL';
import NavbarSekolah from '../../../../component/NavbarSekolah';
import FooterSekolah from '../../../../component/FooterSekolah';
import NavbarSekolah2 from '../../../../component/NavbarSekolah2';

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
              <li><i class="fas fa-angle-right"></i> visi misi</li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.8' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto 0', padding: '20px' }}>
          <hr style={{ borderColor: '#ccc' }} />
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
