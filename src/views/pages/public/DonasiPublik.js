import React, { useState, useEffect } from "react";
import AOS from "aos";
import Navbar from "../../../component/Navbar";
import FooterSekolah from "../../../component/FooterSekolah";
import "aos/dist/aos.css";

const DonasiPublik = () => {
  // Data dummy donasi untuk panti asuhan
  const donationsData = [
    {
      id: 1,
      title: "Bantuan Pendidikan Anak Panti Asuhan",
      description: "Bantu kami menyediakan perlengkapan sekolah dan biaya pendidikan untuk anak-anak panti asuhan yang membutuhkan.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Pendidikan",
      date: "2023-11-15",
      collected: 32500000
    },
    {
      id: 2,
      title: "Renovasi Bangunan Panti Asuhan",
      description: "Kami membutuhkan dana untuk merenovasi bangunan panti asuhan yang sudah mulai rusak dan tidak layak huni.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Infrastruktur",
      date: "2023-12-01",
      collected: 40000000
    },
    {
      id: 3,
      title: "Paket Sembako Bulanan",
      description: "Program rutin penyediaan paket sembako untuk memenuhi kebutuhan nutrisi anak-anak panti asuhan.",
      image: "https://i.pinimg.com/736x/3e/bc/58/3ebc58f5e2d8abab31ef063dc4095715.jpg",
      category: "Kebutuhan Pokok",
      date: "2024-01-10",
      collected: 20000000
    },
    {
      id: 4,
      title: "Bantuan Kesehatan Anak Panti",
      description: "Dana untuk pemeriksaan kesehatan rutin dan pengobatan bagi anak-anak panti asuhan.",
      image: "https://i.pinimg.com/736x/1f/0b/b2/1f0bb27256f7ad8624916eb21dfe8402.jpg",
      category: "Kesehatan",
      date: "2024-02-05",
      collected: 19250000
    },
    {
      id: 5,
      title: "Program Beasiswa Pendidikan Tinggi",
      description: "Bantu anak-anak panti asuhan yang berprestasi untuk melanjutkan pendidikan ke jenjang perguruan tinggi.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Pendidikan",
      date: "2024-02-20",
      collected: 22500000
    },
    {
      id: 6,
      title: "Peralatan Mandi dan Kebersihan",
      description: "Pengadaan sabun, shampoo, sikat gigi, dan perlengkapan kebersihan lainnya untuk anak-anak panti.",
      image: "https://i.pinimg.com/736x/21/07/f0/2107f07ad35e1e88bfc196fa048830fb.jpg",
      category: "Kebutuhan Pokok",
      date: "2024-03-01",
      collected: 9000000
    },
    {
      id: 7,
      title: "Kegiatan Liburan Anak Panti",
      description: "Dana untuk mengadakan kegiatan rekreasi dan refreshing bagi anak-anak panti asuhan.",
      image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Kegiatan",
      date: "2024-03-15",
      collected: 13500000
    },
    {
      id: 8,
      title: "Perbaikan Fasilitas Dapur",
      description: "Renovasi dapur dan pengadaan peralatan masak untuk memenuhi kebutuhan gizi anak-anak.",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Infrastruktur",
      date: "2024-04-01",
      collected: 28000000
    },
    {
      id: 9,
      title: "Bantuan Pakaian dan Sepatu",
      description: "Pengadaan pakaian seragam sekolah, pakaian sehari-hari, dan sepatu untuk anak-anak panti.",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      category: "Kebutuhan Pokok",
      date: "2024-04-10",
      collected: 12000000
    }
  ];

  const [donations, setDonations] = useState(donationsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const donationsPerPage = 6;

  // Inisialisasi AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
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
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
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
  const categories = ["Semua", ...new Set(donationsData.map(donation => donation.category))];

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
    }
  };

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
            currentDonations.map((donation) => (
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
                  />
                  <div style={styles.badge}>{donation.category}</div>
                </div>
                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{donation.title}</h3>
                  <p style={styles.cardText}>{donation.description}</p>
                  
                  <div style={styles.donationInfo}>
                    <span style={styles.donationAmount}>
                      Terkumpul: {formatCurrency(donation.collected)}
                    </span>
                    <span style={styles.dateText}>
                      {formatDate(donation.date)}
                    </span>
                  </div>
                  
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
            ))
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