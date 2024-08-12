import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import { Pagination } from "@mui/material";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import AOS from "aos";
import "../../../css/card.css";

function Pengumuman() {
  const [pengumuman, setPengumuman] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const getAll = async (page) => {
    await axios
      .get(
        `${API_DUMMY}/bawaslu/api/pengumuman?page=0&size=10&sortBy=id&sortOrder=desc`
      )
      .then((res) => {
        setPengumuman(res.data.data.content);
        setPaginationInfo({
          totalPages: res.data.data.totalPages,
          totalElements: res.data.data.totalElements,
        });
      })
      .catch((error) => {
        alert("Terjadi kesalahan" + error);
      });
  };
  useEffect(() => {
    //mengambil data, memperbarui DOM secara langsung,
    getAll(currentPage);
    AOS.init();
  }, [currentPage, rowsPerPage]);

  const filteredList = pengumuman.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);
  return (
    <div>
      <Navbar />
      {/* <!-- page title start --> */}

      {/* <!-- page title end --> */}
      {/* <!-- blog area start --> */}
      <div
        className="blog-area pd-top-115 pd-bottom-60"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-vector/white-elegant-texture-background_23-2148430934.jpg?w=740&t=st=1698973959~exp=1698974559~hmac=418240e9f8d698b9b7f2c0907f5c8e0013885b44976fa36e713b8801491993db')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}>
        <div className="container">
          <div className="row justify-content-center">
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="bottom-bottom"
              className="col-xl-6 col-lg-7 col-md-10">
              <div className="section-title text-center">
                <h5 className="sub-title double-line">Bawaslu Boyolali</h5>
                <h2 className="title">Pengumuman</h2>
              </div>
            </div>
          </div>

          <section class="light"  data-aos="fade-right">
            <div class="container py-2" >
              {filteredList.map((isi) => {
                return (
                  <article class="postcard light blue" data-aos="zoom-in">
                    <a class="postcard__img_link" href="#">
                      <img
                        class="postcard__img"
                        src={isi.image}
                      />
                    </a>
                    <div class="postcard__text t-dark">
                      <h1 class="postcard__title blue">
                        <a
                          href={`/pengumuman/isi-pengumuman/${isi.id}`}
                          style={{ color: "black", textDecoration: "none" }}>
                          {isi.judulPengumuman}
                        </a>
                      </h1>
                      <div class="postcard__subtitle small">
                        <time datetime="2020-05-25 12:00:00">
                          <i class="fas fa-calendar-alt mr-2 text-black"></i>
                          <span className="text-black">
                            {format(new Date(isi.createdDate), "dd MMMM yyyy", {
                              locale: idLocale,
                            })}
                          </span>
                        </time>
                      </div>
                      <div class="postcard__bar"></div>
                      <div class="postcard__preview-txt text-black">
                        {isi.isiPengumuman}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom"
            className="card-header mt-3 d-flex justify-content-center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              showFirstButton
              showLastButton
              color="primary"
            />
          </div>
        </div>
      </div>
      {/* <!-- blog area end --> */}
      <Footer />
    </div>
  );
}

export default Pengumuman;
