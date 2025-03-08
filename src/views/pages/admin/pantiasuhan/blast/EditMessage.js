import React, { useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY, API_DUMMY_SMART } from "../../../../../utils/base_URL";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Image,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  TodoList,
  Underline,
  WordCount,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Base64UploadAdapter,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  RemoveFormat,
  SpecialCharacters,
  // SpecialCharactersEmoji,
  SpecialCharactersEssentials,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  Bold,
  Essentials,
  Heading,
  ClassicEditor,
  Undo,
  GeneralHtmlSupport,
  Alignment,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import SidebarPantiAdmin from "../../../../../component/SidebarPantiAdmin";
import { uploadImageToS3 } from "../../../../../utils/uploadToS3";

function EditMessage() {
  const [receivers, setReceivers] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [redaksi, setRedaksi] = useState("");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const param = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_DUMMY_SMART}/api/customer/blast/` + param.id, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
        },
      })
      .then((res) => {
        const response = res.data.data;
        console.log(response);
        setRedaksi(response.redaksi);
        setReceivers(response.receivers)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.id]);

  const handleAddReceiver = () => {
    if (receiver.trim() === "" || receivers.includes(receiver)) return;

    setReceivers([...receivers, receiver]);
    setReceiver(""); // Reset input setelah ditambahkan
  };

  const handleRemoveReceiver = (index) => {
    setReceivers(receivers.filter((_, i) => i !== index));
  };

  const memoizedRedaksi = useMemo(() => redaksi, [redaksi]);

  const updateData = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.put(
        `${API_DUMMY_SMART}/api/customer/blast/${param.id}`,
        {
          receivers: receivers,
          redaksi: memoizedRedaksi,
        },
        {
          headers: {
            "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          },
        }
      );
      setShow(false);
      await Swal.fire({
        icon: "success",
        title: "Data Berhasil DiUbah",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        history.push("/message");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Ubah Data Gagal!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(error);
      }
    } finally {
      setIsLoading(false); // Matikan loading setelah selesai
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const [sidebarToggled, setSidebarToggled] = useState(true);

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  const handleResize = () => {
    if (window.innerWidth < 800) {
      setSidebarToggled(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className={`page-wrapper chiller-theme ${sidebarToggled ? "toggled" : ""
        }`}
    >
      <a
        id="show-sidebar"
        className="btn1 btn-lg"
        onClick={toggleSidebar}
        style={{ color: "white", background: "#3a3f48" }}
      >
        <i className="fas fa-bars"></i>
      </a>
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div
        style={{ marginTop: "50px" }}
        className="page-content1 mb-3 app-main__outer"
        data-aos="fade-left"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow">
                <div className="card-body">
                  <h1 className="fs-4">Form Edit Data</h1>
                  <hr />
                  <div className="row">
                    <div className="mb-3 col-lg-12">
                      <label className="form-label font-weight-bold">
                        No Whatsapp Penerima
                      </label>
                      <div>
                        {receivers.map((data, index) => (
                          <div key={index} className="d-flex align-items-center justify-content-between p-2 rounded mb-2">
                            <p className="m-0 font-weight-bold">{data}</p>
                            <button onClick={() => handleRemoveReceiver(index)} className="btn-danger btn-sm">
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <input
                          value={receiver}
                          onChange={(e) => setReceiver(e.target.value)}
                          type="number"
                          className="form-control"
                          placeholder="Masukkan No Whatsapp Penerima"
                        />
                        <button onClick={handleAddReceiver} className="btn-primary btn-sm p-2"><i class="fa-solid fa-plus"></i></button>
                      </div>
                    </div>
                    <div className="mb-3 col-lg-12">
                      <label className="form-label font-weight-bold">
                        Redaksi Text
                      </label>
                      <textarea rows={6} onChange={(e) => setRedaksi(e.target.value)} value={redaksi} className="form-control"
                        required
                        placeholder="Masukkan Redaksi Teks"></textarea>
                    </div>
                  </div>
                  <button type="button" className="btn-danger mt-3 mr-3">
                    <a
                      style={{ color: "white", textDecoration: "none" }}
                      href="/message"
                    >
                      Batal
                    </a>
                  </button>
                  <button onClick={updateData} className="btn-primary mt-3" disabled={isLoading}>
                    {isLoading ? <span className="loader"></span> : "Kirim"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        .ck-editor__editable {
          min-height: 400px;
        }
        `}
      </style>
    </div>
  );
}

export default EditMessage;
