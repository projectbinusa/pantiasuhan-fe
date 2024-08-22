import React from "react";
import "../../../css/perpustakaan/cardperpustakaan.css";

function HeaderPerpus() {
    return (
        <div className='header-perpus'>
            <ul>
                <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
                <li><i class="fas fa-angle-right"></i> <span style={{ fontWeight: "normal" }}>Perpustakaan</span> </li>
            </ul>
        </div>
    );
};

export default HeaderPerpus;