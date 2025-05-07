import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_DUMMY_SMART } from "../../../../../utils/base_URL";
import Navbar from "../../../../../component/Navbar";


const fasilitasDummy = [
    {
      name: "Ruang Asrama",
      description: "Tempat tinggal anak-anak dengan fasilitas tempat tidur dan lemari.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30KPtlxkuA3ptO3Ztjy425y-elaoVLwCuNw&s", // kasih link gambarnya nanti di sini
    },
    {
      name: "Ruang Kantor Panti",
      description: "Tempat administrasi dan pengelolaan panti asuhan.",
      image: "https://kasihtakberbatas.id/wp-content/uploads/2018/10/ruang-kantor-780x661.jpg",
    },
    {
      name: "Ruang Tamu",
      description: "Tempat menerima tamu dan kunjungan dari luar.",
      image: "https://www.pondokdamai.or.id/img/Fasilitas/Ruang%20Tamu1.jpg",
    },
    {
      name: "Gedung Panti",
      description: "Bangunan utama yang menaungi seluruh kegiatan panti.",
      image: "https://assets.kompasiana.com/items/album/2019/03/13/dsc-8853-5c88776a12ae945f5f3351b6.jpg",
    },
    {
      name: "Ruang Tidur",
      description: "Ruang tidur anak-anak yang bersih dan nyaman.",
      image: "https://yayasanradmila.org/wp-content/uploads/2018/01/4-kamar-2-FILEminimizer.jpg",
    },
  ];
  
  const FasilitasPage = () => {
    const [list, setList] = useState([]);
  
    useEffect(() => {
      setList(fasilitasDummy); // ganti nanti dengan API kalau perlu
    }, []);
  
    return (
      <>
        <Navbar />
        <div className="pt-100 pb-16 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto text-center mb-10 pt-20 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Fasilitas
          </h2>
        </div>
            <div
              className="grid-container"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "20px",
                padding: "10px",
              }}
            >
              {list.length > 0 ? (
                list.map((fasilitas, index) => (
                  <div
                    className="card"
                    key={index}
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      border: "1px solid #ddd",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 18px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.15)";
                    }}
                  >
                    {fasilitas.image && fasilitas.image.trim() !== "" ? (
                      <img
                        src={fasilitas.image}
                        alt={fasilitas.name}
                        style={{
                          width: "100%",
                          height: "180px",
                          objectFit: "cover",
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "180px",
                          backgroundColor: "#eee",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontStyle: "italic",
                          color: "#aaa",
                        }}
                      >
                        Belum ada gambar
                      </div>
                    )}
  
                    <div style={{ padding: "15px", textAlign: "center" }}>
                      <h5
                        style={{
                          marginBottom: "8px",
                          fontSize: "1.3rem",
                          fontWeight: "600",
                          color: "var(--custom-bg)",
                        }}
                      >
                        {fasilitas.name}
                      </h5>
                      <p
                        style={{
                          fontSize: "1rem",
                          color: "#666",
                          lineHeight: "1.5",
                        }}
                      >
                        {fasilitas.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#777",
                    fontSize: "1.1rem",
                  }}
                >
                  Tidak ada data yang tersedia.
                </div>
              )}
            </div>
          </div>
      </>
    );
  };
  
  export default FasilitasPage;