import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import "../../../../css/button.css";
import SidebarPantiAdmin from "../../../../component/SidebarPantiAdmin";

function GuruDataKegiatan() {
  // Data dummy kegiatan
  const [activities, setActivities] = useState([
    {
      id: 1,
      nama_kegiatan: "Pesantren Kilat Ramadhan",
      tingkat: "Nasional",
      penyelenggara: "DPR Kota Bandung",
      penanggung_jawab: "Ustadz Ahmad",
      date: "15 April 2023"
    },
    {
      id: 2,
      nama_kegiatan: "Lomba Hafalan Quran",
      tingkat: "Provinsi",
      penyelenggara: "Kemenag Jawa Barat",
      penanggung_jawab: "Ustadzah Fatimah",
      date: "20 Mei 2023"
    },
    {
      id: 3,
      nama_kegiatan: "Bakti Sosial",
      tingkat: "Lokal",
      penyelenggara: "Karang Taruna",
      penanggung_jawab: "Pak Ridwan",
      date: "10 Juni 2023"
    }
  ]);

  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    nama_kegiatan: "",
    tingkat: "",
    penyelenggara: "",
    penanggung_jawab: ""
  });

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      nama_kegiatan: "",
      tingkat: "",
      penyelenggara: "",
      penanggung_jawab: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newActivity = {
      id: activities.length + 1,
      ...formData,
      date: new Date().toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })
    };
    
    setActivities([...activities, newActivity]);
    closeModal();
    
    // Notifikasi sukses
    alert("Kegiatan berhasil ditambahkan!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) {
      setActivities(activities.filter(activity => activity.id !== id));
    }
  };

  const filteredActivities = activities.filter(activity =>
    Object.values(activity).some(
      value =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
              <h5 className="mt-2">Daftar Kegiatan</h5>
              <div className="d-flex align-items-center">
                <input
                  type="search"
                  className="form-control widget-content-right me-3"
                  placeholder="Cari kegiatan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "250px" }}
                />
                <button
                  className="active btn-focus p-2 rounded"
                  onClick={openModal}
                >
                 Tambah Kegiatan
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>No</th>
                    <th>Nama Kegiatan</th>
                    <th>Tingkat</th>
                    <th>Penyelenggara</th>
                    <th>Penanggung Jawab</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.length > 0 ? (
                    filteredActivities.map((activity, index) => (
                      <tr key={activity.id}>
                        <td>{index + 1}</td>
                        <td>{activity.nama_kegiatan}</td>
                        <td>
                          <span className={`badge ${
                            activity.tingkat === "Nasional" ? "bg-primary" :
                            activity.tingkat === "Provinsi" ? "bg-success" :
                            activity.tingkat === "Kabupaten" ? "bg-warning" :
                            "bg-secondary"
                          }`}>
                            {activity.tingkat}
                          </span>
                        </td>
                        <td>{activity.penyelenggara}</td>
                        <td>{activity.penanggung_jawab}</td>
                        <td>
                          <div className="d-flex">
                            <button
                              className="btn-primary btn-sm mr-2"
                              style={{ borderRadius: "6px" }}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn-primary btn-sm mr-2 btn-danger"
                              style={{ borderRadius: "6px" }}
                              onClick={() => handleDelete(activity.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="text-muted">
                          Tidak ada data kegiatan yang ditemukan
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

      {/* Modal Tambah Kegiatan */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className="modal-header" style={{ borderBottom: "1px solid #eee" }}>
            <h5 className="modal-title" style={{ color: "#4e73df", fontWeight: "600" }}>
              Form Tambah Kegiatan
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
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label fw-bold">Nama Kegiatan</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nama_kegiatan"
                    value={formData.nama_kegiatan}
                    onChange={handleInputChange}
                    required
                    placeholder="Contoh: Pesantren Kilat"
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
                  <label className="form-label fw-bold">Tingkat Kegiatan</label>
                  <select
                    className="form-select"
                    name="tingkat"
                    value={formData.tingkat}
                    onChange={handleInputChange}
                    required
                    style={{ 
                      borderRadius: "8px",
                      padding: "10px",
                      border: "1px solid #ddd"
                    }}
                  >
                    <option value="">Pilih Tingkat</option>
                    <option value="Nasional">Nasional</option>
                    <option value="Provinsi">Provinsi</option>
                    <option value="Kabupaten">Kabupaten</option>
                    <option value="Lokal">Lokal</option>
                  </select>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label fw-bold">Penyelenggara</label>
                  <input
                    type="text"
                    className="form-control"
                    name="penyelenggara"
                    value={formData.penyelenggara}
                    onChange={handleInputChange}
                    required
                    placeholder="Nama penyelenggara"
                    style={{ 
                      borderRadius: "8px",
                      padding: "10px",
                      border: "1px solid #ddd"
                    }}
                  />
                </div>
              </div>
              
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label fw-bold">Penanggung Jawab</label>
                  <input
                    type="text"
                    className="form-control"
                    name="penanggung_jawab"
                    value={formData.penanggung_jawab}
                    onChange={handleInputChange}
                    required
                    placeholder="Nama penanggung jawab"
                    style={{ 
                      borderRadius: "8px",
                      padding: "10px",
                      border: "1px solid #ddd"
                    }}
                  />
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
                Simpan Kegiatan
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default GuruDataKegiatan;