import React, { useEffect, useRef, useState } from "react";
import Footer from "../../../component/Footer";
import Navbar from "../../../component/Navbar";

import html2canvas from "html2canvas";
import gambar from "../../../asset/img/bawaslu(berita).jpeg";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import PutusanPelanggaran from "./tabs/SertaMerta/PutusanPelanggaran";
import SengketaProsesPemilu from "./tabs/SertaMerta/SengketaProsesPemilu";
import PemungutanSuaraUlang from "./tabs/SertaMerta/PemungutanSuaraUlang";
import OrganisasiDanAdministrasi from "./tabs/SertaMerta/OrganisasiDanAdministrasi";
import Sosialisasi from "./tabs/SertaMerta/Sosialisasi";
import PerselisihanHasilPemilu from "./tabs/SertaMerta/PerselisihanHasilPemilu";
import Piagam from "./tabs/SertaMerta/Piagam";
import Imbauan from "./tabs/Kanal/Imbauan";
import Anggaran from "./tabs/Kanal/Anggaran";
import PencegahanDanPenanganan from "./tabs/Kanal/PencegahanDanPenanganan";
import SDMPengawasPemilu from "./tabs/Kanal/SDMPengawasPemilu";
import HasilPengawasan from "./tabs/Kanal/HasilPengawasan";
import SiaranPers from "./tabs/Kanal/SiaranPers";
import Putusan from "./tabs/Kanal/Putusan";
import "../../../css/Kanal.css";
import AOS from "aos";

function Kanal() {
  useEffect(() => {
    AOS.init();
  },[]);
  return (
    <div>
      <Navbar />


      <div
        style={{
          backgroundImage: `url('https://img.freepik.com/free-vector/white-elegant-texture-background_23-2148430934.jpg?w=740&t=st=1698973959~exp=1698974559~hmac=418240e9f8d698b9b7f2c0907f5c8e0013885b44976fa36e713b8801491993db')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="project-area pd-top-115 pd-bottom-90"
      >
        <div
          style={{
            backgroundImage: `url('https://www.solverwp.com/demo/html/itechie/assets/img/bg/1.webp') `,
          }}
        >
          <section>
            <div className="container">
              <div className="row">
                <div
                  data-aos="fade-right"
                  className="col-md-3"
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <div
                    className="nav flex-column nav-pills nav-pills-custom"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      className="nav-link mb-3 p-3 shadow active"
                      id="v-pills-imbauan-tab"
                      data-toggle="pill"
                      href="#v-pills-imbauan"
                      role="tab"
                      aria-controls="v-pills-imbauan"
                      aria-selected="true"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Imbauan
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-anggaran-tab"
                      data-toggle="pill"
                      href="#v-pills-anggaran"
                      role="tab"
                      aria-controls="v-pills-anggaran"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Anggaran
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-pencegahan-tab"
                      data-toggle="pill"
                      href="#v-pills-pencegahan"
                      role="tab"
                      aria-controls="v-pills-pencegahan"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Pencegahan & Penanganan
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-sdm-tab"
                      data-toggle="pill"
                      href="#v-pills-sdm"
                      role="tab"
                      aria-controls="v-pills-sdm"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        SDM Pengawas Pemilu
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-hasil-tab"
                      data-toggle="pill"
                      href="#v-pills-hasil"
                      role="tab"
                      aria-controls="v-pills-hasil"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Hasil Pengawasan
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-siaran-tab"
                      data-toggle="pill"
                      href="#v-pills-siaran"
                      role="tab"
                      aria-controls="v-pills-siaran"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Siaran Pers
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-putusan-tab"
                      data-toggle="pill"
                      href="#v-pills-putusan"
                      role="tab"
                      aria-controls="v-pills-putusan"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Putusan
                      </span>
                    </a>
                  </div>
                </div>

                <div className="col-md-9" data-aos="fade-left">
                  <div className="tab-content" id="v-pills-tabContent">    <div
                    className="card-header w-auto bg-primary text-light"
                    style={{
                      borderTopLeftRadius: "5px",
                      borderTopRightRadius: "5px",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div className="px-3">
                        <h4>Kanal Pengawasan Pemilu</h4>
                      </div>
                    </div>
                  </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white show active p-3"
                      id="v-pills-imbauan"
                      role="tabpanel"
                      aria-labelledby="v-pills-imbauan-tab"
                    >
                      <Imbauan />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-anggaran"
                      role="tabpanel"
                      aria-labelledby="v-pills-anggaran-tab"
                    >
                      <Anggaran />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-pencegahan"
                      role="tabpanel"
                      aria-labelledby="v-pills-pencegahan-tab"
                    >
                      <PencegahanDanPenanganan />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-sdm"
                      role="tabpanel"
                      aria-labelledby="v-pills-sdm-tab"
                    >
                      <SDMPengawasPemilu />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-hasil"
                      role="tabpanel"
                      aria-labelledby="v-pills-hasil-tab"
                    >
                      <HasilPengawasan />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-siaran"
                      role="tabpanel"
                      aria-labelledby="v-pills-siaran-tab"
                    >
                      <SiaranPers />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-putusan"
                      role="tabpanel"
                      aria-labelledby="v-pills-putusan-tab"
                    >
                      <Putusan />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Kanal;
