import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaUserMd, FaUsers, FaProcedures, FaBuilding, FaChartBar, FaBars } from 'react-icons/fa';
import './Layout.css';

const SidebarItem = ({ to, icon, label, active }) => (
    <Link to={to} className={`sidebar-item ${active ? 'active' : ''}`}>
        <span className="sidebar-icon">{icon}</span>
        <span className="sidebar-label">{label}</span>
    </Link>
);

const Layout = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="layout-container">
            <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <div className="logo">HMS</div>
                    <button className="toggle-btn" onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <SidebarItem
                        to="/"
                        icon={<FaChartBar />}
                        label="Dashboard"
                        active={location.pathname === '/'}
                    />
                    <SidebarItem
                        to="/patients"
                        icon={<FaUsers />}
                        label="Patients"
                        active={location.pathname.startsWith('/patients')}
                    />
                    <SidebarItem
                        to="/doctors"
                        icon={<FaUserMd />}
                        label="Doctors"
                        active={location.pathname.startsWith('/doctors')}
                    />
                    <SidebarItem
                        to="/staff"
                        icon={<FaUsers />}
                        label="Staff"
                        active={location.pathname.startsWith('/staff')}
                    />
                    <SidebarItem
                        to="/infrastructure"
                        icon={<FaBuilding />}
                        label="Infrastructure"
                        active={location.pathname.startsWith('/infrastructure')}
                    />
                </nav>
            </aside>
            <main className="main-content">
                <header className="top-header">
                    <h1 className="page-title">Hospital Management System</h1>
                    <div className="user-profile">
                        <span className="user-name">Admin User</span>
                        <div className="avatar">A</div>
                    </div>
                </header>
                <div className="content-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
