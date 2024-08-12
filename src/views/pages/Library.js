import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import "../../css/library.css";
import bawaslu from "../../aset/bawaslu.png";
import bawaslu1 from "../../aset/bawaslu1.png";
import bawaslu2 from "../../aset/bawaslu2.png";
import bawaslu3 from "../../aset/bawaslu3.png";
import AOS from "aos";
import axios from "axios";
import { API_DUMMY } from "../../utils/base_URL";

function Library() {
  const serviceAreaRef = useRef(null);
  const [eLibrary, setELibrary] = useState([]);

  const handleLihatKoleksiClick = () => {
    if (serviceAreaRef.current) {
      serviceAreaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getAll = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/bawaslu/api/library/all`);
      setELibrary(response.data.data);
      console.log("data e library = " + response.data.data);
    } catch (error) {
      console.log("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    AOS.init();
    getAll();
  }, []);

  return (
    // <!-- team area start -->
    <>
      <Navbar />
      {/* <!-- banner area start --> */}
      <div
        className="banner-area banner-area-2 bg-relative"
        style={{
          backgroundImage: `url('https://mmc.tirto.id/image/2019/06/20/ilustrasi-perpustakaan-istock_ratio-16x9.jpg') `,
        }}>
        <div className="bg-overlay-gradient"></div>
        <div className="container service-area bg-relative pd-top-60 pd-bottom-90 ">
          <div className="row">
            <div className="col-lg-6 col-md-9">
              <div className="banner-inner" data-aos="fade-right">
                <h4 className="sub-title">Kanal Literasi</h4>
                <h2 className="title">
                  Perpustakaan Digital Bawaslu<span> Kabupaten Boyolali</span>
                </h2>
                <p className="content">
                  Baca buku dan buletin tentang Kepemiluan, berbagi koleksi
                  bacaan dan bersosialisasi secara bersamaan. Di mana pun, kapan
                  pun dengan nyaman bersama setiap orang.
                </p>
                <div className="btn-wrap">
                  <a
                    href="#/"
                    onClick={handleLihatKoleksiClick}
                    style={{ textDecoration: "none" }}>
                    LIHAT KOLEKSI
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- service area start --> */}
      <div className="service-area bg-relative pd-top-115 pd-bottom-90 min-height-200">
        <img
          className="shape-left-top top_image_bounce"
          src="https://solverwp.com/demo/html/itechie/assets/img/shape/3.webp"
        />
        <img
          className="shape-right-top top_image_bounce"
          src="https://solverwp.com/demo/html/itechie/assets/img/shape/4.webp"
        />
        <div ref={serviceAreaRef} className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7">
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="bottom-bottom"
                className="section-title text-center">
                <h5 className="sub-title double-line">Bawaslu Boyolali</h5>
                <h2 className="title">Buku Bawaslu Kabupaten Boyolali</h2>
                <p className="content">
                  Melalui website ini, Bawaslu Kabupaten Boyolali akan selalu
                  memperbabarui informasi terkait pengawasan dan pemantauan
                  pemilu.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {eLibrary.map((data) => {
              return (
                <div
                  data-aos="fade-up"
                  data-aos-anchor-placement="bottom-bottom"
                  className="col-lg-4 col-md-6">
                  <div
                    className="single-service-inner style-2 text-center"
                    style={{
                      backgroundImage: `url('https://solverwp.com/demo/html/itechie/assets/img/bg/01.webp')`,
                    }}>
                    <div className="icon-box">
                      <i className="icomoon-application"></i>
                    </div>
                    <div id="" className="details">
                      <h3>
                        <a href={data.photoUrl}>Buletin</a>
                      </h3>

                      <p>{data.name}</p>
                      <div id="btn-1" className="buletin">
                        <a
                          className="btn-primary"
                          style={{ borderRadius: "100%", padding: "15px" }}
                          href={data.photoUrl}
                          target="_blank"
                          rel="noopener noreferrer">
                          <i className="fa fa-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <div
              data-aos="fade-up"
              data-aos-anchor-placement="bottom-bottom"
              className="col-lg-4 col-md-6">
              <div
                className="single-service-inner style-2 text-center"
                style={{
                  backgroundImage: `url('https://solverwp.com/demo/html/itechie/assets/img/bg/01.webp')`,
                }}>
                <div className="icon-box">
                  <i className="icomoon-cloud-data"></i>
                </div>
                <div className="details">
                  <h3>
                    <a href="https://boyolali.bawaslu.go.id/cepogo/2023/09/buletin-edisi-2-depan-212x300-1.jpg">
                      Buletin
                    </a>
                  </h3>

                  <p>Buletin Bawaslu Kabupaten Boyolali Edisi 2</p>
                  <div id="btn-2" className="buletin">
                    <a
                      className="btn-primary"
                      style={{ borderRadius: "100%", padding: "15px" }}
                      href="https://boyolali.bawaslu.go.id/cepogo/2023/09/buletin-edisi-2-depan-212x300-1.jpg">
                      <i className="fa fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="bottom-bottom"
              className="col-lg-4 col-md-6">
              <div
                className="single-service-inner style-2 text-center"
                style={{
                  backgroundImage: `url('https://solverwp.com/demo/html/itechie/assets/img/bg/01.webp')`,
                }}>
                <div className="icon-box">
                  <i className="icomoon-megaphone"></i>
                </div>
                <div className="details">
                  <h3>
                    <a href="https://boyolali.bawaslu.go.id/cepogo/2023/09/buletin-edisi-3-depan-212x300-1.jpg">
                      Buletin
                    </a>
                  </h3>

                  <p>Buletin Bawaslu Kabupaten Boyolali Edisi 3</p>
                  <div id="btn-3" className="buletin">
                    <a
                      className="btn-primary"
                      style={{ borderRadius: "100%", padding: "15px" }}
                      href="https://boyolali.bawaslu.go.id/cepogo/2023/09/buletin-edisi-3-depan-212x300-1.jpg">
                      <i className="fa fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="bottom-bottom"
              className="col-lg-4 col-md-6">
              <div
                className="single-service-inner style-2 text-center"
                style={{
                  backgroundImage: `url('https://solverwp.com/demo/html/itechie/assets/img/bg/01.webp')`,
                }}>
                <div className="icon-box">
                  <i className="icomoon-application"></i>
                </div>
                <div className="details">
                  <h3>
                    <a href="https://boyolali.bawaslu.go.id/cepogo/2023/09/buletin-edisi-4-depan-212x300-1.jpg">
                      Buletin
                    </a>
                  </h3>

                  <p>Buletin Bawaslu Kabupaten Boyolali Edisi 4</p>
                  <div id="btn-4" className="buletin">
                    <a
                      className="btn-primary"
                      style={{ borderRadius: "100%", padding: "15px" }}
                      href="https://boyolali.bawaslu.go.id/cepogo/2023/09/buletin-edisi-4-depan-212x300-1.jpg">
                      <i className="fa fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="bottom-bottom"
              className="col-lg-4 col-md-6">
              <div
                className="single-service-inner style-2 text-center"
                style={{
                  backgroundImage: `url('https://solverwp.com/demo/html/itechie/assets/img/bg/01.webp')`,
                }}>
                <div className="icon-box">
                  <i className="icomoon-application"></i>
                </div>
                <div className="details">
                  <h3>
                    <a href="https://boyolali.bawaslu.go.id/cepogo/2023/09/Jejak-Pengawasan-depan-212x300-1.jpg">
                      Buletin
                    </a>
                  </h3>

                  <p>Jejak Pengawasan Catatan Pengawas Pemilu 2019</p>
                  <div id="btn-5" className="buletin">
                    <a
                      className="btn-primary"
                      style={{ borderRadius: "100%", padding: "15px" }}
                      href="https://boyolali.bawaslu.go.id/cepogo/2023/09/Jejak-Pengawasan-depan-212x300-1.jpg">
                      <i className="fa fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="bottom-bottom"
              className="col-lg-4 col-md-6">
              <div
                className="single-service-inner style-2 text-center"
                style={{
                  backgroundImage: `url('https://solverwp.com/demo/html/itechie/assets/img/bg/01.webp')`,
                }}>
                <div className="icon-box">
                  <i className="icomoon-application"></i>
                </div>
                <div className="details">
                  <h3>
                    <a href="https://boyolali.bawaslu.go.id/cepogo/2023/09/Napak-Tilas-Depan-212x300-1.jpg">
                      Buletin
                    </a>
                  </h3>

                  <p>
                    Napak Tilas | Sejarah Pengawasan Pemilihan Umum Kab.
                    Boyolali
                  </p>
                  <div id="btn-6">
                    <a
                      className="btn-primary"
                      style={{ borderRadius: "100%", padding: "15px" }}
                      href="https://boyolali.bawaslu.go.id/cepogo/2023/09/Napak-Tilas-Depan-212x300-1.jpg">
                      <i className="fa fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* <!-- service area end --> */}
      <Footer />
    </>
  );
}

export default Library;
