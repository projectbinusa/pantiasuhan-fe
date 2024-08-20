import React, { useState } from "react";
import NavbarSekolah from "../../../../component/NavbarSekolah";
import FooterSekolah from "../../../../component/FooterSekolah";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pagination } from "@mui/material";

const generateData = (num) => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    name: `Name ${index + 1}`,
    status: `Status ${index + 1}`,
  }));
};

const data = generateData(100);

const TenagaKepndidkan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const currentData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (event, pageNumber) => setCurrentPage(pageNumber);

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  const imageStyle = {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
    borderRadius: "10px",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px",
  };

  const imageContainerStyle = {
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    width: "100%",
    marginTop: "60px",
  };

  return (
    <div>
      <NavbarSekolah />
      <div style={containerStyle}>
        <div
          style={imageContainerStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src="https://lh5.googleusercontent.com/p/AF1QipPiTYMPukmrWn57NP0O_90hGlAwYH1dxd-Tv39r=w2048-h2048-k-no"
            alt="SMP Negeri 1 Bergas"
            style={imageStyle}
          />
        </div>
      </div>
      <div className="container mt-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
          <input
            type="search"
            className="form-control mb-3 mb-md-0"
            placeholder="Search by name or status"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ flex: "1" }}
          />
          <select
            className="form-select ms-0 ms-md-3"
            style={{ width: "120px" }}
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ width: "5%" }}>No</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{ paddingRight: "0" }}>
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center align-items-center mt-3">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            style={{ marginBottom: "30px"}}
            showFirstButton
            showLastButton
          />
        </div>
      </div>
      <FooterSekolah />
    </div>
  );
};

export default TenagaKepndidkan;
