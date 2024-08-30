import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../../component/FooterSekolah";
import axios from "axios";
import { API_DUMMY } from "../../../../utils/base_URL";
import NavbarSekolah2 from '../../../../component/NavbarSekolah2';
import { Pagination } from "@mui/material";
import '../../../../css/prestasi/prestasiCard.css';

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
        `${API_DUMMY}/smpn1bergas/api/prestasi/all/terbaru?page=${page - 1}&size=18`
      );
      setPrestasi(response.data.data.content);
      setTotalPage(response.data.data.totalPages);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllPrestasi(currentPage);
  }, [currentPage]);

  return (
    <div>
      <NavbarSekolah2 />
      <main className="container-berita container">
        <div className="header-berita">
          <ul>
            <li><a href="/"><i className="fas fa-home"></i> Beranda</a></li>
            <li><i className="fas fa-angle-right"></i><span style={{ fontWeight: "normal" }}> Prestasi</span></li>
          </ul>
        </div>
        <div className="">
          <div className="container-grid">
            {prestasi.map((item) => (
              // <div className="card" key={item.id}>
              //   <div className="image-container">
              //     <img
              //       src={item.foto}
              //       alt={item.foto}
              //     />
              //   </div>
              //   <div className="card-body">
              //     <a href={`/prestasi/${item.id}`} className="read-more-link">
              //       <h5 className="card-title">{item.judul}</h5>
              //     </a>
              //     <div>
              //       <a href={`/prestasi/${item.id}`} className="read-more-link">
              //         Baca selengkapnya
              //         <svg
              //           className="arrow-icon"
              //           aria-hidden="true"
              //           xmlns="http://www.w3.org/2000/svg"
              //           width="15"
              //           height="15"
              //           fill="currentColor"
              //           viewBox="0 0 24 24"
              //         >
              //           <path
              //             fillRule="evenodd"
              //             d="M3 4a1 1 0 0 0-.822 1.57L6.632 12l-4.454 6.43A1 1 0 0 0 3 20h13.153a1 1 0 0 0 .822-.43l4.847-7a1 1 0 0 0 0-1.14l-4.847-7a1 1 0 0 0-.822-.43H3Z"
              //             clipRule="evenodd"
              //           />
              //         </svg>
              //       </a>
              //     </div>
              //   </div>
              // </div>
              <div class="card item" key={item.id}>
                <div class="single-project-inner style-two">
                  <div class="thumb">
                    {item.foto !== null ? (
                      <img src={item.foto} alt="img" />
                    ) : (
                      <img src="https://lh5.googleusercontent.com/p/AF1QipPiTYMPukmrWn57NP0O_90hGlAwYH1dxd-Tv39r=w2048-h2048-k-no" alt="img" />
                    )}
                  </div>
                  <div class="details-wrap">
                    <h3>{item.judul}</h3>
                    <a href={`/prestasi/${item.id}`}
                    >SELENGKAPNYA <i class="fas fa-arrow-right"></i
                    ></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination-container">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </div>
        </div>
      </main>
      <FooterSekolah />
    </div>
  );
}

export default PrestasiSekolah;
