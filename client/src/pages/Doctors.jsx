import React, { useState } from 'react';
import DoctorForm from '../components/doctors/DoctorForm';
import DoctorList from '../components/doctors/DoctorList';
import './Doctors.css';

const Doctors = () => {
    const [activeTab, setActiveTab] = useState('view');

    return (
        <div className="doctors-page">
            <div className="page-header">
                <h2>Doctor Management</h2>
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
                        Register Doctor
                    </button>
                </div>
            </div>

            <div className="tab-content">
                {activeTab === 'view' ? (
                    <DoctorList />
                ) : (
                    <DoctorForm onDoctorAdded={() => setActiveTab('view')} />
                )}
            </div>
        </div>
    );
};

export default Doctors;
