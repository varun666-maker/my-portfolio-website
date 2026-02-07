import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiPlus, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ManageAbout = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    skills: [],
    experience: '',
    education: '',
    resumeUrl: '',
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await api.get('/about');
      const data = response.data.data;
      setFormData({
        title: data.title || '',
        subtitle: data.subtitle || '',
        description: data.description || '',
        imageUrl: data.imageUrl || '',
        skills: data.skills || [],
        experience: data.experience || '',
        education: data.education || '',
        resumeUrl: data.resumeUrl || '',
      });
    } catch (error) {
      toast.error('Failed to fetch about data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.put('/about', formData);
      toast.success('About information updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    if (formData.skills.includes(newSkill.trim())) {
      toast.error('Skill already exists');
      return;
    }

    setFormData({
      ...formData,
      skills: [...formData.skills, newSkill.trim()],
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="large" text="Loading about data..." />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark-900 mb-2">Manage About Me</h1>
        <p className="text-dark-600">Update your about information and skills</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-dark-900 mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="label">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="input"
                placeholder="About Me"
              />
            </div>

            <div>
              <label className="label">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="input"
                placeholder="Full Stack Developer & Designer"
              />
            </div>

            <div>
              <label className="label">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows="8"
                className="textarea"
                placeholder="Tell visitors about yourself..."
              />
            </div>

            <div>
              <label className="label">Profile Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="input"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        {/* Professional Info Card */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-dark-900 mb-4">Professional Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="label">Experience</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="input"
                placeholder="5+ years of professional experience"
              />
            </div>

            <div>
              <label className="label">Education</label>
              <input
                type="text"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="input"
                placeholder="Bachelor of Computer Science"
              />
            </div>

            <div>
              <label className="label">Resume URL (Optional)</label>
              <input
                type="url"
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                className="input"
                placeholder="https://example.com/resume.pdf"
              />
            </div>
          </div>
        </div>

        {/* Skills Card */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-dark-900 mb-4">Skills & Technologies</h2>
          
          <div className="mb-4">
            <label className="label">Add New Skill</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                className="input flex-1"
                placeholder="React, Node.js, MongoDB..."
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="btn btn-primary"
              >
                <FiPlus />
                Add
              </button>
            </div>
          </div>

          {/* Skills List */}
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg"
              >
                <span className="font-medium">{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-primary-900 hover:text-red-600"
                >
                  <FiX />
                </button>
              </motion.div>
            ))}
          </div>

          {formData.skills.length === 0 && (
            <p className="text-dark-500 text-center py-8">No skills added yet</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary px-8"
          >
            {submitting ? (
              <>
                <div className="loading-spinner h-5 w-5" />
                Saving...
              </>
            ) : (
              <>
                <FiSave />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageAbout;
