import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AOS from "aos";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function TambahDonasiUmum() {
  const [name, setName] = useState("");
  const [hp, setHp] = useState(0);
  const [addres, setAddres] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [datas, setDatas] = useState(null);

  const history = useHistory();
  const param = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.byrtagihan.com/api/customer/donation/${param.id}`,
          {
            headers: {
              "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
            },
          }
        );
        const resp = response.data.data;
        setDatas(resp)
      } catch (error) {
        console.error("Terjadi Kesalahan", error);
      }
    };

    fetchData();
  }, [param.id]);

  const add = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://api.byrtagihan.com/api/public/donation/${param.id}/proccess`,
        {
          name: name,
          hp: hp,
          address: addres,
        },
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      // setIsModalOpen(true); // Show modal on success
      setTimeout(() => {
        history.push(`/donasiumum/panduan/${param.id}`);
      }, 1500);
    } catch (error) {
      console.log("Error details:", error); // Log the error
      if (error.response) {
        console.log("Error response:", error.response); // API error response
        if (error.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        }
      } else if (error.request) {
        console.log("Error request:", error.request); // No response received
      } else {
        console.log("Error message:", error.message); // Other errors
      }
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main className="section-donasi">
      <section className="body-donasi">
        <div className="container-donasi">
          <header className="header-back">
            <h6>{datas?.name}</h6>
          </header>
          <div className="header-donasi">
            <img src={datas?.url_image !== "" ? datas?.url_image : "https://via.placeholder.com/500x250"}
              alt="Foto Donasi"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="content-donasi">
            <div className="row">
              <div className="mb-3 col-lg-12">
                <label className="form-label font-weight-bold">
                  Nama
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan Nama"
                  className="form-control"
                />
              </div>
              <div className="mb-3 col-lg-12">
                <label className="form-label font-weight-bold">
                  No Hp
                </label>
                <input
                  onChange={(e) => setHp(e.target.value)}
                  placeholder="Masukkan nomor hp"
                  type="number"
                  className="form-control"
                />
              </div>
              <div className="mb-3 col-lg-12">
                <label className="form-label font-weight-bold">
                  Alamat
                </label>
                <input
                  placeholder="Masukkan Alamat"
                  onChange={(e) => setAddres(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed-donate-buttons">
          {/* <button type="button" className="btn-danger mt-3 mr-3">
            <a
              style={{ color: "white", textDecoration: "none" }}
              href="/donasiumum"
            >
              Batal
            </a>
          </button> */}
          <button type="button" onClick={add} className="btn-primary">Lanjut pembayaran
          </button>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed bg-gray-900 items-center" style={{ transform: "translateY(-123%)", width: "30%", marginLeft: "35%" }}>
          <div className="bg-white rounded-lg shadow-lg p-2">
            {/* Header Modal */}
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h5 className="text-lg font-semibold">
                Data Berhasil Ditambahkan
              </h5>
              {/* <button
                 onClick={() => setIsModalOpen(false)}
                 className="text-gray-500 hover:text-gray-700"
               >
                 &times; 
               </button> */}
            </div>

            {/* Body Modal */}
            <div className="px-6 py-4">
              <p className="text-gray-700">
                Data donasi telah berhasil ditambahkan. Nomor donasi:{" "}
                <strong>123456</strong>
              </p>
            </div>

            {/* Footer Modal */}
            <div className="border-t px-6 py-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)} Close modal
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      <style>
        {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
          font-family: "Poppins", sans-serif
        }

        body {
          background-color: #f8f8f8;
          color: #333;
        }

        .header-back {
          position: fixed;
          background-color: #1e88e5;
          top: 0;
          left: 0;
          width: 100%;
          text-align: center;
          padding: 10px 0;
          z-index: 1000;
          font-size: 24px;
          font-weight: bold;
        }

        .header-back h6{
          color: #fff;
        }

        .container-donasi {
          max-width: 500px;
          margin: 40px auto 0;
          background-color: #fff;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          min-height: 100vh;
        }

        .content-donasi {
          padding: 15px;
        }

        .content-donasi h2 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #222;
        }

        .donation-amount {
          color: #005b9f;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
          font-family: "Poppins", sans-serif
        }

        .story-section h3, 
        .dana-masuk h3 {
          font-size: 16px;
          color: #444;
        }

        .story-section p,
        .dana-masuk p {
          font-size: 14px;
          color: #555;
          margin-top: 5px;
          font-family: "Poppins", sans-serif;
        }

        .fixed-donate-buttons {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          // gap: 10px;
          padding: 10px 0;
          background-color: #f8f8f8;
          z-index: 1000;
        }

        .fixed-donate-buttons button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
          font-size: 14px;
          font-family: "Poppins", sans-serif;
          width: 100%;
          max-width: 500px;
        }

        .fixed-donate-buttons button a {
        font-family: "Poppins", sans-serif;
        }
        `}
      </style>
    </main>
    // <div className="page-wrapper chiller-theme">
    //   <div className="page-content1" style={{ marginTop: "10px" }}>
    //     <div className="app-main__outer container mb-3" data-aos="fade-left">
    //       <div className="app-main__inner">
    //         <div className="row">
    //           <div className="col-md-12">
    //             <div className="card shadow">
    //               <div className="card-body">
    //                 <h1 className="fs-4">Form Tambah Donasi</h1>
    //                 <hr />
    //                 <form onSubmit={add}>
    //                   <div className="row">
    //                     <div className="mb-3 col-lg-12">
    //                       <label className="form-label font-weight-bold">
    //                         Name
    //                       </label>
    //                       <input
    //                         value={name}
    //                         onChange={(e) => setName(e.target.value)}
    //                         placeholder="Masukkan Name"
    //                         className="form-control"
    //                       />
    //                     </div>
    //                     <div className="mb-3 col-lg-12">
    //                       <label className="form-label font-weight-bold">
    //                         No Hp
    //                       </label>
    //                       <input
    //                         onChange={(e) => setHp(e.target.value)}
    //                         placeholder="Masukkan nomor hp"
    //                         type="number"
    //                         className="form-control"
    //                       />
    //                     </div>
    //                     <div className="mb-3 col-lg-12">
    //                       <label className="form-label font-weight-bold">
    //                         Alamat
    //                       </label>
    //                       <input
    //                         placeholder="Masukkan Alamat"
    //                         onChange={(e) => setAddres(e.target.value)}
    //                         className="form-control"
    //                       />
    //                     </div>
    //                   </div>
    //                   <button type="button" className="btn-danger mt-3 mr-3">
    //                     <a
    //                       style={{ color: "white", textDecoration: "none" }}
    //                       href="/donasiumum"
    //                     >
    //                       Batal
    //                     </a>
    //                   </button>
    //                   <button type="submit" className="btn-primary mt-3">
    //                     Submit
    //                   </button>
    //                 </form>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Modal */}
    //   {isModalOpen && (
    //     <div className="fixed bg-gray-900 items-center" style={{ transform:"translateY(-123%)", width:"30%", marginLeft:"35%" }}>
    //       <div className="bg-white rounded-lg shadow-lg p-2">
    //         {/* Header Modal */}
    //         <div className="border-b px-6 py-4 flex justify-between items-center">
    //           <h5 className="text-lg font-semibold">
    //             Data Berhasil Ditambahkan
    //           </h5>
    //           {/* <button
    //             onClick={() => setIsModalOpen(false)}
    //             className="text-gray-500 hover:text-gray-700"
    //           >
    //             &times; 
    //           </button> */}
    //         </div>

    //         {/* Body Modal */}
    //         <div className="px-6 py-4">
    //           <p className="text-gray-700">
    //             Data donasi telah berhasil ditambahkan. Nomor donasi:{" "}
    //             <strong>123456</strong>
    //           </p>
    //         </div>

    //         {/* Footer Modal */}
    //         <div className="border-t px-6 py-4 flex justify-end space-x-2">
    //           <button
    //             onClick={() => setIsModalOpen(false)} // Close modal
    //             className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-gray-600"
    //           >
    //             Close
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}

export default TambahDonasiUmum;
