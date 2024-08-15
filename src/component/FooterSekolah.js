import axios from "axios";
import "../css/gabung.css";
import React, { useEffect, useState } from "react";
import { API_DUMMY } from "../utils/base_URL";

function FooterSekolah() {
  const [category, setCategory] = useState([]);

  const getCategoryBerita = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY}/bawaslu/api/category-berita/all-limit-7`
      );
      setCategory(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Terjadi Kesalahan", error);
    }
  };

  useEffect(() => {
    getCategoryBerita();
  }, []);

  return (
    <>
      <footer
        className="footer-area bg-cover"
        style={{
          backgroundImage: `url('https://www.solverwp.com/demo/html/itechie/assets/img/bg/2.webp')`,
        }}>
        <div className="container">
          <div className="row gap-5">
            <div className="col-lg-3 col-md-6">
              <div className="widget widget_about">
                <h4 className="widget-title">SMP Negeri 1 Bergas</h4>
                <div className="details">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae adipisci dolorum mollitia officiis praesentium repellendus distinctio modi quaerat. Dolore consequuntur temporibus omnis minima quia iure praesentium recusandae nam nesciunt ullam.
                  </p>
                  <ul className="social-media d-none d-md-none d-lg-flex gap-2">
                    <li>
                      <a
                        className="facebook"
                        href="https://www.facebook.com/Bawaslu.Kabupaten.Boyolali"
                        target="_blank"
                        rel="noreferrer">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        className="twitter"
                        href="https://twitter.com/i/flow/login?redirect_after_login=%2Fbawasluboyolali"
                        target="_blank"
                        rel="noreferrer">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        className="instagram"
                        href="https://www.instagram.com/bawaslu_boyolali/"
                        target="_blank"
                        rel="noreferrer">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        className="youtube"
                        href="https://www.youtube.com/channel/UC-OZT-HT_Qg7cUmo-oHfkAw"
                        target="_blank"
                        rel="noreferrer">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="widget widget_nav_menu row">
                <h4 className="widget-title">Kategori</h4>
                {category.map((cate) => {
                  return (
                    <div className="col-lg-8 col-md-6">
                      {" "}
                      <ul>
                        <li>
                          <a
                            style={{ color: "white", textDecoration: "none" }}
                            href={`category-berita/${cate.category}/${cate.id}`}>
                            {cate.category}
                          </a>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
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
                    //   href="https://www.facebook.com/Bawaslu.Kabupaten.Boyolali"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="twitter"
                    //   href="https://twitter.com/i/flow/login?redirect_after_login=%2Fbawasluboyolali"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="instagram"
                    //   href="https://www.instagram.com/bawaslu_boyolali/"
                      target="_blank"
                      rel="noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="youtube"
                    //   href="https://www.youtube.com/channel/UC-OZT-HT_Qg7cUmo-oHfkAw"
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
