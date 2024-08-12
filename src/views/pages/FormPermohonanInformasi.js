import React from "react";
import Navbar from "../../component/Navbar";
import "../../css/FormPermohonanInformasi.css";
import info from "../../aset/undraw_settings_tab_mgiw.svg";
import Footer from "../../component/Footer";

const PermohonanInformasi = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="head">
          <div className="form" >
            <div className="form-txt" >
              {" "}
              <h1 className="h1">FORM PERMOHONAN INFORMASI</h1>
              <h1>__________</h1>
            </div>
            <div className="info">
              <img id="img" src={info} className="img" />
            </div>
          </div>
          <div className="option" style={{}}>
            <div>
              <form>
                <p style={{}}>Nama Pemohon:</p>
                <input className="input" />
                <p className="pp">0 of 30 max characters</p>
                <br></br>
                <p>Alamat Pemohon:</p>
                <textarea
                  className="textarea"
                 
                />
                <p className="pp">0 of 60 max characters</p>
                <br></br>
                <p>Nomor Identitas Pemohon:</p>
                <input className="input" />
                <p className="pp">0 of 30 max characters</p>
                <br></br>
                <p>Jenis Identitas:</p>
                <select className="select">
                  <option>KTP (Kartu Tanda Penduduk)</option>
                  <option>SIM (Surat Izin Mengemudi)</option>
                  <option>KTM (Kartu Tanda Mahasiswa)</option>
                </select>
                <br></br>
                <br></br>
                <p>Nomor Telp/HP:</p>
                <input className="input" />
                <p className="pp">0 of 30 max characters</p>
                <br></br>
                <p>Email:</p>
                <input className="input" />{" "}
                <p className="pp">0 of 30 max characters</p>
                <br></br>
                <p>Rincian Yang Dibutuhkan (Tambah Keterangan Bila Perlu):</p>
                <textarea
                  className="textarea"
                 
                />
                <p className="pp">0 of 100 max characters</p>
                <br></br>
              </form>
            </div>
            <div className="tujuan" >
              <p>Tujuan Penggunaan Informasi:</p>
              <textarea
                className="textarea"
               
              />
              <p className="pp">0 of 100 max characters</p>

              <br></br>
              <p>Cara Memproleh Infromasi:</p>
              <select className="select">
                <option>Melihat / Mendengar / Membaca / Mencatat</option>
                <option>Mendapat Salianan Informasi</option>
              </select>
              <br></br>
              <p>Cara Mengambil Salinan Informasi:</p>
              <select className="select">
                <option>Mengambil Langsung </option>
                <option>POS</option>
                <option>Kurir</option>
                <option>Fax</option>
                <option>Email</option>
              </select>
              <br></br>
              <p>Upload Photo Identitas (.jpg) size max 1mb:</p>
              <input type="file" />
              <br></br>
              <p>Jaminan Perlindungan Data Pribadi:</p>
              <ol>
                <li>
                  Permintaan data pribadi untuk kepentingan pelayanan informasi
                </li>
                <li>
                  Bawaslu tidak akan memberikan data pribadi pemohon kepada
                  pihak ketiga.
                </li>
                <li>
                  Bawaslu akan memberitahukan kepada pemohon jika terjadi
                  kebocoran perlindungan data pribadi dan mengupayakan
                  pemulihannya.
                </li>
                <li>
                  Bawaslu akan memberikan sanksi kepada oknum internal yang
                  mengambil data pribadi pemohon untuk di luar kepentingan
                  pelayanan informasi.
                </li>
                <li>
                  Pemohon dapat menyampaikan pengaduan/keberatan bagi pemohon
                  atas dugaan tidak terlindunginya data pribadi pemohon.
                </li>
                <li>
                  Bawaslu akan memusnahkan data pribadi pemohon setelah lima
                  tahun atau di bawah lima tahun atas permintaan pemohon dengan
                  alasan yang dibenarkan oleh peraturan per-UU-an
                </li>
              </ol>
              <br></br>
              <div id="div-button" className="div-button">              <button className="button" >Kirim</button>
</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PermohonanInformasi;
