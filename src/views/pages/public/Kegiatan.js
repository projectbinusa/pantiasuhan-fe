import React, { useState, useEffect } from "react";
import AOS from "aos";
import axios from "axios";
import Navbar from "../../../component/Navbar";
import FooterSekolah from "../../../component/FooterSekolah";
import { API_DUMMY } from "../../../utils/base_URL";
import "aos/dist/aos.css";

const Kegiatan = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 6;

  // Fetch data dari API
  const getAllActivities = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_DUMMY}/api/public/kegiatan`, {
        headers: {
          "x-origin": window.location.hostname,
        },
      });
      
      // Transform data dari API ke format yang sesuai
      const transformedData = response.data.data.map(item => ({
        id: item.id,
        title: item.judul_kegiatan || "Kegiatan Panti Asuhan",
        description: item.deskripsi_kegiatan || "Deskripsi kegiatan belum tersedia",
        image: item.foto_kegiatan || "https://via.placeholder.com/500x300?text=No+Image",
        category: item.kategori || "Umum",
        date: item.tanggal_kegiatan || new Date().toISOString().split('T')[0],
        participants: item.jumlah_peserta || 0,
        location: item.lokasi || "Panti Asuhan"
      }));
      
      setActivities(transformedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setError("Gagal memuat data kegiatan");
      setLoading(false);
    }
  };

  // Inisialisasi AOS dan fetch data
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
    getAllActivities();
  }, []);

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

  // Filter kegiatan berdasarkan pencarian dan kategori
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "Semua" || activity.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get current activities
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get unique categories
  const categories = ["Semua", ...new Set(activities.map(activity => activity.category))];

  // Style objects (sama seperti sebelumnya)
  const styles = {
    page: {
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
      fontFamily: "'Poppins', sans-serif"
    },
    hero: {
      background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://i.pinimg.com/736x/14/59/be/1459be85b4514cd99220685fdd072db1.jpg')",
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
    activityInfo: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem"
    },
    participants: {
      fontSize: "0.9rem",
      color: "#007bff",
      fontWeight: "600"
    },
    dateText: {
      fontSize: "0.875rem",
      color: "#6c757d"
    },
    locationText: {
      fontSize: "0.875rem",
      color: "#6c757d",
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center"
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
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={{...styles.container, textAlign: "center", padding: "100px 0"}}>
          <p>Memuat data kegiatan...</p>
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
            onClick={getAllActivities}
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
            <h1 style={styles.heroTitle}>Kegiatan Anak Panti Asuhan</h1>
            <p style={styles.heroSubtitle}>
              Lihat berbagai kegiatan positif yang dilakukan oleh anak-anak panti asuhan untuk pengembangan diri dan pendidikan
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
              placeholder="Cari kegiatan..."
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

        {/* Activities List */}
        <div style={styles.grid}>
          {currentActivities.length > 0 ? (
            currentActivities.map((activity) => (
              <div 
                key={activity.id}
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
                    src={activity.image} 
                    alt={activity.title}
                    style={styles.image}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/500x300?text=Image+Not+Found";
                    }}
                  />
                  <div style={styles.badge}>{activity.category}</div>
                </div>
                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{activity.title}</h3>
                  <p style={styles.cardText}>{activity.description}</p>
                  
                  <div style={styles.activityInfo}>
                    <span style={styles.participants}>
                      Peserta: {activity.participants} anak
                    </span>
                    <span style={styles.dateText}>
                      {formatDate(activity.date)}
                    </span>
                  </div>
                  
                  <p style={styles.locationText}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{marginRight: "5px"}}>
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    {activity.location}
                  </p>
                  
                  <a
                    href={`/kegiatan/detail/${activity.id}`}
                    style={styles.button}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
                    }}
                  >
                    Lihat Detail
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.notFound} data-aos="fade-up">
              <h4 style={{ color: "#555" }}>Tidak ada kegiatan yang ditemukan</h4>
              <p>Silakan coba dengan kata kunci atau kategori yang berbeda</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredActivities.length > activitiesPerPage && (
          <ul style={styles.pagination} data-aos="fade-up">
            {Array.from({ length: Math.ceil(filteredActivities.length / activitiesPerPage) }).map((_, index) => (
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

export default Kegiatan;