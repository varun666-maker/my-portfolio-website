import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCode, FiSmartphone, FiLayout, FiDatabase, 
  FiCloud, FiTool 
} from 'react-icons/fi';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const iconMap = {
  code: FiCode,
  mobile: FiSmartphone,
  palette: FiLayout,
  api: FiTool,
  database: FiDatabase,
  cloud: FiCloud,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading services..." />
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
            className="text-center"
          >
            <h1 className="section-title">Services</h1>
            <p className="section-subtitle">
              Comprehensive solutions for your digital needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || FiCode;
              
              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card card-hover p-8 text-center group"
                >
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-white transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <IconComponent size={36} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-dark-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-dark-600 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {services.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-dark-500">No services available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              I offer tailored solutions to meet your specific requirements.
              Let's discuss your project and bring your vision to life.
            </p>
            <a
              href="/contact"
              className="btn bg-white text-primary-600 hover:bg-dark-50"
            >
              Contact Me Today
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
