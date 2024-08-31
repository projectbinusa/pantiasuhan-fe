import React, { useEffect, useState } from "react";
import FooterSekolah from "../../../component/FooterSekolah";
import "../../../css/alumni/struktur.css";
import { API_DUMMY } from "../../../utils/base_URL";
import axios from "axios";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";
import { Pagination } from "@mui/material";
import excelstruktur from "../../../aset/smpn1bergas/STRUKTUR_ORG_SMP_NEGERI_1_BERGAS_2023.xlsx"

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

    const download = () => {
        const link = document.createElement('a');
        link.href = excelstruktur;
        link.download = 'STRUKTUR_ORG_SMP_NEGERI_1_BERGAS_2023.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section>
            <NavbarSekolah2 />
            <main className="container-struktur container">
                <div className='header-struktur'>
                    <ul>
                        <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
                        <li><a href="/"><i class="fas fa-angle-right"></i> Struktur Organisasi </a></li>
                    </ul>
                </div>
                <div className="mb-5">
                    <button onClick={download} style={{border: "none", backgroundColor: "white", padding: 0, fontWeight: "600", color: "#003366"}}>Download lengkap struktur disini</button>
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
                <div className="d-flex justify-content-center align-items-center mt-3 mb-5">
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
            </main>
            <FooterSekolah />
        </section>
    )
}

export default StrukturOrganisasi;