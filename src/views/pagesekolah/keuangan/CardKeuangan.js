import React from 'react';
import "../../../css/keuangan/cardkeuangan.css"

const CardKeuangan = ({ image, title, content, id, link }) => {
    return (
        <div className='card-keuangan'>
            <img src={image} alt={title} />
            <h4 style={{textTransform: "uppercase"}}>{title}</h4>
            <p className="content-keuangan" style={{fontSize: "14px"}}>{content}</p>
            <a href={`/detail-${link}-${id}`}>Selengkapnya</a>
        </div>
    );
};

export default CardKeuangan;