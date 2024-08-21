import React from 'react';
import NavbarSekolah from "../../../../component/NavbarSekolah";
import FooterSekolah from "../../../../component/FooterSekolah";
import HeaderBerita from "../HeaderBerita";
import CardBerita from "../CardBerita";
import "../../../../css/berita/news.css";

const newsData = [
    { id: 1, title: 'Local School Wins Award', content: 'The local school has been recognized for its outstanding achievements in academics and sports.', image: 'https://via.placeholder.com/300x200?text=Award', category: 'Berita Sekolah', date: '2024-08-10' },
    { id: 2, title: 'Community Garden Project Launched', content: 'A new community garden has been established to promote local agriculture and sustainability.', image: 'https://via.placeholder.com/300x200?text=Garden', category: 'Info Sekolah', date: '2024-08-12' },
    { id: 3, title: 'New Library Opens Downtown', content: 'The new library offers a wide range of books and community programs for all ages.', image: 'https://via.placeholder.com/300x200?text=Library', category: 'Berita Sekolah', date: '2024-08-14' }
  ];

  const Agenda = () => {
    return (
      <section>
          <NavbarSekolah />
          <main className="container-berita">
              <HeaderBerita title={"Agenda"}/>
              <div className="container-apbd">
                  <div>
                      <div>
                          <h5 style={{ fontWeight: "600", color: "#002147" }}>PENCARIAN</h5>
                          <hr style={{ width: '30%', color: '#0060ff', border: '2px solid #0060ff' }} />
                          <div className="search-box">
                              <input />
                              <button><i class="fas fa-search"></i></button>
                          </div>
                      </div>
                      <br />
                      <div>
                          <h5 style={{ fontWeight: "600", color: "#002147" }}>KATEGORI</h5>
                          <hr style={{ width: '30%', color: '#0060ff', border: '2px solid #0060ff' }} />
                          <ul className="category-berita">
                              <li><a href="/news">Berita Terbaru</a></li>
                              <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                              <li><a href="/info">INfo Sekolah</a></li>
                              <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                              <li><a href="/agenda">Agenda</a></li>
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
                  <div className="container-all">
                      {newsData.map(newsItem => (
                          <CardBerita
                              key={newsItem.id}
                              image={newsItem.image}
                              id={newsItem.id}
                              title={newsItem.title}
                              link={"agenda"}
                              content={newsItem.content}
                          />
                      ))}
                  </div>
              </div>
          </main>
          <FooterSekolah />
      </section>
  )
}
  
  export default Agenda;
