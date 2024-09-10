import React, { useEffect } from "react";
import "../../../css/keuangan/cardkeuangan.css";
import Aos from "aos";

const HeaderKeuangan = ({ title }) => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="header-keuangan" data-aos="fade-down">
      <ul>
        <li>
          <a href="/">
            <i class="fas fa-home"></i> Beranda
          </a>
        </li>
        <li>
          <i class="fas fa-angle-right"></i>{" "}
          <span style={{ fontWeight: "normal" }}>{title}</span>{" "}
        </li>
      </ul>
    </div>
  );
};

export default HeaderKeuangan;
