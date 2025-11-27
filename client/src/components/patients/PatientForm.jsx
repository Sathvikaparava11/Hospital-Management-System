import React, { useState } from 'react';
import './PatientForm.css';

const PatientForm = ({ onPatientAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'Male',
        contact: '',
        address: '',
        medical_history: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newPatient = await response.json();
                setMessage('Patient registered successfully!');
                setFormData({
                    name: '',
                    age: '',
                    gender: 'Male',
                    contact: '',
                    address: '',
                    medical_history: '',
                });
                if (onPatientAdded) onPatientAdded(newPatient);
            } else {
                setMessage('Failed to register patient.');
            }
        } catch (err) {
            console.error(err);
            setMessage('Error connecting to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="patient-form-container">
            <h3>Register New Patient</h3>
            {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
            <form onSubmit={handleSubmit} className="patient-form">
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>Contact Number</label>
                    <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label>Medical History</label>
                    <textarea name="medical_history" value={formData.medical_history} onChange={handleChange} rows="4"></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Registering...' : 'Register Patient'}
                </button>
            </form>
        </div>
    );
};

export default PatientForm;
