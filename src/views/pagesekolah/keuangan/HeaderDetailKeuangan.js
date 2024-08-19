import React from 'react';
import "../../../css/keuangan/cardkeuangan.css"

const HeaderDetailKeuangan = ({ title, header }) => {
    return (
        <div className='header-keuangan'>
            <ul>
                <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
                <li><a href="/keuangan-apbd"><i class="fas fa-angle-right"></i> {title} </a></li>
                <li><i class="fas fa-angle-right"></i> {header} </li>
            </ul>
        </div>
    );
};

export default HeaderDetailKeuangan;