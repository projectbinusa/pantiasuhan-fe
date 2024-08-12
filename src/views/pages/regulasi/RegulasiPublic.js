import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../../component/Navbar";
import UndangUndang from "./tabs/regulasi/UndangUndang";
import Footer from "../../../component/Footer";
import PeraturanPemerintah from "./tabs/regulasi/PeraturanPemerintah";
import PeraturanMahkamahAgung from "./tabs/regulasi/PeraturanMahkamahAgung";
import PeraturanKomisiInformasi from "./tabs/regulasi/PeraturanKomisiInformasi";
import PeraturanMenteri from "./tabs/regulasi/PeraturanMenteri";
import Perbawaslu from "./tabs/regulasi/Perbawaslu";
import PenetapanPPID from "./tabs/regulasi/PenetapanPPID";
import SuratEdaran from "./tabs/regulasi/SuratEdaran";
import InstruksiKabupaten from "./tabs/regulasi/InstruksiKabupaten";
import AOS from "aos";

function RegulasiPublic() {
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
                <div className="col-md-3"  data-aos="fade-right">
                  <div
                    className="nav flex-column nav-pills nav-pills-custom"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      className="nav-link mb-3 p-3 shadow active"
                      id="v-pills-home-tab"
                      data-toggle="pill"
                      href="#v-pills-home"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Undang-Undang
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-profile-tab"
                      data-toggle="pill"
                      href="#v-pills-profile"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Peraturan Pemerintah
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-messages-tab"
                      data-toggle="pill"
                      href="#v-pills-messages"
                      role="tab"
                      aria-controls="v-pills-messages"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Peraturan Mahkamah Agung
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-profile-tab"
                      data-toggle="pill"
                      href="#v-pills-profile"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Peraturan Komisi Informasi
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-pm-tab"
                      data-toggle="pill"
                      href="#v-pills-pm"
                      role="tab"
                      aria-controls="v-pills-pm"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Peraturan Menteri
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-perbawaslu-tab"
                      data-toggle="pill"
                      href="#v-pills-perbawaslu"
                      role="tab"
                      aria-controls="v-pills-perbawaslu"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Perbawaslu
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-ppid-tab"
                      data-toggle="pill"
                      href="#v-pills-ppid"
                      role="tab"
                      aria-controls="v-pills-ppid"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Penetapan PPID
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-se-tab"
                      data-toggle="pill"
                      href="#v-pills-se"
                      role="tab"
                      aria-controls="v-pills-se"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Surat Edaran
                      </span>
                    </a>

                    <a
                      className="nav-link mb-3 p-3 shadow"
                      id="v-pills-ik-tab"
                      data-toggle="pill"
                      href="#v-pills-ik"
                      role="tab"
                      aria-controls="v-pills-ik"
                      aria-selected="false"
                    >
                      <span className="font-weight-bold small text-uppercase">
                        Instruksi Kabupaten
                      </span>
                    </a>
                  </div>
                </div>

                <div className="col-md-9">
                  <div className="tab-content" id="v-pills-tabContent"   data-aos="fade-left">
                    <div className="card-header bg-primary text-light" style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                      <div style={{ display: "flex" }}>
                        <div className="px-3">
                          <h4>Regulasi</h4>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade shadow rounded bg-white show active p-3"
                      id="v-pills-home"
                      role="tabpanel"
                      aria-labelledby="v-pills-home-tab"
                    >
                      <UndangUndang />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-profile"
                      role="tabpanel"
                      aria-labelledby="v-pills-profile-tab"
                    >
                      <PeraturanPemerintah />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-messages"
                      role="tabpanel"
                      aria-labelledby="v-pills-messages-tab"
                    >
                      <PeraturanMahkamahAgung />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-settings"
                      role="tabpanel"
                      aria-labelledby="v-pills-settings-tab"
                    >
                      <PeraturanKomisiInformasi />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-pm"
                      role="tabpanel"
                      aria-labelledby="v-pills-pm-tab"
                    >
                      <PeraturanMenteri />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-perbawaslu"
                      role="tabpanel"
                      aria-labelledby="v-pills-perbawaslu-tab"
                    >
                      <Perbawaslu />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-ppid"
                      role="tabpanel"
                      aria-labelledby="v-pills-ppid-tab"
                    >
                      <PenetapanPPID />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-se"
                      role="tabpanel"
                      aria-labelledby="v-pills-se-tab"
                    >
                      <SuratEdaran />
                    </div>

                    <div
                      className="tab-pane fade shadow rounded bg-white p-3"
                      id="v-pills-ik"
                      role="tabpanel"
                      aria-labelledby="v-pills-ik-tab"
                    >
                      <InstruksiKabupaten />
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

export default RegulasiPublic;
