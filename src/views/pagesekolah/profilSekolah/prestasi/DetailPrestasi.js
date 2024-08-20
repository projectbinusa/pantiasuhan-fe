import React from "react";
import NavbarSekolah from "../../../../component/NavbarSekolah";
import "../../../../css/prestasi/detailprestasi.css";
import FooterSekolah from "../../../../component/FooterSekolah";

function DetailPrestasi() {
    return (
        <section>
            <NavbarSekolah />
            <div
                style={{ position: "relative", height: "600px", overflow: "hidden" }}
            >
                <img src="https://lh5.googleusercontent.com/p/AF1QipPiTYMPukmrWn57NP0O_90hGlAwYH1dxd-Tv39r=w2048-h2048-k-no" className="image-style" alt="banner" />
                <div className="text-overlay-style">
                    <p style={{ color: "white" }}>SMP NEGERI 1 BERGAS</p>
                    <div className="header-prestasi">
                        <ul>
                            <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
                            <li><a href="/"><i class="fas fa-angle-right"></i> Prestasi </a></li>
                            <li><i class="fas fa-angle-right"></i> Detail </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container-prestasi">
                <img src="https://via.placeholder.com/500" />
                <h4 style={{ fontWeight: "700", color: "#002147", marginTop: "2rem", marginBottom: "1rem" }}>TEST</h4>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ color: "#002147" }}><i class="fas fa-user"></i> <span style={{ fontWeight: "600", paddingLeft: "0.5rem" }}>ADMIN</span></p>
                    <p style={{ color: "#002147" }}>6 July 2024</p>
                </div>
                <hr />
                <p style={{ fontWeight: "600", lineHeight: "0.75rem" }}>Skala</p>
                <p style={{ fontWeight: "600", lineHeight: "0.75rem" }}>Anggota : </p>
                <p>Penyelenggara </p>
            </div>
            <FooterSekolah />
        </section>
    )
}

export default DetailPrestasi;