import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'About Me'
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  imageUrl: {
    type: String,
    default: ''
  },
  skills: {
    type: [String],
    default: []
  },
  experience: {
    type: String,
    default: ''
  },
  education: {
    type: String,
    default: ''
  },
  resumeUrl: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const About = mongoose.model('About', aboutSchema);

export default About;
