import React from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import RI from "../../aset/Bawaslu-RI-300x73-1.png";
import jateng from "../../aset/bawaslu-jateng-300x73-1.png";
import dkpp from "../../aset/dkpp-300x73-1.png";
import KPU from "../../aset/KPU-300x73-1.png";
import MAHKAMAH from "../../aset/MAHKAMAKONSTITUSI-300x73-1.png";
import "../../css/tagberita.css";
// import RI from "../../aset/Bawaslu-RI-300x73-1.png";
// import jateng from "../../aset/bawaslu-jateng-300x73-1.png";
// import dkpp from "../../../../aset/dkpp-300x73-1.png";
// import KPU from "../../../../aset/KPU-300x73-1.png";
// import MAHKAMAH from "../../../../aset/MAHKAMAKONSTITUSI-300x73-1.png";

function TagBerita() {
  return (
    <>
      <div>
        <Navbar />
        <div
          style={{
            backgroundImage: `url('https://img.freepik.com/free-vector/white-elegant-texture-background_23-2148430934.jpg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div id="ptop" className="ptop">
            <div id="a-href" className="a-href">
              <div>
                <a id="al-txt" href="/">
                  Home{" "}
                </a>
              </div>
              <div>
                <a id="al-txt" href="">
                  Tag{" "}
                </a>
              </div>
              <div>
                <a id="al-txt" href="tag-berita">
                  Kampanye{" "}
                </a>
              </div>
            </div>
            <div id="pmbngks-txt-logo" className="pmbngks-txt-logo gbngan">
              <div id="txt-kehumasan" className="txt-kehumasan">
                <div>
                  <h1 style={{ textAlign: "left" }}>Tag : Kampanye Pemilu</h1>

                  <br />
                  <div id="gabungin" className="gabungin">
                    <div id="txt-gray" className="txt-gray bukan-text">
                      <img
                        className="img-tag"
                        src="https://i0.wp.com/fahum.umsu.ac.id/wp-content/uploads/2023/07/apa-itu-kampanye-sejarah-perkembangan-dan-jenisnya.jpg?resize=700%2C375&ssl=1"

                      />
                    </div>
                    <div className="kmpnye">
                      <h4>
                        Hari Pertama Tahapan Kampanye Pemilu 2024, Partai Buruh
                        Tancap Gas Sebar Brosur
                      </h4>
                      <span>by </span> <span>BAWASLU BOYOLALI</span>
                      <p className="span-txt" style={{ color: "black" }}>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            fill="currentColor"
                            className="bi bi-clock"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                          </svg>
                        </span>{" "}
                        {"  "}
                        30 Maret 2023
                      </p>
                     {/*  */}
                      <p>
                        Boyolali – Tahapan kampanye yang dimulai hari Selasa 28
                        November 2023, Partai Buruh langsung tancap gas lakukan
                        kampanye dengan cara ...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="logo" className="logo">
                <div id="h3" className="h3 bgng">
                  <h3>
                    TAUTAN <span className="span">LEMBAGA</span>
                  </h3>
                  <hr id="hhr" className="hrr" />
                  <div id="img-logo this-logo" className="img-logo this-logo">
                    <div>
                      <a href="">
                        <img id="img-src" className="img-src" src={RI} />
                      </a>
                    </div>
                    <div>
                      {" "}
                      <a href="">
                        <img id="img-src" className="img-src" src={dkpp} />
                      </a>
                    </div>
                    <div>
                      <a href="">
                        <img id="img-src" className="img-src" src={MAHKAMAH} />
                      </a>
                    </div>
                    <div>
                      <a href="">
                        <img id="img-src" className="img-src" src={KPU} />
                      </a>
                    </div>
                    <div>
                      <a href="">
                        <img id="img-src" className="img-src" src={jateng} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default TagBerita;
