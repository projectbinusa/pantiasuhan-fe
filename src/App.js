import { Route, Switch, BrowserRouter } from "react-router-dom";
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
import AddCategory from "./views/pages/admin/berita/categoryBerita/AddCategory";
import EditCategory from "./views/pages/admin/berita/categoryBerita/EditCategory";
import AddBeritaAdmin from "./views/pages/admin/berita/AddBeritaAdmin";
import AdminBerita from "./views/pages/admin/berita/AdminBerita";
import EditBeritaAdmin from "./views/pages/admin/berita/EditBeritaAdmin";
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
import CategoryBerita from "./views/pages/CategoryBerita";
import AddRegulasi from "./views/pages/admin/daftarRegulasi/Regulasi/AddRegulasi";
import MenuEditRegulasi from "./views/pages/admin/daftarRegulasi/MenuRegulasi/MenuEditRegulasi";
import IsiDaftarRegulasi from "./views/pages/daftarRegulasi/IsiDaftarRegulasi";
import DetailBerita from "./views/pages/admin/berita/DetailBerita";
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
          <Route path="/" component={Home} exact />

          <Route path="/profil" component={Profil} exact />
          <Route path="/pengumuman" component={Pengumuman} exact />
          <Route
            path="/pengumuman/:judulPengumuman/:id"
            component={IsiPengumuman}
            exact
          />
          <Route path="/library" component={ELibrary} exact />
          <Route path="/berita" component={Berita} exact />
          <Route
            path="/edit-category-berita/:id"
            component={EditCategory}
            exact
          />
          <PrivateRoute
            path="/detail/berita/:id"
            component={DetailBerita}
            exact
          />
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
          <PrivateRoute path="/admin-berita" component={AdminBerita} exact />
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
          <PrivateRoute
            path="/tambah-category-berita"
            component={AddCategory}
            exact
          />
          <PrivateRoute
            path="/category-berita/:category/:id"
            component={CategoryBerita}
            exact
          />
          <PrivateRoute
            path="/edit-category-berita/:id"
            component={EditCategory}
            exact
          />
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
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
