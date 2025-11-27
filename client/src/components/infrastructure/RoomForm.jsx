import React, { useState } from 'react';
import { API_URL } from '../../config';
import './InfrastructureForm.css';

const RoomForm = ({ onRoomAdded }) => {
    const [formData, setFormData] = useState({
        number: '',
        type: 'General',
        status: 'Available',
        department_id: '',
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
            const response = await fetch(`${API_URL}/infrastructure/rooms`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newRoom = await response.json();
                setMessage('Room added successfully!');
                setFormData({
                    number: '',
                    type: 'General',
                    status: 'Available',
                    department_id: '',
                });
                if (onRoomAdded) onRoomAdded(newRoom);
            } else {
                setMessage('Failed to add room.');
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
            <h3>Add New Room</h3>
            {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
            <form onSubmit={handleSubmit} className="infra-form">
                <div className="form-group">
                    <label>Room Number</label>
                    <input type="text" name="number" value={formData.number} onChange={handleChange} required />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Type</label>
                        <select name="type" value={formData.type} onChange={handleChange}>
                            <option value="General">General</option>
                            <option value="ICU">ICU</option>
                            <option value="Private">Private</option>
                            <option value="OT">Operation Theater</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="Available">Available</option>
                            <option value="Occupied">Occupied</option>
                            <option value="Maintenance">Maintenance</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>Department ID (Optional)</label>
                    <input type="number" name="department_id" value={formData.department_id} onChange={handleChange} />
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Room'}
                </button>
            </form>
        </div>
    );
};

export default RoomForm;
