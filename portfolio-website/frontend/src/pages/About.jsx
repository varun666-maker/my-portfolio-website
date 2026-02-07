import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import profileImage from '../assets/profile.jpg';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await api.get('/about');
      setAboutData(response.data.data);
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="section-title">
              {aboutData?.title || 'About Me'}
            </h1>
            <p className="section-subtitle">
              {aboutData?.subtitle || 'Get to know me better'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-3xl opacity-20 blur-2xl" />
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-white">
                  <img
                    src={profileImage}
                    alt="Varun Kumar A"
                    className="w-full h-full object-cover object-top scale-110"
                  />
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-dark-700 leading-relaxed whitespace-pre-line">
                  {aboutData?.description || 'I am a full-stack developer who builds practical web applications using the MERN stack and modern web technologies. I focus on writing clean, efficient, and maintainable code to solve real-world problems. I also have experience integrating AI-powered features into applications to enhance functionality and user experience. I enjoy learning new technologies and turning ideas into reliable, working products.'}
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {aboutData?.education && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎓</span>
                    <span className="text-dark-700">{aboutData.education}</span>
                  </div>
                )}
              </div>

              {aboutData?.resumeUrl && (
                <div className="mt-8">
                  <a
                    href={aboutData.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <FiDownload />
                    Download Resume
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {aboutData?.skills && aboutData.skills.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Skills & Technologies
              </h2>
              <p className="text-dark-600">
                Technologies and tools I work with
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {aboutData.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-shadow"
                >
                  <p className="font-medium text-dark-800">{skill}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default About;
