import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import './DoctorList.css';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch(`${API_URL}/doctors`);
            const data = await response.json();
            setDoctors(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching doctors:', err);
            setLoading(false);
        }
    };

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="loading">Loading doctors...</div>;

    return (
        <div className="doctor-list-container">
            <div className="list-header">
                <h3>Doctor Database</h3>
                <input
                    type="text"
                    placeholder="Search by name or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="table-wrapper">
                <table className="doctor-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Specialization</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Schedule</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor) => (
                                <tr key={doctor.id}>
                                    <td>#{doctor.id}</td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.specialization}</td>
                                    <td>{doctor.contact}</td>
                                    <td>{doctor.email}</td>
                                    <td className="truncate" title={doctor.schedule}>{doctor.schedule}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-data">No doctors found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorList;
