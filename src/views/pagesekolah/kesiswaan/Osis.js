import React from "react";
import NavbarSekolah from "../../../component/NavbarSekolah";
import FooterSekolah from "../../../component/FooterSekolah";

function Osis() {
    return (
        <section>
            <NavbarSekolah />
            <div style={{ padding: "40px", maxWidth: "900px", margin: "100px auto 50px auto", backgroundColor: "#f9f9f9", borderRadius: "15px", boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)" }}>
                <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333", fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>Tentang Osis</h2>
                <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>
                    OSIS atau Organisasi Siswa Intra Sekolah adalah suatu organisasi yang berada di tingkat sekolah di Indonesia, yang dimulai dari jenjang SMP dan SMA/SMK. OSIS dikelola oleh siswa yang terpilih untuk menjadi pengurus OSIS. </p>
                <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>
                    Anggota OSIS adalah seluruh siswa yang berada pada satu sekolah tempat OSIS itu berada. Seluruh anggota OSIS berhak untuk memilih calonnya untuk kemudian menjadi pengurus OSIS </p>
                <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>
                    OSIS dibentuk dengan tujuan pokok : </p>
                <ul>
                    <li style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>Menghimpun ide, pemikiran, bakat, kreativitas, serta minat para siswa ke dalam salah satu wadah yang bebas dari berbagai macam pengaruh negatif dari luar sekolah.</li>
                    <li style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>Mendorong sikap, jiwa dan semangat kasatuan dan persatuan di antara para siswa, sehingga timbul satu kebanggaan untuk mendukung peran sekolah sebagai tempat terselenggaranya proses belajar mengajar.</li>
                    <li style={{ fontSize: "18px", lineHeight: "1.8", color: "#555", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" }}>Sebagai tempat dan sarana untk berkomunikasi, menyampaikan pemikiran, dan gagasan dalam usaha untuk mematangkan kemampuan berfikir, wawasan, dan pengambilan keputusan.</li>
                </ul>
            </div>
            <FooterSekolah />
        </section>
    )
}

export default Osis;