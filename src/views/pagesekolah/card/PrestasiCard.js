import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const cardStyle = {
  display: 'flex',
  textAlign: "left",
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const imageStyle = {
  width: '400px',
  height: '250px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginRight: '20px',
};

const contentStyle = {
  flex: 1,
};

const dateStyle = {
  fontSize: '16px',
  color: '#777',
  marginBottom: '10px',
};

const separatorStyle = {
  border: 'none',
  borderTop: '2px solid black',
  margin: '10px 0',
};

const detailsStyle = {
  fontSize: '18px',
  color: '#555',
  marginBottom: '10px',
};

const participantStyle = {
  fontSize: '20px',
  color: '#333',
  marginTop: '10px',
  display: 'flex',
  alignItems: 'center',
};

const descriptionStyle = {
  fontSize: '16px',
  color: '#333',
  marginTop: '10px',
  lineHeight: '1.5',
};

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
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

const PrestasiCard = ({ image, title, content, date, participant, description, id }) => {
  const [isHovered, setIsHovered] = useState(false);

  const titleStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: isHovered ? '#00f' : '#333', // Light blue on hover
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={image} alt={title} style={imageStyle} />
      <div style={contentStyle}>
        <a href={`/prestasi/${id}`} style={{ textDecoration: 'none' }}>
          <div style={titleStyle}>{title}</div>
        </a>
        <div style={dateStyle}>{date}</div>
        <hr style={separatorStyle} />
        <div style={detailsStyle}>
          {content}
        </div>
        <div style={participantStyle}>
          <UserIcon style={{ marginRight: '10px' }} />
          <span><strong>:</strong> {participant}</span>
        </div>
        {description && <div style={descriptionStyle}>{description}</div>}
      </div>
    </div>
  );
};

export default PrestasiCard;
