import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/contact/messages');
      setMessages(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (id, currentStatus) => {
    try {
      await api.patch(`/contact/messages/${id}/read`, { read: !currentStatus });
      toast.success(`Message marked as ${!currentStatus ? 'read' : 'unread'}`);
      fetchMessages();
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await api.delete(`/contact/messages/${id}`);
      toast.success('Message deleted successfully');
      fetchMessages();
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'read') return msg.read;
    if (filter === 'unread') return !msg.read;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="large" text="Loading messages..." />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark-900 mb-2">Messages</h1>
        <p className="text-dark-600">View and manage contact form submissions</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-dark-700 hover:bg-dark-50'
          }`}
        >
          All ({messages.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'unread'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-dark-700 hover:bg-dark-50'
          }`}
        >
          Unread ({messages.filter((m) => !m.read).length})
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'read'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-dark-700 hover:bg-dark-50'
          }`}
        >
          Read ({messages.filter((m) => m.read).length})
        </button>
      </div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <div className="card p-12 text-center">
          <FiMail className="text-6xl text-dark-300 mx-auto mb-4" />
          <p className="text-dark-500 text-lg">No messages to display</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`card p-6 ${!message.read ? 'border-l-4 border-primary-600' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-dark-900">{message.name}</h3>
                    {!message.read && (
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-dark-600 text-sm mb-1">
                    <FiMail className="inline mr-2" />
                    {message.email}
                  </p>
                  <p className="text-dark-500 text-xs">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleRead(message._id, message.read)}
                    className={`btn py-2 px-3 ${
                      message.read
                        ? 'bg-dark-100 text-dark-700 hover:bg-dark-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                    title={message.read ? 'Mark as unread' : 'Mark as read'}
                  >
                    {message.read ? <FiX /> : <FiCheck />}
                  </button>
                  <button
                    onClick={() => handleDelete(message._id)}
                    className="btn bg-red-100 text-red-700 hover:bg-red-200 py-2 px-3"
                    title="Delete message"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              <div className="bg-dark-50 rounded-lg p-4">
                <p className="text-dark-700 whitespace-pre-wrap">{message.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMessages;
