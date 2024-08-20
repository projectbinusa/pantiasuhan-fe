import React from 'react';
import NavbarSekolah from '../../../../component/NavbarSekolah';
import FooterSekolah from '../../../../component/FooterSekolah';

function PrestasiSekolah() {
  const data = [
    
    {
      id: 1,
      image: 'https://via.placeholder.com/150?text=Science+Fair',
      title: 'Pemenang Pameran Sains',
      content: 'Para siswa meraih juara pertama di pameran sains regional.',
      date: '2024-08-01',
      participant: 'John Doe',
      description: 'Prestasi ini menyoroti proyek inovatif yang berhasil meraih posisi teratas di pameran sains.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150?text=Debate+Competition',
      title: 'Juara Kompetisi Debat',
      content: 'Tim debat kami memenangkan kejuaraan nasional.',
      date: '2024-08-02',
      participant: 'Jane Smith',
      description: 'Tim menunjukkan keterampilan argumentasi dan berpikir kritis yang sangat baik untuk memenangkan gelar nasional.',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150?text=Art+Exhibition',
      title: 'Penghargaan Pameran Seni',
      content: 'Beberapa siswa diakui untuk karya seni mereka yang luar biasa.',
      date: '2024-08-03',
      participant: 'Emily Johnson',
      description: 'Karya seni mereka dipuji karena kreativitas dan keterampilan teknis, memenangkan penghargaan di pameran.',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150?text=Music+Concert',
      title: 'Penghargaan Konser Musik',
      content: 'Paduan suara sekolah kami menerima penghargaan atas penampilan luar biasa mereka.',
      date: '2024-08-04',
      participant: 'Michael Brown',
      description: 'Penampilan paduan suara kami diakui atas harmoni dan musikalitasnya, meraih penghargaan di konser musik regional.',
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/150?text=Sports+Day',
      title: 'Juara Hari Olahraga',
      content: 'Tim sekolah kami memenangkan kejuaraan umum pada Hari Olahraga.',
      date: '2024-08-05',
      participant: 'Sophia Davis',
      description: 'Tim menunjukkan performa atletik yang luar biasa, memenangkan trofi umum di berbagai acara.',
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/150?text=Science+Olympiad',
      title: 'Kesuksesan Olimpiade Sains',
      content: 'Siswa mencapai posisi teratas di Olimpiade Sains nasional.',
      date: '2024-08-06',
      participant: 'Lucas Wilson',
      description: 'Solusi inovatif dan eksperimen yang dilakukan tim memperoleh tempat teratas di berbagai kategori di Olimpiade Sains.',
    },
    {
      id: 7,
      image: 'https://via.placeholder.com/150?text=Robotics+Competition',
      title: 'Kemenangan Kompetisi Robotika',
      content: 'Tim robotika kami memenangkan juara pertama dalam kompetisi nasional.',
      date: '2024-08-07',
      participant: 'Ava Martinez',
      description: 'Desain robotika canggih dan keterampilan pemrograman tim membuat mereka meraih hadiah utama di kompetisi nasional.',
    },
    {
      id: 8,
      image: 'https://via.placeholder.com/150?text=Math+Contest',
      title: 'Juara Kontes Matematika',
      content: 'Seorang siswa memenangkan hadiah utama di kontes matematika internasional.',
      date: '2024-08-08',
      participant: 'Ethan Rodriguez',
      description: 'Kemampuan luar biasa dalam memecahkan masalah matematika menjadikannya sebagai pemenang utama di kontes matematika internasional.',
    },
    {
      id: 9,
      image: 'https://via.placeholder.com/150?text=Spelling+Bee',
      title: 'Juara Spelling Bee',
      content: 'Siswa kami memenangkan kompetisi spelling bee tingkat negara bagian.',
      date: '2024-08-09',
      participant: 'Olivia Lee',
      description: 'Kemampuan mengeja siswa yang mengesankan dan persiapan matang membawa kemenangan di kompetisi spelling bee tingkat negara bagian.',
    },
    {
      id: 10,
      image: 'https://via.placeholder.com/150?text=Literary+Award',
      title: 'Penghargaan Sastra',
      content: 'Seorang siswa menerima penghargaan sastra bergengsi atas karya tulisnya.',
      date: '2024-08-10',
      participant: 'Mason Harris',
      description: 'Kemampuan menulis dan bercerita yang menarik diakui dengan penghargaan sastra teratas.',
    },
    {
      id: 11,
      image: 'https://via.placeholder.com/150?text=Environmental+Project',
      title: 'Penghargaan Proyek Lingkungan',
      content: 'Proyek lingkungan yang inovatif mendapatkan penghargaan di konferensi global.',
      date: '2024-08-11',
      participant: 'Isabella Clark',
      description: 'Fokus proyek pada keberlanjutan dan dampak lingkungan mendapatkan pengakuan di konferensi lingkungan global.',
    },
    {
      id: 12,
      image: 'https://via.placeholder.com/150?text=History+Fair',
      title: 'Penghargaan Pameran Sejarah',
      content: 'Siswa menerima penghargaan atas presentasi penelitian sejarah mereka.',
      date: '2024-08-12',
      participant: 'James Allen',
      description: 'Penelitian sejarah dan presentasi siswa mendapat penghargaan tertinggi di pameran sejarah.',
    },
    {
      id: 13,
      image: 'https://via.placeholder.com/150?text=Drama+Festival',
      title: 'Penghargaan Festival Drama',
      content: 'Klub drama kami memenangkan beberapa penghargaan di festival lokal.',
      date: '2024-08-13',
      participant: 'Charlotte Young',
      description: 'Penampilan dan kreativitas luar biasa dari klub drama kami meraih beberapa penghargaan di festival.',
    },
    {
      id: 14,
      image: 'https://via.placeholder.com/150?text=Coding+Challenge',
      title: 'Kesuksesan Tantangan Koding',
      content: 'Siswa unggul dalam tantangan koding nasional.',
      date: '2024-08-14',
      participant: 'Daniel Walker',
      description: 'Kemampuan koding dan solusi inovatif siswa membawa mereka meraih posisi teratas dalam tantangan koding nasional.',
    },
    {
      id: 15,
      image: 'https://via.placeholder.com/150?text=Design+Competition',
      title: 'Kemenangan Kompetisi Desain',
      content: 'Proyek desain meraih kemenangan dalam kompetisi nasional bergengsi.',
      date: '2024-08-15',
      participant: 'Mia King',
      description: 'Kreativitas dan keunggulan desain proyek kami memenangkan penghargaan utama di kompetisi desain nasional.',
    },
    {
      id: 16,
      image: 'https://via.placeholder.com/150?text=Geography+Bee',
      title: 'Juara Geography Bee',
      content: 'Seorang siswa memenangkan juara pertama di geography bee tingkat negara bagian.',
      date: '2024-08-16',
      participant: 'Benjamin Scott',
      description: 'Pengetahuan geografis yang luar biasa dari siswa membuatnya meraih juara pertama di geography bee tingkat negara bagian.',
    },
    {
      id: 17,
      image: 'https://via.placeholder.com/150?text=Community+Service',
      title: 'Penghargaan Layanan Komunitas',
      content: 'Siswa diakui atas kontribusi layanan komunitas yang signifikan.',
      date: '2024-08-17',
      participant: 'Avery Evans',
      description: 'Upaya layanan komunitas siswa yang berdedikasi mendapatkan pengakuan dengan penghargaan khusus.',
    },
    {
      id: 18,
      image: 'https://via.placeholder.com/150?text=Public+Speaking',
      title: 'Prestasi Berbicara di Depan Umum',
      content: 'Seorang siswa memenangkan kontes berbicara di depan umum regional.',
      date: '2024-08-18',
      participant: 'Ella Nelson',
      description: 'Kemampuan berbicara yang fasih dan persuasif siswa mengantarkannya meraih hadiah utama di kontes berbicara di depan umum regional.',
    },
    {
      id: 19,
      image: 'https://via.placeholder.com/150?text=Photography+Contest',
      title: 'Juara Kontes Fotografi',
      content: 'Sebuah foto siswa memenangkan juara pertama di kontes fotografi nasional.',
      date: '2024-08-19',
      participant: 'Liam Carter',
      description: 'Keterampilan fotografi yang luar biasa dari siswa mendapatkan pengakuan sebagai pemenang utama di kontes fotografi nasional.',
    },
    {
      id: 20,
      image: 'https://via.placeholder.com/150?text=Chess+Tournament',
      title: 'Juara Turnamen Catur',
      content: 'Siswa kami memenangkan kejuaraan catur nasional.',
      date: '2024-08-20',
      participant: 'Harper Adams',
      description: 'Kemampuan strategis dan keterampilan catur siswa membawa kemenangan di turnamen catur tingkat nasional.',
    },
  ];

  return (
    <div>
      <NavbarSekolah />

      <div style={styles.container}>
        <div style={styles.row}>
          {data.map((item) => (
            <div style={styles.col} key={item.id}>
              <div style={styles.card}>
                <div style={styles.imageContainer}>
                  <img src={item.image} style={styles.image} alt={item.title} />
                </div>
                <div style={styles.cardBody}>
                  <a href={`/prestasi/${item.id}`} style={styles.cardLink}>
                    <h5 style={styles.cardTitle}>{item.title}</h5>
                  </a>
                  {/* <p style={styles.cardText}>{item.content}</p>
                  <p style={styles.cardDate}>Tanggal: {item.date}</p>
                  <p style={styles.cardParticipant}>Peserta: {item.participant}</p>
                  <p style={styles.cardDescription}>{item.description}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterSekolah />
    </div>
  );
}

const styles = {
  container: {
    padding: "50px",
    marginTop: "50px",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  col: {
    flex: "0 0 30%",
    marginBottom: "20px",
  },
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.2s",
  },
  cardBody: {
    padding: "15px",
  },
  imageContainer: {
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    transition: "transform 0.3s",
  },
  cardLink: {
    textDecoration: "none",
    color: "inherit",
  },
  cardTitle: {
    fontSize: "25px",
    fontWeight: "bold",
    marginBottom: "10px",
    transition: "color 0.2s",
  },
  cardLinkHover: {
    color: "#ffcc00",
  },
  cardText: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  cardDate: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "5px",
  },
  cardParticipant: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#666",
  },
};

export default PrestasiSekolah;
