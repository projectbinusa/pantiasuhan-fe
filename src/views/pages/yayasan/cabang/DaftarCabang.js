// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import AOS from "aos";
// import { Pagination } from "@mui/material";
// import "../../../../css/button.css";
// import { API_DUMMY_SMART } from "../../../../utils/base_URL";
// import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";
// import { formatRupiah } from "../../../../utils/formating";
// import { Link } from "react-router-dom/cjs/react-router-dom";

// function DaftarCabang() {
//   const [list, setList] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [paginationInfo, setPaginationInfo] = useState({
//     totalPages: 1,
//     totalElements: 0,
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sidebarToggled, setSidebarToggled] = useState(true);
//   const [userRole, setUserRole] = useState(null);

//   const toggleSidebar = () => {
//     setSidebarToggled(!sidebarToggled);
//   };

//   const handleResize = () => {
//     if (window.innerWidth < 800) {
//       setSidebarToggled(false);
//     }
//   };

//   useEffect(() => {
//     handleResize();
//     window.addEventListener("resize", handleResize);

//     // Mengambil role pengguna dari localStorage atau sumber lainnya
//     const role = localStorage.getItem("rolename"); // Misalnya disimpan dalam localStorage
//     setUserRole(role);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const getAll = async () => {
//     try {
//       const response = await axios.get(
//         `${API_DUMMY_SMART}/api/user/customer/organization_ids`,
//         {
//           params: {
//             page: currentPage,
//             limit: rowsPerPage,
//           },
//           headers: {
//             "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
//           },
//         }
//       );

//       const { data, pagination } = response.data;
//       console.log("Response data:", response.data);

//       setList(data);
//       setPaginationInfo({
//         totalPages: pagination.total_page,
//         totalElements: pagination.total,
//       });
//     } catch (error) {
//       console.error("Terjadi kesalahan:", error.response || error.message);
//     }
//   };

//   useEffect(() => {
//     getAll(currentPage);
//   }, [currentPage, rowsPerPage]);

//   useEffect(() => {
//     AOS.init();
//   }, []);

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(1);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1);
//   };

//   const filteredList = list.filter((item) =>
//     Object.values(item).some(
//       (value) =>
//         typeof value === "string" &&
//         value.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const totalPages = Math.ceil(filteredList.length / rowsPerPage);

//   const deleteData = async (id) => {
//     Swal.fire({
//       title: "Apakah Anda Ingin Menghapus?",
//       text: "Perubahan data tidak bisa dikembalikan!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Hapus",
//       cancelButtonText: "Batal",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios
//           .delete(`${API_DUMMY_SMART}/api/user/customer/` + id, {
//             headers: {
//               "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
//             },
//           })
//           .then(() => {
//             Swal.fire({
//               icon: "success",
//               title: "Dihapus!",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//             getAll();
//             setTimeout(() => {
//               window.location.reload();
//             }, 1500);
//           })
//           .catch((err) => {
//             Swal.fire({
//               icon: "error",
//               title: "Hapus Data Gagal!",
//               showConfirmButton: false,
//               timer: 1500,
//             });
//             console.log(err);
//           });
//       }
//     });
//   };

//   return (
//     <div
//       className={`page-wrapper chiller-theme ${
//         sidebarToggled ? "toggled" : ""
//       }`}>
//       <a
//         id="show-sidebar"
//         className="btn1 btn-lg"
//         onClick={toggleSidebar}
//         style={{ color: "white", background: "#3a3f48" }}>
//         <i className="fas fa-bars"></i>
//       </a>
//       <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
//       <div className="page-content1" style={{ marginTop: "10px" }}>
//         <div
//           className="container box-table mt-3 app-main__outer"
//           data-aos="fade-left">
//           <div className="ml-2 row g-3 align-items-center d-lg-none d-md-flex rows-rspnv">
//             <div className="col-auto">
//               <label className="form-label mt-2">Rows per page:</label>
//             </div>
//             <div className="col-auto">
//               <select
//                 className="form-select form-select-xl w-auto"
//                 onChange={handleRowsPerPageChange}
//                 value={rowsPerPage}>
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={20}>20</option>
//               </select>
//             </div>
//           </div>
//           <div className="search">
//             <input
//               type="search"
//               className="form-control widget-content-right w-100 mt-2 mb-2 d-lg-none d-md-block"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//           </div>
//           <div className="main-card box-tabel mb-3 card">
//             <div className="card-header" style={{ display: "flex" }}>
//               <p className="mt-3">Cabang </p>
//               <div className="ml-2 row g-3 align-items-center d-lg-flex d-none d-md-none">
//                 <div className="col-auto">
//                   <label className="form-label mt-2">Rows per page:</label>
//                 </div>
//                 <div className="col-auto">
//                   <select
//                     className="form-select form-select-sm"
//                     onChange={handleRowsPerPageChange}
//                     value={rowsPerPage}>
//                     <option value={5}>5</option>
//                     <option value={10}>10</option>
//                     <option value={20}>20</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="d-flex ml-auto gap-3">
//                 <input
//                   type="search"
//                   className="form-control widget-content-right w-75 d-lg-block d-none d-md-none"
//                   placeholder="Search..."
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                 />
//                 {/* <div className="btn-actions-pane-right">
//                   <div role="group" className="btn-group-sm btn-group">
//                     <button className="active btn-focus p-2 rounded">
//                       <Link
//                         style={{ color: "white", textDecoration: "none" }}
//                         to="/add-cabang">
//                         Tambah
//                       </Link>
//                     </button>
//                   </div>
//                 </div> */}
//               </div>
//             </div>
//             <div
//               className="table-responsive-3"
//               style={{ overflowX: "auto", maxWidth: "100%" }}>
//               <table className="align-middle mb-0 table table-bordered table-striped table-hover">
//                 <thead>
//                   <tr>
//                     <th scope="col">No</th>
//                     <th>Nama Cabang</th>
//                     <th>Email</th>
//                     <th>HP</th>
//                     <th>Address</th>
//                     <th>Aksi</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredList.map((item, index) => (
//                     <tr key={index}>
//                       <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
//                       <td>{item.name}</td>
//                       <td>{item.email}</td>
//                       <td>{item.hp}</td>
//                       <td>{item.address}</td>
//                       <td>
//                         <div className="d-flex justify-content-center align-items-center">
//                           <button
//                             type="button"
//                             className="btn-primary btn-sm mr-2">
//                             <a
//                               style={{
//                                 color: "white",
//                                 textDecoration: "none",
//                               }}
//                               href={`/edit-cabang/${item.id}`}>
//                               <i class="fa-solid fa-circle-info"></i>
//                             </a>
//                           </button>
//                           <button
//                             onClick={() => deleteData(item.id)}
//                             type="button"
//                             className="btn-danger btn-sm">
//                             <i className="fa-solid fa-trash"></i>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="card-header mt-3 d-flex justify-content-center">
//               {/* <Pagination
//                 count={paginationInfo.totalPages}
//                 page={currentPage}
//                 onChange={(event, value) => setCurrentPage(value)}
//                 showFirstButton
//                 showLastButton
//                 color="primary"
//               /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DaftarCabang;


