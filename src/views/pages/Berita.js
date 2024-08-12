import React, { useEffect, useState } from "react";
import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";
import axios from "axios";
import AOS from "aos";
import { API_DUMMY } from "../../utils/base_URL";
import { Pagination } from "@mui/material";
import Bawaslu from "../../component/Bawaslu";
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import "../../css/berita.css";
import logoBawaslu from "../../aset/ikon-web.png";
import { Helmet } from "react-helmet";
import EditBeritaAdmin from "./admin/berita/EditBeritaAdmin";
function Berita() {
  const [scroll, setScroll] = useState(false);
  const [list, setList] = useState([]);
  const [listTerbaru, setListTerbaru] = useState([]);
  const [category, setCategory] = useState([]);
  const currentYear = new Date().getFullYear();
  const [monthlyData, setMonthlyData] = useState({});
  const [monthlyTotal, setMonthlyTotal] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [gambarTerbaru, setGambarTerbaru] = useState("");

  const getAll = async (page) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/berita/all?page=${page - 1
        }&size=10&sortBy=id&sortOrder=desc`
      );
      setList(response.data.data.content);
      setPaginationInfo({
        totalPages: response.data.data.totalPages,
        totalElements: response.data.data.totalElements,
      });
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  const getCategoryBerita = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/category-berita/all?direction=desc&page=0&size=40&sort=createdDate`
      );
      setCategory(response.data.data.content);
      console.log(response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  const getAllTerbaru = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/berita/terbaru`
      );
      setListTerbaru(response.data.data);
      console.log(response.data.data);
      if (response.data.data.length > 0) {
        setGambarTerbaru(response.data.data[0].image);
        console.log(response.data.data[0].image);
      }
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  const archivingMonths = Array.from({ length: 12 }, (_, index) => {
    const month = (index + 1).toString().padStart(2, "0");
    return {
      month,
      year: currentYear,
      label: new Date(currentYear, month - 1, 1).toLocaleString("id-ID", {
        month: "long",
      }),
    };
  });

  const getAllRekap = async (tahun_bulan) => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/berita/arsip?bulan=${tahun_bulan}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const newData = {};

      for (const monthData of archivingMonths) {
        const tahun_bulan = `${monthData.year}${monthData.month}`;
        const data = await getAllRekap(tahun_bulan);
        newData[tahun_bulan] = data;
      }

      setMonthlyData(newData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    getCategoryBerita();
  }, []);

  useEffect(() => {
    getAllTerbaru();
    AOS.init();
  }, []);

  useEffect(() => {
    getAll(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const newData = {};
      const newMonthlyTotal = {}; // State baru

      for (const monthData of archivingMonths) {
        const tahun_bulan = `${monthData.year}-${monthData.month}`;
        const data = await getAllRekap(tahun_bulan);
        newData[tahun_bulan] = data;
        newMonthlyTotal[tahun_bulan] = data.length; // Menghitung total data berita
      }

      setMonthlyData(newData);
      setMonthlyTotal(newMonthlyTotal); // Update state total data berita
    };
    fetchData();
  }, []);

  const [socialMeta, setSocialMeta] = useState({
    title: "",
    description: "",
    imageUrl: "",
    url: "",
  });

  return (
    <>
      <Helmet>
        <meta property="og:title" content={socialMeta.title} />
        <meta property="og:description" content={socialMeta.description} />
        <meta property="og:image" content={socialMeta.imageUrl} />
        <meta property="og:url" content={socialMeta.url} />
      </Helmet>
      <Navbar />
      <div>
        <div
          class="editors-news container"
          style={{ marginTop: "0px", marginBottom: "50px" }}>
          <div class="row">
            <div data-aos="fade-right" class="col-lg-3">
              <div class="d-flex position-relative float-left">
                <h3 class="section-title">Berita Terbaru</h3>
              </div>
            </div>
          </div>
          <div class="row">
            <div data-aos="fade-right" class="col-lg-6  mb-5 mb-sm-2">
              <div class="position-relative image-hover">
                <img
                  src={listTerbaru.length > 0 && listTerbaru[0].image}
                  class="img-fluid w-100"
                />
                <span class="thumb-title">BERITA</span>
              </div>
              <h1 class="font-weight-600 mt-3">
                <a
                  style={{ color: "black", textDecoration: "none" }}
                  href={
                    "/page-isi-berita/" + listTerbaru.length > 0 &&
                    listTerbaru[0].author + "/" + listTerbaru.length > 0 &&
                    listTerbaru[0].id
                  }>
                {listTerbaru.length > 0 && listTerbaru[0].judulBerita}</a>{" "}
              </h1>
              <p class="fs-15 font-weight-normal isiBerita">
                {listTerbaru.length > 0 && listTerbaru[0].isiBerita}
              </p>
            </div>
            <div class="col-lg-6  mb-5 mb-sm-2">
              <div class="row">
                {listTerbaru.slice(1, 5).map((berita) => {
                  return (
                    <div data-aos="fade-left" class="col-sm-6  mb-5 mb-sm-2">
                      <div class="position-relative image-hover">
                        <img
                          src={berita.image}
                          class="img-fluid "
                          style={{ maxHeight: "160px", maxWidth: "180px" }}
                        />
                        <span class="thumb-title isiBerita">BERITA</span>
                      </div>
                      <p class="font-weight-bold mt-3">
                        <a
                          style={{ color: "black", textDecoration: "none" }}
                          href={
                            "/page-isi-berita/" +
                            berita.author +
                            "/" +
                            berita.id
                          }>
                          {berita.judulBerita}
                        </a>
                      </p>
                      <span>
                        {format(new Date(berita.createdDate), "dd MMMM yyyy", {
                          locale: idLocale,
                        })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div class="blog-area pd-top-120 pd-bottom-120">
          <div class="container">
            <div class="row">
              <div data-aos="fade-right" class="col-lg-8">
                <div className="row">
                  <div class="widget widget_search">
                    <h4>
                      {" "}
                      <strong>
                        Berita{" "}
                        <span style={{ color: "blue" }}>Bawaslu Boyolali</span>
                      </strong>
                    </h4>
                    <div
                      class="banner-top-thumb-wrap scrol"
                      style={{
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        scrollbarWidth: "thin",
                        msOverflowStyle: "none",
                        overflowY: "hidden",
                        paddingTop: "5px",
                        paddingBottom: "8px",
                      }}>
                      <div class="d-lg-flex gap-3 align-items-center">
                        {category.map((categoryBerita) => {
                          return (
                            <div class="d-flex justify-content-between  mb-3 mb-lg-0">
                              <p class="m-0 font-weight-bold">
                                <a
                                  style={{
                                    color: "black",
                                    textDecoration: "none",
                                    background: "#F1F6F9",
                                    padding: "7px",
                                    borderRadius: "20px",
                                    border: "1px solid blue",
                                    paddingTop: "5px",
                                  }}
                                  href={`category-berita/${categoryBerita.category}/${categoryBerita.id}`}>
                                  {categoryBerita.category}
                                </a>
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                {list.length > 0 ? (
                  list.map((berita) => {
                    return (
                      <div class="single-blog-inner">
                        <div class="tag-and-share">

                          <div class="row">
                            <div class="col-sm-7"></div>
                            <div class="col-sm-5 mt-3 mt-sm-0 text-sm-end align-self-center">
                              <div class="blog-share">
                                <ul>
                                  <li>
                                    <FacebookShareButton
                                      url={`https://bawaslu.excellentsistem.com/page-isi-berita/${berita.author}/${berita.id}`}
                                      quote={berita.judulBerita}>
                                      <FacebookIcon size={38} round={true} />
                                    </FacebookShareButton>
                                  </li>
                                  <li>
                                    <TwitterShareButton
                                      url={`https://bawaslu.excellentsistem.com/page-isi-berita/${berita.author}/${berita.id}`}
                                      title={berita.judulBerita}>
                                      <TwitterIcon size={38} round={true} />
                                    </TwitterShareButton>
                                  </li>
                                  <li>
                                    <PinterestShareButton
                                      url={`https://bawaslu.excellentsistem.com/page-isi-berita/${berita.author}/${berita.id}`}
                                      description={berita.judulBerita}
                                      media={berita.image}>
                                      <PinterestIcon size={38} round={true} />
                                    </PinterestShareButton>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="thumb">
                          <img
                            style={{ height: "450px" }}
                            src={berita.image}

                          />
                        </div>
                        <div class="details">
                          <h2>
                            <a
                              href={`/page-isi-berita/${berita.author}/${berita.id}`}>
                              {berita.judulBerita}
                            </a>
                          </h2>
                          <ul class="blog-meta">
                            <li>
                              <i class="far fa-user"></i>BY {berita.author}
                            </li>
                            <li>
                              <i class="far fa-calendar-alt"></i>{" "}
                              <span>
                                {format(
                                  new Date(berita.createdDate),
                                  "dd MMMM yyyy",
                                  { locale: idLocale }
                                )}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                    <Pagination
                      count={paginationInfo.totalPages}
                      color="primary"
                      page={currentPage}
                      onChange={(event, value) => setCurrentPage(value)}
                    />
                  })
                ) : (
                  <h1 style={{ textAlign: "center", marginTop: "40px", fontWeight:"bold" }}>Data Berita Saat Ini Belum Ada</h1>
                )}
              </div>
                    {/*  */}
              <div data-aos="fade-left" class="col-lg-4 col-12">
                <div className="sidebar-container">
                  <div class="td-sidebar">
                    <div
                      class={`widget widget-recent-post`}
                      style={{
                        background: "#F1F6F9",
                        overflow: "hidden",
                        boxShadow: " rgba(47, 60, 95, 0.24) 0px 6px 10px",
                        border: "1px solid blue",
                      }}>
                      <h4 class="widget-title">
                        <i class="fa-solid fa-newspaper"></i> Berita Terbaru
                        {listTerbaru.length > 0 ? (
                          <ul>
                            {listTerbaru.map((beritaTerbaru) => (
                              <li key={beritaTerbaru.id}>
                                <div class="media">
                                  <div class="media-left">
                                    <img
                                      src={logoBawaslu}
                                      style={{ width: "90px" }}

                                    />
                                  </div>
                                  <div class="media-body align-self-center">
                                    <h6 class="title">
                                      <a
                                        href={`/page-isi-berita/${beritaTerbaru.author}/${beritaTerbaru.id}`}>
                                        {beritaTerbaru.judulBerita}
                                      </a>
                                    </h6>
                                    <div class="post-info">
                                      <i class="far fa-calendar-alt"></i>
                                      <span>
                                        {format(
                                          new Date(beritaTerbaru.createdDate),
                                          "dd MMMM yyyy",
                                          { locale: idLocale }
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <h2 className="title">Tidak Ada Data Berita Terbaru</h2>
                        )}
                      </h4>
                    </div>
                    <div
                      class="widget widget_catagory "
                      style={{
                        background: "#F1F6F9",
                        border: "1px solid blue",
                        boxShadow: " rgba(47, 60, 95, 0.24) 0px 6px 10px",
                      }}>
                      <h4 class="widget-title">
                        {" "}
                        <i class="fa-solid fa-folder-open"></i> Arsip
                      </h4>
                      <ul class="catagory-items">
                        {archivingMonths.map((monthData) => {
                          const tahun_bulan = `${monthData.year}-${monthData.month}`;
                          const totalData = monthlyTotal[tahun_bulan] || 0;

                          return (
                            <li key={`${tahun_bulan}`}>
                              <a href={`/rekap/berita/${tahun_bulan}`}>
                                <i class="fa-solid fa-file"></i>{" "}
                                {monthData.label} {monthData.year} ({totalData})
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <Bawaslu />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- blog area end --> */}
      <Footer />
    </>
  );
}

export default Berita;
