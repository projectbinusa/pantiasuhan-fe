import React, { useState } from "react";
import "../../../css/prestasi/card.css"

const imageStyle = {
  width: "100%",
  height: "250px",
  objectFit: "cover",
  marginRight: "20px",
};

const contentStyle = {
  flex: 1,
};

const dateStyle = {
  fontSize: "16px",
  color: "#777",
  marginBottom: "10px",
};

const separatorStyle = {
  border: "none",
  borderTop: "2px solid black",
  margin: "10px 0",
};

const detailsStyle = {
  fontSize: "18px",
  color: "#555",
  marginBottom: "10px",
};

const participantStyle = {
  fontSize: "1.1em",
  color: "#333",
  marginTop: "10px",
  display: "flex",
  alignItems: "center",
  fontWeight: "600"
};

const descriptionStyle = {
  fontSize: "16px",
  color: "#333",
  marginTop: "10px",
  lineHeight: "1.5",
};

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-user"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PrestasiCard = ({
  image,
  title,
  content,
  date,
  participant,
  description,
  id,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const titleStyle = {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: isHovered ? "#00f" : "#333",
    cursor: "pointer",
    transition: "color 0.3s ease",
  };

  const formatDate = (value) => {
    const date = new Date(value);
  
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    const formattedDate = `${day} ${month} ${year}`;
  
    return formattedDate;
  };  

  return (
    <div className="card-style">
      <img src={image} alt={title} style={imageStyle} />
      <div style={contentStyle}>
        <a
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          href={`/detail-prestasi-${id}`}
          style={{ textDecoration: "none" }}
        >
          <div style={titleStyle}>{title}</div>
        </a>
        <div style={dateStyle}>{date}</div>
        <hr style={separatorStyle} />
        <div style={detailsStyle}>Skala {content}</div>
        <div style={participantStyle}>
          <UserIcon style={{ marginRight: "10px" }} />
          <span>
            <strong style={{paddingLeft: "0.2rem"}}>:</strong> {participant}
          </span>
        </div>
        {description && <div style={descriptionStyle}>Penyelenggara {description}</div>}
      </div>
    </div>
  );
};

export default PrestasiCard;
