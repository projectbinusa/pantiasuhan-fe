import React from 'react';
import "../../../css/keuangan/cardkeuangan.css"

const CardKeuangan = ({ fotoJudul, judul, isi, id, link }) => {
    return (
        <div className='card-keuangan'>
            <img src={fotoJudul} alt={judul} />
            <h4 style={{ textTransform: "uppercase" }}>{judul}</h4>
            <p className="content-keuangan" style={{ fontSize: "14px", textAlign: "justify" }}>
                <div
                    dangerouslySetInnerHTML={{ __html: isi }}
                />
            </p>
            <a href={`/detail-${link}-${id}`}>Selengkapnya</a>
        </div>
    );
};

export default CardKeuangan;