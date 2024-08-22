import React, { useEffect, useState } from "react";
import NavbarSekolah from "../../../component/NavbarSekolah";
import HeaderPerpus from "./HeaderPerpus";
import "../../../css/perpustakaan/perpustakaan.css";
import CardPerpustakaan from "./CardPerpustakaan";
import FooterSekolah from "../../../component/FooterSekolah";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import { Pagination } from "@mui/material";

function Perpustakaan() {
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
        getAllPerpus(pageNumber);
    };

    // GET ALL PERPUSTAKAAN
    const [bukus, setBuku] = useState([]);
    const [totalPages, setTotalPage] = useState(1);

    const getAllPerpus = async (page = 1) => {
        try {
            const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/perpustakaan/all/terbaru?page=${page - 1}&size=15`);
            setBuku(response.data.data.content);
            setTotalPage(response.data.data.totalPages);
        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        getAllPerpus(currentPage);
    }, [currentPage]);

    return (
        <>
            <NavbarSekolah />
            <main className="perpustakaan-container">
                <HeaderPerpus />
                <main className="perpus-container">
                    {bukus.map(item => (
                        <CardPerpustakaan
                            key={item.id}
                            image={item.foto}
                            id={item.id}
                            title={item.nama_buku}
                            content={item.sinopsis}
                            pengarang={item.pengarang}
                            tahun={item.tahun}
                        />
                    ))}
                    {/* <CardPerpustakaan
                        key="1"
                        image=""
                        id="1"
                        title="DI TANAH BERHALA"
                        content="testst"
                        pengarang="ECT"
                        tahun="2024"
                    /> */}
                </main>
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
            </main>
            <FooterSekolah />
        </>
    )
}

export default Perpustakaan;