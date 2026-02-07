import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Web Development', 'Mobile App', 'UI/UX Design', 'Full Stack', 'Technologies'],
    default: 'Web Development'
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  liveLink: {
    type: String,
    trim: true,
    default: ''
  },
  githubLink: {
    type: String,
    trim: true,
    default: ''
  },
  technologies: {
    type: [String],
    default: []
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
projectSchema.index({ category: 1, createdAt: -1 });
projectSchema.index({ featured: 1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;
