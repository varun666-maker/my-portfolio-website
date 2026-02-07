import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiGrid, FiFolderPlus, FiSettings, FiMail, 
  FiLogOut, FiUser, FiMenu, FiX 
} from 'react-icons/fi';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

// Admin Pages
import DashboardHome from './DashboardHome';
import ManageProjects from './ManageProjects';
import ManageServices from './ManageServices';
import ManageMessages from './ManageMessages';
import ManageAbout from './ManageAbout';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', icon: FiGrid, label: 'Dashboard', exact: true },
    { path: '/admin/projects', icon: FiFolderPlus, label: 'Projects' },
    { path: '/admin/services', icon: FiSettings, label: 'Services' },
    { path: '/admin/messages', icon: FiMail, label: 'Messages' },
    { path: '/admin/about', icon: FiUser, label: 'About Me' },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-dark-50 pt-16">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg z-40 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } w-64`}
        >
          <div className="p-6">
            {/* Admin Info */}
            <div className="mb-8 pb-6 border-b border-dark-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold">
                  {admin?.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-dark-900">Admin</p>
                  <p className="text-sm text-dark-500 truncate">{admin?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path, item.exact);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      active
                        ? 'bg-primary-600 text-white'
                        : 'text-dark-700 hover:bg-dark-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <FiLogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-20 left-4 z-50 w-10 h-10 bg-primary-600 text-white rounded-lg flex items-center justify-center shadow-lg"
        >
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-dark-900/50 z-30 top-16"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="messages" element={<ManageMessages />} />
            <Route path="about" element={<ManageAbout />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
