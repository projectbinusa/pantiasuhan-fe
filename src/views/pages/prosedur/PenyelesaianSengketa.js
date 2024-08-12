import React from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import AOS from 'aos';
import { useEffect } from "react";

function PenyelesaianSengketa() {
  useEffect(() => {
    AOS.init()
  })
  return (
    // <!-- service area-5 start -->
    <>
      <Navbar />
      {/* <!-- page title start --> */}

      {/* <!-- page title end --> */}
      <div
        className="service-area-5 pd-top-120 pd-bottom-120 service-area bg-relative pd-top-60 pd-bottom-90"
        style={{
          backgroundColor: "#F8F9FE;",
          backgroundImage: `url('https://img.freepik.com/free-vector/white-elegant-texture-background_23-2148430934.jpg?w=740&t=st=1698973959~exp=1698974559~hmac=418240e9f8d698b9b7f2c0907f5c8e0013885b44976fa36e713b8801491993db')`,
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
        <div className="container">
          <div className="section-title">
            <div className="row justify-content-center">
              <div data-aos="fade-up"
     data-aos-anchor-placement="bottom-bottom" className="col-lg-6 col-md-8">
                <h5 id="text1-gabung" className="sub-title double-line" style={{ marginLeft: "35%" }}>
                  Bawaslu Boyolali
                </h5>
                <h2 id="text2-gabung" className="title text-center">Tata Cara Pengajuan Keberatan</h2>
                <p className="content text-center">
                  dan Permohonan Penyelesaian Sengketa Informasi
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div data-aos="fade-up"
     data-aos-anchor-placement="bottom-bottom" className="col-lg-4 col-md-6">
              <div className="single-service-inner style-5 text-center" style={{height:"430px"}}>
                <div className="thumb">
                  <img
                    src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/service/service-01.webp"

                  />
                  <img
                    className="icon"
                    src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/service/service-001.webp"

                  />
                </div>
                <div className="details-wrap">
                  <h4>
                    <a
                      href="service-details.html"
                      style={{ textDecoration: "none" }}
                    >
                      Pemberitahuan diTerima
                    </a>
                  </h4>
                  <p style={{ textAlign: "justify" }}>
                    Paling lambat 30 hari kerja setelah diterimanya
                    pemberitahuan tertulis dan atau surat keputusan PPID tentanf
                    penolakan permohonan informasi publikty
                  </p>
                </div>
              </div>
            </div>
            <div data-aos="fade-up"
     data-aos-anchor-placement="bottom-bottom" className="col-lg-4 col-md-6">
              <div className="single-service-inner style-5 text-center" style={{height:"430px"}}>
                <div className="thumb">
                  <img
                    src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/service/service-05.webp"

                  />
                  <img
                    className="icon"
                    src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/service/service-005.webp"

                  />
                </div>
                <div className="details-wrap">
                  <h4>
                    <a
                      href="service-details.html"
                      style={{ textDecoration: "none" }}
                    >
                      Mengajukan Keberatan
                    </a>
                  </h4>
                  <p style={{ textAlign: "justify" }}>
                    Pemohon informasi publik mengajukan keberatan kepada atasan
                    PPID melalui surat,fax,telepon,atau datang langsung ke
                    tempat layanan PPID
                  </p>
                </div>
              </div>
            </div>
            <div data-aos="fade-up"
     data-aos-anchor-placement="bottom-bottom" className="col-lg-4 col-md-6">
              <div className="single-service-inner style-5 text-center" style={{height:"430px"}}>
                <div className="thumb">
                  <img
                    src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/service/service-04.webp"

                  />
                  <img
                    className="icon"
                    src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/service/service-004.webp"

                  />
                </div>
                <div className="details-wrap">
                  <h4>
                    <a
                      href="service-details.html"
                      style={{ textDecoration: "none" }}
                    >
                      Atasan Memberi Tanggapan
                    </a>
                  </h4>
                  <p style={{ textAlign: "justify" }}>
                    Atasan PPID memberikan tanggapan atas keberatan yang
                    diajukan oleh pemohon informasi publik lambat 30 hari kerja
                    sejak diterimanya keberatan secara tertulis
                  </p>
                </div>
              </div>
            </div>
            <div data-aos="fade-up"
     data-aos-anchor-placement="bottom-bottom" className="col-lg-4 col-md-6">
              <div className="single-service-inner style-5 text-center" style={{height:"430px"}}>
                <div className="thumb">
                  <img
                    src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/service/3.webp"

                  />
                  <img
                    className="icon"
                    src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/service/03.webp"

                  />
                </div>
                <div className="details-wrap" style={{ height: "150px" }}>
                  <h4>
                    <a
                      href="service-details.html"
                      style={{ textDecoration: "none" }}
                    >
                      Pemohon Puas / Tidak
                    </a>
                  </h4>
                  <p style={{ textAlign: "justify" }}>
                    Apabila pemohon puas terhadap tanggapan atasan PPID jika{" "}
                    <span style={{ fontWeight: "bold" }}>YA</span> berarti{" "}
                    <span style={{ fontWeight: "bold" }}>SELESAI</span> &
                    Apabila pemohon{" "}
                    <span style={{ fontWeight: "bold" }}>TIDAK</span> puas dapat
                    mengajukan permohonan penyelesaian sengketa ke KIP
                  </p>
                </div>
              </div>
            </div>
            <div data-aos="fade-up"
     data-aos-anchor-placement="bottom-bottom" className="col-lg-4 col-md-6">
              <div className="single-service-inner style-5 text-center" style={{height:"430px"}}>
                <div className="thumb">
                  <img
                    src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/service/2.webp"

                  />
                  <img
                    className="icon"
                    src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/service/02.webp"

                  />
                </div>
                <div className="details-wrap" style={{ height: "150px" }}>
                  <h4>
                    <a
                      href="service-details.html"
                      style={{ textDecoration: "none" }}
                    >
                      Komisi Informasi Pusat
                    </a>
                  </h4>
                  <p style={{ textAlign: "justify" }}>
                    Komisi Informasi Pusat (KIP) mengupayakan penyelesaian
                    sengketa informasi publik
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* a */}
      <Footer />
    </>
    // <!-- service area-5 end
  );
}

export default PenyelesaianSengketa;