import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import { Pagination } from "@mui/material";
import "../../../../css/button.css";
import { API_DUMMY_SMART } from "../../../../utils/base_URL";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";
import { formatRupiah } from "../../../../utils/formating";

function DaftarCabang() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 1,
    totalElements: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  const handleResize = () => {
    if (window.innerWidth < 800) {
      setSidebarToggled(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    // Mengambil role pengguna dari localStorage atau sumber lainnya
    const role = localStorage.getItem("rolename"); // Misalnya disimpan dalam localStorage
    setUserRole(role);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/user/customer/organization_ids`,
        {
          params: {
            page: currentPage,
            limit: rowsPerPage,
          },
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );

      const { data, pagination } = response.data;
      console.log("datas: ", response.data);

      setList(data);
      setPaginationInfo({
        totalPages: pagination.total_page,
        totalElements: pagination.total,
      });
    } catch (error) {
      console.error("Terjadi kesalahan:", error.response || error.message);
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
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredList = list.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getAnakAsuh = async (id) => {
    try {
      const token = localStorage.getItem("tokenpython");
      if (!token) {
        throw new Error("Token tidak ditemukan. Harap login ulang.");
      }
      const response = await axios.get(
        `${API_DUMMY_SMART}/api/user/organization/38`,
        {
          headers: { "auth-tgh": `jwt ${token}` },
        }
      );
      console.log(response);

    } catch (error) {
      console.error("Error fetching donation data: ", error.message);
      return "";
    }
  };

  useEffect(() => {
    getAnakAsuh(38)
  }, [])

  return (
    <div
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
        }`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}>
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div
          className="container box-table mt-3 app-main__outer"
          data-aos="fade-left">
          <div className="ml-2 row g-3 align-items-center d-lg-none d-md-flex rows-rspnv">
            <div className="col-auto">
              <label className="form-label mt-2">Rows per page:</label>
            </div>
            <div className="col-auto">
              <select
                className="form-select form-select-xl w-auto"
                onChange={handleRowsPerPageChange}
                value={rowsPerPage}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          <div className="search">
            <input
              type="search"
              className="form-control widget-content-right w-100 mt-2 mb-2 d-lg-none d-md-block"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header" style={{ display: "flex" }}>
              <p className="mt-3">Cabang</p>
              <div className="ml-2 row g-3 align-items-center d-lg-flex d-none d-md-none">
                <div className="col-auto">
                  <label className="form-label mt-2">Rows per page:</label>
                </div>
                <div className="col-auto">
                  <select
                    className="form-select form-select-sm"
                    onChange={handleRowsPerPageChange}
                    value={rowsPerPage}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              className="table-responsive-3"
              style={{ overflowX: "auto", maxWidth: "100%" }}>
              <table className="align-middle mb-0 table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th>Nama LKSA</th>
                    <th>Lokasi</th>
                    <th>Email</th>
                    {/* <th>Jml Pegawai</th> */}
                    {/* <th>Jml Donasi 1 bulan terakhir</th>
                    <th>Jml Pengeluaran 1 bulan terakhir</th> */}
                    <th>No Hp</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((item, index) => (
                    <tr key={index}>
                      <td data-label="No" className="md:text-right">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td data-label="Nama LKSA" className="md:text-right">{item.name}</td>
                      <td data-label="Lokasi" className="md:text-right">{item.address}</td>
                      <td data-label="Email" className="md:text-right">{item.email}</td>
                      {/* <td data-label="JML PEGAWAI" className="md:text-right">{formatRupiah(item.total_outcome)}</td> */}
                      {/* <td data-label="Jml Donasi 1 bulan terakhir" className="md:text-right">{formatRupiah(item.total_income)}</td>
                      <td data-label="Jml Pengeluaran 1 bulan terakhir" className="md:text-right">{formatRupiah(item.total_outcome)}</td> */}
                      <td data-label="No Hp" className="md:text-right">{item.hp}</td>
                      <td data-label="Aksi" className="md:text-right">
                        <>
                          <button
                            type="button"
                            className="btn-warning mr-2 btn-sm">
                            <a
                              className="text-light"
                              href={"/detail_cabang/" + item.id}>
                              <i className="fas fa-info-circle"></i>
                            </a>
                          </button>
                        </>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-header mt-3 d-flex justify-content-center">
              <Pagination
                count={paginationInfo.totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
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

export default DaftarCabang;
