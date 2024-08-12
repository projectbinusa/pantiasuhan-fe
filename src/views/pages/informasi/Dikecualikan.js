import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import folder from "../../../aset/folder.png";
import informasi from "../../../aset/informasi.svg";
import "../../../css/dikecualikan.css";
import axios from "axios";
import AOS from "aos";
import { API_DUMMY } from "../../../utils/base_URL";
import bawasluRI from "../../../aset/Bawaslu-RI-300x73-1.png"
import dkpp from "../../../aset/dkpp-300x73-1.png"
import mahkamah from "../../../aset/MAHKAMAKONSTITUSI-300x73-1.png"
import kpu from "../../../aset/KPU-300x73-1.png"
import bawasluJateng from "../../../aset/bawaslu-jateng-300x73-1.png"



function Dikecualikan() {
  const [data, setData] = useState([]);

  useEffect(() => {
    AOS.init();
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/bawaslu/api/jenis-keterangan/39/isi-informasi?page=0&size=10&sortBy=id&sortOrder=desc`
        );
        setData(response.data.data.content); // Mengasumsikan properti data berisi array informasi
        console.log(response.data.data.content); // Mengasumsikan properti data berisi array informasi
      } catch (error) {
        console.error("Error saat mengambil data:", error);
      }
    };

    fetchData();
  }, []); // Array dependensi kosong agar data diambil hanya sekali saat komponen dimuat

  return (
    <div>
      <Navbar />
      <div
        className="team-details-page pd-top-120 service-area bg-relative pd-top-60 pd-bottom-90 "
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
        <div className="form1 text-center mt-0"  data-aos="fade-up">
          <div className="form-permohonan section-title text-center">
            <h5 id="text1-gabung" className="sub-title double-line text-center">
              Bawaslu Boyolali
            </h5>
            <h2 id="text2-gabung" className="title text-center">
              Informasi Dikecualikan
            </h2>
            {/* <p className="content">Dcidunt eget semper nec quam. Sed hendrerit. acfelis Nunc egestas augue
                        atpellentesque laoreet</p> */}
          </div>
          {/* <div className="info">
              <img src={info} className="img" id="img" />
            </div> */}
        </div>
        {/* <div
        className="img-top d-flex col-lg-5 col-10 about-area pd-bottom-10 service-area bg-relative pd-top-10 "
        style={{
          backgroundImage: `url('https://img.freepik.com/free-vector/white-elegant-texture-background_23-2148430934.jpg?w=740&t=st=1698973959~exp=1698974559~hmac=418240e9f8d698b9b7f2c0907f5c8e0013885b44976fa36e713b8801491993db')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div>
          <div className="textIcon row">
            <a href={data.pdfDokumen}>
              <div className="col-3">
                <h5 className="text-decoration-none text-dark h4-text">
                  <div>
                    <img src={folder}  />
                  </div>{" "}
                  PENETAPAN PPID PENGECUALIAN INFORMASI PENYELESAIAN SENGKETA
                  PEMILIHAN
                </h5>
              </div>
            </a>
          </div>
          <div></div>
        </div>
      </div> */}
        <div className="style-logo">
          <div class="row d-row-none pmbngks-txt-folder">
            {data.map((item) => {
              return(
                <React.Fragment key={item.id}>
                  <div class="d-flex col-lg-5 col-10  shadow  p-25 hover-up-2 transition-normal mb-30 border-radius-10 folder-txt">
                    <a href={item.pdfDokumen}>
                      <div class="post-thumb mr-15 img-hover-scale overflow-hidden">
                        <img src={folder} width="50" />
                      </div>
                    </a>

                    <div class="post-content media-body">
                      <a
                        href={item.pdfDokumen}
                        target="_blank"
                      ></a>
                      <h6>
                        <a
                          href="https://drive.google.com/file/d/1mW-PRMO3mxAl5kWy9U_2cSjoFVTWyD8E/view"
                          target="_blank"
                        ></a>
                        <a
                          href={item.pdfDokumen}
                          target="_blank"
                          style={{ color: "black" }}
                        >
                          {item.dokumen}
                        </a>
                      </h6>
                      <span class="text-muted font-small">
                        Bawaslu Boyolali
                      </span>
                    </div>
                  </div>
                </React.Fragment>
              )})}
          </div>
          <div
              data-aos="fade-left"
              className="col-lg-4 col-md-12 widget widget_catagory  tautan-lembaga-rspnv"
              style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                padding: "30px",
                borderRadius: "10px",
                background: "#F1F6F9",
                float: "inline-end",
                background:" rgb(241, 246, 249)",
                 border: "1px solid blue", boxShadow: "rgba(47, 60, 95, 0.24) 0px 6px 10px"

              }}
            >
              <h4 className="widget-title">
              <i class="fa-regular fa-file-lines"></i> {" "}
                Tautan{" "}
                <span className="text-primary">
                  <strong>Lembaga</strong>
                </span>
              </h4>
              <br />
              <ul className="catagory-items">
                <li>
                  <a
                    href="https://bawaslu.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={bawasluRI}

                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://dkpp.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={dkpp}

                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.mkri.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={mahkamah}

                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://jateng.bawaslu.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={kpu}

                    />
                  </a>
                </li>
                <li>
                  <a href="https://jateng.bawaslu.go.id/" target="_blank">
                    <img
                      src={bawasluJateng}

                    />
                  </a>
                </li>
              </ul>
            </div>
          {/*  */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Dikecualikan;
