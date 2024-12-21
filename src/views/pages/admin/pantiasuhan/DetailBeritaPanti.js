import React from "react";
import NavbarSekolah from "../../../../component/NavbarSekolah";
import FooterSekolah from "../../../../component/FooterSekolah";

function DetailBeritaPanti() {
  return (
    <div style={{ backgroundColor: "#f5f5f5", overflow: "hidden" }}>
      <NavbarSekolah />
      <div className="container" style={{minHeight: "100vh"}}>
        <br /> <br /> <br /> <br />
        <h2 className="titlepanti">Berita 1</h2>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "0.9rem",
            color: "#666",
            marginBottom: "15px",
          }}
        >
          <svg
            className="svg-inline--fa fa-user fa-w-14"
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="user"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            style={{
              widht: "16px",
              height: "16px",
              color: "#004080",
              marginRight: "5px",
            }}
          >
            <path
              fill="currentColor"
              d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
            ></path>
          </svg>
          Admin &nbsp;|&nbsp;
          <svg
            className="svg-inline--fa fa-calendar-alt fa-w-14"
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="calendar-alt"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            style={{
              widht: "16px",
              height: "16px",
              color: "#004080",
              marginRight: "5px",
            }}
          >
            <path
              fill="currentColor"
              d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"
            ></path>
          </svg>
          Sabtu, 14 Desember 2024
        </p>
        <br />
        <div></div>
      </div>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif
          }

          h2.titlepanti {
            color: #005b9f
          }
        `}
      </style>
      <FooterSekolah />
    </div>
  )
}

export default DetailBeritaPanti;