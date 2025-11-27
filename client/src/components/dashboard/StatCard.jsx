import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className="stat-card" style={{ borderLeftColor: color }}>
            <div className="stat-icon" style={{ color: color, backgroundColor: `${color}20` }}>
                {icon}
            </div>
            <div className="stat-info">
                <h3 className="stat-value">{value}</h3>
                <p className="stat-title">{title}</p>
            </div>
        </div>
    );
};

export default StatCard;
