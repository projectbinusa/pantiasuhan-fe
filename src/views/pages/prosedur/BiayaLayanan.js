import React, { useEffect } from "react";
import biaya from "../../../aset/Wallet-rafiki.png";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import AOS from 'aos';

function BiayaLayanan() {
  useEffect(() => {
    AOS.init()
  })
  return (
    // <!-- team details page start -->
    <>
      <Navbar />
      {/* <!-- page title start --> */}

      {/* <!-- page title end --> */}
      <div
        className="team-details-page pd-top-120 service-area bg-relative pd-top-60 pd-bottom-90 "
        style={{
          backgroundImage: `url('https://www.imageshine.in/uploads/gallery/Free-vector-hand-painted-watercolor-abstract-watercolor-background.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <img
          className="shape-left-top top_image_bounce"
          src="https://www.solverwp.com/demo/html/itechie/assets/img/shape/3.webp"

        />
        <img
          className="shape-right-top top_image_bounce"
          src="https://www.solverwp.com/demo/html/itechie/assets/img/shape/4.webp"

        />
        {/* <!-- about area start --> */}
        <div className="about-area ">
          <div className="container">
            <div className="row">
              <div
          data-aos="fade-right" className="col-lg-6 col-md-9 mb-5 mb-lg-0">
                <div className="about-mask-bg-wrap about-mask-bg-wrap-4">
                  <div className="thumb">
                    <img src={biaya}  />
                  </div>
                </div>
              </div>
              <div
          data-aos="fade-left" className="col-lg-6 align-center">
                <div className="section-title px-lg-5 mb-0">
                  <h5 className="sub-title left-border">Bawaslu Boyolali</h5>
                  <h2 className="title">Biaya Layanan </h2>
                  <p className="content-strong mt-3">
                    {" "}
                    PPID Bawaslu RI menyediakan informasi secara GRATIS (tidak
                    dipungut biaya).
                  </p>
                  <p className="content">
                    Sedangkan untuk penggandaan, pemohon informasi publik dapat
                    melakukan penggandaan/ foto copy sendiri di sekitar Kantor
                    Bawaslu atau biaya penggandaan ditanggung pemohon
                    sendiri,atau pemohon dapat menyediakan CD atau flashdisk
                    untuk merekam data atau informasi.
                  </p>
                  <ul className="single-list-inner style-check mt-3">
                    <li>
                      <i className="fa fa-check"></i>Kebahagiaan klien
                    </li>
                    <li>
                      <i className="fa fa-check"></i>Layanan kelas dunia
                    </li>
                    <li>
                      <i className="fa fa-check"></i>Kebahagiaan klien
                    </li>
                  </ul>
                </div>
                <img
                    className="shape-image-sm top_image_bounce"
                    src="https://solverwp.com/demo/html/itechie/assets/img/about/4sm.webp"

                  />
              </div>
            </div>
          </div>
          {/* <!-- about area end --> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BiayaLayanan;
