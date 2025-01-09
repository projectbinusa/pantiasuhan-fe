import React, { useEffect, useState } from "react";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";
import axios from "axios";
import {
  API_DUMMY_ABSEN_DEV,
  API_DUMMY_ABSEN_PROD,
  API_DUMMY_SMART_DEV,
  API_DUMMY_SMART_PROD,
} from "../../../../utils/base_URL";

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

function DashboardYayasan() {
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [conditions, setConditions] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [jumlahDanaKeluar, setJumlahDanaKeluar] = useState(0);
  const [fetchWeekly, setFetchWeekly] = useState();
  const [condition, setCondition] = useState([]);
  const [quantitie, setQuantitie] = useState([]);
  const [rekapdonasi, setRekapDonasi] = useState([]);
  const [rekapDonasiTrx, setRekapDonasiTrx] = useState([]);

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  const handleResize = () => {
    if (window.innerWidth < 800) {
      setSidebarToggled(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = async () => {
    try {
      const respons = await axios.get(
        `${API_DUMMY_SMART_DEV}/api/user/donation`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
        }
      );
      console.log("data donasi: ", respons.data.data);

      setConditions(respons.data.data || []);
    } catch (error) {
      console.error("Error fetcing donation data: ", error.message);
    }
  };

  const fetchDonasiTrx = async () => {
    try {
      const respons = await axios.get(
        `${API_DUMMY_SMART_DEV}/api/user/donation_trx`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
        }
      );
      console.log("donasi trx: ", respons.data.data);
      setCondition(respons.data.data || []);
    } catch (error) {
      console.error("Error fetcing donation data: ", error.message);
    }
  };

  const [total_income, setTotalIncome] = useState();
  const [total_outcome, setTotalOutcome] = useState();
  const fetchDonasiRecap = async () => {
    try {
      const respons = await axios.get(
        `${API_DUMMY_SMART_DEV}/api/user/donation/recap`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
        }
      );
      console.log("donasi recap: ", respons.data.data);
      setTotalIncome(respons.data.data.total_income || 0);
      setTotalOutcome(respons.data.data.total_outcome || 0);
    } catch (error) {
      console.error("Error fetcing donation data: ", error.message);
    }
  };

  const fetchDonasiRecapTrx = async () => {
    try {
      const respons = await axios.get(
        `${API_DUMMY_SMART_DEV}/api/user/donation_trx/recap`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
        }
      );
      console.log("donation trx recap: ", respons.data.data);
      setRekapDonasiTrx(respons.data.data.total_nominal);
    } catch (error) {
      console.error("Error fetcing donation data: ", error.message);
    }
  };

  const fetchDanaMasuk = async () => {
    try {
      const respons = await axios.get(
        `${API_DUMMY_SMART_DEV}/api/user/donation_trx/keluar`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
        }
      );
      console.log("donation trx keluar: ", respons.data.data);

      setFetchWeekly(respons.data.data.nominal || 0);
    } catch (error) {
      console.error("Error fetcing donation data: ", error.message);
    }
  };

  const fetchDanaKeluar = async () => {
    try {
      const respons = await axios.get(
        `${API_DUMMY_SMART_DEV}/api/user/donation_trx/keluar`,
        {
          headers: { "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}` },
        }
      );
      console.log(respons.data.data);

      setJumlahDanaKeluar(respons.data?.total_recap_donasi_keluar || 0);
    } catch (error) {
      console.error("Error fetcing donation data: ", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDonasiTrx();
    fetchDonasiRecap();
    fetchDonasiRecapTrx();
    fetchDanaMasuk();
  }, []);

  return (
    <div
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
      }`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}>
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container mt-3 mb-3 app-main__outer">
          <div className="box-tabel row gap-3 d-none d-md-flex">
            <div className="col card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Donasi Masuk</h2>
              <h1>{rupiah(total_income)}</h1>
            </div>
            <div className="col card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Donasi Trx</h2>
              <h1>{rupiah(rekapDonasiTrx)}</h1>
            </div>
            <div className="col card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Donasi Keluar</h2>
              <h1>{rupiah(total_outcome)}</h1>
            </div>
          </div>
          <div className="box-tabel d-lg-none">
            <div className="card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Donasi Masuk</h2>
              <h1>{rupiah(total_income)}</h1>
            </div>
            <div className="card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Donasi Trx</h2>
              <h1>{rupiah(rekapDonasiTrx)}</h1>
            </div>
            <div className="card shadow w-100 border-none cardmenu">
              <h2 className="">Jumlah Donasi Keluar</h2>
              <h1>{rupiah(total_outcome)}</h1>
            </div>
          </div>
          <div className="box-tabel card1">
            <div className="card shadow w-100 cardmenu">
              <h2 className="">Donasi</h2> <br />
              <table className="align-middle mb-0 table table-bordered table-striped table-hover tabelbarang">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      No
                    </th>
                    <th className="text-center">Nama</th>
                    <th className="text-center">Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  {conditions.length > 0 ? (
                    conditions.map((condition, index) => {
                      // const matchingQuantity = quantities.filter(
                      //   (quantity) => quantity.kondisi_barang_name === condition.kondisi_barang
                      // );

                      // let ttl = 0;
                      // matchingQuantity.forEach((quantity) => {
                      //   ttl += quantity.stok;
                      // });

                      // console.log(matchingQuantity);
                      return (
                        <tr key={index}>
                          <td data-label="No" className="text-center">
                            {index + 1}
                          </td>
                          <td data-label="Nama" className="text-center">
                            {condition.name || "Tidak Diketahui"}
                          </td>
                          <td data-label="Deskripsi" className="text-center">
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  condition.description ||
                                  "Tidak Ada Deskripsi",
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        Data tidak tersedia
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <footer>
                <div className="info-link">
                  <a href="/yayasan_donasi">Informasi Selengkapnya</a>
                </div>
              </footer>
            </div>
            <div className="card shadow w-100 cardmenu">
              <h2 className="">Donasi Trx</h2> <br />
              <table className="align-middle mb-0 table table-bordered table-striped table-hover tabelbarang">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      No
                    </th>
                    <th className="text-center">Nama Donatur</th>
                    <th className="text-center">Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  {condition.length > 0 ? (
                    condition.map((condition, index) => {
                      const matchingQuantity = quantitie.filter(
                        (quantity) =>
                          quantity.kondisi_barang_name ===
                          condition.kondisi_barang
                      );

                      let ttl = 0;
                      matchingQuantity.forEach((quantity) => {
                        ttl += quantity.stok;
                      });

                      console.log(matchingQuantity);
                      return (
                        <tr key={index}>
                          <td data-label="No" className="text-center">
                            {index + 1}
                          </td>
                          <td data-label="Nama Donatur" className="text-center">
                            {condition.name || "Tidak Diketahui"}
                          </td>
                          <td data-label="Deskripsi" className="text-center">
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  condition.description ||
                                  "Tidak Ada Deskripsi",
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        Data tidak tersedia
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <footer>
                <div className="info-link">
                  <a href="/donasitrx_yayasan">Informasi Selengkapnya</a>
                </div>
              </footer>
            </div>
          </div>
          <div className="box-tabel card1">
            {/* <div className="card shadow w-100 cardmenu">
              <h2 className="">Data Donasi</h2> <br />
              <table className="align-middle mb-0 table table-bordered table-striped table-hover tabelbarang">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      No
                    </th>
                    <th className="text-center">Nama</th>
                    <th className="text-center">Deskripsi</th>
                    <th className="text-center">Total Income</th>
                    <th className="text-center">Total Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {rekapdonasi.length > 0 ? (
                    rekapdonasi.map((condition, index) => {
                      const matchingQuantity = quantities.filter(
                        (quantity) => quantity.kondisi_barang_name === condition.kondisi_barang
                      );

                      let ttl = 0;
                      matchingQuantity.map((item) => (
                        ttl += item.stok
                      ))
                      console.log(matchingQuantity);
                      return (
                        <tr key={index}>
                          <td data-label="No" className="text-center">
                            {index + 1}
                          </td>
                          <td data-label="Nama" className="text-center">
                            {condition.name || "Tidak Diketahui"}
                          </td>
                          <td data-label="Deskripsi" className="text-center">
                            <div dangerouslySetInnerHTML={{ __html: conditions.description }} />
                          </td>
                          <td data-label="Total Income" className="text-center">
                            {condition.total_income || "Tidak Diketahui"}
                          </td>
                          <td data-label="Total Outcome" className="text-center">
                            {condition.total_outcome || "Tidak Diketahui"}
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Data tidak tersedia
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div> */}
            {/* <div className="card shadow w-100 cardmenu">
              <h2 className="">Data Donasi Trx</h2> <br />
              <table className="align-middle mb-0 table table-bordered table-striped table-hover tabelbarang">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      No
                    </th>
                    <th className="text-center">Donatur</th>
                    <th className="text-center">Nominal</th>
                    <th className="text-center">Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  {rekapDonasiTrx.length > 0 ? (
                    rekapDonasiTrx.map((condition, index) => {
                      const matchingQuantity = quantities.filter(
                        (quantity) => quantity.kondisi_barang_name === condition.kondisi_barang
                      );

                      let ttl = 0;
                      matchingQuantity.map((item) => (
                        ttl += item.stok
                      ))
                      console.log(matchingQuantity);
                      return (
                        <tr key={index}>
                          <td data-label="No" className="text-center">
                            {index + 1}
                          </td>
                          <td data-label="Donatur" className="text-center">
                            {condition.name || "Tidak Diketahui"}
                          </td>
                          <td data-label="Nominal" className="text-center">
                            {condition.nominal || "Tidak Diketahui"}
                          </td>
                          <td data-label="Deskripsi" className="text-center">
                            <div dangerouslySetInnerHTML={{ __html: condition.description }} />
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Data tidak tersedia
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div> */}
          </div>
        </div>
      </div>
      <style>
        {`
          .card1{
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
          }
          .card2{
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
          }
          .cardmenu {
            padding: 1rem;
            margin-bottom: 1rem;
            background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));
          }
          .cardmenu h2{
            font-size: 1.3rem
          }
          .cardmenu table thead tr th,
          .cardmenu table tbody tr td {
            font-family: "Poppins", sans-serif
          }
          .info-link {
            margin-top: 2rem;
            text-align: left;
          }
          .info-link a {
            text-decoration: none;
            color: #ffffff;
            background-color: #001f54; /* Biru tua */
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-size: 0.9rem;
          }
          .info-link a:hover {
            background-color: #00397d;
          }
          footer {
            margin-top: auto; /* Mengatur footer selalu di bawah */
          }
          @media (max-width: 1024px) {
            .card1, .card2 {
            grid-template-columns: 1fr;
            }
          }
          @media (max-width: 800px) {
            .box-tabel {
              width: 100%;
              margin-left: 0;
            }
          }
        `}
      </style>
    </div>
  );
}

export default DashboardYayasan;
