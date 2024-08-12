import React from 'react';

const cardStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
  margin: '0 0 8px',
  fontSize: '18px',
};

const contentStyle = {
  fontSize: '16px',
};

function Card({ title, content }) {
  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>{title}</h2>
      <p style={contentStyle}>{content}</p>
    </div>
  );
}

export default Card;
