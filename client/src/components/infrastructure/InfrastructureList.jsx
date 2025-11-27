import React, { useEffect, useState } from 'react';
import './InfrastructureList.css';

const InfrastructureList = () => {
    const [departments, setDepartments] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [deptRes, roomRes] = await Promise.all([
                fetch('http://localhost:5000/api/infrastructure/departments'),
                fetch('http://localhost:5000/api/infrastructure/rooms')
            ]);

            const deptData = await deptRes.json();
            const roomData = await roomRes.json();

            setDepartments(deptData);
            setRooms(roomData);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching infrastructure data:', err);
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading infrastructure data...</div>;

    return (
        <div className="infra-list-container">
            <div className="infra-section">
                <h3>Departments</h3>
                <div className="table-wrapper">
                    <table className="infra-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Head Doctor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.length > 0 ? (
                                departments.map((dept) => (
                                    <tr key={dept.id}>
                                        <td>#{dept.id}</td>
                                        <td>{dept.name}</td>
                                        <td>{dept.head_doctor_name || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="3" className="no-data">No departments found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="infra-section">
                <h3>Rooms</h3>
                <div className="table-wrapper">
                    <table className="infra-table">
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.length > 0 ? (
                                rooms.map((room) => (
                                    <tr key={room.id}>
                                        <td>{room.number}</td>
                                        <td>{room.type}</td>
                                        <td>
                                            <span className={`status-badge ${room.status.toLowerCase()}`}>
                                                {room.status}
                                            </span>
                                        </td>
                                        <td>{room.department_name || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" className="no-data">No rooms found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InfrastructureList;
