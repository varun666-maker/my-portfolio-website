import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiMessageSquare, FiSend, FiMapPin, FiPhone } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/contact', formData);
      toast.success(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'varun143877@gmail.com',
      link: 'mailto:varun143877@gmail.com',
    },
    {
      icon: FiPhone,
      title: 'Phone',
      value: '+91 9019826724',
      link: 'tel:+919019826724',
    },
    {
      icon: FiMapPin,
      title: 'Location',
      value: 'Ballari, India',
      link: null,
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="section-title">Get In Touch</h1>
            <p className="section-subtitle">
              Have a project in mind? Let's work together!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-dark-900 mb-4">
                  Let's Talk About Your Project
                </h2>
                <p className="text-dark-600 text-lg leading-relaxed">
                  I'm always interested in hearing about new projects and opportunities.
                  Whether you have a question or just want to say hi, feel free to reach out!
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        <Icon size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-dark-500 font-medium">{info.title}</p>
                        <p className="text-dark-900 font-semibold">{info.value}</p>
                      </div>
                    </div>
                  );

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {info.link ? (
                        <a href={info.link}>{content}</a>
                      ) : (
                        <div>{content}</div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-semibold text-dark-900 mb-4">
                  Follow Me On
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/varun666-maker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-dark-900 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/varun-kumar-75a4422b4/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-dark-900 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="card p-8 space-y-6">
                <div>
                  <label htmlFor="name" className="label">
                    <FiUser className="inline mr-2" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="label">
                    <FiMail className="inline mr-2" />
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="label">
                    <FiMessageSquare className="inline mr-2" />
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="textarea"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full"
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner h-5 w-5" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
