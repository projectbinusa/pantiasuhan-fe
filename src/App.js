import { Route, Switch, BrowserRouter } from "react-router-dom";
import Dashbaord from "./views/pagesekolah/Home";
import "./css/style.css";
import Login from "./views/pages/auth/Login";
import Register from "./views/pages/auth/Register";
import PrivateRoute from "./utils/PrivateRoute";
import "../src/css/table.css";

// pageSekolah
import sambutan from "./views/pagesekolah/profilSekolah/sambutan/SambutanKepala";
import beritaNews from "./views/pagesekolah/berita/tebaru/News";
import Guru from "./views/pages/admin/smpn1bergas/menu/guru/Guru";
import Alumni from "./views/pages/admin/smpn1bergas/menu/alumni/Alumni";
import Kontak from "./views/pages/admin/smpn1bergas/menu/kontak/Kontak";
import Sejarah from "./views/pages/admin/smpn1bergas/menu/sejarah/Sejarah";
import TenagaKenpendidikan from "./views/pages/admin/smpn1bergas/profileSekolah/tenagaKependidikan/TenagaKenpendidikan";
import VisiMisi from "./views/pages/admin/smpn1bergas/profileSekolah/visimisi/VisiMisi";
import TenagaPendidikan from "./views/pages/admin/smpn1bergas/profileSekolah/tenagaPendidikan/TenagaPendidikan";
import AddGuru from "./views/pages/admin/smpn1bergas/menu/guru/AddGuru";
import EditGuru from "./views/pages/admin/smpn1bergas/menu/guru/EditGuru";
import AddAlumni from "./views/pages/admin/smpn1bergas/menu/alumni/AddAlumni";
import EditAlumni from "./views/pages/admin/smpn1bergas/menu/alumni/EditAlumni";
import AddKontak from "./views/pages/admin/smpn1bergas/menu/kontak/AddKontak";
import EditKontak from "./views/pages/admin/smpn1bergas/menu/kontak/EditKontak";
import AdminSambutan from "./views/pages/admin/smpn1bergas/menu/sambutan/Sambutan";
import AddSambutan from "./views/pages/admin/smpn1bergas/menu/sambutan/AddSambutan";
import EditSambutan from "./views/pages/admin/smpn1bergas/menu/sambutan/EditSambutan";
import EditSejarah from "./views/pages/admin/smpn1bergas/menu/sejarah/EditSejarah";
import AddSejarah from "./views/pages/admin/smpn1bergas/menu/sejarah/AddSejarah";
import AddVisiMisi from "./views/pages/admin/smpn1bergas/profileSekolah/visimisi/AddVisiMisi";
import EditVisiMisi from "./views/pages/admin/smpn1bergas/profileSekolah/visimisi/EditVisiMisi";
import AddTenagaKependidikan from "./views/pages/admin/smpn1bergas/profileSekolah/tenagaKependidikan/AddTenagaKependidikan";
import EditTenagaKependidikan from "./views/pages/admin/smpn1bergas/profileSekolah/tenagaKependidikan/EditTenagaKependidikan";
import AllAPBD from "./views/pagesekolah/keuangan/apbd/AllAPBD";
import DetailAPBD from "./views/pagesekolah/keuangan/apbd/DetailAPBD";
import DetailBOS from "./views/pagesekolah/keuangan/bos/DetailBOS";
import DetailKomite from "./views/pagesekolah/keuangan/komite/DetailKomite";
import AllBOS from "./views/pagesekolah/keuangan/bos/AllBos";
import AllKomite from "./views/pagesekolah/keuangan/komite/AllKomite";
import VisiMisiSekolah from "./views/pagesekolah/profilSekolah/visi-misi/visiMisiSekolah";
import SejarahSekolah from "./views/pagesekolah/profilSekolah/sejarah/sejarahSekolah";
import TenagaKepndidkan from "./views/pagesekolah/profilSekolah/staf/tenagaKependidikan";
import PrestasiSekolah from "./views/pagesekolah/profilSekolah/prestasi/prestasiSekolah";
import DetailNews from "./views/pagesekolah/berita/tebaru/DetailNews";
import DetailPrestasi from "./views/pagesekolah/profilSekolah/prestasi/DetailPrestasi";
import DetailAlumni from "./views/pagesekolah/DetailAlumni";
import Osis from "./views/pagesekolah/kesiswaan/Osis";
import Info from "./views/pagesekolah/berita/info/info";
import DetailInfo from "./views/pagesekolah/berita/info/DetailInfo";
import agenda from "./views/pagesekolah/berita/agenda/Agenda";
import DetailAgenda from "./views/pagesekolah/berita/agenda/DetailAgenda";
// import Galery from "./views/pagesekolah/berita/gambar/GalerySekolah";
import Sarpras from "./views/pagesekolah/profilSekolah/sarpras/Sarpras";
import AddCategory from "./views/pages/admin/smpn1bergas/berita/categoryBerita/AddCategory";
import EditCategory from "./views/pages/admin/smpn1bergas/berita/categoryBerita/EditCategory";
import AddBeritaAdmin from "./views/pages/admin/smpn1bergas/berita/AddBeritaAdmin";
import AdminBerita from "./views/pages/admin/smpn1bergas/berita/AdminBerita";
import EditBeritaAdmin from "./views/pages/admin/smpn1bergas/berita/EditBeritaAdmin";
import DetailBerita from "./views/pages/admin/smpn1bergas/berita/DetailBerita";
import Keuangan from "./views/pages/admin/smpn1bergas/menu/keuangan/Keuangan";
import EditKeuangan from "./views/pages/admin/smpn1bergas/menu/keuangan/EditKeuangan";
import AddKeuangan from "./views/pages/admin/smpn1bergas/menu/keuangan/AddKeuangan";
import Ekskul from "./views/pages/admin/smpn1bergas/ekskul/Ekskul";
import AddEkskul from "./views/pages/admin/smpn1bergas/ekskul/AddEkskul";
import EditEkskul from "./views/pages/admin/smpn1bergas/ekskul/EditEkskul";
import Sarana from "./views/pages/admin/smpn1bergas/sarana/Sarana";
import AddSarana from "./views/pages/admin/smpn1bergas/sarana/AddSarana";
import EditSarana from "./views/pages/admin/smpn1bergas/sarana/EditSarana";
import Kegiatan from "./views/pages/admin/smpn1bergas/kegiatan/Kegiatan";
import AddKegiatan from "./views/pages/admin/smpn1bergas/kegiatan/AddKegiatan";
import EditKegiatan from "./views/pages/admin/smpn1bergas/kegiatan/EditKegiatan";
import Program from "./views/pages/admin/smpn1bergas/program/Program";
import AddProgram from "./views/pages/admin/smpn1bergas/program/AddProgram";
import EditProgram from "./views/pages/admin/smpn1bergas/program/EditProgram";
import Prestasi from "./views/pages/admin/smpn1bergas/prestasi/Prestasi";
import AddPrestasi from "./views/pages/admin/smpn1bergas/prestasi/AddPrestasi";
import EditPrestasi from "./views/pages/admin/smpn1bergas/prestasi/EditPrestasi";
import FotoKegiatan from "./views/pages/admin/smpn1bergas/kegiatan/fotoKegiatan/FotoKegiatan";
import AddFotoKegiatan from "./views/pages/admin/smpn1bergas/kegiatan/fotoKegiatan/AddFotoKegiatan";
import EditFotoKegiatan from "./views/pages/admin/smpn1bergas/kegiatan/fotoKegiatan/EditFotoKegiatan";
import Struktur from "./views/pages/admin/smpn1bergas/struktur/Struktur";
import AddStructur from "./views/pages/admin/smpn1bergas/struktur/AddStructur";
import EditStruktur from "./views/pages/admin/smpn1bergas/struktur/EditStruktur";
import FotoSarana from "./views/pages/admin/smpn1bergas/sarana/fotoSarana/FotoSarana";
import AddFotoSarana from "./views/pages/admin/smpn1bergas/sarana/fotoSarana/AddFotoSarana";
import EditFotoSarana from "./views/pages/admin/smpn1bergas/sarana/fotoSarana/EditFotoSarana";
import KondisiSekolah from "./views/pages/admin/smpn1bergas/profileSekolah/kondisiSekolah/KondisiSekolah";
import AddKondisiSekolah from "./views/pages/admin/smpn1bergas/profileSekolah/kondisiSekolah/AddKondisiSekolah";
import EditKondisiSekolah from "./views/pages/admin/smpn1bergas/profileSekolah/kondisiSekolah/EditKondisiSekolah";
import GalerySekolah from "./views/pagesekolah/berita/gambar/GalerySekolah";
import Perpustakaan from "./views/pagesekolah/perpus/Perpustakaan";
import KonsidisiSekolahView from "./views/pagesekolah/profilSekolah/kondisisekolah/KondisiSekolahView";
import AddPerpus from "./views/pages/admin/smpn1bergas/menu/perpus/AddPerpus";
import EditPerpus from "./views/pages/admin/smpn1bergas/menu/perpus/EditPerpus";
import AdminPerpus from "./views/pages/admin/smpn1bergas/menu/perpus/Perpustakaan";
import DetailPerpus from "./views/pagesekolah/perpus/DetailPerpus";
import StrukturOrganisasi from "./views/pagesekolah/profilSekolah/StrukturOrganisasi";
import KotakMasuk from "./views/pages/admin/smpn1bergas/kotakmasuk/KotakMasuk";
import DetailAlumniAdmin from "./views/pages/admin/smpn1bergas/menu/alumni/DetailAlumni";
import RuangKantor from "./views/pagesekolah/profilSekolah/sarpras/RuangKantor";
import RuangKelas from "./views/pagesekolah/profilSekolah/sarpras/RuangKelas";
import RuangLab from "./views/pagesekolah/profilSekolah/sarpras/RuangLab";
import SaranaOlahraga from "./views/pagesekolah/profilSekolah/sarpras/SaranaOlahraga";
import SaranaIbadah from "./views/pagesekolah/profilSekolah/sarpras/SaranaIbadah";
import SaranaKesehatan from "./views/pagesekolah/profilSekolah/sarpras/SaranaKesehatan";
import SaranaProtokolKesehatan from "./views/pagesekolah/profilSekolah/sarpras/SaranaProtokolKesehatan";
import MateriAjar from "./views/pages/admin/smpn1bergas/materiajar/MateriAjar";
import EditMateriAjar from "./views/pages/admin/smpn1bergas/materiajar/EditMateriAjar";
import DetailMateriAjar from "./views/pages/admin/smpn1bergas/materiajar/DetailMateriAjar";
import AddMateriAjar from "./views/pages/admin/smpn1bergas/materiajar/AddMateriAjar";
import Ekstrakurikuler from "./views/pagesekolah/profilSekolah/ekstrakurikuler/Ekstrakurikuler";
import MateriAjarView from "./views/pagesekolah/kesiswaan/MateriAjar";
import AdminOsis from "./views/pages/admin/smpn1bergas/menu/osis/Osis";
import AddOsis from "./views/pages/admin/smpn1bergas/menu/osis/AddOsis";
import EditOsis from "./views/pages/admin/smpn1bergas/menu/osis/EditOsis";
import Pengembangan from "./views/pagesekolah/program/Pengembangan";
import PerawatanRutin from "./views/pagesekolah/program/PerawatanRutin";
import SewaLayanan from "./views/pagesekolah/program/SewaLayanan";
import DetailSambutan from "./views/pages/admin/smpn1bergas/menu/sambutan/DetailSambutan";
import DetailVisi from "./views/pages/admin/smpn1bergas/profileSekolah/visimisi/DetailVisiMisi";
import DetailKondisiSekolah from "./views/pages/admin/smpn1bergas/profileSekolah/kondisiSekolah/DetailKondisiSekolah";
import KegiatanSekolah from "./views/pagesekolah/kegiatan/KegiatanSekolah";
import DetailKegiatan from "./views/pagesekolah/kegiatan/DetailKegiatan";
import DetailEkskul from "./views/pages/admin/smpn1bergas/ekskul/DetailEkskul";
import AlumniAll from "./views/pagesekolah/AlumniAll";
import { useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { Backdrop, CircularProgress } from "@mui/material";
import Loading from "./component/Loading";
import DetailSarana from "./views/pages/admin/smpn1bergas/sarana/DetailSarana";
import KontakView from "./views/pagesekolah/Kontak";
import DetailKegiatanAdmin from "./views/pages/admin/smpn1bergas/kegiatan/DetailKegiatan";
import DetailPrestasiAdmin from "./views/pages/admin/smpn1bergas/prestasi/DetailPrestasi";
import DetailProgram from "./views/pages/admin/smpn1bergas/program/DetailProgram";
import Sidebar1 from "./component/Sidebar1";
import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase";
import EditCategoryProgram from "./views/pages/admin/smpn1bergas/program/category/EditCategoryProgram";
import AddCategoryProgram from "./views/pages/admin/smpn1bergas/program/category/AddCategoryProgram";
import DetailSejarah from "./views/pages/admin/smpn1bergas/menu/sejarah/DetailSejarah";
import AbsenMasuk from "./views/pages/anak/AbsenMasuk";
import AbsenPulang from "./views/pages/anak/AbsenPulang";
import DataAbsen from "./views/pages/anak/DataAbsen";
import Izin from "./views/pages/anak/Izin";
import Iventaris from "./views/pages/admin/pantiasuhan/iventaris/Iventaris1";
import AddInves from "./views/pages/admin/pantiasuhan/iventaris/Addiventaris";
import EditInves from "./views/pages/admin/pantiasuhan/iventaris/EditIventaris";
import Dataortu from "./views/pages/admin/pantiasuhan/OrtuAsuh/Dataorangtua";
import AddOrtu from "./views/pages/admin/pantiasuhan/OrtuAsuh/AddOrtu";
import EditOrtu from "./views/pages/admin/pantiasuhan/OrtuAsuh/EditOrtu";
import DetailOrtu from "./views/pages/admin/pantiasuhan/OrtuAsuh/DetailOrtu";
import DetailSAmbutanPanti from "./views/pages/admin/pantiasuhan/sambutan/DetailSambutan";
import AddSambutanPanti from "./views/pages/admin/pantiasuhan/sambutan/AddSambutan";
import EditSambutanPanti from "./views/pages/admin/pantiasuhan/sambutan/EditSambutan";
import DetailVisiPanti from "./views/pages/admin/pantiasuhan/visimisi/DetailVisiMisi";
import AddVisiMisiPanti from "./views/pages/admin/pantiasuhan/visimisi/AddVisiMisi";
import EditVisiMisiPanti from "./views/pages/admin/pantiasuhan/visimisi/EditVisiMisi";
import KegiatanPanti from "./views/pages/admin/pantiasuhan/kegiatan/Kegiatan";
import AddKegiatanPanti from "./views/pages/admin/pantiasuhan/kegiatan/AddKegiatan";
import DetailKegiatanPanti from "./views/pages/admin/pantiasuhan/kegiatan/DetailKegiatan";
import EditKegiatanPanti from "./views/pages/admin/pantiasuhan/kegiatan/EditKegiatan";
import AddFotoKegiatanPanti from "./views/pages/admin/pantiasuhan/kegiatan/fotoKegiatan/AddFotoKegiatan";
import EditFotoKegiatanPanti from "./views/pages/admin/pantiasuhan/kegiatan/fotoKegiatan/EditFotoKegiatan";
import FotoKegiatanPanti from "./views/pages/admin/pantiasuhan/kegiatan/fotoKegiatan/FotoKegiatan";
import AddKontakPanti from "./views/pages/admin/pantiasuhan/kontak/AddKontak";
import EditKontakPanti from "./views/pages/admin/pantiasuhan/kontak/EditKontak";
import KontakPanti from "./views/pages/admin/pantiasuhan/kontak/Kontak";
import KotakMasukPanti from "./views/pages/admin/pantiasuhan/kotakmasuk/KotakMasuk";
import DataBukuTamu from "./views/pages/admin/pantiasuhan/buku_tamu/DataBukuTamu";
import AddBukuTamu from "./views/pages/admin/pantiasuhan/buku_tamu/AddBukuTamu";
import EditBukuTamu from "./views/pages/admin/pantiasuhan/buku_tamu/EditBukuTamu";
import DetailBukuTamu from "./views/pages/admin/pantiasuhan/buku_tamu/DetailBukuTamu";
import DataTahsin from "./views/pages/admin/pantiasuhan/tahsin/DataTahsin";
import DataAbsensi from "./views/pages/admin/pantiasuhan/absensi/DataAbsensi";
import DataAbsensiSiswa from "./views/pages/admin/pantiasuhan/absensi/DataAbsensiSiswa";
import Galery from "./views/pages/admin/pantiasuhan/galery/Galery";
import AddGalery from "./views/pages/admin/pantiasuhan/galery/AddGalery";
import EditGalery from "./views/pages/admin/pantiasuhan/galery/EditGalery";
import LoginSiswa from "./views/pages/anak/LoginSiswa";
import TahsinAnak from "./views/pages/anak/TahsinAnak";
import AddTahsin from "./views/pages/anak/AddTashin";
import EditTahsin from "./views/pages/anak/EditTahsin";
import DataAnak from "./views/pages/admin/pantiasuhan/anak/DataAnak";
import AddAnak from "./views/pages/admin/pantiasuhan/anak/AddAnak";
import EditAnak from "./views/pages/admin/pantiasuhan/anak/EditAnak";
import DetailAnak from "./views/pages/admin/pantiasuhan/anak/DetailAnak";
import FormBukuTamu from "./views/pages/admin/pantiasuhan/buku_tamu/FormBukuTamu";
import DataBarangInventaris from "./views/pages/admin/pantiasuhan/iventaris/barang/DataBarangInventaris";
import KategoriBarangInventaris from "./views/pages/admin/pantiasuhan/iventaris/kategori/KategoriBarang";
import StokBarangInventaris from "./views/pages/admin/pantiasuhan/iventaris/stok/StokBarangInventaris";
import StatusBarangInventaris from "./views/pages/admin/pantiasuhan/iventaris/status/StatusBarangInventaris";
import LokasiBarangInventaris from "./views/pages/admin/pantiasuhan/iventaris/lokasi/LokasiBarangInventaris";
import EditBarangInventaris from "./views/pages/admin/pantiasuhan/iventaris/barang/EditBarangInventaris";
import EditKategoriBarang from "./views/pages/admin/pantiasuhan/iventaris/kategori/EditKategoriBarang";
import EditStokBarang from "./views/pages/admin/pantiasuhan/iventaris/stok/EditStokBarang";
import EditLokasiBarang from "./views/pages/admin/pantiasuhan/iventaris/lokasi/EditLokasiBarang";
import EditStatusBarang from "./views/pages/admin/pantiasuhan/iventaris/status/EditStatusBarang";
import Donasi from "./views/pages/admin/pantiasuhan/donasi/Donasi.js";
import EditDonasi from "./views/pages/admin/pantiasuhan/donasi/EditDonasi.js";
import TambahDonasi from "./views/pages/admin/pantiasuhan/donasi/TambahDonasi.js";
import DonasiUmum from "./views/pages/admin/pantiasuhan/donasi/DonasiUmum.js";
import DonasiTrx from "./views/pages/admin/pantiasuhan/donasitrx/DonasiTrx.js";
import TambahDonasiTrx from "./views/pages/admin/pantiasuhan/donasitrx/TambahDonasiTrx.js";
import EditDonasiTrx from "./views/pages/admin/pantiasuhan/donasitrx/EditDonasiTrx.js";
import KondisiBarangInventaris from "./views/pages/admin/pantiasuhan/iventaris/kondisi/KondisiBarangInventaris.js";
import EditKondisiBarang from "./views/pages/admin/pantiasuhan/iventaris/kondisi/EditKondisiBarang.js";
import TambahDonasiUmum from "./views/pages/admin/pantiasuhan/donasi/publik/AddDonasiUmum.js";
import DetailDonasi from "./views/pages/admin/pantiasuhan/donasi/DetailDonasi.js";
import PreviewDonasi from "./views/pages/admin/pantiasuhan/donasi/publik/PreviewDonasi.js";
import Panduan from "./views/pages/admin/pantiasuhan/donasi/publik/Panduan.js";
import DanaMasuk from "./views/pages/admin/pantiasuhan/donasi/publik/DanaMasuk.js";
import AdminDanaKeluar from "./views/pages/admin/pantiasuhan/donasi/danakeluar/AdminDanaKeluar.js";
import AddDanaKeluar from "./views/pages/admin/pantiasuhan/donasi/danakeluar/AddDanaKeluar.js";
import EditDanaKeluar from "./views/pages/admin/pantiasuhan/donasi/danakeluar/EditDanaKeluar.js";
import DashboardPanti from "./views/pages/admin/pantiasuhan/DashboardPanti.js";
import AdminBeritaPanti from "./views/pages/admin/pantiasuhan/berita/AdminBerita.js";
import AddBeritaAdminPanti from "./views/pages/admin/pantiasuhan/berita/AddBeritaAdmin.js";
import EditBeritaAdminPanti from "./views/pages/admin/pantiasuhan/berita/EditBeritaAdmin.js";
import DetailBeritaPantiAdmin from "./views/pages/admin/pantiasuhan/berita/DetailBerita.js";
import LaporanHarianPresensi from "./views/pages/admin/pantiasuhan/presensi/LaporanHarian.js";
import LaporanBulananPresensi from "./views/pages/admin/pantiasuhan/presensi/LaporanBulanan.js";
import LaporanTahunanPresensi from "./views/pages/admin/pantiasuhan/presensi/LaporanTahunan.js";
import PublikDetailProgramPanti from "./views/pages/admin/pantiasuhan/PublikDetailProgramPanti.js";
import PublikDetailBeritaPanti from "./views/pages/admin/pantiasuhan/PublikDetailBeritaPanti.js";
import PublikBerita from "./views/pages/admin/pantiasuhan/berita/PublikBerita.js";
import PublikProgram from "./views/pages/admin/pantiasuhan/PublikProgram.js";
import DanaKeluar from "./views/pages/admin/pantiasuhan/donasi/publik/DanaKeluar.js";
import DataShift from "./views/pages/admin/pantiasuhan/shift/DataShift.js";
import EditShift from "./views/pages/admin/pantiasuhan/shift/EditShift.js";
import ShiftPublik from "./views/pages/anak/ShiftPublik.js";
import DashboardYayasan from "./views/pages/admin/pantiasuhan/DashboardYayasan.js";
import DonasiYayasan from "./views/pages/yayasan/donasi/Donasi.js";
import DetailDonasiYayasan from "./views/pages/yayasan/donasi/DetailDonasiYayasan.js";
import DonasiTrxYayasan from "./views/pages/yayasan/donasi_trx/DonasiTrxYayasan.js";
import DonasiTrxMasuk from "./views/pages/yayasan/donasi_trx/DonasiTrxMasuk.js";
import DonasiTrxKeluar from "./views/pages/yayasan/donasi_trx/DonasiTrxKeluar.js";
import LaporanKeuangan from "./views/pages/admin/pantiasuhan/donasi/LaporanKeuangan.js";
import AnakAsuhCabang from "./views/pages/admin/yayasan/personalia/anakasuhcabang/AnakAsuhCabang.js";
import DetailAnakAsuh from "./views/pages/admin/yayasan/personalia/anakasuhcabang/DetailAnakAsuh.js";
import DataPegawaiCabang from "./views/pages/yayasan/pegawai/DataPegawaiCabang.js";
import DetailPegawai from "./views/pages/yayasan/pegawai/DetailPegawai.js";
import LaporanInventaris from "./views/pages/admin/yayasan/inventaris/LaporanInventaris.js";
import LaporanInventaris1 from "./views/pages/yayasan/investasris/LaporanInvestaris.js";
import DetailInventaris from "./views/pages/admin/yayasan/inventaris/DetailInventaris.js";
import DaftarCabang from "./views/pages/yayasan/cabang/DaftarCabang.js";
import LaporanDonasi from "./views/pages/yayasan/donasi/LaporanDonasi.js";
import CabangAnakAsuh from "./views/pages/yayasan/anakasuh/CabangAnakAsuh.js";
import DataAnakAsuh from "./views/pages/yayasan/anakasuh/DataAnakAsuh.js";
import AddCabang from "./views/pages/yayasan/cabang/AddCabang.js";
import Organization from "./views/pages/yayasan/organization/Organization.js";
import TambahOrganization from "./views/pages/yayasan/organization/TambahOrganization.js";
import EditCabang from "./views/pages/yayasan/cabang/EditCabang.js";
import FormCabangBaru from "./views/pages/yayasan/cabang/FormCabangBaru.js";
import DetailCabang from "./views/pages/yayasan/cabang/DetailCabang.js";
import DonasiTrxMasukMingguan from "./views/pages/yayasan/donasi_trx/DonasiTrxMasukMingguan.js";
import DonasiTrxMasukBulanan from "./views/pages/yayasan/donasi_trx/DonasiTrxMasukBulanan.js";
import DonasiTrxKeluarMingguan from "./views/pages/yayasan/donasi_trx/DonasiTrxKeluarMingguan.js";
import DonasiTrxKeluarBulanan from "./views/pages/yayasan/donasi_trx/DonasiTrxKeluarBulanan.js";
import EditOrganization from "./views/pages/yayasan/organization/EditOrganization.js";
import Domain from "./views/pages/yayasan/domain/Domain.js";
import AddDomain from "./views/pages/yayasan/domain/AddDomain.js";
import EditDomain from "./views/pages/yayasan/domain/EditDomain.js";
import AdminFasilitas from "./views/pages/admin/pantiasuhan/fasilitas/Fasilitas.js";
import AddFasilitas from "./views/pages/admin/pantiasuhan/fasilitas/AddFasilitas.js";
import EditFasilitas from "./views/pages/admin/pantiasuhan/fasilitas/EditFasilitas.js";
import Profile from "./views/pages/admin/pantiasuhan/profile/Profile.js";
import EditProfile from "./views/pages/admin/pantiasuhan/profile/EditProfile.js";
import AddPengurus from "./views/pages/admin/pantiasuhan/pengurus/AddPengurus.js";
import EditPengurus from "./views/pages/admin/pantiasuhan/pengurus/EditPengurus.js";
import AdminPengurus from "./views/pages/admin/pantiasuhan/pengurus/AdminPengurus.js";
import DetailPengurus from "./views/pages/admin/pantiasuhan/pengurus/DetailPengurus.js";
import GuruDataTahsin from "./views/pages/guru/tahsin/DataTahsin.js";
import TahsinHarian from "./views/pages/admin/pantiasuhan/tahsin/TahsinHarian.js";
import TahsinMingguan from "./views/pages/admin/pantiasuhan/tahsin/TahsinMingguan.js";
import TahsinAnakAsuh from "./views/pages/admin/pantiasuhan/tahsin/TahsinAnakAsuh.js";
import AddBarangInventaris from "./views/pages/admin/pantiasuhan/iventaris/barang/AddBarangInventaris.js";
import ProfilePublic from "./views/pagesekolah/ProfilePublic.js";
import Web from "./views/pages/admin/pantiasuhan/web/Web.js";
import EditWeb from "./views/pages/admin/pantiasuhan/web/EditWeb.js";
import SettingWeb from "./views/pages/admin/pantiasuhan/web/SettingWeb.js";
import MessageData from "./views/pages/admin/pantiasuhan/blast/MessageData.js";
import AddMessage from "./views/pages/admin/pantiasuhan/blast/AddMessage.js";
import EditMessage from "./views/pages/admin/pantiasuhan/blast/EditMessage.js";
import DetailMessage from "./views/pages/admin/pantiasuhan/blast/DetailMessage.js";
import AdminKomentarBerita from "./views/pages/admin/pantiasuhan/berita/KomentarBerita.js";
import Komentar from "./views/pages/admin/pantiasuhan/komentar/Komentar.js";
import BalasKomentar from "./views/pages/admin/pantiasuhan/komentar/BalasKomentar.js";
import DataBalasKomentar from "./views/pages/admin/pantiasuhan/komentar/DataBalasKomentar.js";
import GuruAnakAsuh from "./views/pages/guru/anak asuh/GuruAnakAsuh.js";
import GuruTahsinAnakAsuh from "./views/pages/guru/anak asuh/TahsinAnakAsuh.js";

function App() {
  const [loading, setLoading] = useState(true);

  const LogPageView = () => {
    const location = useLocation();

    useEffect(() => {
      logEvent(analytics, "page_view", {
        page_path: location.pathname + location.search,
      });
    }, [location]);

    return null;
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      {/* <LoadingBackdrop /> */}
      <BrowserRouter>
        <main>
          <Switch>
            {/* auth */}
            <Route path="/login" component={Login} exact />
            <Route path="/login_siswa" component={LoginSiswa} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/sidebar1" component={Sidebar1} exact />
            {/* page */}
            <Route path="/" component={Dashbaord} exact />
            <PrivateRoute
              path="/admin_sambutan"
              component={DetailSAmbutanPanti}
              exact
            />
            <PrivateRoute
              path="/add_sambutan"
              component={AddSambutanPanti}
              exact
            />
            <PrivateRoute
              path="/edit_sambutan/:id"
              component={EditSambutanPanti}
              exact
            />
            <PrivateRoute
              path="/detail_sambutan/:id"
              component={DetailSAmbutanPanti}
              exact
            />
            <PrivateRoute
              path="/admin_visimisi"
              component={DetailVisiPanti}
              exact
            />
            <PrivateRoute
              path="/add_visimisi"
              component={AddVisiMisiPanti}
              exact
            />
            <PrivateRoute
              path="/edit_visimisi/:id"
              component={EditVisiMisiPanti}
              exact
            />
            <PrivateRoute
              path="/detail_visimisi/:id"
              component={DetailVisiPanti}
              exact
            />
            <PrivateRoute
              path="/admin_program"
              component={KegiatanPanti}
              exact
            />
            <PrivateRoute
              path="/add_program"
              component={AddKegiatanPanti}
              exact
            />
            <PrivateRoute
              path="/admin_detail_program/:id"
              component={DetailKegiatanPanti}
              exact
            />
            <PrivateRoute
              path="/edit_program/:id"
              component={EditKegiatanPanti}
              exact
            />
            <PrivateRoute
              path="/admin_foto_kegiatan"
              component={FotoKegiatanPanti}
              exact
            />
            <PrivateRoute
              path="/add_foto_kegiatan"
              component={AddFotoKegiatanPanti}
              exact
            />
            <PrivateRoute
              path="/edit_foto_kegiatan/:id"
              component={EditFotoKegiatanPanti}
              exact
            />
            <PrivateRoute path="/admin_galeri" component={Galery} exact />
            <PrivateRoute path="/add_galeri" component={AddGalery} exact />
            <PrivateRoute
              path="/edit_galeri/:id"
              component={EditGalery}
              exact
            />
            <PrivateRoute path="/admin_kontak" component={KontakPanti} exact />
            <PrivateRoute path="/add_kontak" component={AddKontakPanti} exact />
            <PrivateRoute
              path="/edit_kontak/:id"
              component={EditKontakPanti}
              exact
            />
            <PrivateRoute
              path="/admin_kotak_saran"
              component={KotakMasukPanti}
              exact
            />
            <PrivateRoute
              path="/admin_buku_tamu"
              component={DataBukuTamu}
              exact
            />
            <PrivateRoute path="/add_buku_tamu" component={AddBukuTamu} exact />
            <PrivateRoute
              path="/edit_buku_tamu/:id"
              component={EditBukuTamu}
              exact
            />
            <PrivateRoute
              path="/admin_detail_buku_tamu/:id"
              component={DetailBukuTamu}
              exact
            />
            <PrivateRoute path="/admin_tahsin" component={DataTahsin} exact />
            <PrivateRoute
              path="/rekap_tahsin_harian"
              component={TahsinHarian}
              exact
            />
            <PrivateRoute
              path="/rekap_tahsin_mingguan"
              component={TahsinMingguan}
              exact
            />
            <PrivateRoute path="/admin_iventaris" component={Iventaris} exact />
            <PrivateRoute path="/add_iventaris" component={AddInves} exact />
            <PrivateRoute
              path="/edit_iventaris/:id"
              component={EditInves}
              exact
            />
            <PrivateRoute path="/admin_ortu_asuh" component={Dataortu} exact />
            <PrivateRoute path="/add_ortu_asuh" component={AddOrtu} exact />
            <PrivateRoute
              path="/edit_ortu_asuh/:id"
              component={EditOrtu}
              exact
            />
            <PrivateRoute
              path="/detail_ortu_asuh/:id"
              component={DetailOrtu}
              exact
            />
            <PrivateRoute path="/admin_absensi" component={DataAbsensi} exact />
            <PrivateRoute
              path="/siswa_absensi"
              component={DataAbsensiSiswa}
              exact
            />
            <PrivateRoute
              path="/siswa/data-absen"
              component={DataAbsen}
              exact
            />
            <PrivateRoute path="/anak_tahsin" component={TahsinAnak} exact />
            <PrivateRoute path="/add_anak_tahsin" component={AddTahsin} exact />
            <PrivateRoute
              path="/edit_anak_tahsin/:id"
              component={EditTahsin}
              exact
            />
            <PrivateRoute path="/admin_anak_asuh" component={DataAnak} exact />
            <PrivateRoute path="/add_anak_asuh" component={AddAnak} exact />
            <PrivateRoute path="/tahsin_anak/:id" component={TahsinAnakAsuh} exact />
            {/* <PrivateRoute path="/add_anak_asuh" component={AddAnak} exact /> */}
            <PrivateRoute
              path="/edit_anak_asuh/:id"
              component={EditAnak}
              exact
            />
            <PrivateRoute
              path="/detail_anak_asuh/:id"
              component={DetailAnak}
              exact
            />
            <Route path="/bukutamu/form" component={FormBukuTamu} exact />
            <PrivateRoute
              path="/moderasi_komentar"
              component={Komentar}
              exact
            />
            <PrivateRoute
              path="/balas_komentar/berita/:id_berita/komentar/:id_komentar"
              component={BalasKomentar}
              exact
            />
            <PrivateRoute
              path="/data_balas_komentar/berita/:id_berita/komentar/:id_komentar"
              component={DataBalasKomentar}
              exact
            />
            <PrivateRoute
              path="/barang_inventaris"
              component={DataBarangInventaris}
              exact
            />
            <PrivateRoute
              path="/add_barang_inventaris"
              component={AddBarangInventaris}
              exact
            />
            <PrivateRoute
              path="/kategori_barang_inventaris"
              component={KategoriBarangInventaris}
              exact
            />
            <PrivateRoute
              path="/stok_barang_inventaris"
              component={StokBarangInventaris}
              exact
            />
            <PrivateRoute
              path="/status_barang_inventaris"
              component={StatusBarangInventaris}
              exact
            />
            <PrivateRoute
              path="/edit_status_barang_inventaris/:id"
              component={EditStatusBarang}
              exact
            />
            <PrivateRoute
              path="/kondisi_barang_inventaris"
              component={KondisiBarangInventaris}
              exact
            />
            <PrivateRoute
              path="/edit_kondisi_barang_inventaris/:id"
              component={EditKondisiBarang}
              exact
            />
            <PrivateRoute
              path="/lokasi_barang_inventaris"
              component={LokasiBarangInventaris}
              exact
            />
            <PrivateRoute
              path="/edit_barang_inventaris/:id"
              component={EditBarangInventaris}
              exact
            />
            <PrivateRoute
              path="/edit_kategori_barang_inventaris/:id"
              component={EditKategoriBarang}
              exact
            />
            <PrivateRoute
              path="/edit_status_barang_inventaris/:id"
              component={EditKategoriBarang}
              exact
            />
            <PrivateRoute
              path="/edit_stok_barang_inventaris/:id"
              component={EditStokBarang}
              exact
            />
            <PrivateRoute
              path="/edit_lokasi_barang/:id"
              component={EditLokasiBarang}
              exact
            />
            {/* END PANTI ASUHAN */}
            <Route path="/sambutan" component={sambutan} exact />
            <Route path="/publicprofile" component={ProfilePublic} exact />
            <Route path="/visi-misi" component={VisiMisiSekolah} exact />
            <Route path="/sejarah" component={SejarahSekolah} exact />
            <Route path="/staff" component={TenagaKepndidkan} exact />
            <Route path="/materi_ajar" component={MateriAjarView} exact />
            <Route path="/all-prestasi" component={PrestasiSekolah} exact />
            <Route path="/ekstrakurikuler" component={Ekstrakurikuler} exact />
            <Route path="/program" component={Pengembangan} exact />
            <Route path="/perawatan-rutin" component={PerawatanRutin} exact />
            <Route path="/sewa-layanan" component={SewaLayanan} exact />
            <Route path="/kegiatan" component={KegiatanSekolah} exact />
            <Route path="/kontak" component={KontakView} exact />
            <Route
              path="/detail-kegiatan/:id"
              component={DetailKegiatan}
              exact
            />
            {/* SAPRAS */}
            <Route path="/sarana-prasarana" component={Sarpras} exact />
            <Route path="/ruang-kantor" component={RuangKantor} exact />
            <Route path="/ruang-kelas" component={RuangKelas} exact />
            <Route path="/ruang-lab" component={RuangLab} exact />
            <Route path="/sarana-olahraga" component={SaranaOlahraga} exact />
            <Route path="/sarana-ibadah" component={SaranaIbadah} exact />
            <Route path="/sarana-kesehatan" component={SaranaKesehatan} exact />
            <Route
              path="/sarana-protokol-kesehatan"
              component={SaranaProtokolKesehatan}
              exact
            />
            {/* END SAPRAS */}
            {/* admin */}
            {/* admin smpn1bergas */}
            {/* guru */}
            <PrivateRoute path="/admin-guru" component={Guru} exact />
            <PrivateRoute path="/add-guru" component={AddGuru} exact />
            <PrivateRoute path="/edit-guru/:id" component={EditGuru} exact />
            {/* end guru */}
            {/* alumni */}
            <PrivateRoute path="/admin-alumni" component={Alumni} exact />
            <PrivateRoute path="/add-alumni" component={AddAlumni} exact />
            <PrivateRoute
              path="/edit-alumni/:id"
              component={EditAlumni}
              exact
            />
            <PrivateRoute
              path="/detail-alumni/:id"
              component={DetailAlumniAdmin}
              exact
            />
            {/* edit alumni */}
            {/* kontak */}
            <PrivateRoute path="/admin-kontak" component={Kontak} exact />
            <PrivateRoute path="/add-kontak" component={AddKontak} exact />
            <PrivateRoute
              path="/edit-kontak/:id"
              component={EditKontak}
              exact
            />
            {/* end kontak */}
            {/* sambutan */}
            <PrivateRoute
              path="/admin-sambutan"
              component={DetailSambutan}
              exact
            />
            <PrivateRoute path="/add-sambutan" component={AddSambutan} exact />
            <PrivateRoute
              path="/edit-sambutan/:id"
              component={EditSambutan}
              exact
            />
            <PrivateRoute
              path="/detail-sambutan/:id"
              component={DetailSambutan}
              exact
            />
            {/* end sambutan */}
            {/* sejarah */}
            <PrivateRoute
              path="/admin-sejarah"
              component={DetailSejarah}
              exact
            />
            <PrivateRoute path="/add-sejarah" component={AddSejarah} exact />
            <PrivateRoute
              path="/edit-sejarah/:id"
              component={EditSejarah}
              exact
            />
            {/* end Sejarah */}
            {/* tenaga kependidikan */}
            <PrivateRoute
              path="/admin-tenaga-kependidikan"
              component={TenagaKenpendidikan}
              exact
            />
            <PrivateRoute
              path="/add-tenaga-kependidikan"
              component={AddTenagaKependidikan}
              exact
            />
            <PrivateRoute
              path="/edit-tenaga-kependidikan/:id"
              component={EditTenagaKependidikan}
              exact
            />
            {/* end tenaga kependidikan */}
            {/* VisiMisi */}
            <PrivateRoute path="/admin-visimisi" component={DetailVisi} exact />
            <PrivateRoute path="/add-visimisi" component={AddVisiMisi} exact />
            <PrivateRoute
              path="/edit-visimisi/:id"
              component={EditVisiMisi}
              exact
            />
            <PrivateRoute
              path="/detail-visimisi/:id"
              component={DetailVisi}
              exact
            />
            {/* end visimisi */}
            <PrivateRoute
              path="/admin-tenaga-pendidikan"
              component={TenagaPendidikan}
              exact
            />
            {/* sarana */}
            <PrivateRoute path="/admin-sarana" component={Sarana} exact />
            <PrivateRoute path="/add-sarana" component={AddSarana} exact />
            <PrivateRoute
              path="/edit-sarana/:id"
              component={EditSarana}
              exact
            />
            <PrivateRoute
              path="/detail-sarana/:id"
              component={DetailSarana}
              exact
            />
            {/* end sarana */}
            {/* kegiatan */}
            <PrivateRoute path="/admin-kegiatan" component={Kegiatan} exact />
            <PrivateRoute path="/add-kegiatan" component={AddKegiatan} exact />
            <PrivateRoute
              path="/admin_detail_kegiatan/:id"
              component={DetailKegiatanAdmin}
              exact
            />
            <PrivateRoute
              path="/edit-kegiatan/:id"
              component={EditKegiatan}
              exact
            />
            {/* end kegiatan */}
            {/* program */}
            <PrivateRoute path="/admin-program" component={Program} exact />
            <PrivateRoute path="/add-program" component={AddProgram} exact />
            <PrivateRoute
              path="/detail-program/:id"
              component={DetailProgram}
              exact
            />
            <PrivateRoute
              path="/edit-program/:id"
              component={EditProgram}
              exact
            />
            {/* end program */}
            {/* kategori program */}
            <PrivateRoute
              path="/add-category-program"
              component={AddCategoryProgram}
              exact
            />
            <PrivateRoute
              path="/edit-category-program/:id"
              component={EditCategoryProgram}
              exact
            />
            {/* end program */}
            {/* prestasi */}
            <PrivateRoute path="/admin-prestasi" component={Prestasi} exact />
            <PrivateRoute path="/add-prestasi" component={AddPrestasi} exact />
            <PrivateRoute
              path="/admin-detail-prestasi/:id"
              component={DetailPrestasiAdmin}
              exact
            />
            <PrivateRoute
              path="/edit-prestasi/:id"
              component={EditPrestasi}
              exact
            />
            <PrivateRoute
              path="/detail-prestasi/:id"
              component={DetailPrestasiAdmin}
              exact
            />
            {/* end prestasi */}
            {/* struktur */}
            <PrivateRoute path="/admin-struktur" component={Struktur} exact />
            <PrivateRoute path="/add-struktur" component={AddStructur} exact />
            <PrivateRoute
              path="/edit-struktur/:id"
              component={EditStruktur}
              exact
            />
            {/* end prestasi */}
            {/* foto-kegiatan */}
            <PrivateRoute
              path="/admin-foto-kegiatan"
              component={FotoKegiatan}
              exact
            />
            <PrivateRoute
              path="/add-foto-kegiatan"
              component={AddFotoKegiatan}
              exact
            />
            <PrivateRoute
              path="/edit-foto-kegiatan/:id"
              component={EditFotoKegiatan}
              exact
            />
            {/* end foto sarana */}
            {/* foto-sarana */}
            <PrivateRoute
              path="/admin-foto-sarana"
              component={FotoSarana}
              exact
            />
            <PrivateRoute
              path="/add-foto-sarana"
              component={AddFotoSarana}
              exact
            />
            <PrivateRoute
              path="/edit-foto-sarana/:id"
              component={EditFotoSarana}
              exact
            />
            {/* end foto kegiatan */}
            {/* catedory berita */}
            <PrivateRoute
              path="/tambah-category-berita"
              component={AddCategory}
              exact
            />
            <PrivateRoute
              path="/edit-category-berita/:id"
              component={EditCategory}
              exact
            />
            <PrivateRoute
              path="/edit-category-berita/:id"
              component={EditCategory}
              exact
            />
            {/* end category berita */}
            {/* berita */}
            <PrivateRoute
              path="/add-berita-admin"
              component={AddBeritaAdmin}
              exact
            />
            <PrivateRoute
              path="/edit-berita-admin/:id"
              component={EditBeritaAdmin}
              exact
            />
            <PrivateRoute path="/admin-berita" component={AdminBerita} exact />
            <PrivateRoute
              path="/detail/berita/:id"
              component={DetailBerita}
              exact
            />
            {/* end berita */}
            {/* galery */}
            <PrivateRoute path="/admin-galery" component={Galery} exact />
            <PrivateRoute path="/add-galery" component={AddGalery} exact />
            <PrivateRoute
              path="/edit-galery/:id"
              component={EditGalery}
              exact
            />
            {/* end galery */}
            {/* keuangan */}
            <PrivateRoute path="/admin-keuangan" component={Keuangan} exact />
            <PrivateRoute path="/add-keuangan" component={AddKeuangan} exact />
            <PrivateRoute
              path="/edit-keuangan/:id"
              component={EditKeuangan}
              exact
            />
            {/* end keuangan */}
            {/* category keuangan */}
            {/* <PrivateRoute
            {/* path="/add-category-keuangan"
            component={AddCategoryKeuangan}
            exact
          /> */}
            {/* <PrivateRoute
            path="/edit-category-keuangan/:id"
            component={EditCategoryKeuangan}
            exact
          /> */}
            {/* end category keuangan */}
            {/* ekskul */}
            <PrivateRoute
              path="/admin-ekstrakulikuler"
              component={Ekskul}
              exact
            />
            <PrivateRoute
              path="/add-ekstrakulikuler"
              component={AddEkskul}
              exact
            />
            <PrivateRoute
              path="/edit-ekstrakulikuler/:id"
              component={EditEkskul}
              exact
            />
            <PrivateRoute
              path="/detail-ekstrakurikuler/:id"
              component={DetailEkskul}
              exact
            />
            {/* end ekskul */}
            {/* kondisi sekolah */}
            <PrivateRoute
              path="/admin-kondisi-sekolah"
              component={KondisiSekolah}
              exact
            />
            <PrivateRoute
              path="/add-kondisi-sekolah"
              component={AddKondisiSekolah}
              exact
            />
            <PrivateRoute
              path="/edit-kondisi-sekolah/:id"
              component={EditKondisiSekolah}
              exact
            />
            <PrivateRoute
              path="/detail-kondisi-sekolah/:id"
              component={DetailKondisiSekolah}
              exact
            />
            {/* end kondisi sekolah */}
            {/* perpus*/}
            <PrivateRoute
              path="/admin-perpustakaan"
              component={AdminPerpus}
              exact
            />
            <PrivateRoute
              path="/add-perpustakaan"
              component={AddPerpus}
              exact
            />
            <PrivateRoute
              path="/edit-perpustakaan/:id"
              component={EditPerpus}
              exact
            />
            {/* end perpus*/} {/* materi ajar*/}
            <PrivateRoute
              path="/admin-materi-ajar"
              component={MateriAjar}
              exact
            />
            <PrivateRoute
              path="/add-materi-ajar"
              component={AddMateriAjar}
              exact
            />
            <PrivateRoute
              path="/edit-materi-ajar/:id"
              component={EditMateriAjar}
              exact
            />
            <PrivateRoute
              path="/detail-materi-ajar/:id"
              component={DetailMateriAjar}
              exact
            />
            {/* end materi ajar */}
            {/* osis*/}
            <PrivateRoute path="/admin-osis" component={AdminOsis} exact />
            <PrivateRoute path="/add-osis" component={AddOsis} exact />
            <PrivateRoute path="/edit-osis/:id" component={EditOsis} exact />
            {/* end osis */}
            <Route
              path="/kondisi-sekolah-view"
              component={KonsidisiSekolahView}
              exact
            />
            <PrivateRoute
              path="/admin-kotak-saran"
              component={KotakMasuk}
              exact
            />
            {/* end admin smpn1bergas */}
            <PrivateRoute
              path="/add-berita-admin"
              component={AddBeritaAdmin}
              exact
            />
            <PrivateRoute
              path="/edit-berita-admin/:id"
              component={EditBeritaAdmin}
              exact
            />
            {/* <PrivateRoute path="/admin-berita" component={AdminBerita} exact /> */}
            {/* KEUANGAN */}
            <PrivateRoute path="/keuangan-apbd" component={AllAPBD} exact />
            <PrivateRoute
              path="/detail-apbd-:id"
              component={DetailAPBD}
              exact
            />
            <PrivateRoute path="/keuangan-bos" component={AllBOS} exact />
            <PrivateRoute path="/detail-bos-:id" component={DetailBOS} exact />
            <PrivateRoute path="/keuangan-komite" component={AllKomite} exact />
            <PrivateRoute
              path="/detail-komite-:id"
              component={DetailKomite}
              exact
            />
            {/* PRESTASI */}
            <PrivateRoute
              path="/detail-prestasi-:id"
              component={DetailPrestasi}
              exact
            />
            <PrivateRoute
              path="/detail-alumni-:id"
              component={DetailAlumni}
              exact
            />
            <PrivateRoute path="/all-alumni" component={AlumniAll} exact />
            <PrivateRoute path="/osis" component={Osis} exact />
            {/* Berita */}
            <PrivateRoute path="/galery" component={GalerySekolah} exact />
            {/* <PrivateRoute path="/news" component={beritaNews} exact /> */}
            <PrivateRoute
              path="/detail-news-:id"
              component={DetailNews}
              exact
            />
            <PrivateRoute path="/info" component={Info} exact />
            <PrivateRoute
              path="/detail-info-:id"
              component={DetailInfo}
              exact
            />
            <PrivateRoute path="/agenda" component={agenda} exact />
            <PrivateRoute
              path="/detail-agenda-:id"
              component={DetailAgenda}
              exact
            />
            <Route path="/perpustakaan" component={Perpustakaan} exact />
            <PrivateRoute
              path="/detail-buku-:id"
              component={DetailPerpus}
              exact
            />
            {/* Kondisi Sekolah */}
            <Route
              path="/kondisi-sekolah-view"
              component={KonsidisiSekolahView}
              exact
            />
            <Route
              path="/struktur-organisasi"
              component={StrukturOrganisasi}
              exact
            />
            {/* Domain */}
            <PrivateRoute path="/domain" component={Domain} exact />
            <PrivateRoute path="/add-domain" component={AddDomain} exact />
            <PrivateRoute
              path="/edit-domain/:name"
              component={EditDomain}
              exact
            />
            {/* Iventaris */}
            <PrivateRoute path="/iventaris" component={Iventaris} exact />
            <PrivateRoute path="/add-iventaris" component={AddInves} exact />
            <PrivateRoute
              path="/edit-iventaris/:id"
              component={EditInves}
              exact
            />
            {/* Orangtua Asuh */}
            <PrivateRoute path="/data-ortu" component={Dataortu} exact />
            <PrivateRoute path="/add-ortu" component={AddOrtu} exact />
            <PrivateRoute path="/edit-ortu" component={EditOrtu} exact />
            <PrivateRoute path="/detail-ortu" component={DetailOrtu} exact />
            {/* Absensi */}
            <PrivateRoute path="/absen-masuk" component={AbsenMasuk} exact />
            <PrivateRoute path="/absen-pulang" component={AbsenPulang} exact />
            <PrivateRoute path="/siswa/izin" component={Izin} exact />
            {/* Donasi */}
            <PrivateRoute path="/donasi" component={Donasi} exact />
            <PrivateRoute path="/donasi/put/:id" component={EditDonasi} exact />
            <PrivateRoute
              path="/donasi/detail/:id"
              component={DetailDonasi}
              exact
            />
            <PrivateRoute path="/donasi/add" component={TambahDonasi} exact />
            <PrivateRoute path="/donasi_trx" component={DonasiTrx} exact />
            <PrivateRoute
              path="/add_donasi_trx"
              component={TambahDonasiTrx}
              exact
            />
            <PrivateRoute
              path="/edit_donasi_trx/:id"
              component={EditDonasiTrx}
              exact
            />
            <Route path="/donasiumum" component={DonasiUmum} exact />
            <Route
              path="/donasiumum/preview/:id"
              component={PreviewDonasi}
              exact
            />
            <Route
              path="/donasiumum/add/:id"
              component={TambahDonasiUmum}
              exact
            />
            {/* Panduan */}
            <Route path="/donasiumum/panduan" component={Panduan} exact />
            <Route
              path="/donasiumum/danamasuk/:id"
              component={DanaMasuk}
              exact
            />
            <PrivateRoute
              path="/laporan_keuangan"
              component={LaporanKeuangan}
              exact
            />
            <Route
              path="/donasiumum/danakeluar/:id"
              component={DanaKeluar}
              exact
            />
            <PrivateRoute
              path="/admin_dana_keluar"
              component={AdminDanaKeluar}
              exact
            />
            <PrivateRoute
              path="/admin_dana_keluar/add"
              component={AddDanaKeluar}
              exact
            />
            <PrivateRoute
              path="/admin_dana_keluar/put/:id"
              component={EditDanaKeluar}
              exact
            />
            <PrivateRoute
              path="/dashboard_panti"
              component={DashboardPanti}
              exact
            />
            <PrivateRoute
              path="/admin_berita"
              component={AdminBeritaPanti}
              exact
            />
            <PrivateRoute
              path="/admin_berita/add"
              component={AddBeritaAdminPanti}
              exact
            />
            <PrivateRoute
              path="/admin_berita/edit/:id"
              component={EditBeritaAdminPanti}
              exact
            />
            <PrivateRoute
              path="/admin_berita/detail/:id"
              component={DetailBeritaPantiAdmin}
              exact
            />
            <PrivateRoute
              path="/laporan_presensi/harian"
              component={LaporanHarianPresensi}
              exact
            />
            <PrivateRoute
              path="/laporan_presensi/bulanan"
              component={LaporanBulananPresensi}
              exact
            />
            <PrivateRoute
              path="/laporan_presensi/tahunan"
              component={LaporanTahunanPresensi}
              exact
            />
            <PrivateRoute path="/admin_shift" component={DataShift} exact />
            <PrivateRoute
              path="/admin_shift/edit/:id"
              component={EditShift}
              exact
            />
            <Route
              path="/programpanti/:id"
              component={PublikDetailProgramPanti}
              exact
            />
            <Route
              path="/beritapanti/:id"
              component={PublikDetailBeritaPanti}
              exact
            />
            <Route path="/beritapanti" component={PublikBerita} exact />
            <Route path="/programpanti" component={PublikProgram} exact />
            <Route path="/presensipanti" component={ShiftPublik} exact />
            {/* yayasan */}
            <PrivateRoute
              path="/dashboard_yayasan"
              component={DashboardYayasan}
              exact
            />
            <PrivateRoute
              path="/yayasan_donasi"
              component={DonasiYayasan}
              exact
            />
            <PrivateRoute
              path="/detail_donasi_yayasan/:id"
              component={DetailDonasiYayasan}
              exact
            />
            <PrivateRoute
              path="/donasitrx_yayasan"
              component={DonasiTrxYayasan}
              exact
            />
            <PrivateRoute
              path="/donasitrx_masuk_yayasan"
              component={DonasiTrxMasuk}
              exact
            />
            <PrivateRoute
              path="/donasitrx_masuk_mingguan_yayasan"
              component={DonasiTrxMasukMingguan}
              exact
            />
            <PrivateRoute
              path="/donasitrx_masuk_bulanan_yayasan"
              component={DonasiTrxMasukBulanan}
              exact
            />
            <PrivateRoute
              path="/donasitrx_keluar_yayasan"
              component={DonasiTrxKeluar}
              exact
            />
            <PrivateRoute
              path="/donasitrx_keluar_mingguan_yayasan"
              component={DonasiTrxKeluarMingguan}
              exact
            />
            <PrivateRoute
              path="/donasitrx_keluar_bulanan_yayasan"
              component={DonasiTrxKeluarBulanan}
              exact
            />
            <PrivateRoute
              path="/detail_donasitrx_yayasan/:id"
              component={DetailDonasiYayasan}
              exact
            />
            {/* PERSONALIA YAYASAN */}
            <PrivateRoute
              path="/data-anak-asuh-cabang"
              component={AnakAsuhCabang}
              exact
            />
            <PrivateRoute
              path="/detail-anak-asuh-cabang/:id"
              component={DetailAnakAsuh}
              exact
            />
            {/* INVENTARIS YAYASAN */}
            <PrivateRoute
              path="/laporan-inventaris"
              component={LaporanInventaris}
              exact
            />
            <PrivateRoute
              path="/detail-inventaris"
              component={DetailInventaris}
              exact
            />
            {/* yayasan */}
            <PrivateRoute
              path="/daftar-cabang"
              component={DaftarCabang}
              exact
            />
            <PrivateRoute
              path="/laporan-donasi"
              component={LaporanDonasi}
              exact
            />
            <PrivateRoute
              path="/laporan-investariss"
              component={LaporanInventaris1}
              exact
            />
            <PrivateRoute path="/cabang" component={CabangAnakAsuh} exact />
            <PrivateRoute path="/add-cabang" component={AddCabang} exact />
            <PrivateRoute
              path="/form-cabang-baru"
              component={FormCabangBaru}
              exact
            />
            <PrivateRoute
              path="/cabang-anak-asuh/:id"
              component={DataAnakAsuh}
              exact
            />
            <PrivateRoute
              path="/user-organization"
              component={Organization}
              exact
            />
            <PrivateRoute
              path="/add-organization"
              component={TambahOrganization}
              exact
            />
            <PrivateRoute
              path="/edit-organization/:id"
              component={EditOrganization}
              exact
            />
            <PrivateRoute
              path="/edit-cabang/:id"
              component={EditCabang}
              exact
            />
            <PrivateRoute
              path="/detail_cabang/:id"
              component={DetailCabang}
              exact
            />
            <PrivateRoute
              path="/data-pegawai-cabang"
              component={DataPegawaiCabang}
              exact
            />
            <PrivateRoute
              path="/detail-pegawai-cabang/:id"
              component={DetailPegawai}
              exact
            />
            {/* FASILITAS */}
            <PrivateRoute
              path="/admin_fasilitas"
              component={AdminFasilitas}
              exact
            />
            <PrivateRoute
              path="/admin_fasilitas/add"
              component={AddFasilitas}
              exact
            />
            <PrivateRoute
              path="/admin_fasilitas/edit/:id"
              component={EditFasilitas}
              exact
            />
            <PrivateRoute
              path="/admin_pengurus"
              component={AdminPengurus}
              exact
            />
            <PrivateRoute
              path="/admin_pengurus/add"
              component={AddPengurus}
              exact
            />
            <PrivateRoute
              path="/admin_pengurus/edit/:id"
              component={EditPengurus}
              exact
            />
            <PrivateRoute
              path="/admin_pengurus/detail/:id"
              component={DetailPengurus}
              exact
            />
            <PrivateRoute path="/profile" component={Profile} exact />
            <PrivateRoute
              path="/profile/edit/:id"
              component={EditProfile}
              exact
            />
            <PrivateRoute path="/web" component={Web} exact />
            <PrivateRoute
              path="/web/edit/:id"
              component={EditWeb}
              exact
            />
            <PrivateRoute
              path="/seting_tampilan_web"
              component={SettingWeb}
              exact
            />
            <PrivateRoute
              path="/message"
              component={MessageData}
              exact
            />
            <PrivateRoute path="/message/add" component={AddMessage} exact/>
            <PrivateRoute path="/message/detail/:id" component={DetailMessage} exact/>
            <PrivateRoute path="/message/edit/:id" component={EditMessage} exact/>
            <PrivateRoute path="/admin_berita/comment/:id" component={AdminKomentarBerita} exact/>
            {/* GURU LEVEL */}
            <PrivateRoute
              path="/guru/tahsin"
              component={GuruDataTahsin}
              exact
            />
            <PrivateRoute
              path="/guru/anak_asuh"
              component={GuruAnakAsuh}
              exact
            />
            <PrivateRoute
              path="/guru/tahsin/anak_asuh/:id"
              component={GuruTahsinAnakAsuh}
              exact
            />
          </Switch>
        </main>
        <LogPageView />
      </BrowserRouter>
    </>
  );
}

export default App;
