import React, { useEffect } from "react";
import keberatan from "../../../aset/Partnership-rafiki.png";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import "../../../css/gabung.css";
import "../../../css/style.css";
import AOS from "aos";
function PermohonanKeberatan() {
  useEffect(() => {
    AOS.init();
  },[]);
  return (
    //  how it work area start
    <>
      <Navbar />
      {/* <!-- page title start --> */}

      {/* <!-- page title end --> */}
      <div
        className="about-area pd-bottom-120 service-area bg-relative pd-top-60 pd-bottom-90"
        style={{
          backgroundImage: `url('https://www.imageshine.in/uploads/gallery/Free-vector-hand-painted-watercolor-abstract-watercolor-background.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}>
        <img
          className="shape-left-top top_image_bounce"
          src="https://www.solverwp.com/demo/html/itechie/assets/img/shape/3.webp"

        />
        <img
          className="shape-right-top top_image_bounce"
          src="https://www.solverwp.com/demo/html/itechie/assets/img/shape/4.webp"

        />
        <div className="row justify-content-center p-3 p-lg-0">
          <div
            data-aos="fade-left"
            className="col-lg-6 px-xl-5 order-lg-last text-lg-end">
            <div className="thumb">
              <img style={{marginTop:"50px"}}
                src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/tab/2.webp"

              />
            </div>
          </div>
          <div
            data-aos="fade-left"
            className="col-lg-5 align-self-center order-lg-first" >
            <div className="section-title div-gabung pembungkus-gabung">
              <h5
                id="text1-gabung"
                className="sub-title double-line text1-gabung">
                Bawaslu Boyolali
              </h5>
              <h2 id="text2-gabung" className="title mb-4 text2-gabung">
                Tata Cara Pengajuan <br /> Keberatan
              </h2>
            </div>
            <div data-aos="fade-right" className="single-security-wrap">
              <div className="thumb">
                <img
                  src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/about/icon-2.webp"

                />
              </div>
              <div className="details">
                <h5>Lambat Terima</h5>
                <p>
                  Paling lambat 30 hari kerja setelah diterimanya pemberitahuan
                  tertulis dan atau surat keputusan PPID tentanf penolakan
                  permohonan informasi publik
                </p>
              </div>
            </div>
            <div data-aos="fade-right" className="single-security-wrap">
              <div className="thumb">
                <img
                  src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/about/icon-4.webp"

                />
              </div>
              <div className="details">
                <h5>Pengajuan Keberatan</h5>
                <p>
                  Pemohon informasi publik mengajukan keberatan kepada atasan
                  PPID melalui surat,fax,telepon,atau datang langsung ke tempat
                  layanan PPID
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="div-gabung-akhir" className="row pd-top-110">
          <div
            data-aos="fade-right"
            className="col-lg-6 col-md-9 px-xl-5 align-self-center">
            <div className="thumb mb-4">
              <img src={keberatan} style={{ width: "100%" }}  />
            </div>
          </div>
          <div
            data-aos="fade-left"
            id="padding-keberatan"
            className="col-lg-5 align-self-center keteranga-paddingn">
            <div className="section-title"></div>
            <div
              id="corn"
              className="single-security-wrap-2 keterangan-padding">
              <div className="thumb border-bottom">
                <img
                  src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/about/icon-3.webp"

                />
              </div>
              <div data-aos="fade-left" className="details">
                <h5>Menerima Tanda Bukti</h5>
                <p>
                  Pemohon informasi publik menerima tanda bukti pengajuan
                  keberatan dari petugas informasi
                </p>
              </div>
            </div>
            {/* <div className="single-security-wrap-2">
              <div className="thumb border-bottom">
                <img src="assets/img/home-cyber/about/icon-4.webp"  />
              </div>
              <div className="details">
                <h5>Menerima Tanggapan</h5>
                <p>
                  Pemohon informasi publik menerima tanggapan paling lambat 30
                  hari kerja sejak diterimanya keberatan secara tertulis
                </p>
              </div>
            </div> */}
            <div
              id="corn"
              className="single-security-wrap-2 keterangan-padding">
              <div className="thumb">
                <img
                  src="https://www.solverwp.com/demo/html/itechie/assets/img/home-cyber/about/icon-5.webp"

                />
              </div>
              <div className="details">
                <h5>Menerima Tanggapan</h5>
                <p>
                  Pemohon informasi publik menerima tanggapan paling lambat 30
                  hari kerja sejak diterimanya keberatan secara tertulis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
    // how it work area end
  );
}

export default PermohonanKeberatan;
