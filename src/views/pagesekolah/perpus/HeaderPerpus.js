import React, { useEffect } from "react";
import "../../../css/perpustakaan/cardperpustakaan.css";
import Aos from "aos";

function HeaderPerpus() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="header-perpus" data-aos="fade-down">
      <ul>
        <li>
          <a href="/">
            <i class="fas fa-home"></i> Beranda
          </a>
        </li>
        <li>
          <i class="fas fa-angle-right"></i>{" "}
          <span style={{ fontWeight: "normal" }}>Perpustakaan</span>{" "}
        </li>
      </ul>
    </div>
  );
}

export default HeaderPerpus;
