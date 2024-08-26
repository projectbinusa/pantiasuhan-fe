import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../../component/FooterSekolah";
import axios from "axios";
import "../../../../css/ekstrakulikuler/ekstra.css";
import { API_DUMMY } from "../../../../utils/base_URL";
import NavbarSekolah from "../../../../component/NavbarSekolah";
import { Pagination } from "@mui/material";

function Ekstrakurikuler() {
  const [ekstrakulikuler, setEkstrakulikuler] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    getAllEkstrakurikuler(pageNumber);
  };

  const getAllEkstrakurikuler = async (page = 1) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/smpn1bergas/api/ekstrakulikuler/all/?page=${
          page - 1
        }&size=15`
      );
      setEkstrakulikuler(response.data.data.content);
      setTotalPage(response.data.data.totalPages);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllEkstrakurikuler(currentPage);
  }, [currentPage]);

  const isSingleCard = ekstrakulikuler.length === 1;

  return (
    <div className={isSingleCard ? "single-card" : ""}>
      <NavbarSekolah />
      <div
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        <img
          src="https://lh5.googleusercontent.com/p/AF1QipPiTYMPukmrWn57NP0O_90hGlAwYH1dxd-Tv39r=w2048-h2048-k-no"
          className="image-style"
          alt="banner"
        />
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
              <li>
                <a href="/">
                  <i className="fas fa-home"></i> Beranda
                </a>
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Ekstrakurikuler
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="card-container">
          {ekstrakulikuler.map((item) => {
            return (
              <div className="ekstra-card" key={item.id}>
                <div className="card-body">
                  <img src={item.foto} alt={item.name} className="card-image" />
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-description">{item.deskripsi}</p>
                  <hr />
                  <div className="card-content">
                    <p>{item.prestasi}</p>
                    <p>
                      <strong>Koordinator:</strong> {item.koordinator}
                    </p>
                    <p>
                      <strong>Pembimbing:</strong> {item.pembimbing}
                    </p>
                    <p>
                      <strong>Jadwal:</strong> {item.jadwal}
                    </p>
                    <p>
                      <strong>Tempat:</strong> {item.tempat}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
      <FooterSekolah />
    </div>
  );
}

export default Ekstrakurikuler;
