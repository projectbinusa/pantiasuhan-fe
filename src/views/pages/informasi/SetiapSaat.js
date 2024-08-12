import React, { useEffect, useRef, useState } from "react";
import Footer from "../../../component/Footer";
import Navbar from "../../../component/Navbar";
import OrganisasiDanAdministrasiSetiapSaat from "./tabs/SetiapSaat/OrganisasiDanAdminsitrasiSetiapSaat";
import PeraturanDanKebijakan from "./tabs/SetiapSaat/PeraturanDanKebijakan";
import MOU from "./tabs/SetiapSaat/MOU";
import RencanaStrategi from "./tabs/SetiapSaat/RencanaStrategi";
import MateriRakor from "./tabs/SetiapSaat/MateriRakor";
import PiagamSetiapSaat from "./tabs/SetiapSaat/PiagamSetiapSaat";
import PemantauPemilu from "./tabs/SetiapSaat/PemantauPemilu";
import AOS from "aos";

function SetiapSaat() {
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
                <div className="col-md-3" data-aos="fade-right">
                  <div
                    className="nav flex-column nav-pills nav-pills-custom"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      className="nav-link mb-3 p-3 shadow active"
                      id="v-pills-organisasi-tab"
                      data-toggle="pill"
                      href="#v-pills-organisasi"
                      role="tab"
                      aria-controls="v-pills-organisasi"
                      aria-selected="true"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Organisasi & Administrasi
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-peraturan-tab"
                      data-toggle="pill"
                      href="#v-pills-peraturan"
                      role="tab"
                      aria-controls="v-pills-peraturan"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Peraturan Dan Kebijakan
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-mou-tab"
                      data-toggle="pill"
                      href="#v-pills-mou"
                      role="tab"
                      aria-controls="v-pills-mou"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        MOU
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-pemantau-tab"
                      data-toggle="pill"
                      href="#v-pills-pemantau"
                      role="tab"
                      aria-controls="v-pills-pemantau"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Pemantau Pemilu
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-rencana-tab"
                      data-toggle="pill"
                      href="#v-pills-rencana"
                      role="tab"
                      aria-controls="v-pills-rencana"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Rencana Strategi
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-materi-tab"
                      data-toggle="pill"
                      href="#v-pills-materi"
                      role="tab"
                      aria-controls="v-pills-materi"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Materi Rakor
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
                          <h4>Informasi Setiap Saat</h4>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white show active p-3"
                      id="v-pills-home"
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                    >
                      <OrganisasiDanAdministrasiSetiapSaat />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-peraturan"
                      aria-labelledby="v-pills-peraturan-tab"
                    >
                      <PeraturanDanKebijakan />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-mou"
                      role="tabpanel"
                      aria-labelledby="v-pills-mou-tab"
                    >
                      <MOU />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-pemantau"
                      role="tabpanel"
                      aria-labelledby="v-pills-pemantau-tab"
                    >
                      <PemantauPemilu />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-rencana"
                      role="tabpanel"
                      aria-labelledby="v-pills-rencana-tab"
                    >
                      <RencanaStrategi />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-materi"
                      role="tabpanel"
                      aria-labelledby="v-pills-materi-tab"
                    >
                      <MateriRakor />
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-piagam"
                      role="tabpanel"
                      aria-labelledby="v-pills-piagam-tab"
                    >
                      <PiagamSetiapSaat />
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

export default SetiapSaat;
