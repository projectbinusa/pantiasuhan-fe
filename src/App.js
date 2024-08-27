import { Route, Switch, BrowserRouter } from "react-router-dom";
import Dashbaord from "./views/pagesekolah/Home";
import "./css/style.css";
import Login from "./views/pages/auth/Login";
import Register from "./views/pages/auth/Register";
import PrivateRoute from "./utils/PrivateRoute";

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
import AdminGalery from "./views/pages/admin/smpn1bergas/galery/Galery";
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
import KonsidisiSekolahView from "./views/pagesekolah/kondisisekolah/KondisiSekolahView";
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
          <Route path="/materi_ajar" component={MateriAjarView} exact />
          <Route path="/all-prestasi" component={PrestasiSekolah} exact />
          <Route path="/prestasi/:id" component={DetailPrestasi} exact />
          <Route path="/ekstrakurikuler" component={Ekstrakurikuler} exact />
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
          <PrivateRoute path="/edit-alumni/:id" component={EditAlumni} exact />
          <PrivateRoute
            path="/detail-alumni/:id"
            component={DetailAlumniAdmin}
            exact
          />
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
          <PrivateRoute path="/admin-galery" component={AdminGalery} exact />
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
          {/* perpus*/}
          <PrivateRoute
            path="/admin-perpustakaan"
            component={AdminPerpus}
            exact
          />
          <PrivateRoute path="/add-perpustakaan" component={AddPerpus} exact />
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
          <Route path="/admin-kotak-saran" component={KotakMasuk} exact />
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
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
