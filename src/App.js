import { Route, Switch, BrowserRouter } from "react-router-dom";
import Dashbaord from "./views/pagesekolah/Home";
import Home from "./views/pages/Home";
import SertaMerta from "./views/pages/informasi/SertaMerta";
import SetiapSaat from "./views/pages/informasi/SetiapSaat";
import "./css/style.css";
import Profil from "./views/pages/Profil";
import Pengumuman from "./views/pages/pengumuman/Pengumuman";
import ELibrary from "./views/pages/Library";
import CalonAnggotaBawaslu from "./views/pages/pengumuman/CalonAnggotaBawaslu";
import Berita from "./views/pages/Berita";
import Login from "./views/pages/auth/Login";
import Register from "./views/pages/auth/Register";
import Dikecualikan from "./views/pages/informasi/Dikecualikan";
import FormPermohonanInformasi from "./views/pages/form/FormPermohonanInformasi";
import FormPermohonanKeberatan from "./views/pages/form/FormPermohonanKeberatan";

import AdminFormInformasi from "./views/pages/admin/adminForm/AdminFormInformasi";
// import AddCategory from "./views/pages/admin/berita/categoryBerita/AddCategory";
// import EditCategory from "./views/pages/admin/berita/categoryBerita/EditCategory";
// import AddBeritaAdmin from "./views/pages/admin/berita/AddBeritaAdmin";
// import AdminBerita from "./views/pages/admin/berita/AdminBerita";
// import EditBeritaAdmin from "./views/pages/admin/berita/EditBeritaAdmin";
import AdminPermohonanInformasi from "./views/pages/admin/permohonan/AdminPermohonanInformasi";
import AdminPermohonanKeberatan from "./views/pages/admin/permohonan/AdminPermohonanKeberatan";
import DetailPermohonanInformasi from "./views/pages/admin/permohonan/detail/DetailPermohonanInformasi";
import DetailPermohonanKeberatan from "./views/pages/admin/permohonan/detail/DetailPermohonanKeberatan";
import WaktuLayanan from "./views/pages/prosedur/WaktuLayanan";
import BiayaLayanan from "./views/pages/prosedur/BiayaLayanan";
import PermohonanKeberatan from "./views/pages/prosedur/PermohonanKeberatan";
import PenyelesaianSengketa from "./views/pages/prosedur/PenyelesaianSengketa";
import Maklumat from "./views/pages/daftarRegulasi/Maklumat";
import LayananInformasi from "./views/pages/form/LayananInformasi";
import PermintaanInformasi from "./views/pages/prosedur/PermintaanInformasi";

// import AdminSertaMerta from "./views/pages/admin/informasi/AdminSertaMerta";
import AdminPengumuman from "./views/pages/admin/pengumuman/AdminPengumuman";
import AddPengumuman from "./views/pages/admin/pengumuman/AddPengumuman";
import EditPengumuman from "./views/pages/admin/pengumuman/EditPengumuman";

import Indexx from "./views/pages/admin/informasi/Index";

