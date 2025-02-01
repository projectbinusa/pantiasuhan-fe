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
import DataPegawaiCabang from "./views/pages/admin/yayasan/personalia/pegawai/DataPegawaiCabang.js";
import DetailPegawai from "./views/pages/admin/yayasan/personalia/pegawai/DetailPegawai.js";
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
            <Route
              path="/admin_sambutan"
              component={DetailSAmbutanPanti}
              exact
            />
            <Route path="/add_sambutan" component={AddSambutanPanti} exact />
            <Route
              path="/edit_sambutan/:id"
              component={EditSambutanPanti}
              exact
            />
            <Route
              path="/detail_sambutan/:id"
              component={DetailSAmbutanPanti}
              exact
            />
            <Route path="/admin_visimisi" component={DetailVisiPanti} exact />
            <Route path="/add_visimisi" component={AddVisiMisiPanti} exact />
            <Route
              path="/edit_visimisi/:id"
              component={EditVisiMisiPanti}
              exact
            />
            <Route
              path="/detail_visimisi/:id"
              component={DetailVisiPanti}
              exact
            />
            <Route path="/admin_program" component={KegiatanPanti} exact />
            <Route path="/add_program" component={AddKegiatanPanti} exact />
            <Route
              path="/admin_detail_program/:id"
              component={DetailKegiatanPanti}
              exact
            />
            <Route
              path="/edit_program/:id"
              component={EditKegiatanPanti}
              exact
            />
            <Route
              path="/admin_foto_kegiatan"
              component={FotoKegiatanPanti}
              exact
            />
            <Route
              path="/add_foto_kegiatan"
              component={AddFotoKegiatanPanti}
              exact
            />
            <Route
              path="/edit_foto_kegiatan/:id"
              component={EditFotoKegiatanPanti}
              exact
            />
            <Route path="/admin_galeri" component={Galery} exact />
            <Route path="/add_galeri" component={AddGalery} exact />
            <Route path="/edit_galeri/:id" component={EditGalery} exact />
            <Route path="/admin_kontak" component={KontakPanti} exact />
            <Route path="/add_kontak" component={AddKontakPanti} exact />
            <Route path="/edit_kontak/:id" component={EditKontakPanti} exact />
            <Route
              path="/admin_kotak_saran"
              component={KotakMasukPanti}
              exact
            />
            <Route path="/admin_buku_tamu" component={DataBukuTamu} exact />
            <Route path="/add_buku_tamu" component={AddBukuTamu} exact />
            <Route path="/edit_buku_tamu/:id" component={EditBukuTamu} exact />
            <Route
              path="/admin_detail_buku_tamu/:id"
              component={DetailBukuTamu}
              exact
            />
            <Route path="/admin_tahsin" component={DataTahsin} exact />
            <Route path="/admin_iventaris" component={Iventaris} exact />
            <Route path="/add_iventaris" component={AddInves} exact />
            <Route path="/edit_iventaris/:id" component={EditInves} exact />
            <Route path="/admin_ortu_asuh" component={Dataortu} exact />
            <Route path="/add_ortu_asuh" component={AddOrtu} exact />
            <Route path="/edit_ortu_asuh/:id" component={EditOrtu} exact />
            <Route path="/detail_ortu_asuh/:id" component={DetailOrtu} exact />
            <Route path="/admin_absensi" component={DataAbsensi} exact />
            <Route path="/siswa_absensi" component={DataAbsensiSiswa} exact />
            <Route path="/siswa/data-absen" component={DataAbsen} exact />
            <Route path="/anak_tahsin" component={TahsinAnak} exact />
            <Route path="/add_anak_tahsin" component={AddTahsin} exact />
            <Route path="/edit_anak_tahsin/:id" component={EditTahsin} exact />
            <Route path="/admin_anak_asuh" component={DataAnak} exact />
            <Route path="/add_anak_asuh" component={AddAnak} exact />
            <Route path="/add_anak_asuh" component={AddAnak} exact />
            <Route path="/edit_anak_asuh/:id" component={EditAnak} exact />
            <Route path="/detail_anak_asuh/:id" component={DetailAnak} exact />
            <Route
              path="/bukutamu/form/:organization_id"
              component={FormBukuTamu}
              exact
            />
            <Route
              path="/barang_inventaris"
              component={DataBarangInventaris}
              exact
            />
            <Route
              path="/kategori_barang_inventaris"
              component={KategoriBarangInventaris}
              exact
            />
            <Route
              path="/stok_barang_inventaris"
              component={StokBarangInventaris}
              exact
            />
            <Route
              path="/status_barang_inventaris"
              component={StatusBarangInventaris}
              exact
            />
            <Route
              path="/edit_status_barang_inventaris/:id"
              component={EditStatusBarang}
              exact
            />
            <Route
              path="/kondisi_barang_inventaris"
              component={KondisiBarangInventaris}
              exact
            />
            <Route
              path="/edit_kondisi_barang_inventaris/:id"
              component={EditKondisiBarang}
              exact
            />
            <Route
              path="/lokasi_barang_inventaris"
              component={LokasiBarangInventaris}
              exact
            />
            <Route
              path="/edit_barang_inventaris/:id"
              component={EditBarangInventaris}
              exact
            />
            <Route
              path="/edit_kategori_barang_inventaris/:id"
              component={EditKategoriBarang}
              exact
            />
            <Route
              path="/edit_status_barang_inventaris/:id"
              component={EditKategoriBarang}
              exact
            />
            <Route
              path="/edit_stok_barang_inventaris/:id"
              component={EditStokBarang}
              exact
            />
            <Route
              path="/edit_lokasi_barang/:id"
              component={EditLokasiBarang}
              exact
            />
            {/* END PANTI ASUHAN */}
            <Route path="/sambutan" component={sambutan} exact />
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
            <Route path="/admin-guru" component={Guru} exact />
            <Route path="/add-guru" component={AddGuru} exact />
            <Route path="/edit-guru/:id" component={EditGuru} exact />
            {/* end guru */}
            {/* alumni */}
            <Route path="/admin-alumni" component={Alumni} exact />
            <Route path="/add-alumni" component={AddAlumni} exact />
            <Route path="/edit-alumni/:id" component={EditAlumni} exact />
            <Route
              path="/detail-alumni/:id"
              component={DetailAlumniAdmin}
              exact
            />
            {/* edit alumni */}
            {/* kontak */}
            <Route path="/admin-kontak" component={Kontak} exact />
            <Route path="/add-kontak" component={AddKontak} exact />
            <Route path="/edit-kontak/:id" component={EditKontak} exact />
            {/* end kontak */}
            {/* sambutan */}
            <Route path="/admin-sambutan" component={DetailSambutan} exact />
            <Route path="/add-sambutan" component={AddSambutan} exact />
            <Route path="/edit-sambutan/:id" component={EditSambutan} exact />
            <Route
              path="/detail-sambutan/:id"
              component={DetailSambutan}
              exact
            />
            {/* end sambutan */}
            {/* sejarah */}
            <Route path="/admin-sejarah" component={DetailSejarah} exact />
            <Route path="/add-sejarah" component={AddSejarah} exact />
            <Route path="/edit-sejarah/:id" component={EditSejarah} exact />
            {/* end Sejarah */}
            {/* tenaga kependidikan */}
            <Route
              path="/admin-tenaga-kependidikan"
              component={TenagaKenpendidikan}
              exact
            />
            <Route
              path="/add-tenaga-kependidikan"
              component={AddTenagaKependidikan}
              exact
            />
            <Route
              path="/edit-tenaga-kependidikan/:id"
              component={EditTenagaKependidikan}
              exact
            />
            {/* end tenaga kependidikan */}
            {/* VisiMisi */}
            <Route path="/admin-visimisi" component={DetailVisi} exact />
            <Route path="/add-visimisi" component={AddVisiMisi} exact />
            <Route path="/edit-visimisi/:id" component={EditVisiMisi} exact />
            <Route path="/detail-visimisi/:id" component={DetailVisi} exact />
            {/* end visimisi */}
            <Route
              path="/admin-tenaga-pendidikan"
              component={TenagaPendidikan}
              exact
            />
            {/* sarana */}
            <Route path="/admin-sarana" component={Sarana} exact />
            <Route path="/add-sarana" component={AddSarana} exact />
            <Route path="/edit-sarana/:id" component={EditSarana} exact />
            <Route path="/detail-sarana/:id" component={DetailSarana} exact />
            {/* end sarana */}
            {/* kegiatan */}
            <Route path="/admin-kegiatan" component={Kegiatan} exact />
            <Route path="/add-kegiatan" component={AddKegiatan} exact />
            <Route
              path="/admin_detail_kegiatan/:id"
              component={DetailKegiatanAdmin}
              exact
            />
            <Route path="/edit-kegiatan/:id" component={EditKegiatan} exact />
            {/* end kegiatan */}
            {/* program */}
            <Route path="/admin-program" component={Program} exact />
            <Route path="/add-program" component={AddProgram} exact />
            <Route path="/detail-program/:id" component={DetailProgram} exact />
            <Route path="/edit-program/:id" component={EditProgram} exact />
            {/* end program */}
            {/* kategori program */}
            <Route
              path="/add-category-program"
              component={AddCategoryProgram}
              exact
            />
            <Route
              path="/edit-category-program/:id"
              component={EditCategoryProgram}
              exact
            />
            {/* end program */}
            {/* prestasi */}
            <Route path="/admin-prestasi" component={Prestasi} exact />
            <Route path="/add-prestasi" component={AddPrestasi} exact />
            <Route
              path="/admin-detail-prestasi/:id"
              component={DetailPrestasiAdmin}
              exact
            />
            <Route path="/edit-prestasi/:id" component={EditPrestasi} exact />
            <Route
              path="/detail-prestasi/:id"
              component={DetailPrestasiAdmin}
              exact
            />
            {/* end prestasi */}
            {/* struktur */}
            <Route path="/admin-struktur" component={Struktur} exact />
            <Route path="/add-struktur" component={AddStructur} exact />
            <Route path="/edit-struktur/:id" component={EditStruktur} exact />
            {/* end prestasi */}
            {/* foto-kegiatan */}
            <Route path="/admin-foto-kegiatan" component={FotoKegiatan} exact />
            <Route
              path="/add-foto-kegiatan"
              component={AddFotoKegiatan}
              exact
            />
            <Route
              path="/edit-foto-kegiatan/:id"
              component={EditFotoKegiatan}
              exact
            />
            {/* end foto sarana */}
            {/* foto-sarana */}
            <Route path="/admin-foto-sarana" component={FotoSarana} exact />
            <Route path="/add-foto-sarana" component={AddFotoSarana} exact />
            <Route
              path="/edit-foto-sarana/:id"
              component={EditFotoSarana}
              exact
            />
            {/* end foto kegiatan */}
            {/* catedory berita */}
            <Route
              path="/tambah-category-berita"
              component={AddCategory}
              exact
            />
            <Route
              path="/edit-category-berita/:id"
              component={EditCategory}
              exact
            />
            <Route
              path="/edit-category-berita/:id"
              component={EditCategory}
              exact
            />
            {/* end category berita */}
            {/* berita */}
            <Route path="/add-berita-admin" component={AddBeritaAdmin} exact />
            <Route
              path="/edit-berita-admin/:id"
              component={EditBeritaAdmin}
              exact
            />
            <Route path="/admin-berita" component={AdminBerita} exact />
            <Route path="/detail/berita/:id" component={DetailBerita} exact />
            {/* end berita */}
            {/* galery */}
            <Route path="/admin-galery" component={Galery} exact />
            <Route path="/add-galery" component={AddGalery} exact />
            <Route path="/edit-galery/:id" component={EditGalery} exact />
            {/* end galery */}
            {/* keuangan */}
            <Route path="/admin-keuangan" component={Keuangan} exact />
            <Route path="/add-keuangan" component={AddKeuangan} exact />
            <Route path="/edit-keuangan/:id" component={EditKeuangan} exact />
            {/* end keuangan */}
            {/* category keuangan */}
            {/* <Route
            {/* path="/add-category-keuangan"
            component={AddCategoryKeuangan}
            exact
          /> */}
            {/* <Route
            path="/edit-category-keuangan/:id"
            component={EditCategoryKeuangan}
            exact
          /> */}
            {/* end category keuangan */}
            {/* ekskul */}
            <Route path="/admin-ekstrakulikuler" component={Ekskul} exact />
            <Route path="/add-ekstrakulikuler" component={AddEkskul} exact />
            <Route
              path="/edit-ekstrakulikuler/:id"
              component={EditEkskul}
              exact
            />
            <Route
              path="/detail-ekstrakurikuler/:id"
              component={DetailEkskul}
              exact
            />
            {/* end ekskul */}
            {/* kondisi sekolah */}
            <Route
              path="/admin-kondisi-sekolah"
              component={KondisiSekolah}
              exact
            />
            <Route
              path="/add-kondisi-sekolah"
              component={AddKondisiSekolah}
              exact
            />
            <Route
              path="/edit-kondisi-sekolah/:id"
              component={EditKondisiSekolah}
              exact
            />
            <Route
              path="/detail-kondisi-sekolah/:id"
              component={DetailKondisiSekolah}
              exact
            />
            {/* end kondisi sekolah */}
            {/* perpus*/}
            <Route path="/admin-perpustakaan" component={AdminPerpus} exact />
            <Route path="/add-perpustakaan" component={AddPerpus} exact />
            <Route path="/edit-perpustakaan/:id" component={EditPerpus} exact />
            {/* end perpus*/} {/* materi ajar*/}
            <Route path="/admin-materi-ajar" component={MateriAjar} exact />
            <Route path="/add-materi-ajar" component={AddMateriAjar} exact />
            <Route
              path="/edit-materi-ajar/:id"
              component={EditMateriAjar}
              exact
            />
            <Route
              path="/detail-materi-ajar/:id"
              component={DetailMateriAjar}
              exact
            />
            {/* end materi ajar */}
            {/* osis*/}
            <Route path="/admin-osis" component={AdminOsis} exact />
            <Route path="/add-osis" component={AddOsis} exact />
            <Route path="/edit-osis/:id" component={EditOsis} exact />
            {/* end osis */}
            <Route
              path="/kondisi-sekolah-view"
              component={KonsidisiSekolahView}
              exact
            />
            <Route path="/admin-kotak-saran" component={KotakMasuk} exact />
            {/* end admin smpn1bergas */}
            <Route path="/add-berita-admin" component={AddBeritaAdmin} exact />
            <Route
              path="/edit-berita-admin/:id"
              component={EditBeritaAdmin}
              exact
            />
            {/* <Route path="/admin-berita" component={AdminBerita} exact /> */}
            {/* KEUANGAN */}
            <Route path="/keuangan-apbd" component={AllAPBD} exact />
            <Route path="/detail-apbd-:id" component={DetailAPBD} exact />
            <Route path="/keuangan-bos" component={AllBOS} exact />
            <Route path="/detail-bos-:id" component={DetailBOS} exact />
            <Route path="/keuangan-komite" component={AllKomite} exact />
            <Route path="/detail-komite-:id" component={DetailKomite} exact />
            {/* PRESTASI */}
            <Route
              path="/detail-prestasi-:id"
              component={DetailPrestasi}
              exact
            />
            <Route path="/detail-alumni-:id" component={DetailAlumni} exact />
            <Route path="/all-alumni" component={AlumniAll} exact />
            <Route path="/osis" component={Osis} exact />
            {/* Berita */}
            <Route path="/galery" component={GalerySekolah} exact />
            {/* <Route path="/news" component={beritaNews} exact /> */}
            <Route path="/detail-news-:id" component={DetailNews} exact />
            <Route path="/info" component={Info} exact />
            <Route path="/detail-info-:id" component={DetailInfo} exact />
            <Route path="/agenda" component={agenda} exact />
            <Route path="/detail-agenda-:id" component={DetailAgenda} exact />
            <Route path="/perpustakaan" component={Perpustakaan} exact />
            <Route path="/detail-buku-:id" component={DetailPerpus} exact />
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
            {/* Iventaris */}
            <Route path="/iventaris" component={Iventaris} exact />
            <Route path="/add-iventaris" component={AddInves} exact />
            <Route path="/edit-iventaris/:id" component={EditInves} exact />
            {/* Orangtua Asuh */}
            <Route path="/data-ortu" component={Dataortu} exact />
            <Route path="/add-ortu" component={AddOrtu} exact />
            <Route path="/edit-ortu" component={EditOrtu} exact />
            <Route path="/detail-ortu" component={DetailOrtu} exact />
            {/* Absensi */}
            <Route path="/absen-masuk" component={AbsenMasuk} exact />
            <Route path="/absen-pulang" component={AbsenPulang} exact />
            <Route path="/siswa/izin" component={Izin} exact />
            {/* Donasi */}
            <Route path="/donasi" component={Donasi} exact />
            <Route path="/donasi/put/:id" component={EditDonasi} exact />
            <Route path="/donasi/detail/:id" component={DetailDonasi} exact />
            <Route path="/donasi/add" component={TambahDonasi} exact />
            <Route path="/donasi_trx" component={DonasiTrx} exact />
            <Route path="/add_donasi_trx" component={TambahDonasiTrx} exact />
            <Route
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
            <Route path="/laporan_keuangan" component={LaporanKeuangan} exact />
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
            <Route
              path="/admin_dana_keluar/add"
              component={AddDanaKeluar}
              exact
            />
            <Route
              path="/admin_dana_keluar/put/:id"
              component={EditDanaKeluar}
              exact
            />
            <Route path="/dashboard_panti" component={DashboardPanti} exact />
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
            <Route path="/admin_shift" component={DataShift} exact />
            <Route path="/admin_shift/edit/:id" component={EditShift} exact />
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
            <Route
              path="/dashboard_yayasan"
              component={DashboardYayasan}
              exact
            />
            <Route path="/yayasan_donasi" component={DonasiYayasan} exact />
            <Route
              path="/detail_donasi_yayasan/:id"
              component={DetailDonasiYayasan}
              exact
            />
            <Route
              path="/donasitrx_yayasan"
              component={DonasiTrxYayasan}
              exact
            />
            <Route
              path="/donasitrx_masuk_yayasan"
              component={DonasiTrxMasuk}
              exact
            />
            <Route
              path="/donasitrx_masuk_mingguan_yayasan"
              component={DonasiTrxMasukMingguan}
              exact
            />
            <Route
              path="/donasitrx_masuk_bulanan_yayasan"
              component={DonasiTrxMasukBulanan}
              exact
            />
            <Route
              path="/donasitrx_keluar_yayasan"
              component={DonasiTrxKeluar}
              exact
            />
            <Route
              path="/donasitrx_keluar_mingguan_yayasan"
              component={DonasiTrxKeluarMingguan}
              exact
            />
            <Route
              path="/donasitrx_keluar_bulanan_yayasan"
              component={DonasiTrxKeluarBulanan}
              exact
            />
            <Route
              path="/detail_donasitrx_yayasan/:id"
              component={DetailDonasiYayasan}
              exact
            />
            {/* PERSONALIA YAYASAN */}
            <Route
              path="/data-anak-asuh-cabang"
              component={AnakAsuhCabang}
              exact
            />
            <Route
              path="/detail-anak-asuh-cabang/:id"
              component={DetailAnakAsuh}
              exact
            />
            <Route
              path="/data-pegawai-cabang"
              component={DataPegawaiCabang}
              exact
            />
            <Route
              path="/detail-pegawai-cabang/:id"
              component={DetailPegawai}
              exact
            />
            {/* INVENTARIS YAYASAN */}
            <Route
              path="/laporan-inventaris"
              component={LaporanInventaris}
              exact
            />
            <Route
              path="/detail-inventaris"
              component={DetailInventaris}
              exact
            />
            {/* yayasan */}
            <Route path="/daftar-cabang" component={DaftarCabang} exact />
            <Route path="/laporan-donasi" component={LaporanDonasi} exact />
            <Route
              path="/laporan-investariss"
              component={LaporanInventaris1}
              exact
            />
            <Route path="/cabang" component={CabangAnakAsuh} exact />
            <Route path="/add-cabang" component={AddCabang} exact />
            <Route path="/form-cabang-baru" component={FormCabangBaru} exact />
            <Route
              path="/cabang-anak-asuh/:id"
              component={DataAnakAsuh}
              exact
            />
            <Route path="/user-organization" component={Organization} exact />
            <Route
              path="/add-organization"
              component={TambahOrganization}
              exact
            />
            <Route
              path="/edit-organization/:id"
              component={EditOrganization}
              exact
            />
            <Route path="/edit-cabang/:id" component={EditCabang} exact />
            <Route path="/detail_cabang/:id" component={DetailCabang} exact />
          </Switch>
        </main>
        <LogPageView />
      </BrowserRouter>
    </>
  );
}

export default App;
