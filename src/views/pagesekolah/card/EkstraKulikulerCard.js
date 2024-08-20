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
    padding: "10px 20px",
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


const EkstraKulikulerCard = ({ title, backgroundColor }) => {
    return (
        <div style={cardStyle(backgroundColor)}>
            <div className="card-ekstrakurikuler">
                <i class="fas fa-star icon-ekstrakurikuler"></i>
                <h4 style={{color: "white", fontWeight: "600"}}>{title}</h4>
            </div>
        </div>
    );
};

export default EkstraKulikulerCard;
