import React, { useEffect, useState } from 'react';
import FooterSekolah from "../../../../component/FooterSekolah";
import HeaderBerita from "../HeaderBerita";
import CardBerita from "../CardBerita";
import "../../../../css/berita/news.css";
import { Pagination } from '@mui/material';
import axios from 'axios';
import { API_DUMMY } from '../../../../utils/base_URL';
import NavbarSekolah2 from '../../../../component/NavbarSekolah2';

const News = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
        getAllBerita(pageNumber);
    };

    // GET ALL BERITA
    const [berita, setBerita] = useState([]);
    const [totalPages, setTotalPage] = useState(1);

    const getAllBerita = async (page = 1) => {
        try {
            const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/berita/by-category?category=Berita%20Sekolah&order=asc&page=${page - 1}&size=5&sort=created_date`);
            setBerita(response.data.data.content);
            setTotalPage(response.data.data.totalPages);
        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        getAllBerita(currentPage);
    }, [currentPage]);

    return (
        <section>
            <NavbarSekolah2 />
            <main className="container-berita container">
                <HeaderBerita title={"Berita Terbaru"} />
                <div className="container-apbd">
                    <div>
                        <div>
                            <h5 style={{ fontWeight: "600", color: "#002147" }}>KATEGORI</h5>
                            <hr style={{ width: '30%', color: '#0060ff', border: '2px solid #0060ff' }} />
                            <ul className="category-berita">
                                <li><a href="/news">Berita Terbaru</a></li>
                                <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                                <li><a href="/info">Info Sekolah</a></li>
                                <hr style={{ width: '100%', border: '0', borderTop: '2px dotted #002147', color: '#002147' }} />
                                <li><a href="/agenda">Agenda</a></li>
                            </ul>
                        </div>
                        <br />
                        <div>
                            <h5 style={{ fontWeight: "600", color: "#002147" }}>IKUTI KAMI</h5>
                            <hr style={{ width: '30%', color: '#0060ff', border: '2px solid #0060ff' }} />
                            <ul className="medsos-list">
                                <li><a href="https://www.facebook.com/p/SMP-N-1-Bergas-100079952028295"
                                    target="_blank"
                                ><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="https://www.instagram.com/osisspensagas"
                                    target="_blank"
                                ><i class="fab fa-instagram"></i></a></li>
                                <li><a href="https://www.youtube.com/@OSIS-SMPN1Bergas"
                                    target="_blank"
                                ><i class="fab fa-youtube"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="container-all">
                        {berita.map(newsItem => (
                            <CardBerita
                                key={newsItem.id}
                                image={newsItem.image}
                                id={newsItem.id}
                                title={newsItem.judulBerita}
                                link={"news"}
                                content={newsItem.isiBerita}
                            />
                        ))}
                        <div className="d-flex justify-content-center align-items-center mt-3">
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                shape="rounded"
                                style={{ marginBottom: "30px" }}
                                showFirstButton
                                showLastButton
                            />
                        </div>
                    </div>
                </div>
            </main>
            <FooterSekolah />
        </section>
    )
}

export default News;
