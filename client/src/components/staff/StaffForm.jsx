import React, { useState, useEffect } from 'react';
import './StaffForm.css';

const StaffForm = ({ onStaffAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        contact: '',
        email: '',
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
            const response = await fetch('http://localhost:5000/api/staff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newStaff = await response.json();
                setMessage('Staff member registered successfully!');
                setFormData({
                    name: '',
                    role: '',
                    contact: '',
                    email: '',
                    department_id: '',
                });
                if (onStaffAdded) onStaffAdded(newStaff);
            } else {
                const errorData = await response.json();
                setMessage(`Failed to register staff member: ${errorData.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error(err);
            setMessage('Error connecting to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="staff-form-container">
            <h3>Register New Staff Member</h3>
            {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
            <form onSubmit={handleSubmit} className="staff-form">
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Role</label>
                        <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="e.g., Nurse, Receptionist" required />
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
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Registering...' : 'Register Staff'}
                </button>
            </form>
        </div>
    );
};

export default StaffForm;
