import React from "react";
import NavbarSekolah from "../../../../component/NavbarSekolah";
import FooterSekolah from "../../../../component/FooterSekolah";
import user from "../../../../aset/User.jpg";

function Sambutan() {
  return (
    <div>
      <NavbarSekolah />
      <div style={{ padding: "40px", maxWidth: "900px", margin: "100px auto 50px auto", backgroundColor: "#f9f9f9", borderRadius: "15px", boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333", fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}>Sambutan Kepala Sekolah</h2>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <img
            src={user}
            alt="Kepala Sekolah"
            style={{ width: "220px", height: "auto", borderRadius: "50%", border: "5px solid #ddd" }}
          />
        </div>
        <p style={{ fontSize: "20px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Roboto', sans-serif" }}>
          Assalamu'alaikum Warahmatullahi Wabarakatuh,
        </p>
        <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Roboto', sans-serif" }}>
          Puji syukur kita panjatkan kehadirat Allah SWT yang telah memberikan rahmat dan karunia-Nya sehingga kita dapat
          melaksanakan tugas dan aktivitas kita sehari-hari dengan baik. 
        </p>
        <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Roboto', sans-serif" }}>
          Selamat datang di website resmi SMPN 1 Bergas. Website ini merupakan salah satu sarana komunikasi dan informasi 
          bagi seluruh warga sekolah, orang tua, dan masyarakat luas mengenai kegiatan dan prestasi yang telah diraih oleh 
          sekolah kami.
        </p>
        <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Roboto', sans-serif" }}>
          Harapan kami, website ini dapat memberikan informasi yang bermanfaat dan menjadi motivasi untuk terus berkarya 
          demi kemajuan pendidikan di Indonesia. Terima kasih atas dukungan dan partisipasinya.
        </p>
        <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Roboto', sans-serif" }}>
          Wassalamu'alaikum Warahmatullahi Wabarakatuh.
        </p>
        <p style={{ textAlign: "right", marginTop: "40px", fontSize: "18px", color: "#333", fontFamily: "'Roboto', sans-serif", fontWeight: "bold" }}>
          Kepala Sekolah,<br/>
          [Nama Kepala Sekolah]<br/>
          <span style={{ fontSize: "16px", fontWeight: "normal", color: "#777" }}>NIP: [NIP Kepala Sekolah]</span>
        </p>
      </div>
      <FooterSekolah />
    </div>
  );
}

export default Sambutan;
