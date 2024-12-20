import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import NavbarSekolah from "../../../../../component/NavbarSekolah";

function DonasiUmum() {
  // const [list, setList] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [paginationInfo, setPaginationInfo] = useState({
  //   totalPages: 1,
  //   totalElements: 0,
  // });
  // const [searchTerm, setSearchTerm] = useState("");

  // const getAll = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.byrtagihan.com/api/public/donation?page=${currentPage}&limit=${rowsPerPage}`,
  //       {
  //         headers: {
  //           "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
  //         },
  //       }
  //     );

  //     const { data, pagination } = response.data;
  //     if (data && pagination) {
  //       setList(data);
  //       setPaginationInfo({
  //         totalPages: pagination.total_page,
  //         totalElements: pagination.total,
  //       });
  //     } else {
  //       console.error("Data atau pagination tidak ditemukan dalam response.");
  //     }
  //   } catch (error) {
  //     console.error("Terjadi kesalahan:", error.response || error.message);
  //     Swal.fire("Error!", error.response?.data?.message || "Gagal memuat data.", "error");
  //   }
  // };

  // useEffect(() => {
  //   getAll();
  // }, [currentPage, rowsPerPage]);

  // useEffect(() => {
  //   AOS.init();
  // }, []);

  // const handleRowsPerPageChange = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setCurrentPage(1);
  // };

  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  //   setCurrentPage(1);
  // };

  // const filteredList = list.filter((item) =>
  //   Object.values(item).some((value) =>
  //     typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );

  const filteredList = [
    {
      title: "Korban bencana",
      imageUrl: "https://media.wired.com/photos/65e83cc9b8ffa5f8fa84c893/4:3/w_2664,h_1998,c_limit/wired-uk-google-watching.jpg",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis qui nulla quia dignissimos aliquam minima odit pariatur, eos ipsum illo rerum, nobis animi. Fugit, excepturi non porro tempora commodi sapiente",
    },
    {
      title: "Korban bencana",
      imageUrl: "https://media.wired.com/photos/65e83cc9b8ffa5f8fa84c893/4:3/w_2664,h_1998,c_limit/wired-uk-google-watching.jpg",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis qui nulla quia dignissimos aliquam minima odit pariatur, eos ipsum illo rerum, nobis animi. Fugit, excepturi non porro tempora commodi sapiente",
    },
    {
      title: "Korban bencana",
      imageUrl: "https://media.wired.com/photos/65e83cc9b8ffa5f8fa84c893/4:3/w_2664,h_1998,c_limit/wired-uk-google-watching.jpg",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis qui nulla quia dignissimos aliquam minima odit pariatur, eos ipsum illo rerum, nobis animi. Fugit, excepturi non porro tempora commodi sapiente",
    },
    {
      title: "Korban bencana",
      imageUrl: "https://media.wired.com/photos/65e83cc9b8ffa5f8fa84c893/4:3/w_2664,h_1998,c_limit/wired-uk-google-watching.jpg",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis qui nulla quia dignissimos aliquam minima odit pariatur, eos ipsum illo rerum, nobis animi. Fugit, excepturi non porro tempora commodi sapiente",
    },
    {
      title: "Korban bencana",
      imageUrl: "https://media.wired.com/photos/65e83cc9b8ffa5f8fa84c893/4:3/w_2664,h_1998,c_limit/wired-uk-google-watching.jpg",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis qui nulla quia dignissimos aliquam minima odit pariatur, eos ipsum illo rerum, nobis animi. Fugit, excepturi non porro tempora commodi sapiente",
    },
    {
      title: "Korban bencana",
      imageUrl: "https://media.wired.com/photos/65e83cc9b8ffa5f8fa84c893/4:3/w_2664,h_1998,c_limit/wired-uk-google-watching.jpg",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis qui nulla quia dignissimos aliquam minima odit pariatur, eos ipsum illo rerum, nobis animi. Fugit, excepturi non porro tempora commodi sapiente",
    },
    {
      title: "Korban bencana",
      imageUrl: "https://media.wired.com/photos/65e83cc9b8ffa5f8fa84c893/4:3/w_2664,h_1998,c_limit/wired-uk-google-watching.jpg",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis qui nulla quia dignissimos aliquam minima odit pariatur, eos ipsum illo rerum, nobis animi. Fugit, excepturi non porro tempora commodi sapiente",
    },
    {
      title: "Korban bencana",
      imageUrl: "https://media.wired.com/photos/65e83cc9b8ffa5f8fa84c893/4:3/w_2664,h_1998,c_limit/wired-uk-google-watching.jpg",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis qui nulla quia dignissimos aliquam minima odit pariatur, eos ipsum illo rerum, nobis animi. Fugit, excepturi non porro tempora commodi sapiente",
    },
    {
      title: "Korban bencana",
      imageUrl: "https://media.wired.com/photos/65e83cc9b8ffa5f8fa84c893/4:3/w_2664,h_1998,c_limit/wired-uk-google-watching.jpg",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis qui nulla quia dignissimos aliquam minima odit pariatur, eos ipsum illo rerum, nobis animi. Fugit, excepturi non porro tempora commodi sapiente",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarSekolah />
      <div
        className="container"
        style={{
          transform: "scale(0.6)",
          transformOrigin: "top center",
          marginTop: "8%",
        }}
      >
        <button>ayo berdonasi</button>
        {filteredList.map((item, index) => (
          <div
            key={index}
            className="row align-items-center mb-5 bg-white text-white rounded-lg shadow"
          >
            <div className="col-lg-5 mb-3 mb-lg-0">
              <div className="p-4">
                <img
                  src={item.imageUrl}
                  alt="Sample"
                  className="w-100 rounded"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="p-4">
                <h1 className="font-bold mb-4" style={{ fontSize:"210%", color:"black", whiteSpace: "nowrap" }}>{item.title}</h1>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination */}
        {/* <Pagination
          count={paginationInfo.totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          color="primary"
        /> */}
      </div>
    </div>
  );
}

export default DonasiUmum;
