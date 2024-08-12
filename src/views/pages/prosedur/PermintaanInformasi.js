import React, { useEffect } from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import "../../../css/card.css";
import AOS from "aos";

function PermintaanInformasi() {
  useEffect(() => {
    AOS.init();
  },[]);
  return (
    <>
      <Navbar />
      {/* <!-- page title start --> */}

      {/* <!-- page title end --> */}
      <div
        className="blog-area pd-top-115 pd-bottom-60 service-area bg-relative pd-top-60 pd-bottom-90"
        style={{
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
          <div className="row justify-content-center">
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="bottom-bottom"
              className="col-xl-6 col-lg-7 col-md-10"
            >
              <div className="section-title text-center">
                <h5 id="text1-gabung" className="sub-title double-line">
                  Bawaslu Boyolali
                </h5>
                <h2 id="text2-gabung" className="title">
                  Tata Cara Permohonan Informasi
                </h2>
                {/* <p className="content">Dcidunt eget semper nec quam. Sed hendrerit. acfelis Nunc egestas augue
                        atpellentesque laoreet</p> */}
              </div>
            </div>
          </div>
          <section class="light">
            <div class="container py-2">
              <article class="postcard light blue" data-aos="fade-right">
                <a class="postcard__img_link" href="#">
                  <img
                    class="postcard__img"
                    src="https://cdn.linkumkm.id/library/8/6/5/9/3/86593_840x576.jpg"

                  />
                </a>
                <div class="postcard__text t-dark" >
                  <h1 class="postcard__title blue">
                    <a
                      href="blog-details.html"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      1) Penyampaian Permohonan
                    </a>
                  </h1>

                  <div class="postcard__bar"></div>
                  <div class="postcard__preview-txt">
                    {" "}
                    <h4></h4>
                    <p style={{ textAlign: "justify" }}>
                      Pemohon menyampaikan permohonan kepada PPID melalui
                      Aplikasi PPID,surat,fax,email,telepon atau datang langsung
                      ke tempat layanan PPID
                    </p>
                  </div>
                </div>
              </article>
              <article class="postcard light blue" data-aos="fade-left">
                <a class="postcard__img_link" href="#">
                  <img
                    class="postcard__img"
                    src="https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/02/13/4001565610.jpg"

                  />
                </a>
                <div class="postcard__text t-dark">
                  <h1 class="postcard__title red">
                    {" "}
                    <a
                      href="blog-details.html"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      2) Mengisi Formulir
                    </a>
                  </h1>

                  <div class="postcard__bar"></div>
                  <div class="postcard__preview-txt">
                    <h4></h4>

                    <p>
                      Pemohon mengisi formulir atau menyampaikan permohonan
                      informasi dan memberikan salinan identitas diri atau badan
                    </p>
                  </div>
                </div>
              </article>
              <article class="postcard light blue" data-aos="fade-right">
                <a class="postcard__img_link" href="#">
                  <img
                    class="postcard__img"
                    src="https://cdn1.katadata.co.id/media/images/thumb/2021/12/15/Proposal_pengajuan_dana-2021_12_15-16_22_35_d15eba1331fd01144d06d67b279b8e7e_960x640_thumb.jpg"

                  />
                </a>
                <div class="postcard__text t-dark" >
                  <h1 class="postcard__title green">
                    <a
                      href="blog-details.html"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      3) Menerima Bukti
                    </a>
                  </h1>

                  <div class="postcard__bar"></div>
                  <div class="postcard__preview-txt">
                    <h4></h4>
                    <p style={{ textAlign: "justify" }}>
                      Pemohon menerima bukti permohonan informasi dari
                      petugas.Informasi apabila syarat permohonan telah di
                      lengkapi{" "}
                    </p>
                  </div>
                </div>
              </article>
              <article class="postcard light blue" data-aos="fade-left">
                <a class="postcard__img_link" href="#">
                  <img
                    class="postcard__img"
                    src="https://pasardana.id/media/11420/ilustrasi-waktu-kerja.jpg?crop=0,0,0,0.15488054001243451&cropmode=percentage&width=675&height=380&rnd=132016261740000000"

                  />
                </a>
                <div class="postcard__text t-dark" >
                  <h1 class="postcard__title yellow">
                    <a
                      href="blog-details.html"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      4) Jangka Waktu
                    </a>
                  </h1>

                  <div class="postcard__bar"></div>
                  <div class="postcard__preview-txt">
                    {" "}
                    <h4></h4>
                    <p style={{ textAlign: "justify" }}>
                      Dalam jangka waktu 10 hari kerja, pemohon menerima
                      pemberitahuan tertulis dari PPID
                    </p>
                  </div>
                </div>
              </article>
              <article class="postcard light blue" data-aos="fade-right">
                <a class="postcard__img_link" href="#">
                  <img
                    class="postcard__img"
                    src="https://cdn0-production-images-kly.akamaized.net/MJN9I-eHhc9eqIzLsqc0-RmOHvk=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4138775/original/064259700_1661740032-close-up-man-sealing-envelope.jpg"

                  />
                </a>
                <div class="postcard__text t-dark" >
                  <h1 class="postcard__title yellow">
                    <a
                      href="blog-details.html"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      5) Menerima Informasi
                    </a>
                  </h1>

                  <div class="postcard__bar"></div>
                  <div class="postcard__preview-txt">
                    {" "}
                    <h4></h4>
                    <p style={{ textAlign: "justify" }}>
                      Pemohon menerima informasi Surat Keputusan PPID tentang
                      penolakan permohonan informasi dari petugas.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PermintaanInformasi;
