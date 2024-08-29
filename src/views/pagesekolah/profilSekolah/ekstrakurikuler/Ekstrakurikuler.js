import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../../component/FooterSekolah";
import axios from "axios";
import "../../../../css/ekstrakulikuler/ekstra.css";
import { API_DUMMY } from "../../../../utils/base_URL";
import NavbarSekolah from "../../../../component/NavbarSekolah";
import NavbarSekolah2 from '../../../../component/NavbarSekolah2';
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
        }&size=18`
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
      <NavbarSekolah2 />
      <main className="container-berita">
        <div className="header-berita">
          <ul>
            <li>
              <a href="/">
                <i class="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <i class="fas fa-angle-right"></i>{" "}
              <span style={{ fontWeight: "normal" }}>Sejarah Sekolah</span>
            </li>
          </ul>
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
      </main>
      <FooterSekolah />
    </div>
  );
}

export default Ekstrakurikuler;
