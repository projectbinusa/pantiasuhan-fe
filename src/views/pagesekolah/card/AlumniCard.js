import React, { useState } from "react";
import "../../../css/alumni/alumni.css"

const AlumniCard = ({ image, title, description, id }) => {
  const [hover, setHover] = useState(false);

  const cardContainerStyle = {
    padding: "0 15px",
    boxSizing: "border-box",
  };

  const imageWrapperStyle = {
    overflow: "hidden",
    height: "250px",
    marginRight: "20px",
    borderRadius: "10px",
  };

  const imageStyle = {
    borderRadius: "10px",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
  };

  const textStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "100%",
  };

  const titleStyle = {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "10px",
    color: hover ? "#FFCC00" : "#000000",
    fontFamily: "'Poppins', sans-serif",
    textDecoration: "none",
    fontSize: "1.3rem"
  };


  const descriptionStyle = {
    color: "#666",
    fontSize: "18px",
  };

  return (
    <div style={cardContainerStyle}>
      <div className="alumni-card">
        <div style={imageWrapperStyle}>
          <img src={image} alt={title} style={imageStyle} />
        </div>
        <div style={textStyle}>
          <div style={titleStyle}><a href={`/detail-alumni-${id}`} onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={titleStyle}>{title}</a></div>
          <div style={descriptionStyle}><p className="isi-alumni" style={{ fontSize: "14px" }}>{description}</p></div>
        </div>
      </div>
    </div>
  );
};

export default AlumniCard;
