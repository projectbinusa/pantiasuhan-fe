import React from 'react';

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: 'block',
      background: '#003366',
      color: '#fff',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      textAlign: 'center',
      lineHeight: '30px',
      fontSize: '18px',
      cursor: 'pointer',
      position: 'absolute',
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%)',
    }}
  >
    &gt;
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: 'block',
      background: '#003366',
      color: '#fff',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      textAlign: 'center',
      lineHeight: '30px',
      fontSize: '18px',
      cursor: 'pointer',
      position: 'absolute',
      top: '50%',
      left: '10px',
      transform: 'translateY(-50%)',
    }}
  >
    &lt;
  </div>
);

export { NextArrow, PrevArrow };
