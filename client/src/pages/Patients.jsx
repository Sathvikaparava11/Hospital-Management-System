import React, { useState } from 'react';
import PatientForm from '../components/patients/PatientForm';
import PatientList from '../components/patients/PatientList';
import './Patients.css';

const Patients = () => {
    const [activeTab, setActiveTab] = useState('view');

    return (
        <div className="patients-page">
            <div className="page-header">
                <h2>Patient Management</h2>
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
                        Register Patient
                    </button>
                </div>
            </div>

            <div className="tab-content">
                {activeTab === 'view' ? (
                    <PatientList />
                ) : (
                    <PatientForm onPatientAdded={() => setActiveTab('view')} />
                )}
            </div>
        </div>
    );
};

export default Patients;
