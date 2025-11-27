import React, { useState } from 'react';
import './InfrastructureForm.css';

const DepartmentForm = ({ onDepartmentAdded }) => {
    const [name, setName] = useState('');
    const [headDoctorId, setHeadDoctorId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/infrastructure/departments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, head_doctor_id: headDoctorId }),
            });

            if (response.ok) {
                const newDept = await response.json();
                setMessage('Department added successfully!');
                setName('');
                setHeadDoctorId('');
                if (onDepartmentAdded) onDepartmentAdded(newDept);
            } else {
                setMessage('Failed to add department.');
            }
        } catch (err) {
            console.error(err);
            setMessage('Error connecting to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="infra-form-container">
            <h3>Add New Department</h3>
            {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
            <form onSubmit={handleSubmit} className="infra-form">
                <div className="form-group">
                    <label>Department Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Head Doctor ID (Optional)</label>
                    <input type="number" value={headDoctorId} onChange={(e) => setHeadDoctorId(e.target.value)} />
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Department'}
                </button>
            </form>
        </div>
    );
};

export default DepartmentForm;
