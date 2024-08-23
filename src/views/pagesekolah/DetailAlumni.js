import React, { useEffect, useState } from "react";
import NavbarSekolah from "../../component/NavbarSekolah";
import "../../css/alumni/alumni.css"
import FooterSekolah from "../../component/FooterSekolah";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_DUMMY } from "../../utils/base_URL";
import NavbarSekolah2 from "../../component/NavbarSekolah2";

function DetailAlumni() {
    const [nama, setNama] = useState("");
    const [image, setImage] = useState(0);
    const [biografi, setBiografi] = useState("");

    const param = useParams();

    const getData = async () => {
        try {
            const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/alumni/get/${param.id}`);
            const res = response.data.data;
            setNama(res.nama);
            setBiografi(res.biografi);
            setImage(res.foto);
        } catch (error) {
            console.log("get all", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <section>
            <NavbarSekolah2 />
            <main className="container-alumni">
                <div className='header-alumni'>
                    <ul>
                        <li><a href="/"><i class="fas fa-home"></i> Beranda</a></li>
                        <li><a href="/"><i class="fas fa-angle-right"></i> Alumni </a></li>
                        <li><i class="fas fa-angle-right"></i> {nama} </li>
                    </ul>
                </div>
                {image !== 0 ? (<>
                    <img src={image} />
                </>) : (<>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOndEexr8NTOP7h4YEYfBDz5qDfI92M8IQhw&s" />
                </>)}
                <h4 style={{ color: "#002147", fontWeight: "600", marginTop: "2rem" }}>{nama}</h4>
                <hr />
                <p style={{fontSize: "14px"}}>{biografi}</p>
            </main>
            <FooterSekolah />
        </section>
    )
}

export default DetailAlumni;