import React, { useEffect, useState } from 'react';
import './StaffList.css';

const StaffList = () => {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/staff');
            const data = await response.json();
            setStaff(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching staff:', err);
            setLoading(false);
        }
    };

    const filteredStaff = staff.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="loading">Loading staff...</div>;

    return (
        <div className="staff-list-container">
            <div className="list-header">
                <h3>Staff Database</h3>
                <input
                    type="text"
                    placeholder="Search by name or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="table-wrapper">
                <table className="staff-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaff.length > 0 ? (
                            filteredStaff.map((member) => (
                                <tr key={member.id}>
                                    <td>#{member.id}</td>
                                    <td>{member.name}</td>
                                    <td>{member.role}</td>
                                    <td>{member.contact}</td>
                                    <td>{member.email}</td>
                                    <td>{member.department_name || '-'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-data">No staff members found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaffList;
