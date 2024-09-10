import Aos from "aos";
import React, { useEffect } from "react";

function KategoriSapras() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div>
      <div data-aos="fade-right">
        <h5 style={{ fontWeight: "600", color: "#002147" }}>KATEGORI</h5>
        <hr
          style={{
            width: "30%",
            color: "#0060ff",
            border: "2px solid #0060ff",
          }}
        />
        <ul className="category-berita">
          <li>
            <a href="/sarana-prasarana">Standar</a>
          </li>
          <hr
            style={{
              width: "100%",
              border: "0",
              borderTop: "2px dotted #002147",
              color: "#002147",
            }}
          />
          <li>
            <a href="/ruang-kantor">Ruang Kantor</a>
          </li>
          <hr
            style={{
              width: "100%",
              border: "0",
              borderTop: "2px dotted #002147",
              color: "#002147",
            }}
          />
          <li>
            <a href="/ruang-kelas">Ruang Kelas</a>
          </li>
          <hr
            style={{
              width: "100%",
              border: "0",
              borderTop: "2px dotted #002147",
              color: "#002147",
            }}
          />
          <li>
            <a href="/ruang-lab">Ruang Laboratorium</a>
          </li>
          <hr
            style={{
              width: "100%",
              border: "0",
              borderTop: "2px dotted #002147",
              color: "#002147",
            }}
          />
          <li>
            <a href="/sarana-olahraga">Sarana Olahraga</a>
          </li>
          <hr
            style={{
              width: "100%",
              border: "0",
              borderTop: "2px dotted #002147",
              color: "#002147",
            }}
          />
          <li>
            <a href="/sarana-ibadah">Sarana Ibadah</a>
          </li>
          <hr
            style={{
              width: "100%",
              border: "0",
              borderTop: "2px dotted #002147",
              color: "#002147",
            }}
          />
          <li>
            <a href="/sarana-kesehatan">Sarana Kesehatan</a>
          </li>
          <hr
            style={{
              width: "100%",
              border: "0",
              borderTop: "2px dotted #002147",
              color: "#002147",
            }}
          />
          <li>
            <a href="/sarana-protokol-kesehatan">Sarana Protokol Kesehatan</a>
          </li>
        </ul>
      </div>
      <br />
      <div>
        <h5 style={{ fontWeight: "600", color: "#002147" }}>IKUTI KAMI</h5>
        <hr
          style={{
            width: "30%",
            color: "#0060ff",
            border: "2px solid #0060ff",
          }}
        />
        <ul className="medsos-list">
          <li>
            <a
              href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
              target="_blank">
              <i class="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/osisspensagas" target="_blank">
              <i class="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@OSIS-SMPN1Bergas" target="_blank">
              <i class="fab fa-youtube"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default KategoriSapras;
