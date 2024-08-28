import React, { useEffect, useState } from "react";
import NavbarSekolah from "../../../component/NavbarSekolah";
import FooterSekolah from "../../../component/FooterSekolah";
import "../../../css/berita/news.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { API_DUMMY } from "../../../utils/base_URL";
import NavbarSekolah2 from "../../../component/NavbarSekolah2";

function DetailKegiatan() {
  const [judul, setJudul] = useState("");
  const [image, setImage] = useState(0);
  // const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [isi, setIsi] = useState("");

  const param = useParams();

  const getData = async () => {
      try {
          const response = await axios.get(`${API_DUMMY}/smpn1bergas/api/kegiatan/get/${param.id}`);
          const res = response.data.data;
          setJudul(res.judul);
          setIsi(res.isi);
          // setAuthor(res.author);
          setDate(res.updatedDate);
          setImage(res.foto);
      } catch (error) {
          console.log("get all", error);
      }
  };

  useEffect(() => {
      getData();
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
          <main className="container-sapras container">
        <div className="header-sapras">
              <ul>
                <li><a href="/"><i className="fas fa-home"></i> Beranda</a></li>
                <li><a href="/kegiatan"><i className="fas fa-angle-right"></i> <span style={{fontWeight: "normal"}}>Kegiatan</span></a></li>
                <li><i className="fas fa-angle-right"></i> <span style={{fontWeight: "normal"}}>{judul}</span></li>
              </ul>
            </div>
            <main className="container-detail-kegiatan container">
                <img src={image} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem" }}>
                  <h4 style={{ fontWeight: "700", color: "#002147", marginBottom: "1rem" }}>{judul}</h4>
                      <p style={{color: "#002147"}}>{formatDate(date)}</p>
                  </div>
                  <hr />
                  <p>{isi}</p>
            </main>
          </main>
          <FooterSekolah />
      </section>
  )
}

export default DetailKegiatan;