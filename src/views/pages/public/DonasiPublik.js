import React, { useState, useEffect } from "react";
import AOS from "aos";
import axios from "axios";
import Navbar from "../../../component/Navbar";
import FooterSekolah from "../../../component/FooterSekolah";
import { API_DUMMY } from "../../../utils/base_URL";
import "aos/dist/aos.css";

const DonasiPublik = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 6;

  // Fetch data dari API
  const getAllDonations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_DUMMY}/api/public/donasi`, {
        headers: {
          "x-origin": window.location.hostname,
        },
      });
      
      // Transform data dari API ke format yang sesuai
      const transformedData = response.data.data.map(item => ({
        id: item.id,
        title: item.judul_donasi || "Program Donasi Panti Asuhan",
        description: item.deskripsi_donasi || "Deskripsi donasi belum tersedia",
        image: item.foto_donasi || "https://via.placeholder.com/500x300?text=No+Image",
        category: item.kategori || "Umum",
        date: item.tanggal_donasi || new Date().toISOString().split('T')[0],
        collected: item.dana_terkumpul || 0,
        target: item.target_dana || 0
      }));
      
      setDonations(transformedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setError("Gagal memuat data donasi");
      setLoading(false);
    }
  };

  // Inisialisasi AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
    getAllDonations();
  }, []);

  // Format mata uang
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal belum ditentukan";
    
    try {
      const options = { day: "numeric", month: "long", year: "numeric" };
      return new Date(dateString).toLocaleDateString("id-ID", options);
    } catch {
      return dateString;
    }
  };

  // Filter donasi berdasarkan pencarian dan kategori
  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         donation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "Semua" || donation.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get current donations
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = filteredDonations.slice(indexOfFirstDonation, indexOfLastDonation);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get unique categories
  const categories = ["Semua", ...new Set(donations.map(donation => donation.category))];

  // Style objects
  const styles = {
    page: {
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
      fontFamily: "'Poppins', sans-serif"
    },
    hero: {
      background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "white",
      padding: "100px 0",
      marginBottom: "50px",
      textAlign: "center"
    },
    heroTitle: {
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "20px"
    },
    heroSubtitle: {
      fontSize: "1.2rem",
      maxWidth: "700px",
      margin: "0 auto",
      color: "white"
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px"
    },
    filterContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      marginBottom: "3rem"
    },
    filterRow: {
      display: "flex",
      flexDirection: "row",
      gap: "20px"
    },
    input: {
      flex: 1,
      padding: "12px 15px",
      borderRadius: "8px",
      border: "1px solid #ced4da",
      fontSize: "1rem"
    },
    select: {
      flex: 1,
      padding: "12px 15px",
      borderRadius: "8px",
      border: "1px solid #ced4da",
      fontSize: "1rem",
      backgroundColor: "white"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
      marginBottom: "2rem"
    },
    card: {
      backgroundColor: "white",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    cardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)"
    },
    imageContainer: {
      position: "relative",
      height: "200px",
      overflow: "hidden"
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease"
    },
    imageHover: {
      transform: "scale(1.05)"
    },
    badge: {
      position: "absolute",
      top: "15px",
      right: "15px",
      backgroundColor: "rgba(0, 123, 255, 0.9)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: "500"
    },
    cardBody: {
      padding: "20px",
      flex: 1,
      display: "flex",
      flexDirection: "column"
    },
    cardTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      marginBottom: "0.75rem",
      color: "#2c3e50"
    },
    cardText: {
      color: "#6c757d",
      marginBottom: "1rem",
      flex: 1
    },
    donationInfo: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem"
    },
    donationAmount: {
      fontSize: "0.9rem",
      color: "#007bff",
      fontWeight: "600"
    },
    dateText: {
      fontSize: "0.875rem",
      color: "#6c757d"
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      textAlign: "center",
      textDecoration: "none",
      display: "block",
      width: "100%",
      transition: "background-color 0.3s ease"
    },
    buttonHover: {
      backgroundColor: "#0056b3"
    },
    notFound: {
      textAlign: "center",
      padding: "3rem 0",
      gridColumn: "1 / -1"
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      listStyle: "none",
      padding: 0,
      marginTop: "2rem"
    },
    pageItem: {
      margin: "0 5px"
    },
    pageLink: {
      display: "block",
      padding: "0.5rem 0.75rem",
      border: "1px solid #dee2e6",
      borderRadius: "5px",
      color: "#007bff",
      textDecoration: "none",
      cursor: "pointer"
    },
    pageLinkActive: {
      backgroundColor: "#007bff",
      color: "white",
      borderColor: "#007bff"
    },
    progressBar: {
      height: "8px",
      backgroundColor: "#e9ecef",
      borderRadius: "4px",
      marginBottom: "10px",
      overflow: "hidden"
    },
    progress: {
      height: "100%",
      backgroundColor: "#28a745"
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={{...styles.container, textAlign: "center", padding: "100px 0"}}>
          <p>Memuat data donasi...</p>
        </div>
        <FooterSekolah />
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={{...styles.container, textAlign: "center", padding: "100px 0"}}>
          <p style={{color: "red"}}>{error}</p>
          <button 
            onClick={getAllDonations}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Coba Lagi
          </button>
        </div>
        <FooterSekolah />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <div data-aos="fade-up">
            <h1 style={styles.heroTitle}>Bantu Anak-anak Panti Asuhan</h1>
            <p style={styles.heroSubtitle}>
              Salurkan donasi Anda untuk membantu memenuhi kebutuhan dan masa depan anak-anak panti asuhan
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div style={styles.container}>
        {/* Filter Section */}
        <div style={styles.filterContainer} data-aos="fade-up">
          <div style={styles.filterRow}>
            <input
              type="text"
              placeholder="Cari program donasi..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={styles.input}
            />
            <select
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setCurrentPage(1);
              }}
              style={styles.select}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Donations List */}
        <div style={styles.grid}>
          {currentDonations.length > 0 ? (
            currentDonations.map((donation) => {
              const progressPercentage = donation.target > 0 
                ? Math.min(100, (donation.collected / donation.target) * 100)
                : 0;
                
              return (
                <div 
                  key={donation.id}
                  data-aos="fade-up"
                  style={styles.card}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = styles.cardHover.transform;
                    e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                    e.currentTarget.querySelector('img').style.transform = styles.imageHover.transform;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = styles.card.transform;
                    e.currentTarget.style.boxShadow = styles.card.boxShadow;
                    e.currentTarget.querySelector('img').style.transform = styles.image.transform;
                  }}
                >
                  <div style={styles.imageContainer}>
                    <img 
                      src={donation.image} 
                      alt={donation.title}
                      style={styles.image}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/500x300?text=Image+Not+Found";
                      }}
                    />
                    <div style={styles.badge}>{donation.category}</div>
                  </div>
                  <div style={styles.cardBody}>
                    <h3 style={styles.cardTitle}>{donation.title}</h3>
                    <p style={styles.cardText}>{donation.description}</p>
                    
                    {donation.target > 0 && (
                      <div style={styles.progressBar}>
                        <div 
                          style={{
                            ...styles.progress,
                            width: `${progressPercentage}%`
                          }} 
                        />
                      </div>
                    )}
                    
                    <div style={styles.donationInfo}>
                      <span style={styles.donationAmount}>
                        Terkumpul: {formatCurrency(donation.collected)}
                      </span>
                      <span style={styles.dateText}>
                        {formatDate(donation.date)}
                      </span>
                    </div>
                    
                    {donation.target > 0 && (
                      <div style={{fontSize: "0.8rem", color: "#6c757d", marginBottom: "10px"}}>
                        Target: {formatCurrency(donation.target)}
                      </div>
                    )}
                    
                    <a
                      href={`/donasi/detail/${donation.id}`}
                      style={styles.button}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
                      }}
                    >
                      Donasi Sekarang
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={styles.notFound} data-aos="fade-up">
              <h4 style={{ color: "#555" }}>Tidak ada program donasi yang ditemukan</h4>
              <p>Silakan coba dengan kata kunci atau kategori yang berbeda</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredDonations.length > donationsPerPage && (
          <ul style={styles.pagination} data-aos="fade-up">
            {Array.from({ length: Math.ceil(filteredDonations.length / donationsPerPage) }).map((_, index) => (
              <li key={index} style={styles.pageItem}>
                <button
                  onClick={() => paginate(index + 1)}
                  style={{
                    ...styles.pageLink,
                    ...(currentPage === index + 1 ? styles.pageLinkActive : {})
                  }}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <FooterSekolah />
    </div>
  );
};

export default DonasiPublik;