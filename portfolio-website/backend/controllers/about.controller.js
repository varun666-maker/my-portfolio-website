import About from '../models/About.model.js';

/**
 * @route   GET /api/about
 * @desc    Get about information
 * @access  Public
 */
export const getAbout = async (req, res) => {
  try {
    // Get the first (and should be only) about document
    let about = await About.findOne();

    // If no about document exists, create a default one
    if (!about) {
      about = await About.create({
        title: 'About Me',
        subtitle: 'Full Stack Developer',
        description: 'Add your about me description here.',
        skills: [],
        experience: '',
        education: ''
      });
    }

    res.status(200).json({
      status: 'success',
      data: about
    });
  } catch (error) {
    console.error('Get about error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching about information'
    });
  }
};

/**
 * @route   PUT /api/about
 * @desc    Update about information
 * @access  Private (Admin only)
 */
export const updateAbout = async (req, res) => {
  try {
    // Find existing about document or create new one
    let about = await About.findOne();

    if (about) {
      // Update existing
      about = await About.findByIdAndUpdate(
        about._id,
        { ...req.body, updatedAt: Date.now() },
        {
          new: true,
          runValidators: true
        }
      );
    } else {
      // Create new
      about = await About.create(req.body);
    }

    res.status(200).json({
      status: 'success',
      message: 'About information updated successfully',
      data: about
    });
  } catch (error) {
    console.error('Update about error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error updating about information'
    });
  }
};
