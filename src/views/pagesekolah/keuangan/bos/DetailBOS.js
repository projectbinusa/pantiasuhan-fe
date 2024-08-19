import React from "react";
import NavbarSekolah from "../../../../component/NavbarSekolah";
import FooterSekolah from "../../../../component/FooterSekolah";
import "../../../../css/keuangan/apbd.css";
import HeaderDetailKeuangan from "../HeaderDetailKeuangan";

function DetailBOS() {
    return (
        <section>
            <NavbarSekolah />
            <main className="container-detail-keuangan">
                <HeaderDetailKeuangan title={"BOS"} header={"TEST"} />
                <img src="https://via.placeholder.com/300x200?text=Award" />
                <h4 style={{ fontWeight: "700", color: "#002147", marginTop: "2rem", marginBottom: "1rem" }}>TEST</h4>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ color: "#002147" }}><i class="fas fa-user"></i> <span style={{ fontWeight: "600", paddingLeft: "0.5rem" }}>ADMIN</span></p>
                    <p style={{color: "#002147"}}>6 July 2024</p>
                </div>
                <hr />
                <p>The local school has been recognized for its outstanding achievements in academics and sports.The local school has been recognized for its outstanding achievements in academics and sports.The local school has been recognized for its outstanding achievements in academics and sports.</p>
                <a href="/">Lihat di sini</a>
            </main>
            <FooterSekolah />
        </section>
    )
}

export default DetailBOS;