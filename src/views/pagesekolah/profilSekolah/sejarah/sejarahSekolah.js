import React, { useState, useEffect } from 'react';
import NavbarSekolah from '../../../../component/NavbarSekolah';
import FooterSekolah from '../../../../component/FooterSekolah';
import { API_DUMMY } from '../../../../utils/base_URL';
import axios from 'axios';

function SejarahSekolah() {
  const [sejarah, setSejarah] = useState({ judul: '', isi: '' });
  const [error, setError] = useState(null);

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
              <li><i class="fas fa-angle-right"></i> Sejarah Sekolah</li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ padding: '20px', lineHeight: '1.8' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto 0', padding: '20px' }}>
          <hr style={{ borderColor: '#ccc' }} />
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
