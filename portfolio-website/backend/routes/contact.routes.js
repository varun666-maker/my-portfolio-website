import express from 'express';
import {
  submitContactForm,
  getMessages,
  markMessageAsRead,
  deleteMessage
} from '../controllers/contact.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public route
router.post('/', submitContactForm);

// Protected routes (Admin only)
router.get('/messages', protect, getMessages);
router.patch('/messages/:id/read', protect, markMessageAsRead);
router.delete('/messages/:id', protect, deleteMessage);

export default router;
