import React from 'react';
import FooterSekolah from "../../../../component/FooterSekolah";
import "../../../../css/alumni/sapras.css"
import NavbarSekolah2 from '../../../../component/NavbarSekolah2';

function Sarpras() {
  return (
    <section>
      <NavbarSekolah2 />
      <main className="container-sapras">
        <div className='header-sapras'>
          <ul>
            <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
            <li><a href="/"><i class="fas fa-angle-right"></i> Sarana Prasarana </a></li>
            <li><i class="fas fa-angle-right"></i> Standar </li>
          </ul>
        </div>
        <div className='container-sapras2'>
          <div>
            <div>
              <h5 style={{ fontWeight: "600", color: "#002147" }}>KATEGORI</h5>
              <hr style={{ width: '30%', color: '#0060ff', border: '2px solid #0060ff' }} />
              <ul className="category-berita">
                <li><a href="/sarana-prasarana">Standar</a></li>
                <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                <li><a href="/">Ruang Kantor</a></li>
                <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                <li><a href="/">Ruang Kelas</a></li>
                <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                <li><a href="/">Ruang Laboratorium</a></li>
                <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                <li><a href="/">Sarana Olahraga</a></li>
                <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                <li><a href="/">Sarana Ibadah</a></li>
                <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                <li><a href="/">Sarana Kesehatan</a></li>
                <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                <li><a href="/">Sarana Protokol Kesehatan</a></li>
              </ul>
            </div>
            <br />
            <div>
              <h5 style={{ fontWeight: "600", color: "#002147" }}>IKUTI KAMI</h5>
              <hr style={{ width: '30%', color: '#0060ff', border: '2px solid #0060ff' }} />
              <ul className="medsos-list">
                <li><a href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
                  target="_blank"
                ><i class="fab fa-facebook-f"></i></a></li>
                <li><a href="https://www.instagram.com/osisspensagas"
                  target="_blank"
                ><i class="fab fa-instagram"></i></a></li>
                <li><a href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                  target="_blank"
                ><i class="fab fa-youtube"></i></a></li>
              </ul>
            </div>
          </div>
          <div className='container-all'>
            <div style={{ textAlign: "center"}}>
              <h4 style={{ textTransform: "uppercase" }}>Standar</h4>
              <p>Sarana ruang kantor kepala sekolah, guru dan tata usaha</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <img src='https://via.placeholder.com/300x200?text=Award' style={{ height: "400px", width: "100%", marginTop: "1.5rem" }} />
              <img src='https://via.placeholder.com/300x200?text=Award' style={{ height: "400px", width: "100%", marginTop: "1.5rem" }} />
            </div>
          </div>
        </div>
      </main>
      <FooterSekolah />
    </section>
  )
}

export default Sarpras;