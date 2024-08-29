import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_DUMMY } from '../../../../utils/base_URL';
import NavbarSekolah2 from '../../../../component/NavbarSekolah2';
import FooterSekolah from '../../../../component/FooterSekolah';

function VisiMisiSekolah() {
  const [visiMisiData, setVisiMisiData] = useState({
    visi: '',
    misi: '',
    tujuan: ''
  });

  useEffect(() => {
    const fetchVisiMisiData = async () => {
      try {
        const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/visiMisi/all`);
        console.log("API Response:", response.data);
        const data = response.data.data.content[0] || {};
        setVisiMisiData({
          visi: data.visi || "Data tidak tersedia",
          misi: data.misi || "Data tidak tersedia",
          tujuan: data.tujuan || "Data tidak tersedia"
        });
      } catch (error) {
        console.log("Error fetching visi misi data:", error);
      }
    };
  
    fetchVisiMisiData();
  }, []);
  
  return (
    <div>
      <NavbarSekolah2 />
      <main className="container-berita container">
        <div className="header-berita">
          <ul>
            <li>
              <a href="/">
                <i className="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <i className="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>Visi Misi</span>
            </li>
          </ul>
        </div>
        <div style={{ padding: '0', fontFamily: 'Arial, sans-serif', lineHeight: '1.8' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0' }}>
            {visiMisiData.visi === "Data tidak tersedia" || visiMisiData.misi === "Data tidak tersedia" || visiMisiData.tujuan === "Data tidak tersedia" ? (
              <p style={{ fontSize: "1.1em", textAlign: "center", color: "#666" }}>
                Visi & Misi dan Tujuan Sekolah Tidak Tersedia.
              </p>
            ) : (
              <>
                <h2 style={{ fontSize: '2em', marginBottom: '30px', fontWeight: 'bold', textAlign: "center", textTransform: "uppercase" }}>
                  Visi Sekolah
                </h2>
                <div
                  style={{ fontSize: '1.1em', marginBottom: '60px', textAlign: 'center', textTransform: 'capitalize' }}
                  dangerouslySetInnerHTML={{ __html: visiMisiData.visi }}
                />
                    
                <h2 style={{ fontSize: '2em', marginBottom: '30px', fontWeight: 'bold', textAlign: "center", textTransform: "uppercase" }}>
                  Misi Sekolah
                </h2>
                <div
                  style={{ fontSize: '1.1em', marginBottom: '60px', textAlign: 'left', textTransform: 'capitalize' }}
                  dangerouslySetInnerHTML={{ __html: visiMisiData.misi }}
                />
                    
                <h2 style={{ fontSize: '2em', marginBottom: '30px', fontWeight: 'bold', textAlign: "center", textTransform: "uppercase" }}>
                  Tujuan Sekolah
                </h2>
                <div
                  style={{ fontSize: '1.1em', marginBottom: '60px', textAlign: 'left', textTransform: 'capitalize' }}
                  dangerouslySetInnerHTML={{ __html: visiMisiData.tujuan }}
                />
              </>
            )}
          </div>
        </div>
      </main>
      <FooterSekolah />
    </div>
  );
}

export default VisiMisiSekolah;
