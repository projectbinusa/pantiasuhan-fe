import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import "../../../../css/button.css";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function GuruDataDonasi() {
  // Data dummy donasi
  const [donations, setDonations] = useState([
    {
      id: 1,
      donation_name: "Bantuan Pendidikan",
      donator_name: "Budi Santoso",
      amount: 2500000,
      description: "Donasi untuk pembelian buku pelajaran",
      signature: "https://via.placeholder.com/150x60?text=TTD+Budi",
      date: "15 Mei 2023"
    },
    {
      id: 2,
      donation_name: "Bantuan Makanan",
      donator_name: "Ani Wijaya",
      amount: 1500000,
      description: "Donasi untuk makan siang anak-anak panti",
      signature: "https://via.placeholder.com/150x60?text=TTD+Ani",
      date: "20 Juni 2023"
    }
  ]);

  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    donation_name: "",
    donator_name: "",
    amount: "",
    description: "",
    signature: ""
  });

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      donation_name: "",
      donator_name: "",
      amount: "",
      description: "",
      signature: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          signature: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDonation = {
      id: donations.length + 1,
      ...formData,
      amount: parseInt(formData.amount),
      date: new Date().toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    };
    
    setDonations([...donations, newDonation]);
    closeModal();
    
    // Notifikasi sukses
    alert("Donasi berhasil ditambahkan!");
  };

  const filteredDonations = donations.filter(donation =>
    Object.values(donation).some(
      value =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  // Style untuk modal
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "600px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    overflowY: "auto",
    maxHeight: "90vh",
  };

  return (
    <div className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""}`}>
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}
      >
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div className="container box-table mt-3 app-main__outer">
          <div className="main-card box-tabel mb-3 card">
            <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h5 className="mt-2">Daftar Donasi</h5>
              <div className="d-flex align-items-center">
                <input
                  type="search"
                  className="form-control widget-content-right me-3"
                  placeholder="Cari donasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "250px" }}
                />
                <button
                className="active btn-focus p-2 rounded"
                onClick={openModal}>
                    Tambah Donasi
                </button>

              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>No</th>
                    <th>Nama Donasi</th>
                    <th>Nama Donatur</th>
                    <th>Jumlah Donasi</th>
                    <th>Deskripsi</th>
                    <th>TTD</th>
                    <th>Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonations.length > 0 ? (
                    filteredDonations.map((donation, index) => (
                      <tr key={donation.id}>
                        <td>{index + 1}</td>
                        <td>{donation.donation_name}</td>
                        <td>{donation.donator_name}</td>
                        <td>Rp {donation.amount.toLocaleString('id-ID')}</td>
                        <td>{donation.description}</td>
                        <td>
                          {donation.signature && (
                            <img 
                              src={donation.signature} 
                              alt="TTD Donatur" 
                              style={{ 
                                maxWidth: "120px", 
                                height: "auto",
                                border: "1px solid #ddd",
                                borderRadius: "4px"
                              }} 
                            />
                          )}
                        </td>
                        <td>{donation.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        <div className="text-muted">
                          Tidak ada data donasi yang ditemukan
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Tambah Donasi */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="modal-header" style={{ borderBottom: "1px solid #eee" }}>
            <h5 className="modal-title" style={{ color: "#4e73df", fontWeight: "600" }}>
              Form Tambah Donasi
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label fw-bold">Nama Donasi</label>
                  <input
                    type="text"
                    className="form-control"
                    name="donation_name"
                    value={formData.donation_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Contoh: Bantuan Pendidikan"
                    style={{ 
                      borderRadius: "8px",
                      padding: "10px",
                      border: "1px solid #ddd"
                    }}
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label fw-bold">Nama Donatur</label>
                  <input
                    type="text"
                    className="form-control"
                    name="donator_name"
                    value={formData.donator_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Nama lengkap donatur"
                    style={{ 
                      borderRadius: "8px",
                      padding: "10px",
                      border: "1px solid #ddd"
                    }}
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label fw-bold">Jumlah Donasi (Rp)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    placeholder="Contoh: 1000000"
                    style={{ 
                      borderRadius: "8px",
                      padding: "10px",
                      border: "1px solid #ddd"
                    }}
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label fw-bold">Tanda Tangan</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ 
                      borderRadius: "8px",
                      padding: "10px",
                      border: "1px solid #ddd"
                    }}
                  />
                  {formData.signature && (
                    <div className="mt-2">
                      <small className="text-muted">Preview:</small>
                      <img 
                        src={formData.signature} 
                        alt="Preview TTD" 
                        style={{ 
                          maxWidth: "100px", 
                          height: "auto",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          marginLeft: "10px"
                        }} 
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label fw-bold">Deskripsi Donasi</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    placeholder="Deskripsi tujuan donasi"
                    style={{ 
                      borderRadius: "8px",
                      padding: "10px",
                      border: "1px solid #ddd"
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="modal-footer mt-4" style={{ borderTop: "1px solid #eee" }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
                style={{ 
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontWeight: "500"
                }}
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ 
                  backgroundColor: "#4e73df",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontWeight: "600"
                }}
              >
                Simpan Donasi
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default GuruDataDonasi;