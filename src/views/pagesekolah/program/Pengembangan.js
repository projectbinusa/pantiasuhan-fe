import React from "react";
import "../../../../css/alumni/sapras.css"
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import FooterSekolah from "../../../component/FooterSekolah";

function Pengembangan() {
    return (
        <main>
            <NavbarSekolah2 />
            <main className="container-sapras">
                <div className='header-sapras'>
                    <ul>
                        <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
                        <li><a href="/"><i class="fas fa-angle-right"></i> Program </a></li>
                        <li><i class="fas fa-angle-right"></i> Pengembangan </li>
                    </ul>
                </div>
                <div className='container-sapras2'>
                    <div>
                        <div>
                            <h5 style={{ fontWeight: "600", color: "#002147" }}>KATEGORI</h5>
                            <hr style={{ width: '30%', color: '#0060ff', border: '2px solid #0060ff' }} />
                            <ul className="category-berita">
                                <li><a href="/program">Pengembangan</a></li>
                                <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                                <li><a href="/"></a></li>
                                <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                                <li><a href="/sewa-layanan">Sewa Layanan</a></li>
                            </ul>
                        </div>
                        <br />
                        <div>
                            <h5 style={{ fontWeight: "600", color: "#002147" }}>IKUTI KAMI</h5>
                            <hr style={{ width: '30%', color: '#0060ff', border: '2px solid #0060ff' }} />
                            <ul className="medsos-list">
                                <li><a href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
                                    target="_blank"
                                ><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="https://www.instagram.com/osisspensagas"
                                    target="_blank"
                                ><i class="fab fa-instagram"></i></a></li>
                                <li><a href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                                    target="_blank"
                                ><i class="fab fa-youtube"></i></a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </main>
            <FooterSekolah />
        </main>
    )
}

export default Pengembangan;