import React, { useState, useEffect } from "react";

const GaleriPage = () => {
  const [galery, setGalery] = useState([
    {
      id: 1,
      foto: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      keterangan: "Kegiatan Belajar Bersama"
    },
    {
      id: 2,
      foto: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      keterangan: "Acara Hari Kemerdekaan"
    },
    {
      id: 3,
      foto: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      keterangan: "Kegiatan Olahraga"
    },
    {
      id: 4,
      foto: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      keterangan: "Sesi Belajar Kelompok"
    },
    {
      id: 5,
      foto: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      keterangan: "Kegiatan Seni dan Kreativitas"
    },
    {
      id: 6,
      foto: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      keterangan: "Makan Bersama"
    }
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // API call jika ada
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="pt-28 pb-16 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://solverwp.com/demo/html/itechie/assets/img/bg/10.webp')",
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-4">Galeri</h2>
          <p className="text-lg text-white opacity-90">
            Galeri panti asuhan menampilkan momen kebahagiaan, kreativitas, dan kegiatan
            sehari-hari anak-anak, mencerminkan semangat harapan dan kebersamaan.
          </p>
        </div>
      </div>

      {/* Gallery Content */}
<div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
  <div className="max-w-7xl mx-auto">
    {galery.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galery.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-1 cursor-pointer"
            onClick={() => openModal(item.foto)}
          >
            <img
              src={item.foto}
              alt={item.keterangan}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">{item.keterangan}</h3>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500 py-10">Tidak ada gambar tersedia.</p>
    )}
  </div>
</div>


      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-8 right-0 text-white text-3xl hover:text-gray-300"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriPage;
