import React from "react";
import bawasluRI from "../aset/Bawaslu-RI-300x73-1.png";
import dkpp from "../aset/dkpp-300x73-1.png";
import mahkama from "../aset/MAHKAMAKONSTITUSI-300x73-1.png";
import kpu from "../aset/KPU-300x73-1.png";
import bawasluJateng from "../aset/bawaslu-jateng-300x73-1.png";

function Bawaslu() {
  return (
    <div
      className="widget widget_catagory tautan-lembaga-rspnv"
      style={{
        background: "#F1F6F9",
        overflow: "hidden",
        boxShadow: " rgba(47, 60, 95, 0.24) 0px 6px 10px",
        border: "1px solid #6DB9EF",
      }}>
      <h4 className="widget-title">
        <i class="fa-regular fa-file-lines"></i> Tautan{" "}
        <span className="text-primary">
          <strong>Lembaga</strong>
        </span>
      </h4>
      <ul className="catagory-items">
        <li>
          <a
            href="https://bawaslu.go.id/"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src={bawasluRI}

            />
          </a>
        </li>
        <li>
          <a
            href="https://dkpp.go.id/"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src={dkpp}

            />
          </a>
        </li>
        <li>
          <a
            href="https://www.mkri.id/"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src={mahkama}

            />
          </a>
        </li>
        <li>
          <a
            href="https://www.kpu.go.id/"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src={kpu}

            />
          </a>
        </li>
        <li>
          <a
            href="https://jateng.bawaslu.go.id/"
            target="_blank"
            rel="noopener noreferrer">
            <img
              src={bawasluJateng}

            />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Bawaslu;
