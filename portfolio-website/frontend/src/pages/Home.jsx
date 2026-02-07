import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import profileImage from '../assets/profile.jpg';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section pt-32 md:pt-40 pb-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Text Content */}
            <div>
              <motion.div variants={itemVariants}>
                <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                  👋 Welcome to my portfolio
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                Hi, I'm{' '}
                <span className="gradient-text"> Varun Kumar A</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-dark-600 mb-4"
              >
                Full Stack Developer & Designer
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-lg text-dark-500 mb-8 max-w-xl"
              >
                I create beautiful, functional, and user-friendly web applications
                with modern technologies. Let's build something amazing together!
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4 mb-8"
              >
                <Link to="/portfolio" className="btn btn-primary">
                  View My Work
                  <FiArrowRight />
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Get in Touch
                </Link>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="flex gap-4">
                {[
                  { icon: FiGithub, url: 'https://github.com/varun666-maker', label: 'GitHub' },
                  { icon: FiLinkedin, url: 'https://www.linkedin.com/in/varun-kumar-75a4422b4/', label: 'LinkedIn' },
                  { icon: FiMail, url: 'mailto:varun143877@gmail.com', label: 'Email' },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border-2 border-dark-300 flex items-center justify-center hover:border-primary-600 hover:text-primary-600 transition-colors"
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </motion.div>
            </div>

            {/* Image/Illustration */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Decorative circles */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full opacity-20 blur-3xl" />
                <div className="absolute inset-8 bg-gradient-to-br from-secondary-400 to-primary-500 rounded-full opacity-20 blur-2xl" />
                
                {/* Profile image placeholder */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img
                      src={profileImage}
                      alt="Varun Kumar A - Full Stack Developer"
                      className="w-full h-full object-cover object-top scale-110"
                    />
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4"
                >
                  <div className="text-3xl">💻</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4"
                >
                  <div className="text-3xl">🚀</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '6+', label: 'Projects Completed' },
              { number: '-', label: 'Years Experience' },
              { number: '3+', label: 'Happy Clients' },
              { number: '100%', label: 'Success Rate' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-dark-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's collaborate and bring your ideas to life with cutting-edge technology
              and creative solutions.
            </p>
            <Link
              to="/contact"
              className="btn bg-white text-primary-600 hover:bg-dark-50 inline-flex items-center gap-2"
            >
              Get Started Today
              <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
