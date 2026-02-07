import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'code',
    active: true,
  });

  const icons = [
    { value: 'code', label: 'Code' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'palette', label: 'Palette' },
    { value: 'api', label: 'API' },
    { value: 'database', label: 'Database' },
    { value: 'cloud', label: 'Cloud' },
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        active: service.active,
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        description: '',
        icon: 'code',
        active: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingService) {
        await api.put(`/services/${editingService._id}`, formData);
        toast.success('Service updated successfully');
      } else {
        await api.post('/services', formData);
        toast.success('Service created successfully');
      }
      fetchServices();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      await api.delete(`/services/${id}`);
      toast.success('Service deleted successfully');
      fetchServices();
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="large" text="Loading services..." />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 mb-2">Manage Services</h1>
          <p className="text-dark-600">Add, edit, or remove your services</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-primary">
          <FiPlus />
          Add Service
        </button>
      </div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-dark-500 text-lg">No services yet. Add your first service!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center text-white text-2xl">
                  {service.icon === 'code' && '💻'}
                  {service.icon === 'mobile' && '📱'}
                  {service.icon === 'palette' && '🎨'}
                  {service.icon === 'api' && '🔧'}
                  {service.icon === 'database' && '🗄️'}
                  {service.icon === 'cloud' && '☁️'}
                </div>
                {service.active && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Active
                  </span>
                )}
              </div>
              
              <h3 className="font-bold text-lg text-dark-900 mb-2">{service.title}</h3>
              <p className="text-dark-600 text-sm mb-4">{service.description}</p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(service)}
                  className="flex-1 btn bg-primary-100 text-primary-700 hover:bg-primary-200 py-2"
                >
                  <FiEdit2 />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="flex-1 btn bg-red-100 text-red-700 hover:bg-red-200 py-2"
                >
                  <FiTrash2 />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full"
            >
              <div className="border-b border-dark-200 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-dark-900">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button onClick={handleCloseModal} className="text-dark-500 hover:text-dark-900">
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="label">Service Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="input"
                    placeholder="Web Development"
                  />
                </div>

                <div>
                  <label className="label">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows="4"
                    className="textarea"
                    placeholder="Describe your service..."
                  />
                </div>

                <div>
                  <label className="label">Icon</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    required
                    className="input"
                  >
                    {icons.map((icon) => (
                      <option key={icon.value} value={icon.value}>
                        {icon.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 text-primary-600"
                  />
                  <label htmlFor="active" className="text-dark-700 font-medium">
                    Active (visible on website)
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 btn btn-primary"
                  >
                    {submitting ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageServices;
