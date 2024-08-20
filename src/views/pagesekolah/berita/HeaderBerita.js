import React from 'react';
import "../../../css/berita/cardBerita.css"

const HeaderBerita = ({ title }) => {
    return (
        <div className='header-berita'>
            <ul>
                <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
                <li><i class="fas fa-angle-right"></i> {title} </li>
            </ul>
        </div>
    );
};

export default HeaderBerita;