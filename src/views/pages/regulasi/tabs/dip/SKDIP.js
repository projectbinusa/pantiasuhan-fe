import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_DUMMY } from "../../../../../utils/base_URL";

function SKDIP() {
  const [data, setData] = useState(null);
  const [default1, setdefault1] = useState("SK DIP");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_DUMMY}/bawaslu/api/tabel-dip/all-terbaru?daftarDip=${default1}&order=asc&page=0&size=10&sort=created_date`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error saat mengambil data :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="responsive-3">
      <div className="card-body bg-body-tertiary table-container rounded">
        <table className="table table1 responsive-3 table-striped table-hover border rounded">
          <thead>
            <tr>
              <th className="text-center"> Dokumen</th>
              <th className="text-center"> Pdf Document</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.content.map((item) => (
                <React.Fragment key={item.id}>
                  <tr>
                    <td data-cell="dokumen"  style={{ width: "500px" }}>
                      {item.namadokumen}
                    </td>
                    <td  style={{

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",


                      }}>
                      <a href={item.pdfDokumen}>
                        <button
                          className="bg-primary text-light"
                          style={{
                            border: "none",
                            padding: "7px",
                            paddingLeft: "13px",
                            paddingRight: "13px",
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          <i className="fa-solid fa-download"></i>
                        </button>
                      </a>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SKDIP;
