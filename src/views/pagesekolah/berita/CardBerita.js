import React from 'react';
import "../../../css/berita/cardBerita.css"

const CardBerita = ({ image, title, content, id, link }) => {
    return (
        <div className='card-berita'>
            <img src={image} alt={title} />
            <h4 style={{ textTransform: "uppercase" }}>{title}</h4>
            <p className="content-berita" style={{ fontSize: "14px", textAlign: "justify" }}>
                <div
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </p>
            <a href={`/detail-${link}-${id}`}>Selengkapnya</a>
        </div>
    );
};

export default CardBerita;