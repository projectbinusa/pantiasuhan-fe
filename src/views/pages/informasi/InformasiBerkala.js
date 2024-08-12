import React, { useEffect, useRef, useState } from "react";
import Footer from "../../../component/Footer";
import Navbar from "../../../component/Navbar";

import "../../../css/berkala.css";

import html2canvas from "html2canvas";
import gambar from "../../../asset/img/bawaslu(berita).jpeg";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import PutusanPelanggaran from "./tabs/SertaMerta/PutusanPelanggaran";
import AOS from "aos";

function InformasiBerkala() {
  useEffect(() => {
    AOS.init();
  },[]);
  return (
    <div>
      <Navbar />

      {/* <!-- project area start --> */}
      <div
        style={{
          backgroundImage: "url('https://img.freepik.com/free-vector/white-elegant-texture-background_23-2148430934.jpg?w=740&t=st=1698973959~exp=1698974559~hmac=418240e9f8d698b9b7f2c0907f5c8e0013885b44976fa36e713b8801491993db')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="project-area pd-top-115 pd-bottom-90"
      >
        <div
          style={{
            backgroundImage: "url('https://www.solverwp.com/demo/html/itechie/assets/img/bg/1.webp')" ,
          }}
        >
          <div className="container p-5 text-center">
            <h1 className="text-center p-5"  data-aos="fade-up">Informasi Berkala</h1>
            <div className="row justify-content-center align-items-center">
              <div className="row justify-content-center align-items-center">
                <a  data-aos="fade-right"
                  id="btn1"
                  className="col-5 btn btn-primary text-center d-flex align-items-center px-2"
                  href="/informasi-berkala-kepemiluan"
                >
                  <span className="mx-auto kelembagaan-btn">Kepemiluan</span>
                </a>

                <div className="col-2 text-center text-white"></div>
                <a
                 data-aos="fade-left"
                  id="btn2"
                  className="col-5 btn btn-primary text-center d-flex align-items-center px-2"
                  href="/informasi-berkala-kelembagaan"
                >
                  <span className="mx-auto kelambagaan-btn">Kelembagaan</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default InformasiBerkala;
