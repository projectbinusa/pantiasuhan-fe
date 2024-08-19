import React from "react";
import { Card, CardContent } from "@mui/material";

const cardStyle = (backgroundColor) => ({
    backgroundColor,
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    overflow: "hidden",
    height: "150px",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    position: "relative",
});

const iconStyle = {
    fontSize: "60px",
    color: "white",
    marginRight: "20px",
};

const contentStyle = {
    textAlign: "left",
    color: "white",
};

const titleStyle = {
    color: "white",
    fontWeight: "bold",
    marginBottom: "5px",
};

const contentTextStyle = {
    color: "white",
};

const iconMap = {
    Basket: (
        <svg style={iconStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M16 2h-1.6l-1.2-1.6h-6.4l-1.2 1.6h-1.6c-1.2 0-2.2 1-2.2 2.2v1.8h-1c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2h1v9.8c0 1.2 1 2.2 2.2 2.2h14.4c1.2 0 2.2-1 2.2-2.2v-9.8h1c1.2 0 2.2-1 2.2-2.2s-1-2.2-2.2-2.2h-1v-1.8c0-1.2-1-2.2-2.2-2.2zm-6.6 0h3.2l1.6 2h-6.4l1.6-2zm1.6 4.4h4.8v1.8h-4.8v-1.8zm-1.6 4h6.4v1.8h-6.4v-1.8zm-1.6 4h9.6v1.8h-9.6v-1.8z" />
        </svg>
    ),
    Paskibra: (
        <svg style={iconStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2l2.39 4.83 5.34.78-3.87 3.77.92 5.34-4.78-2.52-4.78 2.52.92-5.34-3.87-3.77 5.34-.78z" />
        </svg>
    ),
    Pramuka: (
        <svg style={iconStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2l2.39 4.83 5.34.78-3.87 3.77.92 5.34-4.78-2.52-4.78 2.52.92-5.34-3.87-3.77 5.34-.78z" />
        </svg>
    ),
    "Pencak Silat": (
        <svg style={iconStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2l2.39 4.83 5.34.78-3.87 3.77.92 5.34-4.78-2.52-4.78 2.52.92-5.34-3.87-3.77 5.34-.78z" />
        </svg>
    ),
    Karate: (
        <svg style={iconStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2l2.39 4.83 5.34.78-3.87 3.77.92 5.34-4.78-2.52-4.78 2.52.92-5.34-3.87-3.77 5.34-.78z" />
        </svg>
    ),
    Musik: (
        <svg style={iconStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2l2.39 4.83 5.34.78-3.87 3.77.92 5.34-4.78-2.52-4.78 2.52.92-5.34-3.87-3.77 5.34-.78z" />
        </svg>
    ),
    Tari: (
        <svg style={iconStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2l2.39 4.83 5.34.78-3.87 3.77.92 5.34-4.78-2.52-4.78 2.52.92-5.34-3.87-3.77 5.34-.78z" />
        </svg>
    ),
    Teater: (
        <svg style={iconStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2l2.39 4.83 5.34.78-3.87 3.77.92 5.34-4.78-2.52-4.78 2.52.92-5.34-3.87-3.77 5.34-.78z" />
        </svg>
    ),
};

const EkstraKulikulerCard = ({ title, content, backgroundColor }) => {
    return (
        <div style={cardStyle(backgroundColor)}>
            <div className="card-ekstrakulikuler">
                <i class="fas fa-star icon-ekstrakulikuler"></i>
                <h4>{title}</h4>
            </div>
        </div>
    );
};

export default EkstraKulikulerCard;
