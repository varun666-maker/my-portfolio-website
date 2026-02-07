import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.model.js';

/**
 * Middleware to verify JWT token and authenticate requests
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if authorization header exists and starts with Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized to access this route. Please login.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from token
      req.admin = await Admin.findById(decoded.id).select('-password');

      if (!req.admin) {
        return res.status(401).json({
          status: 'error',
          message: 'Admin not found'
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        status: 'error',
        message: 'Token is invalid or has expired'
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Server error during authentication'
    });
  }
};

/**
 * Generate JWT token
 */
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d' // Token expires in 7 days
  });
};
