import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_DUMMY_SMART } from "../../../utils/base_URL";
import Navbar from "../../../component/Navbar";

const FasilitasPage = () => {
  const [list, setList] = useState([]);

  const getAllFasilitas = async () => {
    try {
      const response = await axios.get(`${API_DUMMY_SMART}/api/public/fasilitas`, {
        headers: {
          "x-origin": window.location.hostname,
        },
      });
      setList(response.data.data);
    } catch (error) {
      console.log("Error fetching fasilitas data:", error);
    }
  };

  useEffect(() => {
    getAllFasilitas(); // Memanggil API saat komponen di-mount
  }, []);

  return (
    <>
      <Navbar />
      <div className="pb-16 px-4 bg-gray-50 min-h-screen" style={{ paddingTop: "60px" }}>
        <div className="max-w-5xl mx-auto text-center mb-10 px-4">
          <h2 className="text-5xl md:text-4xl font-bold mb-6 fontSize: 1.3rem " style={{ color: "#1E3A8A" }}>
            Fasilitas
          </h2>
          <p className="text-lg text-gray-600">
            Panti asuhan memiliki fasilitas yang mumpuni untuk mendukung kesejahteraan anak-anak.
          </p>
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
                  e.currentTarget.style.boxShadow = "0 8px 18px rgba(0, 0, 0, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
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
