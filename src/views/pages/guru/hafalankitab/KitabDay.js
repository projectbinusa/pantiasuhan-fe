import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import {
    Button,
    Pagination
} from "@mui/material";
import "../../../../css/button.css";
import { API_DUMMY_BYRTGHN } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function KitabDay() {
    const [page, setPage] = useState(1);
    const [paginationInfo, setPaginationInfo] = useState({ totalPages: 1 });
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [start_date, setStartDate] = useState("");
    const [sidebarToggled, setSidebarToggled] = useState(true);

    const getAll = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const organization_id = user?.organization_id || "";

            if (!organization_id) {
                console.error("organization_id tidak ditemukan!");
                return;
            }

            const response = await axios.get(
                `${API_DUMMY_BYRTGHN}/api/member/hafalan-kitab/rekap-day/member`,
                {
                    params: {
                        page: currentPage,
                        organization_id,
                        date: start_date,
                    },
                    headers: {
                        "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
                    },
                }
            );

            setList(response.data.data);
            setPaginationInfo({
                totalPages: response.data.pagination.total_page,
            });

        } catch (error) {
            console.error(
                "Error fetching data:",
                error.response ? error.response.data : error
            );
        }
    };

    useEffect(() => {
        getAll(currentPage);
    }, [currentPage, rowsPerPage]);

    useEffect(() => {
        AOS.init();
    }, []);

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const toggleSidebar = () => {
        setSidebarToggled(!sidebarToggled);
    };

    return (
        <div className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""}`}>
            <a id="show-sidebar" className="btn1 btn-lg" onClick={toggleSidebar}
                style={{ color: "white", background: "#3a3f48" }}>
                <i className="fas fa-bars"></i>
            </a>
            <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
            <div className="page-content1" style={{ marginTop: "10px" }}>
                <div className="container box-table mt-3 app-main__outer" data-aos="fade-left">
                    <div className="main-card box-tabel mb-3 card">
                        <div className="card-header" style={{ display: "flex" }}>
                            <p className="mt-3">Daftar Rekap Hafalan Kitab Day</p>
                            <div className="d-flex ml-auto gap-2">
                                <div className="col-auto">
                                    <input
                                        type="date"
                                        className="form-select form-select-sm"
                                        value={start_date}
                                        style={{ height: "35px", fontSize: "12px" }}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <Button variant="contained" color="primary" onClick={getAll}>
                                    Cari
                                </Button>
                            </div>
                        </div>

                        <div className="table-responsive-3" style={{ overflowX: "auto", maxWidth: "100%" }}>
                            <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Tanggal</th>
                                        <th>Kitab</th>
                                        <th>Halaman Awal - Akhir</th>
                                        <th>Deskripsi</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {list.length > 0 ? (
                                        list.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                                                <td>{item.member_name}</td>
                                                <td>{item.created_date}</td>
                                                <td>{item.kitab_name}</td>
                                                <td>{item.start_page} - {item.end_page}</td>
                                                <td>{item.description}</td>
                                                <td>{item.status || "Pending"}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center py-3">
                                                Tidak ada data yang tersedia.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>

                        <div className="card-header mt-3 d-flex justify-content-center">
                            <Pagination
                                count={paginationInfo.totalPages}
                                page={currentPage}
                                onChange={(event, value) => {
                                    setCurrentPage(value);
                                    setPage(value);
                                }}
                                showFirstButton
                                showLastButton
                                color="primary"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KitabDay;