import AddMenuRegulasi from "./views/pages/admin/daftarRegulasi/MenuRegulasi/AddMenuRegulasi";
// import AddMenuRegulasi "./"
import AddJenisKeterangan from "./views/pages/admin/informasi/AddJenisKeterangan";
import EditJenisKeterangan from "./views/pages/admin/informasi/EditJenisKeterangan";
import IsiKeterangan from "./views/pages/admin/informasi/isiKeterangan/IsiKeterangan";
import AddIsiKeteranganInformasii from "./views/pages/admin/informasi/isiKeterangan/AddIsiKeteranganInformasi";
import EditIsiKeterangan from "./views/pages/admin/informasi/isiKeterangan/EditIsiKeterangan";
import RegulasiAdmin from "./views/pages/admin/daftarRegulasi/Regulasi/RegulasiAdmin";
import EditRegulasi from "./views/pages/admin/daftarRegulasi/Regulasi/EditRegulasi";
import MenuRegulasi from "./views/pages/admin/daftarRegulasi/MenuRegulasi/MenuRegulasi";
import Kanal from "./views/pages/informasi/Kanal";
import PageBerita from "./views/PageBerita";
import PrivateRoute from "./utils/PrivateRoute";
import JenisInformasi from "./views/pages/admin/informasi/jenisInformasi/JenisInformasi";
import AddJenisInfo from "./views/pages/admin/informasi/jenisInformasi/AddJenisInfo";
import EditJenisInf from "./views/pages/admin/informasi/jenisInformasi/EditJenisInf";
import RekapBeritaa from "./views/pages/rekap_berita/RekapBerita";
import IsiRekap from "./views/pages/rekap_berita/IsiRekap";
import IsiPengumuman from "./views/pages/pengumuman/IsiPengumuman";
import AddJenisRegulasi from "./views/pages/admin/daftarRegulasi/JenisRegulasi/AddJenisRegulasi";
import JenisRegulasi from "./views/pages/admin/daftarRegulasi/JenisRegulasi/JenisRegulasi";
import EditJenisRegulasi from "./views/pages/admin/daftarRegulasi/JenisRegulasi/EditJenisRegulasi";
import DetailPengumuman from "./views/pages/admin/pengumuman/DetailPengumuman";
// import CategoryBerita from "./views/pages/CategoryBerita";
import AddRegulasi from "./views/pages/admin/daftarRegulasi/Regulasi/AddRegulasi";
import MenuEditRegulasi from "./views/pages/admin/daftarRegulasi/MenuRegulasi/MenuEditRegulasi";
import IsiDaftarRegulasi from "./views/pages/daftarRegulasi/IsiDaftarRegulasi";
// import DetailBerita from "./views/pages/admin/berita/DetailBerita";
import PutIsiInformasi from "./views/pages/admin/PutIsiInformasi";
import InformasiBerkalaKelembagaan from "./views/pages/informasi/InformasiBerkalaKelembagaan";
import InformasiBerkalaKepemiluan from "./views/pages/informasi/InformasiBerkalaKepemiluan";
import InformasiBerkala from "./views/pages/informasi/InformasiBerkala";
import AdminSetiapSaat from "./views/pages/admin/AdminSetiapSaat";
import AddSertaMerta from "./views/pages/admin/Add/AddSertaMerta";
import AddSetiapSaat from "./views/pages/admin/Add/AddSetiapSaat";
import AdminBerkalaKepemiluan from "./views/pages/admin/AdminBerkalaKepemiluan";
import AdminBerkalaKelembagaan from "./views/pages/admin/AdminBerkalaKelembagaan";
import AdminKanal from "./views/pages/admin/AdminKanal";
import AddBerkalaKepemiluan from "./views/pages/admin/Add/AddBerkalaKepemiluan";
import AddBerkalaKelembagaan from "./views/pages/admin/Add/AddBerkalaKelembagaan";
import AddKanal from "./views/pages/admin/Add/AddKanal";
import AdminSertaMerta from "./views/pages/admin/AdminSertaMerta";

// ADMIN MENU REGULASI
import AdminDip from "./views/pages/admin/regulasi/dip/AdminDip";
import AdminSop from "./views/pages/admin/regulasi/sop/AdminSop";
import AdminRegulasi from "./views/pages/admin/regulasi/regulasi/AdminRegulasi";
import AddSop from "./views/pages/admin/regulasi/sop/AddSop";
import AddDip from "./views/pages/admin/regulasi/dip/AddDip";
import AddRegulasiAdmin from "./views/pages/admin/regulasi/regulasi/AddRegulasiAdmin";
import PutDip from "./views/pages/admin/regulasi/dip/PutDip";
import PutSop from "./views/pages/admin/regulasi/sop/PutSop";
import PutRegulasiAdmin from "./views/pages/admin/regulasi/regulasi/PutRegulasiAdmin";
import RegulasiPublic from "./views/pages/regulasi/RegulasiPublic";
import DipPublic from "./views/pages/regulasi/DipPublic";
import SopPublic from "./views/pages/regulasi/SopPublic";
import AdminDiKecualikan from "./views/pages/admin/AdminDiKecualikan";
import AddDiKecualikan from "./views/pages/admin/Add/AddDiKecualikan";
import PageCarousel from "./views/pages/admin/caraousel/PageCarousel";
import EditCarousel from "./views/pages/admin/caraousel/EditCarousel";
import AddCarousel from "./views/pages/admin/caraousel/AddCarousel";
import AdminLibrary from "./views/pages/admin/eLibrary/AdminLibrary";
import AddLibrary from "./views/pages/admin/eLibrary/AddLibrary";
import PutLibrary from "./views/pages/admin/eLibrary/PutLibrary";

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
import Info from "./views/pagesekolah/berita/info/info"
import DetailInfo from "./views/pagesekolah/berita/info/DetailInfo";
import agenda from "./views/pagesekolah/berita/agenda/Agenda";
import DetailAgenda from "./views/pagesekolah/berita/agenda/DetailAgenda";
// import Galery from "./views/pagesekolah/berita/gambar/GalerySekolah";
import Sarpras from "./views/pagesekolah/profilSekolah/sarpras/Sarpras"
import AddCategory from "./views/pages/admin/smpn1bergas/berita/categoryBerita/AddCategory";
import EditCategory from "./views/pages/admin/smpn1bergas/berita/categoryBerita/EditCategory";
import AddBeritaAdmin from "./views/pages/admin/smpn1bergas/berita/AddBeritaAdmin";
import AdminBerita from "./views/pages/admin/smpn1bergas/berita/AdminBerita";
import EditBeritaAdmin from "./views/pages/admin/smpn1bergas/berita/EditBeritaAdmin";
import DetailBerita from "./views/pages/admin/smpn1bergas/berita/DetailBerita";
import Galery from "./views/pages/admin/smpn1bergas/galery/Galery";
import AddGalery from "./views/pages/admin/smpn1bergas/galery/AddGalery";
import EditGalery from "./views/pages/admin/smpn1bergas/galery/EditGalery";
import Keuangan from "./views/pages/admin/smpn1bergas/menu/keuangan/Keuangan";
import EditKeuangan from "./views/pages/admin/smpn1bergas/menu/keuangan/EditKeuangan";
import AddKeuangan from "./views/pages/admin/smpn1bergas/menu/keuangan/AddKeuangan";
import AddCategoryKeuangan from "./views/pages/admin/smpn1bergas/menu/keuangan/categorykeuangan/AddCategoryKeuangan";
import EditCategoryKeuangan from "./views/pages/admin/smpn1bergas/menu/keuangan/categorykeuangan/EditCategoryKeuangan";
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

