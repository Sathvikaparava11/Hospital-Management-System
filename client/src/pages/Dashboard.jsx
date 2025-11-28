import React, { useEffect, useState } from 'react';
import { FaUserMd, FaUsers, FaProcedures, FaBuilding } from 'react-icons/fa';
import StatCard from '../components/dashboard/StatCard';
import { API_URL } from '../config';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        patients: 0,
        doctors: 0,
        staff: 0,
        availableRooms: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/dashboard/stats`)
            .then((res) => res.json())
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching stats:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Dashboard Overview</h2>
                <p>Welcome back, Admin. Here's what's happening today.</p>
            </div>

            <div className="stats-grid">
                <StatCard
                    title="Total Patients"
                    value={stats.patients}
                    icon={<FaUsers />}
                    color="#2563eb"
                />
                <StatCard
                    title="Active Doctors"
                    value={stats.doctors}
                    icon={<FaUserMd />}
                    color="#10b981"
                />
                <StatCard
                    title="Staff Members"
                    value={stats.staff}
                    icon={<FaUsers />}
                    color="#f59e0b"
                />
                <StatCard
                    title="Available Rooms"
                    value={stats.availableRooms}
                    icon={<FaProcedures />}
                    color="#ef4444"
                />
            </div>

            <div className="dashboard-sections">
                ```javascript
                import React, {useEffect, useState} from 'react';
                import {FaUserMd, FaUsers, FaProcedures, FaBuilding} from 'react-icons/fa';
                import StatCard from '../components/dashboard/StatCard';
                import {API_URL} from '../config';
                import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
                    patients: 0,
                doctors: 0,
                staff: 0,
                availableRooms: 0,
    });
                const [loading, setLoading] = useState(true);

    useEffect(() => {
                    fetch(`${API_URL}/dashboard/stats`)
                        .then((res) => res.json())
                        .then((data) => {
                            setStats(data);
                            setLoading(false);
                        })
                        .catch((err) => {
                            console.error('Error fetching stats:', err);
                            setLoading(false);
                        });
    }, []);

                if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

                return (
                <div className="dashboard">
                    <div className="dashboard-header">
                        <h2>Dashboard Overview</h2>
                        <p>Welcome back, Admin. Here's what's happening today.</p>
                    </div>

                    <div className="stats-grid">
                        <StatCard
                            title="Total Patients"
                            value={stats.patients}
                            icon={<FaUsers />}
                            color="#2563eb"
                        />
                        <StatCard
                            title="Active Doctors"
                            value={stats.doctors}
                            icon={<FaUserMd />}
                            color="#10b981"
                        />
                        <StatCard
                            title="Staff Members"
                            value={stats.staff}
                            icon={<FaUsers />}
                            color="#f59e0b"
                        />
                        <StatCard
                            title="Available Rooms"
                            value={stats.availableRooms}
                            icon={<FaProcedures />}
                            color="#ef4444"
                        />
                    </div>

                    <div className="dashboard-sections">
                        <div className="section-card">
                            <h3>Recent Activity</h3>
                            <p className="empty-state">No recent activity to show.</p>
                        </div>
                        <div className="section-card">
                            <h3>Department Status</h3>
                            {stats.departments && stats.departments.length > 0 ? (
                                <ul className="department-list">
                                    {stats.departments.map((dept, index) => (
                                        <li key={index} className="department-item">
                                            <span className="dept-name">{dept.name}</span>
                                            <span className="dept-count">{dept.count} Doctors</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="empty-state">No department data available.</p>
                            )}
                        </div>
                    </div>
                </div>
                );
};

                export default Dashboard;
                ```
