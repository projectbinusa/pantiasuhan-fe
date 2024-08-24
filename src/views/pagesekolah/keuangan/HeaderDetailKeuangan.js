import React from 'react';
import "../../../css/keuangan/cardkeuangan.css";

const HeaderDetailKeuangan = ({ title, header, link }) => {
    return (
        <div className='header-keuangan'>
            <ul>
                <li><a href="/"><i className="fas fa-home"></i> Beranda</a></li>
                <li><a href={link}><i className="fas fa-angle-right"></i> <span style={{fontWeight: "normal"}}>{title}</span></a></li>
                <li><i className="fas fa-angle-right"></i> <span style={{fontWeight: "normal"}}>{header}</span></li>
            </ul>
        </div>
    );
};

export default HeaderDetailKeuangan;
