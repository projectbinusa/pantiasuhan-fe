import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../component/FooterSekolah";
import "../../../css/alumni/struktur.css";
import { API_DUMMY } from "../../../utils/base_URL";
import axios from "axios";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";

function StrukturOrganisasi() {
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
        getAllStruktur(pageNumber);
    };

    // GET ALL STRUKTUR
    const [struktur, setStruktur] = useState([]);
    const [totalPages, setTotalPage] = useState(1);

    const getAllStruktur = async (page = 1) => {
        try {
            const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/struktur/all/terbaru?page=${page - 1}&size=10`);
            setStruktur(response.data.data.content);
            setTotalPage(response.data.data.totalPages);
        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        getAllStruktur(currentPage);
    }, [currentPage]);

    return (
        <section>
            <NavbarSekolah2 />
            <main className="container-struktur">
                <div className='header-struktur'>
                    <ul>
                        <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
                        <li><a href="/"><i class="fas fa-angle-right"></i> Struktur Organisasi </a></li>
                    </ul>
                </div>
                {struktur.length > 0 ? (
                    struktur.map(item => (
                        <div className="struktur" key={item.id}>
                            <div>
                                <h4>{item.jabatan}</h4>
                                {item.foto !== null ? (<>
                                    <img src={item.foto} />
                                </>) : (<></>)}
                                <p style={{ textAlign: "left" }}>{item.nama}</p>
                            </div>
                            <div>
                                <h4>DESKRIPSI TUGAS</h4>
                                <p style={{ textAlign: "left" }}>{item.tugas}</p>
                            </div>
                        </div>
                    ))
                ) : (<></>)}
            </main>
            <FooterSekolah />
        </section>
    )
}

export default StrukturOrganisasi;