import React, { useState, useEffect } from "react";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import FooterSekolah from "../../../component/FooterSekolah";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import { Pagination } from "@mui/material";
import "../../../css/alumni/KegiatanSekolah.css";

function KegiatanSekolah() {
  const [kegiatan, setKegiatan] = useState([]);
  const [categories, setCategories] = useState([]);
  const [months, setMonths] = useState([]);
  const [filteredKegiatan, setFilteredKegiatan] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const getMonthName = (monthIndex) => {
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return months[monthIndex];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/smpn1bergas/api/kegiatan/all`
        );
        const data = response.data.data.content;
        setKegiatan(data);
        
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);

        const uniqueMonths = [
          ...new Set(
            data.map((item) => {
              const date = new Date(item.tanggal);
              const monthName = getMonthName(date.getMonth());
              const year = date.getFullYear();
              return `${monthName} ${year}`;
            })
          ),
        ];
        setMonths(uniqueMonths);

        setFilteredKegiatan(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterByCategory = () => {
      if (selectedCategory === "All") {
        setFilteredKegiatan(kegiatan);
      } else {
        const filtered = kegiatan.filter(item => item.category === selectedCategory);
        setFilteredKegiatan(filtered);
      }
    };

    filterByCategory();
  }, [selectedCategory, kegiatan]);

  useEffect(() => {
    const filterByMonth = () => {
      if (!selectedMonth) return;
      const filtered = kegiatan.filter(item => {
        const date = new Date(item.tanggal);
        const monthYear = `${getMonthName(date.getMonth())} ${date.getFullYear()}`;
        return monthYear === selectedMonth;
      });
      setFilteredKegiatan(filtered);
    };

    filterByMonth();
  }, [selectedMonth, kegiatan]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredKegiatan.length / itemsPerPage));
  }, [filteredKegiatan, itemsPerPage]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedMonth("");
    setCurrentPage(1);
  };

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <NavbarSekolah2 />
      <main className="container-sapras container">
        <div className="header-sapras">
          <ul>
            <li>
              <a href="/">
                <i className="fas fa-home"></i> Beranda
              </a>
            </li>
            <li>
              <i className="fas fa-angle-right"></i>{" "}Kegiatan
            </li>
          </ul>
        </div>
        <main className="containers">
          <div className="categoryContainer">
            <h5 style={{ fontWeight: "600", color: "#002147" }}>KATEGORI</h5>
            <hr
              style={{
                width: "30%",
                color: "#0060ff",
                border: "2px solid #0060ff",
              }}
            />
            <div>
              <div
                onClick={() => handleCategoryClick("All")}
                className={`categoryItem capitalize ${
                  selectedCategory === "All"
                    ? "selectedCategory"
                    : "unselectedCategory"
                }`}
              >
                All
              </div>
              {categories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleCategoryClick(category)}
                  className={`categoryItem capitalize ${
                    selectedCategory === category
                      ? "selectedCategory"
                      : "unselectedCategory"
                  }`}
                >
                  {category}
                </div>
              ))}
            </div>
            <div className="monthlyArchives">
              <h5 style={{ fontWeight: "600", color: "#002147" }}>Arsip Bulanan</h5>
              <hr
                style={{
                  width: "30%",
                  color: "#0060ff",
                  border: "2px solid #0060ff",
                }}
              />
              <div>
                {months.map((month, index) => (
                  <div
                    key={index}
                    onClick={() => handleMonthClick(month)}
                    className={`categoryItem ${
                        selectedMonth === month
                        ? "selectedCategory"
                        : "unselectedCategory"
                    }`}
                  >
                    {month}
                  </div>
                ))}
              </div>
            </div>
            <div className="followUs">
              <h5 style={{ fontWeight: "600", color: "#002147" }}>
                IKUTI KAMI
              </h5>
              <hr
                style={{
                  width: "30%",
                  color: "#0060ff",
                  border: "2px solid #0060ff",
                }}
              />
              <ul className="followUsLinks">
                <li>
                  <a
                    href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="followUsLink facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/osisspensagas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="followUsLink instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="followUsLink youtube"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="cardContainer">
            <div className="header">
              <h4 style={{ textTransform: "uppercase", textAlign: "center" }}>
                {selectedCategory === "All" ? "All Kegiatan" : selectedCategory}
              </h4>
            </div>
            <div className="paginationControls">
              <label htmlFor="itemsPerPage" className="itemsPerPageLabel">Items per page:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="itemsPerPageSelect"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            {filteredKegiatan.length === 0 ? (
              <p className="loadingText">No data available.</p>
            ) : (
              <>
                {filteredKegiatan
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((item, index) => (
                    <div key={index} className="card-berita">
                      <img
                        src={item.foto}
                        alt={item.judul}
                        className="cardImage"
                      />
                        <h4 style={{textTransform: "uppercase"}}>{item.judul}</h4>
                        <p className="cardText">{item.isi}</p>
                        <a href={`/detail-kegiatan/${item.id}`}>Selengkapnya</a>
                    </div>
                  ))}
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  className="pagination"
                  showFirstButton
                  showLastButton
                />
              </>
            )}
          </div>
        </main>
      </main>
      <FooterSekolah />
    </>
  );
}

export default KegiatanSekolah;
