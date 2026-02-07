import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiFilter } from 'react-icons/fi';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

// Fallback projects - always visible even if backend fails
const FALLBACK_PROJECTS = [
  {
    _id: '1',
    title: 'Weed Detection',
    category: 'Full Stack',
    description: 'An AI-powered web application for detecting and classifying weeds in agricultural fields using machine learning and computer vision. Real-time detection with detailed analytics dashboard.',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
    liveLink: 'https://weed-detection.example.com',
    githubLink: 'https://github.com/yourusername/weed-detection',
    technologies: ['streamlet', 'javascript', 'TensorFlow', 'MongoDB', 'Python', 'OpenCV'],
    featured: true,
    order: 1
  },
  {
    _id: '2',
    title: 'AI-Interview Assistant',
    category: 'Full Stack',
    description: 'A comprehensive interview preparation platform with AI-powered mock interviews, real-time feedback, performance analytics, and personalized study plans.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
    liveLink: 'https://ai-interview.example.com',
    githubLink: 'https://github.com/yourusername/ai-interview-assistant',
    technologies: ['React', 'Node.js', 'OpenAI API', 'PostgreSQL', 'WebRTC', 'Socket.io'],
    featured: true,
    order: 2
  },
  {
    _id: '3',
    title: 'Event Hub',
    category: 'Mobile App',
    description: 'A mobile application for discovering, creating, and managing local events. Features include ticketing, social sharing, calendar integration, and real-time notifications.',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    liveLink: 'https://eventhub.example.com',
    githubLink: 'https://github.com/yourusername/event-hub',
    technologies: ['React Native', 'Firebase', 'Express js', 'Node js', 'MongoDB', 'Push Notifications'],
    featured: true,
    order: 3
  },
  {
    _id: '4',
    title: 'Weed Detection UI/UX',
    category: 'UI/UX Design',
    description: 'Complete UI/UX design system for the Weed Detection platform. Includes user research, wireframes, prototypes, and design specifications with focus on agricultural workers.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800',
    liveLink: 'https://www.figma.com/weed-detection-design',
    githubLink: '',
    technologies: ['Figma', 'Adobe XD', 'Illustrator', 'User Research', 'Prototyping'],
    featured: false,
    order: 4
  },
  {
    _id: '5',
    title: 'AI-Interview Assistant UI/UX',
    category: 'UI/UX Design',
    description: 'User-centric design for AI-powered interview platform. Comprehensive design including onboarding flow, interview interface, dashboard analytics, and mobile responsive layouts.',
    imageUrl: 'https://images.unsplash.com/photo-1560438718-eb61ede255eb?w=800',
    liveLink: 'https://www.figma.com/ai-interview-design',
    githubLink: '',
    technologies: ['Figma', 'Sketch', 'InVision', 'Miro', 'Design System'],
    featured: false,
    order: 5
  },
  {
    _id: '6',
    title: 'Event Hub UI/UX',
    category: 'UI/UX Design',
    description: 'Modern mobile-first design for Event Hub application. Complete design system with interactive prototypes, user flows, and detailed component library for iOS and Android.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    liveLink: 'https://www.figma.com/event-hub-design',
    githubLink: '',
    technologies: ['Figma', 'Principle', 'Zeplin', 'Mobile Design', 'Animations'],
    featured: false,
    order: 6
  },
  {
    _id: '7',
    title: 'Weed Detection',
    category: 'Web Development',
    description: 'An AI-powered web application for detecting and classifying weeds in agricultural fields using machine learning and computer vision. Real-time detection with detailed analytics dashboard.',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
    liveLink: 'https://weed-detection.example.com',
    githubLink: 'https://github.com/yourusername/weed-detection',
    technologies: ['React', 'Node.js', 'TensorFlow', 'MongoDB', 'Python', 'OpenCV'],
    featured: true,
    order: 7
  },
  {
    _id: '8',
    title: 'AI-Interview Assistant',
    category: 'Web Development',
    description: 'A comprehensive interview preparation platform with AI-powered mock interviews, real-time feedback, performance analytics, and personalized study plans.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
    liveLink: 'https://ai-interview.example.com',
    githubLink: 'https://github.com/yourusername/ai-interview-assistant',
    technologies: ['React', 'Node.js', 'OpenAI API', 'PostgreSQL', 'WebRTC', 'Socket.io'],
    featured: true,
    order: 8
  },
  {
    _id: '9',
    title: 'Python',
    category: 'Technologies',
    description: 'Advanced Python programming for backend development, data science, machine learning, and automation. Building scalable applications with Django, Flask, and FastAPI.',
    imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
    liveLink: 'https://www.python.org',
    githubLink: '',
    technologies: ['Python', 'Django', 'Flask', 'FastAPI', 'Pandas', 'NumPy'],
    featured: true,
    order: 9
  },
  {
    _id: '10',
    title: 'JavaScript',
    category: 'Technologies',
    description: 'Modern JavaScript development with ES6+, asynchronous programming, and functional programming patterns. Building dynamic web applications and APIs.',
    imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800',
    liveLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    githubLink: '',
    technologies: ['JavaScript', 'ES6+', 'TypeScript', 'Async/Await', 'Promises'],
    featured: true,
    order: 10
  },
  {
    _id: '11',
    title: 'Node.js & Express.js',
    category: 'Technologies',
    description: 'Backend development with Node.js and Express.js. Building RESTful APIs, microservices, and real-time applications with scalable architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800',
    liveLink: 'https://nodejs.org',
    githubLink: '',
    technologies: ['Node.js', 'Express.js', 'REST API', 'WebSocket', 'Middleware'],
    featured: true,
    order: 11
  },
  {
    _id: '12',
    title: 'MongoDB',
    category: 'Technologies',
    description: 'NoSQL database management with MongoDB. Designing schemas, optimizing queries, aggregation pipelines, and building scalable data-driven applications.',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
    liveLink: 'https://www.mongodb.com',
    githubLink: '',
    technologies: ['MongoDB', 'Mongoose', 'Aggregation', 'Indexing', 'Atlas'],
    featured: true,
    order: 12
  },
  {
    _id: '13',
    title: 'NumPy & Pandas',
    category: 'Technologies',
    description: 'Data analysis and scientific computing with NumPy and Pandas. Data manipulation, statistical analysis, and efficient numerical computations.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    liveLink: 'https://numpy.org',
    githubLink: '',
    technologies: ['NumPy', 'Pandas', 'Data Analysis', 'Statistics', 'DataFrames'],
    featured: false,
    order: 13
  },
  {
    _id: '14',
    title: 'Matplotlib & Visualization',
    category: 'Technologies',
    description: 'Data visualization with Matplotlib, Seaborn, and Plotly. Creating insightful charts, graphs, and interactive dashboards for data storytelling.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    liveLink: 'https://matplotlib.org',
    githubLink: '',
    technologies: ['Matplotlib', 'Seaborn', 'Plotly', 'Data Viz', 'Charts'],
    featured: false,
    order: 14
  },
  {
    _id: '15',
    title: 'Git & GitHub',
    category: 'Technologies',
    description: 'Version control with Git and GitHub. Managing repositories, branching strategies, pull requests, CI/CD workflows, and collaborative development.',
    imageUrl: 'https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?w=800',
    liveLink: 'https://github.com',
    githubLink: '',
    technologies: ['Git', 'GitHub', 'Version Control', 'CI/CD', 'Collaboration'],
    featured: false,
    order: 15
  },
  {
    _id: '16',
    title: 'React.js',
    category: 'Technologies',
    description: 'Modern frontend development with React.js. Building component-based UIs, state management with Redux, hooks, and creating responsive web applications.',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    liveLink: 'https://react.dev',
    githubLink: '',
    technologies: ['React', 'Redux', 'Hooks', 'Context API', 'JSX'],
    featured: false,
    order: 16
  }
];

