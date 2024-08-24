import React, { useState, useEffect } from 'react';
import NavbarSekolah from '../../../../component/NavbarSekolah';
import FooterSekolah from '../../../../component/FooterSekolah';
import { API_DUMMY } from '../../../../utils/base_URL';
import axios from 'axios';
import NavbarSekolah2 from '../../../../component/NavbarSekolah2';

function SejarahSekolah() {
  const [isHovered, setIsHovered] = useState(false);
  const [sejarah, setSejarah] = useState({ judul: '', isi: '' });
  const [error, setError] = useState(null);

  const mediaStyle = {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
  };

  const getAllSejarah = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/sejarah/all?page=0&size=1`);
      const sejarahContent = response.data.data.content[0];
      setSejarah({
        judul: sejarahContent.judul,
        isi: sejarahContent.isi
      });
    } catch (error) {
      setError(error);
      console.log("Error fetching sejarah data:", error);
    }
  };

  useEffect(() => {
    getAllSejarah();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
              src="https://lh5.googleusercontent.com/p/AF1QipPiTYMPukmrWn57NP0O_90hGlAwYH1dxd-Tv39r=w2048-h2048-k-no"
              alt="SMP Negeri 1 Bergas"
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
          <hr style={{ marginTop: '60px', borderColor: '#ccc' }} />
          <h1 style={{ fontWeight: "bold", marginBottom: '30px', fontSize: '2em' }}>{sejarah.judul}</h1>
          <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
            {sejarah.isi}
          </p>
        </div>
      </div>
      <FooterSekolah />
    </div>
  );
}

export default SejarahSekolah;
