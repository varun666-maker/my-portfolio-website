import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiFolderPlus, FiSettings, FiMail, FiActivity,
  FiTrendingUp 
} from 'react-icons/fi';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, servicesRes, messagesRes, unreadRes] = await Promise.all([
        api.get('/projects'),
        api.get('/services'),
        api.get('/contact/messages'),
        api.get('/contact/messages?read=false'),
      ]);

      setStats({
        projects: projectsRes.data.count,
        services: servicesRes.data.count,
        messages: messagesRes.data.count,
        unreadMessages: unreadRes.data.count,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FiFolderPlus,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Services',
      value: stats.services,
      icon: FiSettings,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Total Messages',
      value: stats.messages,
      icon: FiMail,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
      icon: FiActivity,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="large" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-dark-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-dark-600">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`text-2xl bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <FiTrendingUp className="text-green-500" />
              </div>
              <p className="text-dark-600 text-sm mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-dark-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <h2 className="text-xl font-bold text-dark-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/projects"
            className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-shadow"
          >
            <FiFolderPlus className="text-2xl text-blue-600 mb-2" />
            <p className="font-medium text-dark-900">Add Project</p>
          </a>
          <a
            href="/admin/services"
            className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition-shadow"
          >
            <FiSettings className="text-2xl text-purple-600 mb-2" />
            <p className="font-medium text-dark-900">Manage Services</p>
          </a>
          <a
            href="/admin/messages"
            className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-md transition-shadow"
          >
            <FiMail className="text-2xl text-green-600 mb-2" />
            <p className="font-medium text-dark-900">View Messages</p>
          </a>
          <a
            href="/admin/about"
            className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg hover:shadow-md transition-shadow"
          >
            <FiActivity className="text-2xl text-orange-600 mb-2" />
            <p className="font-medium text-dark-900">Edit About</p>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
