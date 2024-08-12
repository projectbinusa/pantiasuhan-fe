import React, { useEffect, useState } from "react";
import Header from "../../../../../component/Header";
import Sidebar from "../../../../../component/Sidebar";
import { API_DUMMY } from "../../../../../utils/base_URL";
import Swal from "sweetalert2";
import axios from "axios";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

function EditJenisRegulasi() {
  const [jenisRegulasi, setJenisRegulasi] = useState("");
  const param = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/bawaslu/api/jenis-regulasi/get-by-id/` + param.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((ress) => {
        const response = ress.data.data;
        setJenisRegulasi(response.jenisRegulasi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // update jenis regulasi
  const update = async (e) => {
    e.preventDefault();

    try {
      // Assuming you've correctly set jenisRegulasi in your component state
      const response = await axios
        .put(
          `${API_DUMMY}/bawaslu/api/jenis-regulasi/put/${param.id}?jenisRegulasi=${jenisRegulasi}`,
          {
            jenisRegulasi: jenisRegulasi,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((ress) => {
          console.log(ress.data.data);
          Swal.fire({
            icon: "success",
            title: "Berhasil Mengedit Data",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            history.push("/jenis-regulasi");
            window.location.reload();
          }, 1500);
        });

      console.log(response.data.data);
      // Handle success, e.g., show a success message or navigate to another page
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
    }
  };

  // const update = async (e) => {
  //   e.preventDefault();

  //   await axios
  //     .put(
  //       `${API_DUMMY}/bawaslu/api/jenis-regulasi/put/` + param.id,
  //       {
  //         jenisRegulasi,
  //         jenisRegulasi,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((ress) => {
  //       console.log(ress.data.data);
  //       // Swal.fire({
  //       //   icon: "success",
  //       //   title: "Berhasil Mengedit Data",
  //       //   showConfirmButton: false,
  //       //   timer: 1500,
  //       // });
  //       // history.push("/jenis-regulasi");
  //       // setTimeout(() => {
  //       //   window.location.reload();
  //       // }, 1500);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="container mt-3 app-main__outer">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="fs-4">Form Edit Data</h1>
              <hr />
              <form onSubmit={update}>
                <div className="row">
                  <div className="mb-3 col-6">
                    <label for="exampleInputEmail1" className="form-label font-weight-bold">
                      Jenis Regulasi
                    </label>
                    <input
                      value={jenisRegulasi}
                      onChange={(e) => setJenisRegulasi(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
                <button type="button" className="btn-danger mt-3 mr-3">
                  <a
                    href="/jenis-regulasi"
                    style={{ color: "white", textDecoration: "none" }}>
                    {" "}
                    Batal
                  </a>
                </button>
                <button type="submit" className="btn-primary mt-3">
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditJenisRegulasi;
