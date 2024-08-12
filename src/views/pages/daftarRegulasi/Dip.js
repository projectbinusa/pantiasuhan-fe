import React, { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import "../../../css/dip.css";
import Piagam from "../informasi/tabs/SertaMerta/Piagam";
function Dip() {
  return (
    <div id="awal">
      <Navbar />
      <div
        id="container"
        style={{
          backgroundImage: `url('https://www.solverwp.com/demo/html/itechie/assets/img/bg/1.webp') `,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="project-area pd-top-110 pd-bottom-90"
      >

         <section>
            <div className="container">
              <div className="row">
                <div className="col-md-3">
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
                      Daftar Informasi Publik
                      </span>
                    </a>
                  </div>
                </div>

                <div className="col-md-9">
                  <div className="tab-content" id="v-pills-tabContent">
                    <div className="card-header w-auto bg-primary text-light">
                      <div style={{ display: "flex" }}>
                        <div className="px-3">
                          <h4>DIP</h4>
                        </div>
                      </div>
                    </div>
                    <div
              id="ukuran"
              className="card mb-4 shadow table-responsive"
              style={{ width: "100%" }}
            >

              <div className="card-body bg-body-tertiary table-container rounded">
                <table className="table table1 responsive-3 table-striped table-hover border rounded">
                  <thead>
                    <tr>
                      <th scope="col"> Dokumen</th>
                      <th scope="col"> Unduh / Lihat</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-cell="dokumen" scope="row">
                        <p>
                          SK PENETAPAN DAN DIP BAWASLU KABUPATEN BOYOLALI TAHUN
                          2020 PERIODE I
                        </p>
                      </td>
                      <td>
                        <a
                          className="bg-warning text-light"
                          target="_blank"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                            marginLeft: "30px",
                          }}
                          href="https://drive.google.com/file/d/1Sf-vNEt4V5cQ6kg32WgxqlFlDkZxxAHO/view"
                        >
                          <i className="fa-solid fa-download"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td data-cell="unduh">
                        <p>
                          {" "}
                          SK PENETAPAN DAN DIP BAWASLU KABUPATEN BOYOLALI TAHUN
                          2020 PERIODE II
                        </p>
                      </td>
                      <td>
                        <a
                          className="bg-warning text-light"
                          target="_blank"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                            marginLeft: "30px",
                          }}
                          href="https://drive.google.com/file/d/1-5_o8W3UTPODVzee4Z_E_bTioxXgFXs8/view"
                        >
                          <i className="fa-solid fa-download"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td data-cell="unduh">
                        <p>
                          {" "}
                          SK PENETAPAN DAN DIP BAWASLU KABUPATEN BOYOLALI TAHUN
                          2021 PERIODE I
                        </p>
                      </td>{" "}
                      <td>
                        <a
                          className="bg-warning text-light"
                          target="_blank"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                            marginLeft: "30px",
                          }}
                          href="https://drive.google.com/file/d/1fcYV1tFzHZZwg9g5tununbDqB4qOQvhr/view"
                        >
                          <i className="fa-solid fa-download"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td data-cell="unduh">
                        <p>
                          {" "}
                          SK PENETAPAN DAN DIP BAWASLU KABUPATEN BOYOLALI TAHUN
                          2021 PERIODE II
                        </p>
                      </td>{" "}
                      <td>
                        <a
                          className="bg-warning text-light"
                          target="_blank"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                            marginLeft: "30px",
                          }}
                          href="https://drive.google.com/file/d/1YpeyQu3I7t9fmm1YOUKqIuSkBKAR08nd/view"
                        >
                          <i className="fa-solid fa-download"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td data-cell="unduh">
                        <p>
                          {" "}
                          SK PENETAPAN DAN DIP BAWASLU KABUPATEN BOYOLALI TAHUN
                          2022 PERIODE I
                        </p>
                      </td>{" "}
                      <td>
                        <a
                          className="bg-warning text-light"
                          target="_blank"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                            marginLeft: "30px",
                          }}
                          href="https://drive.google.com/file/d/1vgHG4BSL8egftdQYReQFExYc3vEdjdwh/view"
                        >
                          <i className="fa-solid fa-download"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td data-cell="unduh">
                        <p>
                          {" "}
                          SK PENETAPAN DAN DIP BAWASLU KABUPATEN BOYOLALI TAHUN
                          2022 PERIODE II
                        </p>
                      </td>{" "}
                      <td>
                        <a
                          className="bg-warning text-light"
                          target="_blank"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                            marginLeft: "30px",
                          }}
                          href="https://drive.google.com/file/d/1m7GKabb_6OzxJgOBLceGH6K60Ax8NVTP/view"
                        >
                          <i className="fa-solid fa-download"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td data-cell="unduh">
                        <p>
                          {" "}
                          SK PENETAPAN DAN DIP BAWASLU KABUPATEN BOYOLALI TAHUN
                          2023 PERIODE I
                        </p>
                      </td>{" "}
                      <td>
                        <a
                          className="bg-warning text-light"
                          target="_blank"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                            marginLeft: "30px",
                          }}
                          href="https://drive.google.com/file/d/1qsxnYjlYzzbdTObydL8m-eWKvuESAHqF/view"
                        >
                          <i className="fa-solid fa-download"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                  <div></div>
                </table>
              </div>
            </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

      </div>
      <Footer />
    </div>
  );
}

export default Dip;
