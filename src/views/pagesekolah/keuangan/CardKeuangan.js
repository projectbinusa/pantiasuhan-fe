import React from 'react';
import "../../../css/keuangan/cardkeuangan.css"

const CardKeuangan = ({ image, title, content, id, link }) => {
    return (
        <div className='card-keuangan'>
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p className="content-keuangan">{content}</p>
            <a href={`/detail-${link}-${id}`}>Selengkapnya</a>
        </div>
    );
};

export default CardKeuangan;