import React, { useEffect, useState } from "react";
// import NavbarSekolah from "../../../../component/NavbarSekolah";
import FooterSekolah from "../../../../component/FooterSekolah";
import "../../../../css/keuangan/apbd.css";
import HeaderDetailKeuangan from "../HeaderDetailKeuangan";
import NavbarSekolah2 from "../../../../component/NavbarSekolah2";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { API_DUMMY } from "../../../../utils/base_URL";

function DetailBOS() {
    const [judul, setJudul] = useState("");
    const [fotoJudul, setFotoJudul] = useState(0);
    const [date, setDate] = useState("");
    const [isi, setIsi] = useState("");

    const param = useParams();

    const getBOS = async () => {
        try {
            const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/keuangan/get/${param.id}`);
            const res = response.data.data;
            setJudul(res.judul);
            setIsi(res.isi);
            setDate(res.updatedDate);
            setFotoJudul(res.fotoJudul);
        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        getBOS();
    }, []);

    const formatDate = (value) => {
        const date = new Date(value);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        const formattedDate = `${day} ${month} ${year}`;

        return formattedDate;
    };

    return (
        <section>
            <NavbarSekolah2 />
            <main className="container-detail-keuangan container">
                <HeaderDetailKeuangan title={"BOS"} header={"TEST"} link="/keuangan-bos" />
                <img src={fotoJudul} alt="" />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem" }}>
                <h4 style={{ fontWeight: "700", color: "#002147", marginBottom: "1rem" }}>{judul}</h4>
                    <p style={{color: "#002147"}}>{formatDate(date)}</p>
                </div>
                <hr />
                 <p>{isi}</p>
            </main>
            <FooterSekolah />
        </section>
    )
}

export default DetailBOS;