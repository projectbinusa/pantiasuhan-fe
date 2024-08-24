import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../../component/FooterSekolah";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import "../../../../css/prestasi/prestasiCard.css";
import "../../../../css/prestasi/detailprestasi.css";
import NavbarSekolah from "../../../../component/NavbarSekolah";
import { Pagination } from "@mui/material";

function PrestasiSekolah() {
  const [prestasi, setPrestasi] = useState([]);
  const [totalPages, setTotalPage] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    getAllPrestasi(pageNumber);
  };

  const getAllPrestasi = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/prestasi/all/terbaru?page=${page - 1}&size=16`
      );
      setPrestasi(response.data.data.content);
      setTotalPage(response.data.data.totalPages)
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllPrestasi(currentPage);
  }, [currentPage]);

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
                  <a href={`/prestasi/${item.id}`} className="card-link" style={{ textAlign: "center" }}>
                    <h5 className="card-title">{item.judul}</h5>
                  </a>
                  <div style={{ textAlign: "center" }}>
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
            </div>
          ))}
          <div className="d-flex justify-content-center align-items-center mt-3">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              style={{ marginBottom: "30px" }}
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      </div>
      <FooterSekolah />
    </div>
  );
}

export default PrestasiSekolah;
