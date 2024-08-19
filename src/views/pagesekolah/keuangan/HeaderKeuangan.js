import React from 'react';
import "../../../css/keuangan/cardkeuangan.css"

const HeaderKeuangan = ({ title }) => {
    return (
        <div className='header-keuangan'>
            <ul>
                <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
                <li><i class="fas fa-angle-right"></i> {title} </li>
            </ul>
        </div>
    );
};

export default HeaderKeuangan;