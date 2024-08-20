import axios from "axios";
import "../css/gabung.css";
import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../utils/base_URL";

function FooterSekolah() {
  return (
    <>
      <footer
        className="footer-area bg-cover"
        style={{
          backgroundImage: `url('https://www.solverwp.com/demo/html/itechie/assets/img/bg/2.webp')`,
        }}>
        <div className="container">
          <div className="row gap-5">
            <div className="col-lg-4 col-md-6">
              <div className="widget widget_about">
                <h4 className="widget-title">SMP Negeri 1 Bergas</h4>
                <div className="details">
                  <p>
                    SMP Negeri 1 Bergas didirikan pada tahun 1985 di Kabupaten Semarang, Jawa Tengah. Sejak awal berdirinya, sekolah ini memiliki tujuan mulia untuk menyediakan pendidikan berkualitas bagi masyarakat setempat. Dengan komitmen yang kuat terhadap keunggulan akademik dan pengembangan karakter siswa, SMP Negeri 1 Bergas telah menjadi salah satu sekolah menengah pertama terkemuka di wilayahnya                  </p>
                  <ul className="social-media d-none d-md-none d-lg-flex gap-2">
                    <li>
                      <a
                        className="facebook"
                        href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295" target="_blank"
                        rel="noreferrer">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        className="instagram"
                        href="https://www.instagram.com/osisspensagas"
                        target="_blank"
                        rel="noreferrer">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        className="youtube"
                        href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                        target="_blank"
                        rel="noreferrer">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="widget widget_subscribe">
                <h4 className="widget-title">Alamat</h4>
                <div className="details">
                  <p style={{ color: "white" }}>
                    Jl. Krakatau, Gembongan, Karangjati, Kec. Bergas, Kabupaten Semarang, Jawa Tengah 50552
                  </p>
                  <p style={{ color: "white" }}>Telpon (+62) </p>
                  <p style={{ color: "white" }}>
                    E-mail smpn1_bergas@yahoo.co.id
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="footer-bottom text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 align-self-center footer-media">
                <ul
                  className="social-media d-lg-none d-md-flex gap-2"
                  style={{ alignItems: "center", justifyContent: "center" }}>
                  <li>
                    <a
                      className="facebook"
                      href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="instagram"
                      href="https://www.instagram.com/osisspensagas"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="youtube"
                      href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                </ul>
                <p>© 2024. SMP Negeri 1 Bergas.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FooterSekolah;
