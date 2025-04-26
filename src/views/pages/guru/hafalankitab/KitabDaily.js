import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import {
    Button,
    Pagination,
} from "@mui/material";
import "../../../../css/button.css";
import { API_DUMMY_BYRTGHN } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function DataHafalanKitabDaily() {
    const [page, setPage] = useState(1);
    const [paginationInfo, setPaginationInfo] = useState({
        totalPages: 1,
        totalElements: 0,
    });
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sidebarToggled, setSidebarToggled] = useState(true);
    const [date, setStartDate] = useState("");

    const getAll = async () => {
        try {
            const userData = {
                id: localStorage.getItem("id"),
                organization_id: localStorage.getItem("organization_id"),
                rolename: localStorage.getItem("rolename"),
            };

            if (!userData.organization_id) {
                console.error("organization_id tidak ditemukan!");
                return;
            }

            if (!date) {
                console.error("Tanggal harus diisi!");
                return;
            }

            const token = localStorage.getItem("tokenpython");
            if (!token) {
                console.error("Token tidak ditemukan!");
                return;
            }

            const config = {
                headers: {
                    "auth-tgh": `jwt ${token}`,
                },
                params: {
                    date,
                    organization_id: userData.organization_id,
                },
            };

            const response = await axios.get(
                `${API_DUMMY_BYRTGHN}/api/member/hafalan-kitab/rekap-daily/organization`,
                config
            );

            if (response.data && response.data.data) {
                setList(response.data.data);
                setPaginationInfo({
                    totalPages: Math.ceil(response.data.data.length / rowsPerPage),
                });
            } else {
                setList([]);
                setPaginationInfo({ totalPages: 1 });
            }
        } catch (error) {
            console.error(
                "Error fetching data:",
                error.response ? error.response.data : error.message
            );
            setList([]);
            setPaginationInfo({ totalPages: 1 });
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
        setCurrentPage(1);
    };

    const filteredList = list.filter((item) =>
        Object.values(item).some(
            (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const paginatedList = filteredList.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const toggleSidebar = () => {
        setSidebarToggled(!sidebarToggled);
    };

    return (
        <div
            className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""}`}
        >
            <a
                id="show-sidebar"
                className="btn1 btn-lg"
                onClick={toggleSidebar}
                style={{ color: "white", background: "#3a3f48" }}
            >
                <i className="fas fa-bars"></i>
            </a>
            <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
            <div className="page-content1" style={{ marginTop: "10px" }}>
                <div className="container box-table mt-3 app-main__outer" data-aos="fade-left">
                    <div className="main-card box-tabel mb-3 card">
                        <div className="card-header d-flex align-items-center">
                            <p className="mt-3">Daftar Rekap Hafalan Kitab Daily</p>
                            <div className="d-flex ml-auto gap-2 align-items-center">
                                <div className="col-auto">
                                    <input
                                        type="date"
                                        className="form-select form-select-sm"
                                        value={date}
                                        style={{ height: "35px", fontSize: "12px" }}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={getAll}
                                    style={{ whiteSpace: "nowrap" }}
                                >
                                    Cari
                                </Button>
                            </div>
                        </div>
                        <div
                            className="table-responsive-3"
                            style={{ overflowX: "auto", maxWidth: "100%" }}
                        >
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
                                    {paginatedList.length > 0 ? (
                                        paginatedList.map((hafalanKitab, no) => {
                                            return (
                                                <tr key={no}>
                                                    <td data-label="No" className="text-md-start text-end">
                                                        {no + 1 + (currentPage - 1) * rowsPerPage}
                                                    </td>
                                                    <td data-label="Nama" className="text-md-start text-end">
                                                        {hafalanKitab.member_name}
                                                    </td>
                                                    <td data-label="Tanggal" className="text-md-start text-end">
                                                        {hafalanKitab.created_date}
                                                    </td>
                                                    <td data-label="Kitab" className="text-md-start text-end">
                                                        {hafalanKitab.kitab_name}
                                                    </td>
                                                    <td data-label="Halaman Awal - Akhir" className="text-md-start text-end">
                                                        {hafalanKitab.start_page} - {hafalanKitab.end_page}
                                                    </td>
                                                    <td data-label="Deskripsi" className="text-md-start text-end">
                                                        {hafalanKitab.description}
                                                    </td>
                                                    <td data-label="Status" className="text-md-start text-end">
                                                        {hafalanKitab.status !== "" ? hafalanKitab.status : "Pending"}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center my-3">
                                                <div style={{ padding: "10px", color: "#555" }}>
                                                    Tidak ada data yang tersedia.
                                                </div>
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

export default DataHafalanKitabDaily;
