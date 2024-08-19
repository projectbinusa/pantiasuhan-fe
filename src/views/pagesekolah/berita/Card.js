import React from 'react';

const Card = ({ image, title, content }) => {
  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.content}>{content}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    width: '800px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '350px',
    objectFit: "cover",
    borderRadius: '4px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '1.5em',
    margin: '8px 0',
    textAlign: 'center',
  },
  content: {
    fontSize: '1em',
    color: '#333',
    textAlign: 'center',
  },
};

export default Card;
