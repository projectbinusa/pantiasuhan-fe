import React, { useEffect, useRef, useState } from "react";
import Footer from "../../../component/Footer";
import Navbar from "../../../component/Navbar";
import PutusanPelanggaran from "./tabs/SertaMerta/PutusanPelanggaran";
import SengketaProsesPemilu from "./tabs/SertaMerta/SengketaProsesPemilu";
import PemungutanSuaraUlang from "./tabs/SertaMerta/PemungutanSuaraUlang";
import OrganisasiDanAdministrasi from "./tabs/SertaMerta/OrganisasiDanAdministrasi";
import Sosialisasi from "./tabs/SertaMerta/Sosialisasi";
import PerselisihanHasilPemilu from "./tabs/SertaMerta/PerselisihanHasilPemilu";
import Piagam from "./tabs/SertaMerta/Piagam";
import AOS from "aos";


function SertaMerta() {

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
                      id="v-pills-putusan-tab"
                      data-toggle="pill"
                      href="#v-pills-putusan"
                      role="tab"
                      aria-controls="v-pills-putusan"
                      aria-selected="true"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Putusan Pelanggaran
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-sengketa-tab"
                      data-toggle="pill"
                      href="#v-pills-sengketa"
                      role="tab"
                      aria-controls="v-pills-sengketa"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Sengketa Proses Pemilu
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-pemungutan-tab"
                      data-toggle="pill"
                      href="#v-pills-pemungutan"
                      role="tab"
                      aria-controls="v-pills-pemungutan"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Pemungutan Suara Ulang & Susulan
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-organisasi-tab"
                      data-toggle="pill"
                      href="#v-pills-organisasi"
                      role="tab"
                      aria-controls="v-pills-organisasi"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Organisasi dan Administrasi
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-perselisihan-tab"
                      data-toggle="pill"
                      href="#v-pills-perselisihan"
                      role="tab"
                      aria-controls="v-pills-perselisihan"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Perselisihan Hasil Pemilihan Umum
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
                  </div>
                </div>



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
                          <h4>Informasi Serta Mertaa</h4>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white show active p-3"
                      id="v-pills-putusan"
                      role="tabpanel"
                      aria-labelledby="v-pills-putusan-tab"
                    >
                      <PutusanPelanggaran />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-sengketa"
                      role="tabpanel"
                      aria-labelledby="v-pills-sengketa-tab"
                    >
                      <SengketaProsesPemilu />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-pemungutan"
                      role="tabpanel"
                      aria-labelledby="v-pills-pemungutan-tab"
                    >
                      <PemungutanSuaraUlang />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-organisasi"
                      role="tabpanel"
                      aria-labelledby="v-pills-organisasi-tab"
                    >
                      <OrganisasiDanAdministrasi />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-perselisihan"
                      role="tabpanel"
                      aria-labelledby="v-pills-perselisihan-tab"
                    >
                      <PerselisihanHasilPemilu />
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
                      id="v-pills-piagam"
                      role="tabpanel"
                      aria-labelledby="v-pills-piagam-tab"
                    >
                      <Piagam />
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

export default SertaMerta;
