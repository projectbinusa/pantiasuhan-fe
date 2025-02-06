import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../../utils/base_URL";
import Navbar from "../../../../../component/Navbar";
import { debounce } from "lodash";

const formatTanggal = (tanggalString) => {
  const tanggal = new Date(tanggalString);
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

  return `${hari} ${bulanNama} ${tahun}`;
};

function PublikBerita() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [userRole, setUserRole] = useState("");

  const getAll = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/public/berita?page=${currentPage}&limit=${rowsPerPage}`,
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            "x-origin": window.location.hostname,
          },
        }
      );

      const { data, pagination } = response.data;
      console.log(data);


      if (data && pagination) {
        setList((prevList) => {
          const uniqueData = data.filter(
            (item) => !prevList.some((prevItem) => prevItem.id === item.id)
          );
          return [...prevList, ...uniqueData];
        });

        setHasMore(currentPage < pagination.total_page);
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

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200 &&
      !isLoading &&
      hasMore
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    // Ambil role pengguna dari localStorage atau tempat penyimpanan lain
    const role = localStorage.getItem("rolename"); // Misalnya role disimpan di localStorage dengan key 'role'
    setUserRole(role);

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

  useEffect(() => {
    AOS.init();
  }, []);

  const handleSearchChange = debounce((event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  }, 500); // Delay of 500ms after typing before performing search

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
        }}>
        <div
          className="container"
          style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <br />
          <br />
          <br />
          <br />
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
                  }}>
                  Panti dalam Sorotan
                </h5>
              </div>
            </div>
          </div>
          <input
            type="search"
            className="form-control widget-content-right w-100"
            placeholder="Cari Berita..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <br />
          <div
            className="grid-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}>
            {filteredList.map((item, index) => (
              <div
                className="card"
                key={index}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "15px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0, 0, 0, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.1)";
                }}>
                <img
                  src={
                    item.image !== ""
                      ? item.image
                      : "https://via.placeholder.com/300x200"
                  }
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
                      color: "#004080",
                      marginBottom: "10px",
                    }}>
                    {item.judul_berita}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#555",
                      marginBottom: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}>
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
                        color: "#004080",
                        marginRight: "5px",
                      }}>
                      <path
                        fill="currentColor"
                        d="M152 64c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V160c0-26.51-21.49-48-48-48h-72V64zm0 96h72c8.84 0 16-7.16 16-16V64h16c8.84 0 16 7.16 16 16v48h72c8.84 0 16 7.16 16 16v320c0 8.84-7.16 16-16 16H48c-8.84 0-16-7.16-16-16V160c0-8.84 7.16-16 16-16h72v-48c0-8.84 7.16-16 16-16h16c8.84 0 16 7.16 16 16v48z"></path>
                    </svg>
                    {formatTanggal(item.created_date)}
                  </p>
                  <p style={{
                    fontSize: "0.9rem",
                    color: "#555",
                    lineHeight: "1.5",
                    marginBottom: "15px", marginTop: "1rem"
                  }} className="content-isi">
                    <div dangerouslySetInnerHTML={{ __html: item.isi_berita }} />
                    {/* {item.isi_berita.slice(0, 100)}... */}
                  </p>
                  {/* Hide button if role is 'yayasan' */}
                  {userRole !== "yayasan" && (
                    <button
                      style={{
                        backgroundColor: "#004080",
                        color: "#fff",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        (window.location.href = "/beritapanti/" + item.id)
                      }>Selengkapnya</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {isLoading && <p>Memuat data...</p>}
        </div>
      </div>
    </div>
  );
}

export default PublikBerita;
