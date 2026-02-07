import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiAlertCircle } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="inline-block mb-8"
        >
          <FiAlertCircle className="text-9xl text-primary-600" />
        </motion.div>

        <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4">
          404
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-xl text-dark-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. 
          It might have been moved or deleted.
        </p>

        <Link to="/" className="btn btn-primary">
          <FiHome />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