const Portfolio = () => {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [filteredProjects, setFilteredProjects] = useState(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Web Development', 'Mobile App', 'UI/UX Design', 'Full Stack', 'Technologies'];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.category === activeFilter));
    }
  }, [activeFilter, projects]);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      // Use backend data if available, otherwise fallback is already set
      if (response.data.data && response.data.data.length > 0) {
        setProjects(response.data.data);
        setFilteredProjects(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Keep fallback projects on error
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    // Show fallback projects while loading
    return (
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="section bg-gradient-to-br from-primary-50 to-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="section-title">My Portfolio</h1>
              <p className="section-subtitle">
                Explore my recent projects and creative work
              </p>
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <span className="flex items-center gap-2 text-dark-600 font-medium">
                <FiFilter />
                Filter:
              </span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    activeFilter === category
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-dark-700 hover:bg-dark-50 shadow'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid - Show fallback immediately */}
        <section className="section bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FALLBACK_PROJECTS.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card card-hover group"
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="flex gap-3">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 hover:scale-110 transition-transform"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiExternalLink />
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark-900 hover:scale-110 transition-transform"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiGithub />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary-600">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-dark-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 bg-dark-100 text-dark-600 rounded-full text-xs font-medium">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-primary-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="section-title">My Portfolio</h1>
            <p className="section-subtitle">
              Explore my recent projects and creative work
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <span className="flex items-center gap-2 text-dark-600 font-medium">
              <FiFilter />
              Filter:
            </span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeFilter === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-dark-700 hover:bg-dark-50 shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section bg-white">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-dark-500">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="card card-hover group"
                  >
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="flex gap-3">
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 hover:scale-110 transition-transform"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FiExternalLink />
                            </a>
                          )}
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-dark-900 hover:scale-110 transition-transform"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FiGithub />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary-600">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-dark-600 mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-3 py-1 bg-dark-100 text-dark-600 rounded-full text-xs font-medium">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
