import React from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import Bawaslu from "../../../component/Bawaslu";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { format } from "date-fns";
import idLocale from "date-fns/locale/id";
import AOS from "aos";
function RekapBerita() {
  const [rekap, setRekap] = useState([]);
  const { tahun_bulan } = useParams();

  const getAllRekap = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/berita/arsip?bulan=${tahun_bulan}`
      );
      setRekap(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  //useEffect
  useEffect(() => {
    getAllRekap();
    AOS.init();
  }, [tahun_bulan]);

  const getLatestDataFirst = () => {
    return rekap
      .slice()
      .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="blog-area pd-top-120 pd-bottom-120">
        <div className="container">
          <h2 data-aos="fade-right">
            {format(
              new Date(rekap.length > 0 && rekap[0].createdDate),
              "dd MMMM yyyy",
              {
                locale: idLocale,
              }
            )}
          </h2>
          <br />
          <br />
          <div className="row">
            <div
              data-aos="fade-right"
              className="col-lg-8 col-md-12 widget widget-recent-post pe-lg-5">
              <ul>
                {rekap.length > 0 ? (
                  getLatestDataFirst().map((berita, index) => {
                    return (
                      <li>
                        <div className="media">
                          <div className="media-left">
                            <img
                              src={berita.image}
                              style={{ width: "200px" }}
                            />
                          </div>
                          <div className="media-body align-self-center">
                            <h6 className="fs-4 title">
                              <a href={`/isi-rekap/data-berita/${berita.id}`}>
                                {berita.judulBerita}
                              </a>
                            </h6>
                            <div className="post-info">
                              <span className="mr-3"> BY {berita.author}</span>
                              <i className="far fa-calendar-alt"></i>
                              <span>
                                {format(
                                  new Date(berita.createdDate),
                                  "dd MMMM yyyy",
                                  { locale: idLocale }
                                )}
                              </span>
                            </div>
                            {/* <br /> */}
                            <p className="fs-6 isiBerita">{berita.isiBerita}</p>
                          </div>
                        </div>
                        <hr />
                      </li>
                    );
                  })
                ) : (
                  <h1>Data Tidak Ada</h1>
                )}
              </ul>
            </div>
            <div className="col-lg-4 col-12">
              <div data-aos="fade-left" className="sidebar-container">
                <div className="td-sidebar">
                  <Bawaslu />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RekapBerita;
