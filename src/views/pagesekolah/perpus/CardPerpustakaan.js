import React from "react";
import "../../../css/perpustakaan/cardperpustakaan.css"

const CardPerpustakaan = ({ image, title, content, id, pengarang, tahun }) => {
    return (
        <div className='card-perpus'>
            <img src={image} alt={title} />
            <h4 style={{ textTransform: "uppercase" }}>{title}</h4>
            <h6>{pengarang}</h6>
            <h6>{tahun}</h6>
            <p className="content-perpus" style={{ fontSize: "14px", marginTop: "1rem" }}>{content}</p>
            <a href={`/detail-buku-${id}`}>Selengkapnya</a>
        </div>
    );
};

export default CardPerpustakaan;