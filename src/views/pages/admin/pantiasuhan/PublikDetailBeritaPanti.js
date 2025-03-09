import React, { useCallback, useEffect, useRef, useState } from "react";
import FooterSekolah from "../../../../component/FooterSekolah";
import Navbar from "../../../../component/Navbar";
import axios from "axios";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../utils/base_URL";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";

const formatTanggal = (tanggalString) => {
  const tanggal = new Date(tanggalString);

  const hariNama = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const hari = tanggal.getDate();
  const bulanNama = bulan[tanggal.getMonth()];
  const tahun = tanggal.getFullYear();
  const namaHari = hariNama[tanggal.getDay()];

  return `${namaHari}, ${hari} ${bulanNama} ${tahun}`;
};

function PublikDetailBeritaPanti() {
  const [captchaValue, setCaptchaValue] = useState(null);
  const [berita, setBerita] = useState(null);
  const [komentar, setKomentar] = useState("");
  const [name, setName] = useState("");
  const [komentars, setKomentars] = useState([]);
  const [balaskomentars, setBalasKomentars] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();

  const param = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`${API_DUMMY_SMART}/api/public/berita/${param.id}`)
          .then((ress) => {
            setBerita(ress.data.data);
            console.log("data: ", ress.data.data);
          });
        // if (!response.ok) throw new Error("Request gagal!");
        // const data = await response.json();
      } catch (error) {
        console.error("Terjadi Kesalahan:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchDataKomentar = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${API_DUMMY_SMART}/api/public/komentar/berita/${param.id}`,
  //         {
  //           headers: {
  //             "x-origin": window.location.origin,
  //             // "ORIGIN": "https://staging.mccsemarang.com",
  //           },
  //         }
  //       );
  //       // const resp = response.data.berita;
  //       console.log("hai");
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Terjadi Kesalahan", error);
  //     }
  //   };

  //   fetchDataKomentar();
  // }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBalasKomentar, setCurrentPageBalasKomentar] = useState(1);
  const [rowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBalasKomentar, setIsLoadingBalasKomentar] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasMoreBalasKomentar, setHasMoreBalasKomentar] = useState(true);
  // const komentarRef = useRef(null); // Referensi ke div scrollable

  // const getAll = async () => {
  //   if (isLoading || !hasMore) return;

  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY_SMART}/api/public/komentar/berita/${param.id}?page=${currentPage}&limit=${rowsPerPage}`,
  //       {
  //         headers: {
  //           "x-origin": window.location.origin,
  //         },
  //       }
  //     );

  //     const { data, pagination } = response.data;
  //     console.log(response.data);

  //     if (data && pagination) {
  //       // Tambahkan data baru ke daftar yang sudah ada tanpa duplikat
  //       setKomentars((prevList) => {
  //         const uniqueData = data.filter(
  //           (item) => !prevList.some((prevItem) => prevItem.id === item.id) // Hindari data dengan ID yang sama
  //         );
  //         return [...prevList, ...uniqueData];
  //       });

  //       setHasMore(currentPage < pagination); // Periksa apakah masih ada halaman berikutnya
  //     } else {
  //       console.error("Data atau pagination tidak ditemukan dalam response.");
  //       setHasMore(false);
  //     }
  //   } catch (error) {
  //     console.error("Terjadi kesalahan:", error.response || error.message);
  //     Swal.fire(
  //       "Error!",
  //       error.response?.data?.message || "Gagal memuat data.",
  //       "error"
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getAll();
  // }, [currentPage]);

  // const handleScroll = () => {
  //   if (!komentarRef.current) return;
  //   const { scrollTop, scrollHeight, clientHeight } = komentarRef.current;

  //   if (
  //     scrollTop + clientHeight >= scrollHeight - 50 &&
  //     hasMore &&
  //     !isLoading
  //   ) {
  //     setCurrentPage((prevPage) => prevPage + 1);
  //   }
  // };

  const observer = useRef(null);
  const lastKomentarRef = useRef(null); // Referensi untuk elemen terakhir

  const getAll = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/public/komentar/berita/${param.id}?page=${currentPage}&limit=5&id_berita=${param.id}`, // Sesuaikan limit
        {
          headers: {
            "x-origin": window.location.origin,
          },
        }
      );

      const { data, pagination } = response.data;
      console.log(data);
      console.log(pagination.total_page);

      if (data) {
        setKomentars((prevList) => {
          const uniqueData = data.filter(
            (item) => !prevList.some((prevItem) => prevItem.id === item.id)
          );
          return [...prevList, ...uniqueData];
        });

        setHasMore(currentPage < pagination.total_page); // Sesuaikan dengan struktur pagination
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error.response || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const getAllBalsKomentar = async () => {
  //   if (isLoading || !hasMore) return;

  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `${API_DUMMY_SMART}/api/public/komentar/{id_komentar}/reply_komentar?page=${currentPage}&limit=5`, // Sesuaikan limit
  //       {
  //         headers: {
  //           "x-origin": window.location.origin,
  //         },
  //       }
  //     );

  //     const { data, pagination } = response.data;
  //     console.log(data);
  //     console.log(pagination.total_page);

  //     if (data) {
  //       setKomentars((prevList) => {
  //         const uniqueData = data.filter(
  //           (item) => !prevList.some((prevItem) => prevItem.id === item.id)
  //         );
  //         return [...prevList, ...uniqueData];
  //       });

  //       setHasMore(currentPage < pagination.total_page); // Sesuaikan dengan struktur pagination
  //     } else {
  //       setHasMore(false);
  //     }
  //   } catch (error) {
  //     console.error("Terjadi kesalahan:", error.response || error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    getAll();
  }, [currentPage]);

  // Fungsi untuk menangani infinite scroll dengan Intersection Observer
  const lastKomentarCallback = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setCurrentPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1.0 }
      );

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const [verificationCode, setVerificationCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const generateVerificationCode = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setVerificationCode(code);
  };

  useEffect(() => {
    generateVerificationCode();
  }, []);

  const handleKomentarChange = (event) => {
    setKomentar(event.target.value);
  };

  const handleSubmitKomentar = async (e) => {
    e.preventDefault();
    e.persist();

    const datas = {
      description: komentar,
      name: name,
    };
    if (!komentar.trim()) {
      setError("Komentar tidak boleh kosong.");
      return;
    }
    if (verificationCode !== userCode) {
      setError("Kode verifikasi salah.");
      return;
    }
    try {
      await axios.post(
        `${API_DUMMY_SMART}/api/public/komentar/berita/${param.id}`,
        datas
      );
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Komentar Berhasil Terkirim",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      }, 1500);
      console.log("Komentar yang dikirim:", komentar);
      setKomentar("");
      setError(null);
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Komentar Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}>
      <Navbar /> <br /> <br /> <br /> <br /> <br /> <br />
      <div className="bg-relative">
        <img
          class="shape-left-top top_image_bounce"
          src="https://solverwp.com/demo/html/itechie/assets/img/shape/3.webp"
          alt="img"
        />
        <img
          class="shape-right-top top_image_bounce"
          src="https://solverwp.com/demo/html/itechie/assets/img/shape/4.webp"
          alt="img"
        />
        <div className="container" style={{ minHeight: "100vh" }}>
          <img
            src={
              berita?.image !== "" || berita?.image !== null
                ? berita?.image
                : "https://via.placeholder.com/500x350"
            }
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
            }}
            alt="Gambar Header"
          />{" "}
          <br /> <br />
          <h2 className="titlepanti">{berita?.judul_berita}</h2>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.9rem",
              color: "#666",
              marginBottom: "15px",
            }}>
            <svg
              className="svg-inline--fa fa-user fa-w-14"
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="user"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              style={{
                widht: "16px",
                height: "16px",
                color: "#004080",
                marginRight: "5px",
              }}>
              <path
                fill="currentColor"
                d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path>
            </svg>
            {berita?.author} &nbsp;|&nbsp;
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
                widht: "16px",
                height: "16px",
                color: "#004080",
                marginRight: "5px",
              }}>
              <path
                fill="currentColor"
                d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"></path>
            </svg>
            {formatTanggal(berita?.created_date)}
          </p>
          <br />
          <div dangerouslySetInnerHTML={{ __html: berita?.isi_berita }} />
          <div className="row">
            <div style={{ marginTop: "20px" }} className="col-lg-4 col-md-12">
              <h3>Tambahkan Komentar</h3>
              <textarea
                className="form-control"
                value={komentar}
                onChange={handleKomentarChange}
                placeholder="Tulis komentar Anda..."
                rows="4"></textarea>
              <br />
              <div>
                <label>Kode Verifikasi: {verificationCode}</label>
                <input
                  type="text"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="form-control"
                  placeholder="Masukkan kode di atas"
                  required
                />
              </div>
              <br />
              <div>
                <label>Nama :</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan Nama Anda"
                />
              </div>
              <br />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                className="btn-primary mt-2"
                onClick={handleSubmitKomentar}>
                Kirim Komentar
              </button>
            </div>
            <div style={{ marginTop: "20px", marginBottom: "20px" }} className="col-lg-8 col-md-12">
              <h3>Komentar</h3>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "1rem",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                {komentars.length > 0 ? (
                  komentars.map((item, idx) => (
                    <div key={item.id} ref={idx === komentars.length - 1 ? lastKomentarCallback : null}>
                      <h6>{item?.name}</h6>
                      <p>{item?.description}</p>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p>Tidak ada komentar.</p>
                )}

                {isLoading && <p>Loading...</p>}
              </div>
            </div>
            {/* <div
              style={{ marginTop: "20px", marginBottom: "20px" }}
              className="col-lg-8 col-md-12">
              <h3>Komentar</h3>
              <div
                ref={komentarRef}
                style={{
                  backgroundColor: "white",
                  padding: "1rem",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
                onScroll={handleScroll} // Deteksi scroll di dalam div, bukan di window
              >
                {komentars.length > 0 ? (
                  komentars.map((item, idx) => (
                    <div key={idx}>
                      <h6>{item?.name}</h6>
                      <p>{item?.description}</p>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p>Tidak ada komentar.</p>
                )}

                {isLoading && <p>Loading...</p>}
              </div>
            </div> */}
          </div>
          <br />
        </div>
      </div>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif
          }

          h2.titlepanti {
            color: #005b9f
          }
        `}
      </style>
      <FooterSekolah />
    </div>
  );
}

export default PublikDetailBeritaPanti;
