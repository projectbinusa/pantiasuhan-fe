import React from "react";
import NavbarSekolah from "../../../../component/NavbarSekolah";
import FooterSekolah from "../../../../component/FooterSekolah";
import kepsek from "../../../../aset/smpn1bergas/kepsek.jpg";
import "../../../../css/sambutan/sambutan.css";

function Sambutan() {
  return (
    <div>
      <NavbarSekolah />
      <div className="sambutan-container">
        <div className="parent-sambutan">
          <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333", fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>Sambutan Kepala Sekolah</h2>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <img
              src={kepsek}
              alt="Kepala Sekolah"
              style={{ width: "220px", height: "auto"}}
            />
          </div>
          <p style={{ fontSize: "20px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>
            Assalamu'alaikum Warahmatullahi Wabarakatuh,
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>
            Puji syukur kita panjatkan kehadirat Allah SWT yang telah memberikan rahmat dan karunia-Nya sehingga kita dapat
            melaksanakan tugas dan aktivitas kita sehari-hari dengan baik.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>
            Selamat datang di website resmi SMPN 1 Bergas. Website ini merupakan salah satu sarana komunikasi dan informasi
            bagi seluruh warga sekolah, orang tua, dan masyarakat luas mengenai kegiatan dan prestasi yang telah diraih oleh
            sekolah kami.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>
            Harapan kami, website ini dapat memberikan informasi yang bermanfaat dan menjadi motivasi untuk terus berkarya
            demi kemajuan pendidikan di Indonesia. Terima kasih atas dukungan dan partisipasinya.
          </p>
          <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>
            Wassalamu'alaikum Warahmatullahi Wabarakatuh.
          </p>
          <p style={{ textAlign: "right", marginTop: "40px", fontSize: "18px", color: "#333", fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
            Kepala Sekolah,<br />
            [Sumiyatun, S.Pd]<br />
            <span style={{ fontSize: "16px", fontWeight: "normal", color: "#777" }}>NIP: [196504181986012001]</span>
          </p>
        </div>
      </div>
      <FooterSekolah />
    </div>
  );
}

export default Sambutan;
