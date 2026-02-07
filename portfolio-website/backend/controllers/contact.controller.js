import Message from '../models/Message.model.js';

/**
 * @route   POST /api/contact
 * @desc    Submit contact form
 * @access  Public
 */
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide name, email, and message'
      });
    }

    // Create message
    const contactMessage = await Message.create({
      name,
      email,
      message
    });

    res.status(201).json({
      status: 'success',
      message: 'Message sent successfully! I will get back to you soon.',
      data: {
        id: contactMessage._id
      }
    });
  } catch (error) {
    console.error('Submit contact form error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error sending message. Please try again.'
    });
  }
};

/**
 * @route   GET /api/contact/messages
 * @desc    Get all contact messages
 * @access  Private (Admin only)
 */
export const getMessages = async (req, res) => {
  try {
    const { read, limit } = req.query;

    // Build query
    let query = {};
    if (read !== undefined) {
      query.read = read === 'true';
    }

    // Execute query
    let messages = Message.find(query).sort({ createdAt: -1 });

    if (limit) {
      messages = messages.limit(parseInt(limit));
    }

    const result = await messages;

    res.status(200).json({
      status: 'success',
      count: result.length,
      data: result
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching messages'
    });
  }
};

/**
 * @route   PATCH /api/contact/messages/:id/read
 * @desc    Mark message as read/unread
 * @access  Private (Admin only)
 */
export const markMessageAsRead = async (req, res) => {
  try {
    const { read } = req.body;

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: read !== undefined ? read : true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        status: 'error',
        message: 'Message not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Message updated successfully',
      data: message
    });
  } catch (error) {
    console.error('Mark message as read error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error updating message'
    });
  }
};

/**
 * @route   DELETE /api/contact/messages/:id
 * @desc    Delete message
 * @access  Private (Admin only)
 */
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        status: 'error',
        message: 'Message not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting message'
    });
  }
};
