import React, { useEffect, useRef, useState } from "react";
import Footer from "../../../component/Footer";
import Navbar from "../../../component/Navbar";

import html2canvas from "html2canvas";
import gambar from "../../../asset/img/bawaslu(berita).jpeg";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import PutusanPelanggaran from "./tabs/SertaMerta/PutusanPelanggaran";
import HasilPengawasan from "./tabs/Berkala/kepemiluan/HasilPengawasan";
import AnalisaCalonTerpilih from "./tabs/Berkala/kepemiluan/AnalisaCalonTerpilih";
import LaporanAkhirPengawasan from "./tabs/Berkala/kepemiluan/LaporanAkhirPengawasan";
import PenangananPelanggaran from "./tabs/Berkala/kepemiluan/PenangananPelanggaran";
import NaskahPerjanjianHibahDaerah from "./tabs/Berkala/kepemiluan/NaskahPerjanjianHibahDaerah";
import LayananPengaduanPolitik from "./tabs/Berkala/kepemiluan/LayananPengaduanPolitik";
import SaranaPartisipasiPublik from "./tabs/Berkala/kepemiluan/SaranaPartisipasiPublik";
import AOS from "aos";

function InformasiBerkalaKepemiluan() {
  useEffect(() => {
    AOS.init();
  },[]);
  return (
    <div>
      <Navbar />

      {/* <!-- project area start --> */}
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
            <a
                href="/informasi-berkala"
                className="d-lg-none d-md-none d-flex w-100 posisi"
                style={{ fontSize: "34px", color: "black" , paddingBottom:"10px", textDecoration:"none"}}
              >
                <i className="fas fa-chevron-left"></i>
              </a>
              <div className="row">
                <div className="col-md-3"  data-aos="fade-right">
                  <div
                    className="nav flex-column nav-pills nav-pills-custom"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      className="nav-link mb-3 p-3 shadow active"
                      id="v-pills-hasil-tab"
                      data-toggle="pill"
                      href="#v-pills-hasil"
                      role="tab"
                      aria-controls="v-pills-hasil"
                      aria-selected="true"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Hasil Pengawasan
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-analisa-tab"
                      data-toggle="pill"
                      href="#v-pills-analisa"
                      role="tab"
                      aria-controls="v-pills-analisa"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Analisa Calon Terpilih
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-laporan-tab"
                      data-toggle="pill"
                      href="#v-pills-laporan"
                      role="tab"
                      aria-controls="v-pills-laporan"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Laporan Akhir Pengawasan
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-penanganan-tab"
                      data-toggle="pill"
                      href="#v-pills-penanganan"
                      role="tab"
                      aria-controls="v-pills-penanganan"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Penanganan Pelanggaran
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-naskah-tab"
                      data-toggle="pill"
                      href="#v-pills-naskah"
                      role="tab"
                      aria-controls="v-pills-naskah"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Naskah Perjanjian Hibah Daerah
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-layanan-tab"
                      data-toggle="pill"
                      href="#v-pills-layanan"
                      role="tab"
                      aria-controls="v-pills-layanan"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Layanan Pengaduan Politik
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-sarana-tab"
                      data-toggle="pill"
                      href="#v-pills-sarana"
                      role="tab"
                      aria-controls="v-pills-sarana"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Sarana partisipasi Publik
                      </span>
                    </a>
                    <a
                      className="btn btn-primary mb-3 p-3 shadow d-lg-flex d-md-flex d-none" style={{textDecoration:"none",textAlign:"center"}}
                      href="/informasi-berkala"

                    >

                      <span className="font-weight-bold small text-uppercase">

                      Kembali
                      </span>
                  </a>
                  </div>
                </div>
{/*  */}
                <div className="col-md-9"  data-aos="fade-left">
                  <div className="tab-content" id="v-pills-tabContent">
                    <div
                      className="card-header w-auto bg-primary text-light"
                      style={{
                        borderTopLeftRadius: "5px",
                        borderTopRightRadius: "5px",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <div className="px-3">
                          <h4>Informasi Berkala Kepemiluan</h4>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white show active p-3"
                      id="v-pills-hasil"
                      role="tabpanel"
                      aria-labelledby="v-pills-hasil-tab"
                    >
                      <HasilPengawasan />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-analisa"
                      role="tabpanel"
                      aria-labelledby="v-pills-analisa-tab"
                    >
                      <AnalisaCalonTerpilih />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-laporan"
                      role="tabpanel"
                      aria-labelledby="v-pills-laporan-tab"
                    >
                      <LaporanAkhirPengawasan />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-penanganan"
                      role="tabpanel"
                      aria-labelledby="v-pills-penanganan-tab"
                    >
                      <PenangananPelanggaran />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-naskah"
                      role="tabpanel"
                      aria-labelledby="v-pills-naskah-tab"
                    >
                      <NaskahPerjanjianHibahDaerah />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-layanan"
                      role="tabpanel"
                      aria-labelledby="v-pills-layanan-tab"
                    >
                      <LayananPengaduanPolitik />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-putusan"
                      role="tabpanel"
                      aria-labelledby="v-pills-putusan-tab"
                    >
                      <PutusanPelanggaran />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-sarana"
                      role="tabpanel"
                      aria-labelledby="v-pills-sarana-tab"
                    >
                      <SaranaPartisipasiPublik />
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

export default InformasiBerkalaKepemiluan;
