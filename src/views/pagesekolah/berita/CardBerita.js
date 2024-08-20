import React from 'react';
import "../../../css/berita/cardBerita.css"

const CardBerita = ({ image, title, content, id, link }) => {
    return (
        <div className='card-berita'>
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p className="content-berita">{content}</p>
            <a href={`/detail-${link}-${id}`}>Selengkapnya</a>
        </div>
    );
};

export default CardBerita;