import React from 'react';
import "../../../css/berita/news.css"

const HeaderDetailBerita = ({ title, header }) => {
    return (
        <div className='header-berita'>
            <ul>
                <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
                <li><a href="/news"><i class="fas fa-angle-right"></i> <span style={{fontWeight: "normal"}}>{title}</span> </a></li>
                <li><i class="fas fa-angle-right"></i> <span style={{fontWeight: "normal"}}>{header}</span> </li>
            </ul>
        </div>
    );
};

export default HeaderDetailBerita;