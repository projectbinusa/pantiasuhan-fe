import Navbar from "../../../component/Navbar";
import Footer from "../../../component/Footer";
import "../../../css/LayananInformasi.css";

function InformasiStandarProsedur() {
  return (
    <div>
      <Navbar />
      {/* <!-- page title start --> */}
      {/* <!-- project area start --> */}
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
                      Standar Oprasional Prosedur{" "}
                    </span>
                  </a>
                </div>
              </div>

              <div className="col-md-9">
                <div className="tab-content" id="v-pills-tabContent">
                  <div className="card-header w-auto bg-primary text-light">
                    <div style={{ display: "flex" }}>
                      <div className="px-3">
                        <h4>SOP</h4>
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
                              <p>SOP PELAYANAN INFORMASI</p>
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
                                href="https://drive.google.com/file/d/1N9ISO_fbxRySiuu6TjKRA_qwVS-mu8Nt/view"
                              >
                                <i className="fa-solid fa-download"></i>
                              </a>
                              {/* <button
                          className="bg-primary text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-download"></i>
                        </button>
                        <button
                          className="bg-warning text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-circle-info"></i>
                        </button> */}
                            </td>
                          </tr>
                          <tr>
                            <td data-cell="unduh">
                              <p> SOP PENANGANAN KEBERATAN INFORMASI</p>
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
                                href="https://drive.google.com/file/d/12yMeuaAhu0j_VkQILAY-GZb7CPTFSlMZ/view"
                              >
                                <i className="fa-solid fa-download"></i>
                              </a>
                              {/* <button
                          className="bg-primary text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-download"></i>
                        </button>
                        <button
                          className="bg-warning text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-circle-info"></i>
                        </button> */}
                            </td>
                          </tr>
                          <tr>
                            <td data-cell="unduh">
                              <p> SOP PENANGANAN SENGKETA INFORMASI</p>
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
                                href="https://drive.google.com/file/d/1Hoqm6DTQUsttRHHVdBoi_b82y1XDl0kV/view"
                              >
                                <i className="fa-solid fa-download"></i>
                              </a>
                              {/* <button
                          className="bg-primary text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-download"></i>
                        </button>
                        <button
                          className="bg-warning text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-circle-info"></i>
                        </button> */}
                            </td>
                          </tr>
                          <tr>
                            <td data-cell="unduh">
                              <p> SOP PENGELOLAAN INFORMASI DIKECUALIKAN</p>
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
                                href="https://drive.google.com/file/d/10qmgGvGlcaSlLIAfgZn_LR4MTqkxUTZW/view"
                              >
                                <i className="fa-solid fa-download"></i>
                              </a>
                              {/* <button
                          className="bg-primary text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-download"></i>
                        </button>
                        <button
                          className="bg-warning text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-circle-info"></i>
                        </button> */}
                            </td>
                          </tr>
                          <tr>
                            <td data-cell="unduh">
                              <p> SOP PENGELOLAAN INFORMASI PUBLIK</p>
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
                                href="https://drive.google.com/file/d/1MQBJbuDdCR-zuEHBI4B-v41xSszkYhdv/view"
                              >
                                <i className="fa-solid fa-download"></i>
                              </a>
                              {/* <button
                          className="bg-primary text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-download"></i>
                        </button>
                        <button
                          className="bg-warning text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-circle-info"></i>
                        </button> */}
                            </td>
                          </tr>
                          <tr>
                            <td data-cell="unduh">
                              <p> SOP PENYAMPAIAN LAYANAN INFORMASI</p>
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
                                href="https://drive.google.com/file/d/1PRHtEzCttArf_l5oDBo9z9YzWkN9Sf57/view"
                              >
                                <i className="fa-solid fa-download"></i>
                              </a>
                              {/* <button
                          className="bg-primary text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-download"></i>
                        </button>
                        <button
                          className="bg-warning text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-circle-info"></i>
                        </button> */}
                            </td>
                          </tr>
                          <tr>
                            <td data-cell="unduh">
                              <p> SOP PENYUSUNAN DAFTAR INFORMASI PUBLIK</p>
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
                                href="https://drive.google.com/file/d/1HpjCPHOVGa3Ik9x8iK64ETZL_D-C5xhD/view"
                              >
                                <i className="fa-solid fa-download"></i>
                              </a>
                              {/* <button
                          className="bg-primary text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-download"></i>
                        </button>
                        <button
                          className="bg-warning text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-circle-info"></i>
                        </button> */}
                            </td>
                          </tr>
                          <tr>
                            <td data-cell="unduh">
                              <p> SOP UJI KONSEKUENSI</p>
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
                                href="https://drive.google.com/file/d/1N9ISO_fbxRySiuu6TjKRA_qwVS-mu8Nt/view?usp=sharing"
                              >
                                <i className="fa-solid fa-download"></i>
                              </a>
                              {/* <button
                          className="bg-primary text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-download"></i>
                        </button>
                        <button
                          className="bg-warning text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-circle-info"></i>
                        </button> */}
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
export default InformasiStandarProsedur;
