import React, { useState } from 'react';
import "../../../../css/galery/gallery.css"; // Add your custom CSS for styling

const ImageCard = ({ image, title, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="image-card" onClick={openModal}>
        <img src={image} alt={title} />
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={image} alt={title} className="modal-image" />
            <h4 style={{textTransform: "uppercase"}}>{title}</h4>
            <p style={{color: "#002147", fontSize: "14px"}}>{content}</p>
              <button onClick={closeModal} className="close-button">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCard;