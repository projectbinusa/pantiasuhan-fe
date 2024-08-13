import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const cardStyle = {
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  overflow: "hidden",
  position: "relative",
  transition: "transform 0.3s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
  },
};

const mediaContainerStyle = {
  position: "relative",
  overflow: "hidden",
  height: "300px",
  transition: "transform 0.3s ease-in-out",
};

const mediaStyle = (isHovered) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease-in-out",
  transform: isHovered ? "scale(1.1)" : "scale(1)",
});

const titleStyle = {
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: "10px",
};

const contentStyle = {
  textAlign: "left",
};

const dateContainerStyle = {
  position: "absolute",
  bottom: "10px",
  left: "10px",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  color: "white",
  padding: "20px 15px",
  borderRadius: "5px",
  zIndex: 2,
  textAlign: "center",
};

const dateNumberStyle = {
  fontSize: "30px",
  fontWeight: "bold",
  lineHeight: "18px",
  textAlign: "left",
  marginBottom: "10px",
};

const dateTextStyle = {
  fontSize: "15px",
  lineHeight: "12px",
};

const NewsCard = ({ image, title, content, date }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [day, month, year] = date.split(" ");

  return (
    <Card
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={mediaContainerStyle} className="news-card-media-container">
        <CardMedia
          component="img"
          alt={title}
          image={image}
          style={mediaStyle(isHovered)}
          className="news-card-image"
        />
        {date && (
          <div style={dateContainerStyle}>
            <div style={dateNumberStyle}>{day}</div>
            <div style={dateTextStyle}>{month} {year}</div>
          </div>
        )}
      </div>
      <CardContent>
        <Typography variant="h6" component="div" style={titleStyle}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" style={contentStyle}>
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
