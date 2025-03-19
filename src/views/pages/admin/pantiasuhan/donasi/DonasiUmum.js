import React, { useEffect, useRef, useState } from "react";
import { Pagination } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import NavbarSekolah from "../../../../../component/NavbarSekolah";
import image1 from "../../../../../aset/images.png";
import { API_DUMMY_SMART } from "../../../../../utils/base_URL";
import Navbar from "../../../../../component/Navbar";
import { formatRupiah } from "../../../../../utils/formating";
import FooterSekolah from "../../../../../component/FooterSekolah";

const formatTanggal = (tanggalString) => {
  const tanggal = new Date(tanggalString);
  const bulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const hari = tanggal.getDate();
  const bulanNama = bulan[tanggal.getMonth()];
  const tahun = tanggal.getFullYear();

  return `${hari} ${bulanNama} ${tahun}`;
};

function DonasiUmum() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(9); // Tetapkan jumlah item per halaman
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Untuk mendeteksi apakah masih ada data untuk dimuat
  const [searchTerm, setSearchTerm] = useState("");

  const getAll = async () => {
    if (isLoading || !hasMore) return; // Hindari pemanggilan ganda

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/public/donation?page=${currentPage}&limit=${rowsPerPage}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            "x-origin": window.location.hostname
          },
        }
      );

      const { data, pagination } = response.data;

      if (data && pagination) {
        setList((prevList) => [...data]); // Gabungkan data lama dengan yang baru
        // setList((prevList) => [...data, ...prevList]); // Gabungkan data lama dengan yang baru
        setHasMore(currentPage < pagination.total_page); // Periksa apakah masih ada halaman berikutnya
      } else {
        console.error("Data atau pagination tidak ditemukan dalam response.");
        setHasMore(false);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error.response || error.message);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Gagal memuat data.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  console.log(list);
  console.log(hasMore);


  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200 &&
      !isLoading
    ) {
      setCurrentPage((prevPage) => prevPage + 1); // Naikkan halaman saat scroll mendekati bawah
    }
  };

  useEffect(() => {
    getAll();
  }, [currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filteredList = list.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // const getAll = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY_SMART}/api/public/donation?page=${currentPage}&limit=${rowsPerPage}`,
  //       {
  //         headers: {
  //           "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
  //         },
  //       }
  //     );

  //     const { data, pagination } = response.data;
  //     console.log(data);

  //     if (data && pagination) {
  //       setList(data);
  //       setPaginationInfo({
  //         totalPages: pagination.total_page,
  //         totalElements: pagination.total,
  //       });
  //     } else {
  //       console.error("Data atau pagination tidak ditemukan dalam response.");
  //     }
  //   } catch (error) {
  //     console.error("Terjadi kesalahan:", error.response || error.message);
  //     Swal.fire(
  //       "Error!",
  //       error.response?.data?.message || "Gagal memuat data.",
  //       "error"
  //     );
  //   }
  // };

  // useEffect(() => {
  //   getAll();
  // }, [currentPage, rowsPerPage]);

  useEffect(() => {
    AOS.init();
  }, []);

  // const handleRowsPerPageChange = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setCurrentPage(1);
  // };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // const filteredList = list.filter((item) =>
  //   Object.values(item).some(
  //     (value) =>
  //       typeof value === "string" &&
  //       value.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div
        className="blog-area pd-top-115 pd-bottom-60"
        id="visi-misi"
        style={{
          backgroundColor: "#f9f9f9",
          fontFamily: "'Poppins', sans-serif",
          padding: "40px 20px",
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        > <br /> <br /> <br />
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-10">
              <div className="section-title text-center" data-aos="fade-down">
                <h5
                  className="sub-title double-line"
                  style={{
                    color: "#000000",
                    fontSize: "1.5em",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  Donasi Apa Hari Ini?
                </h5>
              </div>
            </div>
          </div>
          <input
            type="search"
            className="form-control widget-content-right w-100"
            placeholder="Cari Donasi..."
            value={searchTerm}
            onChange={handleSearchChange}
          /> <br />
          <div
            className="grid-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredList.map((item, index) => (
              <div
                className="card" key={index}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "15px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                }}
              >
                <img
                  src={item.url_image !== "" ? item.url_image : "https://via.placeholder.com/300x200"}
                  alt="Foto Donasi"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: "20px" }}>
                  <h4
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "var(--custom-bg)",
                      marginBottom: "10px",
                    }}
                  >
                    {item.name}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#555",
                      marginBottom: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      className="svg-inline--fa fa-calendar-alt fa-w-14"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="calendar-alt"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "var(--custom-bg)",
                        marginRight: "5px",
                      }}
                    >
                      <path
                        fill="currentColor"
                        d="M152 64c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V160c0-26.51-21.49-48-48-48h-56V64c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v48H152V64zM32 192h384v272c0 8.82-7.18 16-16 16H48c-8.82 0-16-7.18-16-16V192zm96 100c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40zm96 0c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40zm96 0c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40zm96 0c0-6.63-5.37-12-12-12h-40c-6.63 0-12 5.37-12 12v40c0 6.63 5.37 12 12 12h40c6.63 0 12-5.37 12-12v-40z"
                      />
                    </svg>
                    {formatTanggal(item.created_date)}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#777",
                      lineHeight: "1.5",
                      marginBottom: "15px", marginTop: "1rem"
                    }} className="content-isi"
                  >
                    <div dangerouslySetInnerHTML={{ __html: item?.description }} />
                  </p>
                  <p style={{
                      fontSize: "0.9rem",
                      color: "#777", fontWeight: "500",marginTop: "1rem"
                    }} className="content-isi"
                  >Total Donasi</p>
                  <h4
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      color: "var(--custom-bg)",
                      marginBottom: "10px",
                    }}
                  >
                    {formatRupiah(item.total_income)}
                  </h4>
                  <a
                    className="read-more-text"
                    href={"/donasiumum/preview/" + item.id}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      color: "var(--custom-bg)",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#0066cc")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "var(--custom-bg)")}
                  >
                    <span style={{ marginRight: "8px" }}>Selengkapnya</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* {isLoading && <p>Memuat data...</p>}
          {!hasMore && <p>Tidak ada data lagi.</p>} */}
        </div>
      </div>
      <FooterSekolah />
      {/* <div
        className="container"
        style={{
          transform: "scale(0.6)",
          transformOrigin: "top center",
          marginTop: "8%",
        }}
      >
        <button>ayo berdonasi</button>
        {filteredList.map((item, index) => (
          <div
            key={index}
            className="row align-items-center mb-5 bg-white text-white rounded-lg shadow"
          >
            <div className="col-lg-5 mb-3 mb-lg-0">
              <div className="p-4">
                <img
                  src={image1}
                  alt="Sample"
                  className="w-100 rounded"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="p-4">
                <h1
                  className="font-bold mb-4"
                  style={{
                    fontSize: "210%",
                    color: "black",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.title}
                </h1>
                <p className="text-gray-700">{item.description}</p>
                <button type="button" className="btn-danger mt-3 mr-3">
                  <a
                    style={{ color: "white", textDecoration: "none" }}
                    href="/donasiumum/preview/:id"
                  >
                    Detail
                  </a>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default DonasiUmum;
