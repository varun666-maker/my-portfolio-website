import Project from '../models/Project.model.js';

/**
 * @route   GET /api/projects
 * @desc    Get all projects (with optional filters)
 * @access  Public
 */
export const getProjects = async (req, res) => {
  try {
    const { category, featured, limit } = req.query;

    // Build query
    let query = {};
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';

    // Execute query
    let projects = Project.find(query).sort({ order: 1, createdAt: -1 });

    if (limit) {
      projects = projects.limit(parseInt(limit));
    }

    const result = await projects;

    res.status(200).json({
      status: 'success',
      count: result.length,
      data: result
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching projects'
    });
  }
};

/**
 * @route   GET /api/projects/:id
 * @desc    Get single project by ID
 * @access  Public
 */
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching project'
    });
  }
};

/**
 * @route   POST /api/projects
 * @desc    Create new project
 * @access  Private (Admin only)
 */
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error creating project'
    });
  }
};

/**
 * @route   PUT /api/projects/:id
 * @desc    Update project
 * @access  Private (Admin only)
 */
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error updating project'
    });
  }
};

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete project
 * @access  Private (Admin only)
 */
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting project'
    });
  }
};
