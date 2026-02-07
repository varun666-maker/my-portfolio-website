import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiExternalLink } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    description: '',
    imageUrl: '',
    liveLink: '',
    githubLink: '',
    technologies: '',
    featured: false,
  });

  const categories = ['Web Development', 'Mobile App', 'UI/UX Design', 'Full Stack', 'Other'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        category: project.category,
        description: project.description,
        imageUrl: project.imageUrl,
        liveLink: project.liveLink || '',
        githubLink: project.githubLink || '',
        technologies: project.technologies?.join(', ') || '',
        featured: project.featured || false,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        category: 'Web Development',
        description: '',
        imageUrl: '',
        liveLink: '',
        githubLink: '',
        technologies: '',
        featured: false,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const projectData = {
      ...formData,
      technologies: formData.technologies
        .split(',')
        .map((tech) => tech.trim())
        .filter((tech) => tech),
    };

    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, projectData);
        toast.success('Project updated successfully');
      } else {
        await api.post('/projects', projectData);
        toast.success('Project created successfully');
      }
      fetchProjects();
      handleCloseModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="large" text="Loading projects..." />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 mb-2">Manage Projects</h1>
          <p className="text-dark-600">Add, edit, or remove your portfolio projects</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-primary">
          <FiPlus />
          Add Project
        </button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-dark-500 text-lg">No projects yet. Add your first project!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card overflow-hidden group"
            >
              <div className="relative h-48">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.featured && (
                  <span className="absolute top-2 right-2 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-dark-900 mb-1">{project.title}</h3>
                <p className="text-sm text-primary-600 mb-2">{project.category}</p>
                <p className="text-dark-600 text-sm line-clamp-2 mb-3">{project.description}</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="flex-1 btn bg-primary-100 text-primary-700 hover:bg-primary-200 py-2"
                  >
                    <FiEdit2 />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="flex-1 btn bg-red-100 text-red-700 hover:bg-red-200 py-2"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
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
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-dark-200 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-dark-900">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button onClick={handleCloseModal} className="text-dark-500 hover:text-dark-900">
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="label">Project Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="input"
                    placeholder="My Awesome Project"
                  />
                </div>

                <div>
                  <label className="label">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="input"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows="4"
                    className="textarea"
                    placeholder="Describe your project..."
                  />
                </div>

                <div>
                  <label className="label">Image URL</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    required
                    className="input"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Live Link (Optional)</label>
                    <input
                      type="url"
                      value={formData.liveLink}
                      onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                      className="input"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="label">GitHub Link (Optional)</label>
                    <input
                      type="url"
                      value={formData.githubLink}
                      onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                      className="input"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="input"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-primary-600"
                  />
                  <label htmlFor="featured" className="text-dark-700 font-medium">
                    Mark as Featured Project
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
                    {submitting ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
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

export default ManageProjects;
