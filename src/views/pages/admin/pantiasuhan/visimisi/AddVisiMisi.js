import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import AOS from "aos";
import { API_DUMMY } from "../../../../../utils/base_URL";

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

function AddVisiMisiPanti() {
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const [sidebarToggled, setSidebarToggled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [image, setImage] = useState("");

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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Simpan file ke state
  };

  const add = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    Swal.fire({
      title: "Loading...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Gunakan FormData untuk upload gambar
      const formData = new FormData();
      formData.append("visi", visi);
      formData.append("misi", misi);
      formData.append("tujuan", tujuan);
      if (image) {
        formData.append("image", image);
      }

      await axios.post(`${API_DUMMY}/api/admin/visi-misi`, formData, {
        headers: {
          "auth-tgh": `jwt ${localStorage.getItem("tokenpython")}`,
          "Content-Type": "multipart/form-data", // Penting untuk upload file
        },
      });

      setShow(false);
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        history.push("/admin_visimisi");
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
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
    } finally {
      setIsLoading(false); // Matikan loading setelah selesai
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const REDUCED_MATERIAL_COLORS = [
    { label: "Red 50", color: "#ffebee" },
    { label: "Purple 50", color: "#f3e5f5" },
    { label: "Indigo 50", color: "#e8eaf6" },
    { label: "Blue 50", color: "#e3f2fd" },
    { label: "Cyan 50", color: "#e0f7fa" },
    { label: "Teal 50", color: "#e0f2f1" },
    { label: "Light green 50", color: "#f1f8e9" },
    { label: "Lime 50", color: "#f9fbe7" },
    { label: "Amber 50", color: "#fff8e1" },
    { label: "Orange 50", color: "#fff3e0" },
    { label: "Grey 50", color: "#fafafa" },
    { label: "Blue grey 50", color: "#eceff1" },
    { label: "Red 100", color: "#ffcdd2" },
    { label: "Purple 100", color: "#e1bee7" },
    { label: "Indigo 100", color: "#c5cae9" },
    { label: "Blue 100", color: "#bbdefb" },
    { label: "Cyan 100", color: "#b2ebf2" },
    { label: "Teal 100", color: "#b2dfdb" },
    { label: "Light green 100", color: "#dcedc8" },
    { label: "Lime 100", color: "#f0f4c3" },
    { label: "Amber 100", color: "#ffecb3" },
    { label: "Orange 100", color: "#ffe0b2" },
    { label: "Grey 100", color: "#f5f5f5" },
    { label: "Blue grey 100", color: "#cfd8dc" },
    { label: "Red 200", color: "#ef9a9a" },
    { label: "Purple 200", color: "#ce93d8" },
    { label: "Indigo 200", color: "#9fa8da" },
    { label: "Blue 200", color: "#90caf9" },
    { label: "Cyan 200", color: "#80deea" },
    { label: "Teal 200", color: "#80cbc4" },
    { label: "Light green 200", color: "#c5e1a5" },
    { label: "Lime 200", color: "#e6ee9c" },
    { label: "Amber 200", color: "#ffe082" },
    { label: "Orange 200", color: "#ffcc80" },
    { label: "Grey 200", color: "#eeeeee" },
    { label: "Blue grey 200", color: "#b0bec5" },
    { label: "Red 300", color: "#e57373" },
    { label: "Purple 300", color: "#ba68c8" },
    { label: "Indigo 300", color: "#7986cb" },
    { label: "Blue 300", color: "#64b5f6" },
    { label: "Cyan 300", color: "#4dd0e1" },
    { label: "Teal 300", color: "#4db6ac" },
    { label: "Light green 300", color: "#aed581" },
    { label: "Lime 300", color: "#dce775" },
    { label: "Amber 300", color: "#ffd54f" },
    { label: "Orange 300", color: "#ffb74d" },
    { label: "Grey 300", color: "#e0e0e0" },
    { label: "Blue grey 300", color: "#90a4ae" },
    { label: "Red 400", color: "#ef5350" },
    { label: "Purple 400", color: "#ab47bc" },
    { label: "Indigo 400", color: "#5c6bc0" },
    { label: "Blue 400", color: "#42a5f5" },
    { label: "Cyan 400", color: "#26c6da" },
    { label: "Teal 400", color: "#26a69a" },
    { label: "Light green 400", color: "#9ccc65" },
    { label: "Lime 400", color: "#d4e157" },
    { label: "Amber 400", color: "#ffca28" },
    { label: "Orange 400", color: "#ffa726" },
    { label: "Grey 400", color: "#bdbdbd" },
    { label: "Blue grey 400", color: "#78909c" },
    { label: "Red 500", color: "#f44336" },
    { label: "Purple 500", color: "#9c27b0" },
    { label: "Indigo 500", color: "#3f51b5" },
    { label: "Blue 500", color: "#2196f3" },
    { label: "Cyan 500", color: "#00bcd4" },
    { label: "Teal 500", color: "#009688" },
    { label: "Light green 500", color: "#8bc34a" },
    { label: "Lime 500", color: "#cddc39" },
    { label: "Amber 500", color: "#ffc107" },
    { label: "Orange 500", color: "#ff9800" },
    { label: "Grey 500", color: "#9e9e9e" },
    { label: "Blue grey 500", color: "#607d8b" },
    { label: "Red 600", color: "#e53935" },
    { label: "Purple 600", color: "#8e24aa" },
    { label: "Indigo 600", color: "#3949ab" },
    { label: "Blue 600", color: "#1e88e5" },
    { label: "Cyan 600", color: "#00acc1" },
    { label: "Teal 600", color: "#00897b" },
    { label: "Light green 600", color: "#7cb342" },
    { label: "Lime 600", color: "#c0ca33" },
    { label: "Amber 600", color: "#ffb300" },
    { label: "Orange 600", color: "#fb8c00" },
    { label: "Grey 600", color: "#757575" },
    { label: "Blue grey 600", color: "#546e7a" },
    { label: "Red 700", color: "#d32f2f" },
    { label: "Purple 700", color: "#7b1fa2" },
    { label: "Indigo 700", color: "#303f9f" },
    { label: "Blue 700", color: "#1976d2" },
    { label: "Cyan 700", color: "#0097a7" },
    { label: "Teal 700", color: "#00796b" },
    { label: "Light green 700", color: "#689f38" },
    { label: "Lime 700", color: "#afb42b" },
    { label: "Amber 700", color: "#ffa000" },
    { label: "Orange 700", color: "#f57c00" },
    { label: "Grey 700", color: "#616161" },
    { label: "Blue grey 700", color: "#455a64" },
    { label: "Red 800", color: "#c62828" },
    { label: "Purple 800", color: "#6a1b9a" },
    { label: "Indigo 800", color: "#283593" },
    { label: "Blue 800", color: "#1565c0" },
    { label: "Cyan 800", color: "#00838f" },
    { label: "Teal 800", color: "#00695c" },
    { label: "Light green 800", color: "#558b2f" },
    { label: "Lime 800", color: "#9e9d24" },
    { label: "Amber 800", color: "#ff8f00" },
    { label: "Orange 800", color: "#ef6c00" },
    { label: "Grey 800", color: "#424242" },
    { label: "Blue grey 800", color: "#37474f" },
    { label: "Red 900", color: "#b71c1c" },
    { label: "Purple 900", color: "#4a148c" },
    { label: "Indigo 900", color: "#1a237e" },
    { label: "Blue 900", color: "#0d47a1" },
    { label: "Cyan 900", color: "#006064" },
    { label: "Teal 900", color: "#004d40" },
    { label: "Light green 900", color: "#33691e" },
    { label: "Lime 900", color: "#827717" },
    { label: "Amber 900", color: "#ff6f00" },
    { label: "Orange 900", color: "#e65100" },
    { label: "Grey 900", color: "#212121" },
    { label: "Blue grey 900", color: "#263238" },
  ];

  return (
    <div
      className={`page-wrapper chiller-theme ${
        sidebarToggled ? "toggled" : ""
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
      {/* <Header toggleSidebar={toggleSidebar} /> */}
      {/* <div className="app-main"> */}
      <SidebarPantiAdmin toggleSidebar={toggleSidebar} />
      <div className="page-content1" style={{ marginTop: "10px" }}>
        <div
          className="container mt-3 mb-3 app-main__outer"
          data-aos="fade-left"
        >
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow">
                  <div className="card-body">
                    <h1 className="fs-4">Form Tambah Data</h1>
                    <hr />
                    <form onSubmit={add}>
                      <div className="row">
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Gambar
                          </label>
                          <input
                            onChange={(e) =>
                              setImage(
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                            type="file"
                            required
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Visi
                          </label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={visi} // Gunakan 'data' untuk set initial value
                            onChange={(event, editor) => {
                              const data = editor.getData(); // Ambil data dari editor
                              setVisi(data); // Set state dengan data dari editor
                            }}
                            config={{
                              toolbar: [
                                "alignment",
                                "|",
                                "undo",
                                "redo",
                                "|",
                                "importWord",
                                "exportWord",
                                "exportPdf",
                                "|",
                                "formatPainter",
                                "caseChange",
                                "findAndReplace",
                                "selectAll",
                                "wproofreader",
                                "|",
                                "insertTemplate",
                                "tableOfContents",
                                "|",
                                "link",
                                "blockQuote",
                                "codeBlock",
                                "horizontalLine",
                                "specialCharacters",
                                "-",
                                "heading",
                                "style",
                                "|",
                                "bold",
                                "italic",
                                "underline",
                                "strikethrough",
                                {
                                  label: "Basic styles",
                                  icon: "text",
                                  items: [
                                    "fontSize",
                                    "fontFamily",
                                    "fontColor",
                                    "fontBackgroundColor",
                                    "highlight",
                                    "superscript",
                                    "subscript",
                                    "code",
                                    "|",
                                    "textPartLanguage",
                                    "|",
                                  ],
                                },
                                "removeFormat",
                                "|",
                                "bulletedList",
                                "numberedList",
                                "multilevelList",
                                "todoList",
                                "|",
                                "outdent",
                                "indent",
                              ],
                              alignment: {
                                options: ["left", "right", "center", "justify"],
                              },
                              plugins: [
                                GeneralHtmlSupport,
                                Bold,
                                Alignment,
                                Essentials,
                                Heading,
                                Indent,
                                IndentBlock,
                                Italic,
                                Link,
                                List,
                                Paragraph,
                                Undo,
                                Base64UploadAdapter,
                                Indent,
                                IndentBlock,
                                Italic,
                                Link,
                                List,
                                ListProperties,
                                Mention,
                                RemoveFormat,
                                SpecialCharacters,
                                SpecialCharactersEssentials,
                                Strikethrough,
                                Style,
                                Subscript,
                                Superscript,
                                TextPartLanguage,
                                TextTransformation,
                                TodoList,
                                Underline,
                                WordCount,
                              ],
                              fontFamily: { supportAllValues: true },
                              fontSize: {
                                options: [10, 12, 14, "default", 18, 20, 22],
                                supportAllValues: true,
                              },
                              fontColor: {
                                columns: 12,
                                colors: REDUCED_MATERIAL_COLORS,
                              },
                              fontBackgroundColor: {
                                columns: 12,
                                colors: REDUCED_MATERIAL_COLORS,
                              },
                              heading: {
                                options: [
                                  {
                                    model: "paragraph",
                                    title: "Paragraph",
                                    class: "ck-heading_paragraph",
                                  },
                                  {
                                    model: "heading1",
                                    view: "h1",
                                    title: "Heading 1",
                                    class: "ck-heading_heading1",
                                  },
                                  {
                                    model: "heading2",
                                    view: "h2",
                                    title: "Heading 2",
                                    class: "ck-heading_heading2",
                                  },
                                  {
                                    model: "heading3",
                                    view: "h3",
                                    title: "Heading 3",
                                    class: "ck-heading_heading3",
                                  },
                                  {
                                    model: "heading4",
                                    view: "h4",
                                    title: "Heading 4",
                                    class: "ck-heading_heading4",
                                  },
                                  {
                                    model: "heading5",
                                    view: "h5",
                                    title: "Heading 5",
                                    class: "ck-heading_heading5",
                                  },
                                  {
                                    model: "heading6",
                                    view: "h6",
                                    title: "Heading 6",
                                    class: "ck-heading_heading6",
                                  },
                                ],
                              },
                            }}
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Misi
                          </label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={misi} // Gunakan 'data' untuk set initial value
                            onChange={(event, editor) => {
                              const data = editor.getData(); // Ambil data dari editor
                              setMisi(data); // Set state dengan data dari editor
                            }}
                            config={{
                              toolbar: [
                                "alignment",
                                "|",
                                "undo",
                                "redo",
                                "|",
                                "importWord",
                                "exportWord",
                                "exportPdf",
                                "|",
                                "formatPainter",
                                "caseChange",
                                "findAndReplace",
                                "selectAll",
                                "wproofreader",
                                "|",
                                "insertTemplate",
                                "tableOfContents",
                                "|",
                                "link",
                                "blockQuote",
                                "codeBlock",
                                "horizontalLine",
                                "specialCharacters",
                                "-",
                                "heading",
                                "style",
                                "|",
                                "bold",
                                "italic",
                                "underline",
                                "strikethrough",
                                {
                                  label: "Basic styles",
                                  icon: "text",
                                  items: [
                                    "fontSize",
                                    "fontFamily",
                                    "fontColor",
                                    "fontBackgroundColor",
                                    "highlight",
                                    "superscript",
                                    "subscript",
                                    "code",
                                    "|",
                                    "textPartLanguage",
                                    "|",
                                  ],
                                },
                                "removeFormat",
                                "|",
                                "bulletedList",
                                "numberedList",
                                "multilevelList",
                                "todoList",
                                "|",
                                "outdent",
                                "indent",
                              ],
                              alignment: {
                                options: ["left", "right", "center", "justify"],
                              },
                              plugins: [
                                GeneralHtmlSupport,
                                Bold,
                                Alignment,
                                Essentials,
                                Heading,
                                Indent,
                                IndentBlock,
                                Italic,
                                Link,
                                List,
                                Paragraph,
                                Undo,
                                Base64UploadAdapter,
                                Indent,
                                IndentBlock,
                                Italic,
                                Link,
                                List,
                                ListProperties,
                                Mention,
                                RemoveFormat,
                                SpecialCharacters,
                                SpecialCharactersEssentials,
                                Strikethrough,
                                Style,
                                Subscript,
                                Superscript,
                                TextPartLanguage,
                                TextTransformation,
                                TodoList,
                                Underline,
                                WordCount,
                              ],
                              fontFamily: { supportAllValues: true },
                              fontSize: {
                                options: [10, 12, 14, "default", 18, 20, 22],
                                supportAllValues: true,
                              },
                              fontColor: {
                                columns: 12,
                                colors: REDUCED_MATERIAL_COLORS,
                              },
                              fontBackgroundColor: {
                                columns: 12,
                                colors: REDUCED_MATERIAL_COLORS,
                              },
                              heading: {
                                options: [
                                  {
                                    model: "paragraph",
                                    title: "Paragraph",
                                    class: "ck-heading_paragraph",
                                  },
                                  {
                                    model: "heading1",
                                    view: "h1",
                                    title: "Heading 1",
                                    class: "ck-heading_heading1",
                                  },
                                  {
                                    model: "heading2",
                                    view: "h2",
                                    title: "Heading 2",
                                    class: "ck-heading_heading2",
                                  },
                                  {
                                    model: "heading3",
                                    view: "h3",
                                    title: "Heading 3",
                                    class: "ck-heading_heading3",
                                  },
                                  {
                                    model: "heading4",
                                    view: "h4",
                                    title: "Heading 4",
                                    class: "ck-heading_heading4",
                                  },
                                  {
                                    model: "heading5",
                                    view: "h5",
                                    title: "Heading 5",
                                    class: "ck-heading_heading5",
                                  },
                                  {
                                    model: "heading6",
                                    view: "h6",
                                    title: "Heading 6",
                                    class: "ck-heading_heading6",
                                  },
                                ],
                              },
                            }}
                          />
                        </div>
                        <div className="mb-3 col-lg-12">
                          <label className="form-label font-weight-bold">
                            Motto
                          </label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={tujuan} // Gunakan 'data' untuk set initial value
                            onChange={(event, editor) => {
                              const data = editor.getData(); // Ambil data dari editor
                              setTujuan(data); // Set state dengan data dari editor
                            }}
                            config={{
                              toolbar: [
                                "alignment",
                                "|",
                                "undo",
                                "redo",
                                "|",
                                "importWord",
                                "exportWord",
                                "exportPdf",
                                "|",
                                "formatPainter",
                                "caseChange",
                                "findAndReplace",
                                "selectAll",
                                "wproofreader",
                                "|",
                                "insertTemplate",
                                "tableOfContents",
                                "|",
                                "link",
                                "blockQuote",
                                "codeBlock",
                                "horizontalLine",
                                "specialCharacters",
                                "-",
                                "heading",
                                "style",
                                "|",
                                "bold",
                                "italic",
                                "underline",
                                "strikethrough",
                                {
                                  label: "Basic styles",
                                  icon: "text",
                                  items: [
                                    "fontSize",
                                    "fontFamily",
                                    "fontColor",
                                    "fontBackgroundColor",
                                    "highlight",
                                    "superscript",
                                    "subscript",
                                    "code",
                                    "|",
                                    "textPartLanguage",
                                    "|",
                                  ],
                                },
                                "removeFormat",
                                "|",
                                "bulletedList",
                                "numberedList",
                                "multilevelList",
                                "todoList",
                                "|",
                                "outdent",
                                "indent",
                              ],
                              alignment: {
                                options: ["left", "right", "center", "justify"],
                              },
                              plugins: [
                                GeneralHtmlSupport,
                                Bold,
                                Alignment,
                                Essentials,
                                Heading,
                                Indent,
                                IndentBlock,
                                Italic,
                                Link,
                                List,
                                Paragraph,
                                Undo,
                                Base64UploadAdapter,
                                Indent,
                                IndentBlock,
                                Italic,
                                Link,
                                List,
                                ListProperties,
                                Mention,
                                RemoveFormat,
                                SpecialCharacters,
                                SpecialCharactersEssentials,
                                Strikethrough,
                                Style,
                                Subscript,
                                Superscript,
                                TextPartLanguage,
                                TextTransformation,
                                TodoList,
                                Underline,
                                WordCount,
                              ],
                              fontFamily: { supportAllValues: true },
                              fontSize: {
                                options: [10, 12, 14, "default", 18, 20, 22],
                                supportAllValues: true,
                              },
                              fontColor: {
                                columns: 12,
                                colors: REDUCED_MATERIAL_COLORS,
                              },
                              fontBackgroundColor: {
                                columns: 12,
                                colors: REDUCED_MATERIAL_COLORS,
                              },
                              heading: {
                                options: [
                                  {
                                    model: "paragraph",
                                    title: "Paragraph",
                                    class: "ck-heading_paragraph",
                                  },
                                  {
                                    model: "heading1",
                                    view: "h1",
                                    title: "Heading 1",
                                    class: "ck-heading_heading1",
                                  },
                                  {
                                    model: "heading2",
                                    view: "h2",
                                    title: "Heading 2",
                                    class: "ck-heading_heading2",
                                  },
                                  {
                                    model: "heading3",
                                    view: "h3",
                                    title: "Heading 3",
                                    class: "ck-heading_heading3",
                                  },
                                  {
                                    model: "heading4",
                                    view: "h4",
                                    title: "Heading 4",
                                    class: "ck-heading_heading4",
                                  },
                                  {
                                    model: "heading5",
                                    view: "h5",
                                    title: "Heading 5",
                                    class: "ck-heading_heading5",
                                  },
                                  {
                                    model: "heading6",
                                    view: "h6",
                                    title: "Heading 6",
                                    class: "ck-heading_heading6",
                                  },
                                ],
                              },
                            }}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label font-weight-bold">
                            Upload Gambar
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                      <button type="button" className="btn-danger mt-3 mr-3">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          href="/admin_visimisi"
                        >
                          Batal
                        </a>
                      </button>
                      <button
                        type="submit"
                        className="btn-primary mt-3"
                        disabled={isLoading}
                      >
                        {isLoading ? <span className="loader"></span> : "Kirim"}
                      </button>
                    </form>
                  </div>
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

export default AddVisiMisiPanti;
