import React, { useState, useEffect } from 'react';
import './DoctorForm.css';

const DoctorForm = ({ onDoctorAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        contact: '',
        email: '',
        schedule: '',
        department_id: '',
    });
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/infrastructure/departments');
            if (response.ok) {
                const data = await response.json();
                setDepartments(data);
            }
        } catch (err) {
            console.error('Error fetching departments:', err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/doctors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newDoctor = await response.json();
                setMessage('Doctor registered successfully!');
                setFormData({
                    name: '',
                    specialization: '',
                    contact: '',
                    email: '',
                    schedule: '',
                    department_id: '',
                });
                if (onDoctorAdded) onDoctorAdded(newDoctor);
            } else {
                const errorData = await response.json();
                setMessage(`Failed to register doctor: ${errorData.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error(err);
            setMessage('Error connecting to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="doctor-form-container">
            <h3>Register New Doctor</h3>
            {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
            <form onSubmit={handleSubmit} className="doctor-form">
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Specialization</label>
                        <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Department</label>
                        <select name="department_id" value={formData.department_id} onChange={handleChange}>
                            <option value="">Select Department (Optional)</option>
                            {departments.map(dept => (
                                <option key={dept.id} value={dept.id}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Contact Number</label>
                        <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Schedule</label>
                    <input type="text" name="schedule" value={formData.schedule} onChange={handleChange} placeholder="e.g., Mon-Fri 9am-5pm" />
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Registering...' : 'Register Doctor'}
                </button>
            </form>
        </div>
    );
};

export default DoctorForm;
