import React from "react";

const AlumniCard = ({ image, title, description }) => {
  const cardContainerStyle = {
    padding: "0 15px",
    boxSizing: "border-box",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-start",
    padding: "30px",
    height: "300px",
  };

  const imageWrapperStyle = {
    overflow: "hidden",
    // width: "200px",
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
    fontSize: "24px",
    marginBottom: "10px",
    marginTop: "0",
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
          <div style={titleStyle}><a href="/" style={{ textDecoration: "none", fontWeight: "600", color: "#002147" }}>{title}</a></div>
          <div style={descriptionStyle}><p className="isi-alumni" style={{ fontSize: "14px" }}>{description}</p></div>
        </div>
      </div>
    </div>
  );
};

export default AlumniCard;
