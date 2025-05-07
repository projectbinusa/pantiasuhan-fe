import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../component/Navbar";
import { API_DUMMY } from "../../../utils/base_URL";

const GaleriPage = () => {
  const [galery, setGalery] = useState([]);

  const getAllGalery = async () => {
    try {
      const response = await axios.get(`${API_DUMMY}/api/public/galery`, {
        headers: {
          "x-origin": window.location.hostname,
        },
      });
      setGalery(response.data.data);
    } catch (error) {
      console.log("get all", error);
    }
  };

  useEffect(() => {
    getAllGalery();
  }, []);

  return (
    <>
      <Navbar />
      <div className="pb-16 px-4 bg-gray-50 min-h-screen" style={{ paddingTop: "60px" }}>
                   <div className="max-w-5xl mx-auto text-center mb-10 px-4">
                     <h2
                       className="text-5xl md:text-4xl font-bold mb-6 fontSize: 1.3rem "
                       style={{ color: "#1E3A8A" }}
                     >Galeri</h2>
          <p className="text-lg text-gray-600">
            Galeri panti asuhan menampilkan momen kebahagiaan, kreativitas, dan kegiatan
            sehari-hari anak-anak, mencerminkan semangat harapan dan kebersamaan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galery.length > 0 ? (
            galery.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 italic">
                    Belum ada gambar
                  </div>
                )}
                <div className="p-4 text-center">
                  <h5 className="text-xl font-semibold text-blue-800 mb-2">
                    {item.name}
                  </h5>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-lg">Tidak ada data yang tersedia.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default GaleriPage;
