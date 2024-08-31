import React, { useEffect } from 'react';
import "../../../css/berita/cardBerita.css"
import Aos from 'aos';

const HeaderBerita = ({ title }) => {
    useEffect(() => {
        Aos.init();
    }, [])
    return (
        <div data-aos="fade-down" className='header-berita'>
            <ul>
                <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
                <li><i class="fas fa-angle-right"></i> <span style={{fontWeight: "normal"}}>{title}</span> </li>
            </ul>
        </div>
    );
};

export default HeaderBerita;