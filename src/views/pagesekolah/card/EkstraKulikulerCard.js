import React from "react";

const cardStyle = (backgroundColor) => ({
    backgroundColor,
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    overflow: "hidden",
    height: "150px",
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    position: "relative",
});


const EkstraKulikulerCard = ({ title, id, backgroundColor }) => {
    const href = `/detail-ekstrakurikuler/${id}`;
    return (
        <div style={cardStyle(backgroundColor)}>
            <div className="card-ekstrakurikuler">
                <i class="fas fa-star icon-ekstrakurikuler"></i>
                <h4>
                    <a href={href} style={{ color: "white", fontWeight: "600",textDecoration: "none" }}>{title}</a>
                </h4>
            </div>
        </div>
    );
};

export default EkstraKulikulerCard;
