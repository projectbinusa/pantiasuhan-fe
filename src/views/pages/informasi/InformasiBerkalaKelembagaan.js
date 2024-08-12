import React, { useEffect, useRef, useState } from "react";
import Footer from "../../../component/Footer";
import Navbar from "../../../component/Navbar";

import html2canvas from "html2canvas";
import gambar from "../../../asset/img/bawaslu(berita).jpeg";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import PutusanPelanggaran from "./tabs/SertaMerta/PutusanPelanggaran";
import ProfileBawaslu from "./tabs/Berkala/kelembagaan/ProfileBawaslu";
import LayananPublikKhusus from "./tabs/Berkala/kelembagaan/LayananPublikKhusus";
import ProgramKerja from "./tabs/Berkala/kelembagaan/ProgramKerja";
import RingkasanKegiatan from "./tabs/Berkala/kelembagaan/RingkasanKegiatan";
import SumberDanAnggaranKegiatan from "./tabs/Berkala/kelembagaan/SumberDanAnggaranKegiatan";
import Keuanganbawaslu from "./tabs/Berkala/kelembagaan/Keuanganbawaslu";
import LayananInformasiPublik from "./tabs/Berkala/kelembagaan/LayananInformasiPublik";
import Sosialisasi from "./tabs/Berkala/kelembagaan/Sosialisasi";
import SDM from "./tabs/Berkala/kelembagaan/SDM";
import LaporanBarangNegara from "./tabs/Berkala/kelembagaan/LaporanBarangNegara";
import NaskahPerjanjianHibahDaerah from "./tabs/Berkala/kepemiluan/NaskahPerjanjianHibahDaerah";
import PiagamPenghargaaan from "./tabs/Berkala/kelembagaan/PiagamPenghargaaan";
import LaporanRealisasi from "./tabs/Berkala/kelembagaan/LaporanRealisasi";
import PerjanjianKinerja from "./tabs/Berkala/kelembagaan/PerjanjianKinerja";
import RencanaKerjaAnggaran from "./tabs/Berkala/kelembagaan/RencanaKerjaAnggaran";
import Tapkin from "./tabs/Berkala/kelembagaan/Tapkin";
import PengadaanBarang from "./tabs/Berkala/kelembagaan/PengadaanBarang";
import AOS from "aos";
import "../../../css/gabung.css"

function InformasiBerkalaKelembagaan() {
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

                <div className="col-md-3" data-aos="fade-right">

                  <div
                    className="nav flex-column nav-pills nav-pills-custom"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"

                  >

                    <a
                      className="nav-link mb-3 p-3 shadow active"
                      id="v-pills-profile-tab"
                      data-toggle="pill"
                      href="#v-pills-profile"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="true"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Profile Bawaslu
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-khusus-tab"
                      data-toggle="pill"
                      href="#v-pills-khusus"
                      role="tab"
                      aria-controls="v-pills-khusus"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Layanan Publik Khusus
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-program-tab"
                      data-toggle="pill"
                      href="#v-pills-program"
                      role="tab"
                      aria-controls="v-pills-program"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Program Kerja
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-ringkasan-tab"
                      data-toggle="pill"
                      href="#v-pills-ringkasan"
                      role="tab"
                      aria-controls="v-pills-ringkasan"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Ringkasan Kegiatan
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-sumber-tab"
                      data-toggle="pill"
                      href="#v-pills-sumber"
                      role="tab"
                      aria-controls="v-pills-sumber"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Sumber & Anggaran Kegiatan
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-keuangan-tab"
                      data-toggle="pill"
                      href="#v-pills-keuangan"
                      role="tab"
                      aria-controls="v-pills-keuangan"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Keuangan Bawaslu
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
                        Layanan Informasi Publik
                      </span>
                    </a>
                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-sosialisasi-tab"
                      data-toggle="pill"
                      href="#v-pills-sosialisasi"
                      role="tab"
                      aria-controls="v-pills-sosialisasi"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Sosialisasi
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
                        SDM, Organisasi, & Adminsitrasi
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
                        Laporan Barang Milik Negara
                      </span>
                    </a>
                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-perjanjian-tab"
                      data-toggle="pill"
                      href="#v-pills-perjanjian"
                      role="tab"
                      aria-controls="v-pills-perjanjian"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Perjanjian Kinerja
                      </span>
                    </a>
                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-tapkin-tab"
                      data-toggle="pill"
                      href="#v-pills-tapkin"
                      role="tab"
                      aria-controls="v-pills-tapkin"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        TAPKIN
                      </span>
                    </a>
                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-pengadaan-tab"
                      data-toggle="pill"
                      href="#v-pills-pengadaan"
                      role="tab"
                      aria-controls="v-pills-pengadaan"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Pengadaan Barang & Jasa
                      </span>
                    </a>
                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-realisasi-tab"
                      data-toggle="pill"
                      href="#v-pills-realisasi"
                      role="tab"
                      aria-controls="v-pills-realisasi"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Laporan Realisasi Anggaran
                      </span>
                    </a>
                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-piagam-tab"
                      data-toggle="pill"
                      href="#v-pills-piagam"
                      role="tab"
                      aria-controls="v-pills-piagam"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Piagam Penghargaan
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

                <div className="col-md-9" data-aos="fade-left">
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
                          <h4>Informasi Berkala Kelembagaan</h4>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white show active p-3"
                      id="v-pills-profile"
                      role="tabpanel"
                      aria-labelledby="v-pills-profile-tab"
                    >
                      <ProfileBawaslu />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-khusus"
                      role="tabpanel"
                      aria-labelledby="v-pills-khusus-tab"
                    >
                      <LayananPublikKhusus />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-program"
                      role="tabpanel"
                      aria-labelledby="v-pills-program-tab"
                    >
                      <ProgramKerja />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-ringkasan"
                      role="tabpanel"
                      aria-labelledby="v-pills-ringkasan-tab"
                    >
                      <RingkasanKegiatan />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-sumber"
                      role="tabpanel"
                      aria-labelledby="v-pills-sumber-tab"
                    >
                      <SumberDanAnggaranKegiatan />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-keuangan"
                      role="tabpanel"
                      aria-labelledby="v-pills-keuangan-tab"
                    >
                      <Keuanganbawaslu />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-layanan"
                      role="tabpanel"
                      aria-labelledby="v-pills-layanan-tab"
                    >
                      <LayananInformasiPublik />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-sosialisasi"
                      role="tabpanel"
                      aria-labelledby="v-pills-sosialisasi-tab"
                    >
                      <Sosialisasi />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-sdm"
                      role="tabpanel"
                      aria-labelledby="v-pills-sdm-tab"
                    >
                      <SDM />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-laporan"
                      role="tabpanel"
                      aria-labelledby="v-pills-laporan-tab"
                    >
                      <LaporanBarangNegara />
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
                      id="v-pills-piagam"
                      role="tabpanel"
                      aria-labelledby="v-pills-piagam-tab"
                    >
                      <PiagamPenghargaaan />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-realisasi"
                      role="tabpanel"
                      aria-labelledby="v-pills-realisasi-tab"
                    >
                      <LaporanRealisasi />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-perjanjian"
                      role="tabpanel"
                      aria-labelledby="v-pills-perjanjian-tab"
                    >
                      <PerjanjianKinerja />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-ringkasan"
                      role="tabpanel"
                      aria-labelledby="v-pills-ringkasan-tab"
                    >
                      <RingkasanKegiatan />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-rencana"
                      role="tabpanel"
                      aria-labelledby="v-pills-rencana-tab"
                    >
                      <RencanaKerjaAnggaran />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-tapkin"
                      role="tabpanel"
                      aria-labelledby="v-pills-tapkin-tab"
                    >
                      <Tapkin />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-pengadaan"
                      role="tabpanel"
                      aria-labelledby="v-pills-pengadaan-tab"
                    >
                      <PengadaanBarang />
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

export default InformasiBerkalaKelembagaan;
