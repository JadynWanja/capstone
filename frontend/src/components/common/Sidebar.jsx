import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  Clock,
  ShieldCheck,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role || 'EMPLOYEE';

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'HR_STAFF', 'MANAGER', 'EMPLOYEE'] },
    { label: 'Employees', path: '/employees', icon: Users, roles: ['ADMIN', 'HR_STAFF', 'MANAGER', 'EMPLOYEE'] },
    { label: 'Departments', path: '/departments', icon: Building2, roles: ['ADMIN', 'HR_STAFF', 'MANAGER', 'EMPLOYEE'] },
    { label: 'Leave Requests', path: '/leaves', icon: Calendar, roles: ['ADMIN', 'HR_STAFF', 'MANAGER', 'EMPLOYEE'] },
    { label: 'Attendance', path: '/attendance', icon: Clock, roles: ['ADMIN', 'HR_STAFF', 'MANAGER', 'EMPLOYEE'] },
    { label: 'Audit Logs', path: '/audit-logs', icon: ShieldCheck, roles: ['ADMIN', 'HR_STAFF'] },
  ];

  const filteredNavItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div className="logo-badge">CH</div>
          <div>
            <h1 className="logo-text">Cadre Hub</h1>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Workforce Suite</span>
          </div>
        </div>
        <button 
          className="mobile-close-btn" 
          onClick={closeSidebar}
          aria-label="Close Sidebar"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          Cadre Hub Enterprise v2.0
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
