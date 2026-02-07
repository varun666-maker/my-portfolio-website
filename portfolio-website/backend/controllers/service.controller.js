import Service from '../models/Service.model.js';

/**
 * @route   GET /api/services
 * @desc    Get all active services
 * @access  Public
 */
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ active: true }).sort({ order: 1 });

    res.status(200).json({
      status: 'success',
      count: services.length,
      data: services
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching services'
    });
  }
};

/**
 * @route   GET /api/services/:id
 * @desc    Get single service
 * @access  Public
 */
export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'Service not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: service
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching service'
    });
  }
};

/**
 * @route   POST /api/services
 * @desc    Create new service
 * @access  Private (Admin only)
 */
export const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    console.error('Create service error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error creating service'
    });
  }
};

/**
 * @route   PUT /api/services/:id
 * @desc    Update service
 * @access  Private (Admin only)
 */
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'Service not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    console.error('Update service error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error updating service'
    });
  }
};

/**
 * @route   DELETE /api/services/:id
 * @desc    Delete service
 * @access  Private (Admin only)
 */
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'Service not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting service'
    });
  }
};
