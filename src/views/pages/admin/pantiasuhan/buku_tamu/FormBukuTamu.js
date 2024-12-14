import axios from "axios";
import React, { useState } from "react";
import { API_DUMMY_PYTHON } from "../../../../../utils/base_URL";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

function FormBukuTamu() {
  const [nama, setNama] = useState("");
  const [noWa, setNoWa] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [image, setImage] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [catatan, setCatatan] = useState("");

  const history = useHistory();
  const param = useParams();

  const add = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      await axios.post(
        `${API_DUMMY_PYTHON}/api/guestbook`,
        {
          no_wa: noWa,
          address: alamat,
          nama: nama,
          visit_date: tanggal,
          // url_image_donation: image.name,
          note: catatan,
          description_donation: tujuan,
          organization_id: param.organization_id
        }
      );

      Swal.fire({
        icon: "success",
        title: "Data Berhasil DiTambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push("/");
      }, 1500);
    } catch (error) {
      if (error.ressponse && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Tambah Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    }
  };
  return (
    <div className="app-main__inner m-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Buku Tamu</h1>
              <hr />
              <form onSubmit={add}>
                <div className="row">
                  <div className="mb-3 col-lg-12">
                    <label className="form-label font-weight-bold">Nama</label>
                    <input
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      type="text" placeholder="Masukkan Nama"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-lg-12">
                    <label className="form-label font-weight-bold">No Whatsapp</label>
                    <input
                      value={noWa}
                      onChange={(e) => setNoWa(e.target.value)}
                      type="number" placeholder="Masukkan No Whatsapp"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-lg-12">
                    <label className="form-label font-weight-bold">Alamat</label>
                    <textarea rows={3} className="form-control" placeholder="Masukkan Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3 col-lg-12">
                    <label className="form-label font-weight-bold">Tujuan Kunjungan</label>
                    <textarea rows={3} className="form-control" placeholder="Masukkan Tujuan Kunjungan" value={tujuan} onChange={(e) => setTujuan(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3 col-lg-12">
                    <label className="form-label font-weight-bold">Tanggal Kunjungan</label>
                    <input className="form-control" type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)}/>
                  </div>
                  {/* <div className="mb-3 col-lg-12">
                    <label className="form-label font-weight-bold">Bukti Donasi</label>
                    <input
                      onChange={(e) =>
                        setImage(
                          e.target.files ? e.target.files[0] : null
                        )
                      } type="file"
                      className="form-control"
                    />
                  </div> */}
                  <div className="mb-3 col-lg-12">
                    <label className="form-label font-weight-bold">Catatan</label>
                    <textarea rows={3} className="form-control" placeholder="Masukkan Catatan" value={catatan} onChange={(e) => setCatatan(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <button type="submit" className="btn-primary mt-3">Kirim</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormBukuTamu;