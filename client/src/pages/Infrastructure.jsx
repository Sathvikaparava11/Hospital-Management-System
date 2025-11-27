import React, { useState } from 'react';
import DepartmentForm from '../components/infrastructure/DepartmentForm';
import RoomForm from '../components/infrastructure/RoomForm';
import InfrastructureList from '../components/infrastructure/InfrastructureList';
import './Infrastructure.css';

const Infrastructure = () => {
    const [activeTab, setActiveTab] = useState('view');

    return (
        <div className="infra-page">
            <div className="page-header">
                <h2>Infrastructure Management</h2>
                <div className="tabs">
                    <button
                        className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`}
                        onClick={() => setActiveTab('view')}
                    >
                        View Database
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'add-dept' ? 'active' : ''}`}
                        onClick={() => setActiveTab('add-dept')}
                    >
                        Add Department
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'add-room' ? 'active' : ''}`}
                        onClick={() => setActiveTab('add-room')}
                    >
                        Add Room
                    </button>
                </div>
            </div>

            <div className="tab-content">
                {activeTab === 'view' && <InfrastructureList />}
                {activeTab === 'add-dept' && <DepartmentForm onDepartmentAdded={() => setActiveTab('view')} />}
                {activeTab === 'add-room' && <RoomForm onRoomAdded={() => setActiveTab('view')} />}
            </div>
        </div>
    );
};

export default Infrastructure;