// END ADMIN MENU REGULASI

function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          {/* auth */}
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          {/* page */}
          <Route path="/" component={Dashbaord} exact />
          <Route path="/sambutan" component={sambutan} exact />
          <Route path="/visi-misi" component={VisiMisiSekolah} exact />
          <Route path="/sejarah" component={SejarahSekolah} exact />
          <Route path="/staff" component={TenagaKepndidkan} exact />
          <Route path="/all-prestasi" component={PrestasiSekolah} exact />
          <Route path="/sarpras" component={Sarpras} exact />

          <Route path="/profil" component={Profil} exact />
          <Route path="/pengumuman" component={Pengumuman} exact />
          <Route
            path="/pengumuman/:judulPengumuman/:id"
            component={IsiPengumuman}
            exact
          />
          <Route path="/library" component={ELibrary} exact />
          <Route path="/berita" component={Berita} exact />
          {/* <Route
            path="/edit-category-berita/:id"
            component={EditCategory}
            exact
          />
          <PrivateRoute
            path="/detail/berita/:id"
            component={DetailBerita}
            exact
          /> */}
          {/* daftar informasi */}
          <Route path="/informasi-serta-merta" component={SertaMerta} exact />
          <Route path="/informasi-setiap-saat" component={SetiapSaat} exact />
          <Route
            path="/informasi-berkala-kelembagaan"
            component={InformasiBerkalaKelembagaan}
            exact
          />
          <Route path="/informasi-berkala" component={InformasiBerkala} exact />

          <Route
            path="/informasi-berkala-Kepemiluan"
            component={InformasiBerkalaKepemiluan}
            exact
          />
          <Route path="/informasi-dikecuali" component={Dikecualikan} exact />
          <Route path="/informasi-kanal" component={Kanal} exact />

          {/* tambah dan ubah data informasi */}
          <PrivateRoute
            path="/tambah-informasi-serta-merta"
            component={AddSertaMerta}
            exact
          />
          <PrivateRoute
            path="/tambah-informasi-setiap-saat"
            component={AddSetiapSaat}
            exact
          />
          <PrivateRoute
            path="/tambah-informasi-berkala-kepemiluan"
            component={AddBerkalaKepemiluan}
            exact
          />
          <PrivateRoute
            path="/tambah-informasi-berkala-kelembagaaan"
            component={AddBerkalaKelembagaan}
            exact
          />
          <PrivateRoute
            path="/tambah-informasi-kanal"
            component={AddKanal}
            exact
          />
          <PrivateRoute
            path="/ubah-isi-informasi/:id"
            component={PutIsiInformasi}
            exact
          />

          {/* form online */}
          <Route
            path="/form-permohonan-keberatan"
            component={FormPermohonanKeberatan}
            exact
          />
          <Route
            path="/form-permohonan-informasi"
            component={FormPermohonanInformasi}
            exact
          />

          {/* prosedur */}
          <Route path="/waktu-layanan" component={WaktuLayanan} exact />
          <Route
            path="/layanan-informasi-berbasis-android"
            component={LayananInformasi}
            exact
          />
          <Route path="/biaya-pelayanan" component={BiayaLayanan} exact />
          <Route
            path="/prosedur-permintaan-informasi"
            component={PermintaanInformasi}
            exact
          />
          <Route
            path="/prosedur-permohonan-keberatan"
            component={PermohonanKeberatan}
            exact
          />
          <Route
            path="/prosedur-permohonan-penyelesaian-sengketa-informasi"
            component={PenyelesaianSengketa}
            exact
          />
          <Route
            path="/pengumuman-calon-anggota-bawaslu-kabupaten-kota-terpilih-provinsi-jawa-tengah"
            component={CalonAnggotaBawaslu}
            exact
          />
          {/* daftar regulasi */}

          <Route path="/maklumat-pelayanan" component={Maklumat} exact />
          <Route
            path="/daftar-regulasi/:jenisRegulasi/:id"
            component={IsiDaftarRegulasi}
            exact
          />

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
          <PrivateRoute path="/edit-alumni/:id" component={EditAlumni} exact />
          {/* edit alumni */}
          {/* kontak */}
          <PrivateRoute path="/admin-kontak" component={Kontak} exact />
          <PrivateRoute path="/add-kontak" component={AddKontak} exact />
          <PrivateRoute path="/edit-kontak/:id" component={EditKontak} exact />
          {/* end kontak */}
          {/* sambutan */}
          <PrivateRoute
            path="/admin-sambutan"
            component={AdminSambutan}
            exact
          />
          <PrivateRoute path="/add-sambutan" component={AddSambutan} exact />
          <PrivateRoute
            path="/edit-sambutan/:id"
            component={EditSambutan}
            exact
          />
          {/* end sambutan */}
          {/* sejarah */}
          <PrivateRoute path="/admin-sejarah" component={Sejarah} exact />
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
          <PrivateRoute path="/admin-visimisi" component={VisiMisi} exact />
          <PrivateRoute path="/add-visimisi" component={AddVisiMisi} exact />
          <PrivateRoute
            path="/edit-visimisi/:id"
            component={EditVisiMisi}
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
          <PrivateRoute path="/edit-sarana/:id" component={EditSarana} exact />
          {/* end sarana */}
          {/* kegiatan */}
          <PrivateRoute path="/admin-kegiatan" component={Kegiatan} exact />
          <PrivateRoute path="/add-kegiatan" component={AddKegiatan} exact />
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
            path="/edit-program/:id"
            component={EditProgram}
            exact
          />
          {/* end program */}
          {/* prestasi */}
          <PrivateRoute path="/admin-prestasi" component={Prestasi} exact />
          <PrivateRoute path="/add-prestasi" component={AddPrestasi} exact />
          <PrivateRoute
            path="/edit-prestasi/:id"
            component={EditPrestasi}
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
          {/* <PrivateRoute
            path="/category-berita/:category/:id"
            component={CategoryBerita}
            exact
          /> */}
          <PrivateRoute
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
          <PrivateRoute path="/admin-galery" component={GalerySekolah} exact />
          <PrivateRoute path="/add-galery" component={AddGalery} exact />
          <PrivateRoute path="/edit-galery/:id" component={EditGalery} exact />
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
          <PrivateRoute
            path="/add-category-keuangan"
            component={AddCategoryKeuangan}
            exact
          />
          <PrivateRoute
            path="/edit-category-keuangan/:id"
            component={EditCategoryKeuangan}
            exact
          />
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
          {/* end kondisi sekolah */}
          {/* end admin smpn1bergas */}
          {/* eLibrary */}
          <PrivateRoute path="/admin-library" component={AdminLibrary} exact />
          <PrivateRoute
            path="/add-library-admin"
            component={AddLibrary}
            exact
          />
          <PrivateRoute
            path="/edit-library-admin/:id"
            component={PutLibrary}
            exact
          />
          <PrivateRoute
            path="/admin-page-carousel"
            component={PageCarousel}
            exact
          />
          <PrivateRoute
            path="/edit-page-carousel/:id"
            component={EditCarousel}
            exact
          />
          <PrivateRoute
            path="/add-page-carousel"
            component={AddCarousel}
            exact
          />
          {/* admin informasi */}
          <PrivateRoute
            path="/admin-serta-merta"
            component={AdminSertaMerta}
            exact
          />
          <PrivateRoute
            path="/admin-setiap-saat"
            component={AdminSetiapSaat}
            exact
          />
          <PrivateRoute
            path="/admin-berkala-kepemiluan"
            component={AdminBerkalaKepemiluan}
            exact
          />
          <PrivateRoute
            path="/admin-berkala-kelembagaan"
            component={AdminBerkalaKelembagaan}
            exact
          />
          <PrivateRoute
            path="/admin-dikecualikan"
            component={AdminDiKecualikan}
            exact
          />
          <PrivateRoute path="/admin-kanal" component={AdminKanal} exact />

          {/* tambah dan ubah data informasi */}
          <PrivateRoute
            path="/tambah-informasi-serta-merta"
            component={AddSertaMerta}
            exact
          />
          <PrivateRoute
            path="/tambah-informasi-setiap-saat"
            component={AddSetiapSaat}
            exact
          />
          <PrivateRoute
            path="/tambah-informasi-berkala-kepemiluan"
            component={AddBerkalaKepemiluan}
            exact
          />
          <PrivateRoute
            path="/tambah-informasi-berkala-kelembagaan"
            component={AddBerkalaKelembagaan}
            exact
          />
          <PrivateRoute
            path="/tambah-informasi-dikecualikan"
            component={AddDiKecualikan}
            exact
          />
          <PrivateRoute
            path="/tambah-informasi-kanal"
            component={AddKanal}
            exact
          />
          <PrivateRoute
            path="/ubah-isi-informasi/:id"
            component={PutIsiInformasi}
            exact
          />
          <PrivateRoute
            path="/admin-permohonan-informsi"
            component={AdminFormInformasi}
            exact
          />
          <PrivateRoute
            path="/add/regulasi/:id"
            component={AddRegulasi}
            exact
          />
          <PrivateRoute
            path="/tambah-jenis-regulasi"
            component={AddJenisRegulasi}
            exact
          />
          {/* <PrivateRoute path="/:keterangan/:id" component={MenuInformasi} exact /> */}
          <PrivateRoute
            path="/detail-pengumuman/:id"
            component={DetailPengumuman}
            exact
          />
          <PrivateRoute
            path="/jenis-regulasi"
            component={JenisRegulasi}
            exact
          />
          <PrivateRoute
            path="/edit-jenis-regulasi/:id"
            component={EditJenisRegulasi}
            exact
          />
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
          <PrivateRoute
            path="/admin-pengumuman"
            component={AdminPengumuman}
            exact
          />
          <PrivateRoute
            path="/add-pengumuman"
            component={AddPengumuman}
            exact
          />
          <PrivateRoute
            path="/edit-pengumuman/:id"
            component={EditPengumuman}
            exact
          />
          <PrivateRoute
            path="/adminn-permohonan-informasi"
            component={AdminPermohonanInformasi}
            exact
          />
          <PrivateRoute
            path="/detail/permohonan-informasi/:id"
            component={DetailPermohonanInformasi}
            exact
          />
          <PrivateRoute
            path="/detail/permohonan-keberatan/:id"
            component={DetailPermohonanKeberatan}
            exact
          />
          <PrivateRoute
            path="/admin-permohonan-keberatan"
            component={AdminPermohonanKeberatan}
            exact
          />
          {/* daftar regulasi */}
          <PrivateRoute
            path="/admin-regulasi/:id"
            component={MenuRegulasi}
            exact
          />
          <PrivateRoute
            path="/edit-data/:menuRegulasi/:id"
            component={MenuEditRegulasi}
            exact
          />
          <PrivateRoute
            path="/add/menu-regulasi/:id"
            component={AddMenuRegulasi}
            exact
          />
          <PrivateRoute
            path="/edit/:dokumen/:id"
            component={EditRegulasi}
            exact
          />
          <PrivateRoute
            path="/:menuRegulasi/:id"
            component={RegulasiAdmin}
            exact
          />
          {/* <PrivateRoute path="/edit/:regulasi/:id" component={EditRegulasi} exact /> */}
          {/* <PrivateRoute path="/admin-informasi-serta-merta" component={AdminSertaMerta} exact /> */}
          <PrivateRoute
            path="/detail-permohonan-informasi/:id"
            component={DetailPermohonanInformasi}
            exact
          />
          <PrivateRoute
            path="/detail/permohonan-keberatan/:id"
            component={DetailPermohonanKeberatan}
            exact
          />
          {/* <PrivateRoute
            path="/tambah-category-berita"
            component={AddCategory}
            exact
          /> */}
          {/* <PrivateRoute
            path="/category-berita/:category/:id"
            component={CategoryBerita}
            exact
          />
          <PrivateRoute
            path="/edit-category-berita/:id"
            component={EditCategory}
            exact
          /> */}
          {/* admin informasi */}
          {/* <PrivateRoute path="/admin-serta-merta" component={AdminSertaMerta} exact /> */}

          <PrivateRoute
            path="/admin-informasi/:namaInformasi/:id"
            component={Indexx}
            exact
          />
          <PrivateRoute
            path="/jenis-informasi"
            component={JenisInformasi}
            exact
          />
          <PrivateRoute
            path="/tambah-jenis-informasi"
            component={AddJenisInfo}
            exact
          />
          <Route
            path="/page-isi-berita/:author/:id"
            component={PageBerita}
            exact
          />
          <Route
            path="/edit-jenis-informasi/:namaInformasi/:id"
            component={EditJenisInf}
            exact
          />
          <Route
            path="/tambah/jenis-keterangan/:id"
            component={AddJenisKeterangan}
            exact
          />
          <Route
            path="/edit-jenis/:namaInformasi/:id"
            component={EditJenisKeterangan}
            exact
          />
          <Route
            path="/isi-keterangan/:keterangan/:id"
            component={IsiKeterangan}
            exact
          />
          <Route
            path="/add/isi-keterangan/:id"
            component={AddIsiKeteranganInformasii}
            exact
          />
          <Route
            path="/edit-isi-keterangan/:dokumen/:id"
            component={EditIsiKeterangan}
            exact
          />
          {/* rekap data perbulan */}
          <Route
            path="/rekap/berita/:tahun_bulan"
            component={RekapBeritaa}
            exact
          />
          <Route
            path="/isi-rekap/:judulBerita/:id"
            component={IsiRekap}
            exact
          />
          <Route path="/informasi-serta-merta" component={SertaMerta} exact />

          {/* ADMIN MENU REGULASI */}
          {/* dip */}
          <Route path="/dip-admin" component={AdminDip} exact />
          <Route path="/add-dip-admin" component={AddDip} exact />
          <Route path="/put-admin/dip/:id" component={PutDip} exact />

          {/* sop */}
          <Route path="/sop-admin" component={AdminSop} exact />
          <Route path="/add-sop-admin" component={AddSop} exact />
          <Route path="/put-admin/sop/:id" component={PutSop} exact />
          {/* regulasi */}
          <Route path="/regulasi-admin" component={AdminRegulasi} exact />
          <Route
            path="/add-regulasi-admin"
            component={AddRegulasiAdmin}
            exact
          />
          <Route
            path="/put-admin/regulasi/:id"
            component={PutRegulasiAdmin}
            exact
          />
          {/* END ADMIN MENU REGULASI */}

          {/* PUBLIC MENU REGULASI */}
          <Route path="/regulasi-public" component={RegulasiPublic} exact />
          <Route path="/dip-public" component={DipPublic} exact />
          <Route path="/sop-public" component={SopPublic} exact />
          {/* END PUBLIC MENU REGULASI */}

          {/* KEUANGAN */}
          <Route path="/keuangan-apbd" component={AllAPBD} exact />
          <Route path="/detail-apbd-:id" component={DetailAPBD} exact />
          <Route path="/keuangan-bos" component={AllBOS} exact />
          <Route path="/detail-bos-:id" component={DetailBOS} exact />
          <Route path="/keuangan-komite" component={AllKomite} exact />
          <Route path="/detail-komite-:id" component={DetailKomite} exact />

          {/* PRESTASI */}
          <Route path="/detail-prestasi-:id" component={DetailPrestasi} exact />
          <Route path="/detail-alumni-:id" component={DetailAlumni} exact />
          <Route path="/osis" component={Osis} exact />

          {/* Berita */}
          <Route path="/galery" component={GalerySekolah} exact />
          <Route path="/news" component={beritaNews} exact />
          <Route path="/detail-news-:id" component={DetailNews} exact />
          <Route path="/info" component={Info} exact />
          <Route path="/detail-info-:id" component={DetailInfo} exact />
          <Route path="/agenda" component={agenda} exact />
          <Route path="/detail-agenda-:id" component={DetailAgenda} exact />

          <Route path="/perpustakaan" component={Perpustakaan} exact />
          {/* <Route path="/detail-agenda-:id" component={DetailAgenda} exact /> */}
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;