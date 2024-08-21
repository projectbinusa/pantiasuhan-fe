import React from "react";

function HeaderGaleri() {
    return (
        <div className='header-galeri'>
            <ul>
                <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
                <li><i class="fas fa-angle-right"></i> <span style={{ fontWeight: "normal" }}>Galeri</span> </li>
            </ul>
        </div>
    );
}

export default HeaderGaleri;