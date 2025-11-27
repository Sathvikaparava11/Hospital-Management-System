import React, { useState } from 'react';
import StaffForm from '../components/staff/StaffForm';
import StaffList from '../components/staff/StaffList';
import './Staff.css';

const Staff = () => {
    const [activeTab, setActiveTab] = useState('view');

    return (
        <div className="staff-page">
            <div className="page-header">
                <h2>Staff Management</h2>
                <div className="tabs">
                    <button
                        className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`}
                        onClick={() => setActiveTab('view')}
                    >
                        View Database
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => setActiveTab('register')}
                    >
                        Register Staff
                    </button>
                </div>
            </div>

            <div className="tab-content">
                {activeTab === 'view' ? (
                    <StaffList />
                ) : (
                    <StaffForm onStaffAdded={() => setActiveTab('view')} />
                )}
            </div>
        </div>
    );
};

export default Staff;
