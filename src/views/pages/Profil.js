import React, { useEffect } from "react";
import "../../views/pages/Profil.css"
import "../../../src/css/Profil.css";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import AOS from 'aos'

function Profil() {
  const scrollToStrukturOrganisasi = () => {
    const element = document.getElementById("strukturOrganisasi");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    AOS.init();
  },[])
  return (
    <div>
      <Navbar />
      <div className="faq-area pd-top-100 pd-bottom-90">
        <div className="container">
          <div className="row">
            <div data-aos="fade-right" className="col-lg-6 pe-xl-5 align-self-center">
              {/* <div className="section-title mb-0"> */}
              <h2 className="title">Profile</h2>
              <p id="content" className="content"></p>
              <p className="overflow-ellipsis">
                Badan Pengawas Pemilu adalah lembaga negara yang memiliki tugas
                pokok dan fungsi melakukan pengawasan terhadap seluruh tahapan
                pemilihan umum . Melalui website ini, kami akan selalu
                memperbaharui informasi terkait pengawasan dan pemantauan
                pemilu.
              </p>
              <a href="#strukturOrganisasi">
                <button
                id="btn-selanjutnya"
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="collapse"
                  // data-bs-target="#collapseOne"
                  // aria-expanded="true"
                  // aria-controls="collapseOne"
                  onClick={scrollToStrukturOrganisasi}

                >
                  Selanjutnya{" "}
                </button>
              </a>

              {/* </div> */}
              <div className="accordion mt-4" id="accordionExample">
                <div className="accordion-item single-accordion-inner style-2">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      fdprocessedid="ikbz6"
                    >
                      Visi
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                    style={{}}
                  >
                    <div className="accordion-body">
                      Terwujudnya Bawaslu sebagai Lembaga Pengawal Terpercaya
                      dalam Penyelenggaraan Pemilu Demokratis, Bermartabat, dan
                      Berkualitas.
                    </div>
                  </div>
                </div>
                <div className="accordion-item single-accordion-inner style-2">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                      fdprocessedid="2yh8m"
                    >
                      Misi
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                    style={{}}
                  >
                    <div className="accordion-body">
                      <p style={{ color: "white" }}>
                        <ul>
                          <li>
                            Membangun aparatur dan kelembagaan pengawas pemilu
                            yang kuat, mandiri dan solid;
                          </li>
                          <li>
                            Mengembangkan pola dan metode pengawasan yang
                            efektif dan efisien;
                          </li>
                          <li>
                            Memperkuat sistem kontrol nasional dalam satu
                            manajemen pengawasan yang terstruktur, sistematis,
                            dan integratif berbasis teknologi
                          </li>
                          <li>
                            Meningkatkan keterlibatan masyarakat dan peserta
                            pemilu, serta meningkatkan sinergi kelembagaan dalam
                            pengawasan pemilu partisipatif
                          </li>
                          <li>
                            Meningkatkan kepercayaan publik atas kualitas
                            kinerja pengawasan berupa pencegahan dan penindakan,
                            serta penyelesaian sengketa secara cepat, akurat dan
                            transparan
                          </li>
                          <li>
                            Membangun Bawaslu sebagai pusat pembelajaran
                            pengawasan pemilu baik bagi pihak dari dalam negeri
                            maupun pihak dari luar negeri.
                          </li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item single-accordion-inner style-2">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                      fdprocessedid="44ky5w"
                    >
                      Tugas, Fungsi dan Wewenang
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p style={{ color: "white" }}>
                        <ul>
                          <li>
                            Menyediakan, menyimpan, mendokumentasikan dan
                            mengamankan informasi
                          </li>
                          <li>
                            Memberikan layanan informasi publik yang cepat,
                            tepat, efisien dan gratis
                          </li>
                          <li>
                            Menyusun dan menetapkan standar operasional prosedur
                            (SOP) informasi publik
                          </li>
                          <li>
                            Melakukan klasifikasi terhadap informasi dan/atau
                            pengubahannya
                          </li>
                          <li>
                            Menetapkan informasi yang dikecualikan yang telah
                            habis jangka waktu pengecualiannya sebagai informasi
                            yang dapat diakses dan
                          </li>
                          <li>
                            Menetapkan pertimbangan tertulis atas setiap
                            kebijakan yang diambil untuk memenuhi hak setiap
                            orang atas informasi publik
                          </li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
          data-aos="fade-left" className="col-lg-6 mt-4 mt-lg-0 img-profil">
              <img
                src="https://img.freepik.com/free-vector/profile-data-concept-illustration_114360-2770.jpg?size=626&ext=jpg&ga=GA1.1.1464020286.1696819460&semt=sph"

              />
            </div>
          </div>
        </div>
      </div>
      <div id="strukturOrganisasi" className="row pd-top-110" style={{ background: "#F1F6F9" }}>
        <div
          data-aos="fade-right" className="col-lg-6 col-md-9 px-xl-5 align-self-center">
          <div className="container thumb mb-4 mb-lg-0 img-profil                                                                                                                           ">
            <img
              style={{ borderRadius: "10px" }}
              src="https://lp2m.uma.ac.id/wp-content/uploads/2022/02/OrganisasiUMA.jpg"

            />
            {/*  */}
          </div>
        </div>
        <div
          data-aos="fade-left" className="p-5 col-lg-5 align-self-center"  id="strukturOrganisasi">
          <div className="section-title">
            <h2 className="title mb-4">Struktur Organisasi</h2>
            <p>
              Tim Pelaksana Pejabat Pengelola Informasi Dan Dokumentasi Bawaslu
              Kabupaten Boyolali.
            </p>
          </div>
          <div id="singel-security" className="single-security-wrap-2 keterangan">
            <div id="img-struktur" className="thumb border-bottom d-lg-flex d-md-none d-none">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"

              />
            </div>
            <div className="details">
              <h5>Pembina</h5>
              <p className="fs-4">Taryono, SH.</p>
              <p>Ketua Bawaslu Kabupaten Boyolali</p>
            </div>
          </div>
          <div id="singel-security" className="single-security-wrap-2 keterangan">
            <div id="img-struktur" className="thumb border-bottom d-lg-flex d-md-none d-none">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"

              />
            </div>
            <div className="details">
              <h5>Atasan PPID</h5>
              <p className="fs-4">Wiyanto, S.Sos., MM.</p>
              <p>Koordinator Seketariat Bawaslu Kabupaten Boyolali. </p>
            </div>
          </div>
          <div id="singel-security" className="single-security-wrap-2 keterangan">
            <div id="img-struktur"  className="thumb border-bottom d-lg-flex d-md-none d-none">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"

              />
            </div>
            <div className="details">
              <h5>Tim Pertimbangan</h5>
              <p className="fs-4">
                Widodo, SH., MH. / Puspaningrum ,SH., MH. / Muhammad Mahmudi,
                S.Ag., MH. / Rubiyanto, S.Sos.I.
              </p>
              <p>Anggota Bawaslu Kabupaten Boyolali</p>
            </div>
          </div>
          <div id="singel-security" className="single-security-wrap-2 keterangan">
            <div  id="img-struktur"  className="thumb d-lg-flex d-md-none d-none">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"

              />
            </div>
            <div className="details">
              <h5>Petugas Layanan Informasi</h5>
              <p className="fs-4">
                Nanang Setyawan, SH. / Isnah Nur Faizah ,SH. / Totok Nugroho,
                A.Md.Kom.
              </p>
              <p>Staf Bawaslu Kabupaten Boyolali</p>
            </div>
          </div>
        </div>
      </div>

      <div className="how-it-work-area pd-top-100 pd-bottom-90">
        <div className="container">
          <div className="row justify-content-center">
            <div data-aos="fade-up"
     data-aos-anchor-placement="bottom-bottom" className="col-lg-6 col-md-10">
              <div className="section-title text-center">
                <h5 className="sub-title double-border">Bawaslu Boyolali</h5>
                <h2 className="title">PPID</h2>
              </div>
            </div>
          </div>
          <div data-aos="fade-up"
     data-aos-anchor-placement="bottom-bottom" className="how-it-work-inner">
            <img
              className="hills-line"
              src="https://solverwp.com/demo/html/itechie/assets/img/shape/1.webp"

            />
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="single-work-inner style-three text-center">
                  <div className="count-inner">
                    <i className="fa-solid fa-1"></i>
                  </div>
                  <div className="details-wrap">
                    <div className="details-inner">
                      <h4>Informasi Serta Merta</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="single-work-inner style-three text-center">
                  <div className="count-inner">
                    <i className="fa-solid fa-2"></i>
                  </div>
                  <div className="details-wrap">
                    <div className="details-inner">
                      <h4>Informasi Berkala</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="single-work-inner style-three text-center">
                  <div className="count-inner">
                    <i className="fa-solid fa-3"></i>
                  </div>
                  <div className="details-wrap">
                    <div className="details-inner">
                      <h4>Informasi Setiap Saat</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="single-work-inner style-three text-center">
                  <div className="count-inner">
                    <i className="fa-solid fa-4"></i>
                  </div>
                  <div className="details-wrap">
                    <div className="details-inner">
                      <h4>Informasi DIkecualikan</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profil;
