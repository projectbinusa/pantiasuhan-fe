import React, { useEffect, useState } from "react";
import NavbarSekolah from "../../../../component/NavbarSekolah";
import FooterSekolah from "../../../../component/FooterSekolah";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import "../../../../css/prestasi/prestasiCard.css";
import "../../../../css/prestasi/detailprestasi.css";

function PrestasiSekolah() {
  const [prestasi, setPrestasi] = useState([]);

  const getAllPrestasi = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/prestasi/all/terbaru?page=0&size=6`
      );
      setPrestasi(response.data.data.content);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllPrestasi();
  }, []);

  return (
    <div>
      <NavbarSekolah />
      <div style={{ position: "relative", height: "600px", overflow: "hidden" }}>
        <img src="https://lh5.googleusercontent.com/p/AF1QipPiTYMPukmrWn57NP0O_90hGlAwYH1dxd-Tv39r=w2048-h2048-k-no" className="image-style" alt="banner" />
        <div className="text-overlay-style">
          <p style={{ color: "white" }}>SMP NEGERI 1 BERGAS</p>
          <div className="header-prestasi">
            <ul>
              <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
              <li><i class="fas fa-angle-right"></i> Prestasi</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {prestasi.map((item) => (
            <div className="col" key={item.id}>
              <div className="card">
                <div className="image-container">
                  <img src={item.foto} className="image" alt={item.foto} />
                </div>
                <div className="card-body">
                  <a href={`/prestasi/${item.id}`} className="card-link">
                    <h5 className="card-title">{item.judul}</h5>
                  </a>
                  <a href={`/prestasi/${item.id}`} className="read-more-link">
                    Baca selengkapnya
                    <svg
                      className="arrow-icon"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 0 0-.822 1.57L6.632 12l-4.454 6.43A1 1 0 0 0 3 20h13.153a1 1 0 0 0 .822-.43l4.847-7a1 1 0 0 0 0-1.14l-4.847-7a1 1 0 0 0-.822-.43H3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterSekolah />
    </div>
  );
}

export default PrestasiSekolah;
