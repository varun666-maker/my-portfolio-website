import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.model.js';
import Project from '../models/Project.model.js';
import Service from '../models/Service.model.js';
import About from '../models/About.model.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Sample data
const adminData = {
  email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
  password: process.env.ADMIN_PASSWORD || 'Admin@123',
  role: 'admin'
};

const projectsData = [
  {
    title: 'Ai idea Evaluator',
    category: 'Web Development',
    description: 'An AI tool which evaluates your startup idea and tells how good your idea is with SWOT Analysis, Competitor Analysis and Market Analysis.',
    imageUrl: 'https://baiinfo.in/wp-content/uploads/2024/01/Business-Idea-Evaluation.jpg',
    liveLink: 'https://idea-forge-ai-virid.vercel.app/',
    githubLink: 'https://github.com/varun666-maker/idea-forge',
    technologies: ['React', 'OpenAI', 'Node.js', 'SWOT Analysis', 'Market Analysis', 'Tailwind CSS', 'Vite'],
    featured: true,
    order: 0
  },
  {
    title: 'Weed Detection',
    category: 'Full Stack',
    description: 'An AI-powered web application for detecting and classifying weeds in agricultural fields using machine learning and computer vision. Real-time detection with detailed analytics dashboard.',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
    liveLink: 'https://weed-detection.example.com',
    githubLink: 'https://github.com/yourusername/weed-detection',
    technologies: ['React', 'Node.js', 'TensorFlow', 'MongoDB', 'Python', 'OpenCV'],
    featured: true,
    order: 1
  },
  {
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
    title: 'Event Hub',
    category: 'Mobile App',
    description: 'A mobile application for discovering, creating, and managing local events. Features include ticketing, social sharing, calendar integration, and real-time notifications.',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    liveLink: 'https://eventhub.example.com',
    githubLink: 'https://github.com/yourusername/event-hub',
    technologies: ['React Native', 'Firebase', 'Redux', 'Google Maps API', 'Stripe'],
    featured: true,
    order: 3
  },
  {
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
    title: 'Weed Detection',
    category: 'Web Development',
    description: 'An AI-powered web application for detecting and classifying weeds in agricultural fields using machine learning and computer vision. Real-time detection with detailed analytics dashboard.',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
    liveLink: 'https://weed-detection.example.com',
    githubLink: 'https://github.com/yourusername/weed-detection',
    technologies: ['React', 'Node.js', 'TensorFlow', 'MongoDB', 'Python', 'OpenCV'],
    featured: false,
    order: 7
  },
  {
    title: 'AI-Interview Assistant',
    category: 'Web Development',
    description: 'A comprehensive interview preparation platform with AI-powered mock interviews, real-time feedback, performance analytics, and personalized study plans.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
    liveLink: 'https://ai-interview.example.com',
    githubLink: 'https://github.com/yourusername/ai-interview-assistant',
    technologies: ['React', 'Node.js', 'OpenAI API', 'PostgreSQL', 'WebRTC', 'Socket.io'],
    featured: false,
    order: 8
  },
  {
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

const servicesData = [
  {
    title: 'Web Development',
    description: 'Building responsive and performant web applications using modern technologies like React, Vue, and Node.js.',
    icon: 'code',
    order: 1,
    active: true
  },
  {
    title: 'Mobile App Development',
    description: 'Creating cross-platform mobile applications with React Native and Flutter for iOS and Android.',
    icon: 'mobile',
    order: 2,
    active: true
  },
  {
    title: 'UI/UX Design',
    description: 'Designing intuitive and beautiful user interfaces with focus on user experience and accessibility.',
    icon: 'palette',
    order: 3,
    active: true
  },
  {
    title: 'API Development',
    description: 'Building robust and scalable RESTful APIs with proper authentication, documentation, and testing.',
    icon: 'api',
    order: 4,
    active: true
  },
  {
    title: 'Database Design',
    description: 'Designing efficient database schemas and optimizing queries for SQL and NoSQL databases.',
    icon: 'database',
    order: 5,
    active: true
  },
  {
    title: 'DevOps & Deployment',
    description: 'Setting up CI/CD pipelines, cloud infrastructure, and automated deployment workflows.',
    icon: 'cloud',
    order: 6,
    active: true
  }
];

const aboutData = {
  title: 'About Me',
  subtitle: 'Full Stack Developer & UI/UX Enthusiast',
  description: `I am a full-stack developer who builds practical web applications using the MERN stack and modern web technologies. I focus on writing clean, efficient, and maintainable code to solve real-world problems. I also have experience integrating AI-powered features into applications to enhance functionality and user experience. I enjoy learning new technologies and turning ideas into reliable, working products.`,
  imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
  skills: [
    'JavaScript/TypeScript',
    'React & Next.js',
    'Node.js & Express',
    'MongoDB & PostgreSQL',
    'Tailwind CSS',
    'Git & GitHub',
    'REST APIs',
    'AWS',
    'UI/UX Design',
    'Vercel & Netlify'
  ],
  education: 'Bachelor of Computer Science and Business System',
  resumeUrl: ''
};

// Seed function
const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Admin.deleteMany({});
    await Project.deleteMany({});
    await Service.deleteMany({});
    await About.deleteMany({});

    console.log('👤 Creating admin user...');
    await Admin.create(adminData);
    console.log(`✅ Admin created: ${adminData.email}`);

    console.log('📁 Creating projects...');
    await Project.insertMany(projectsData);
    console.log(`✅ ${projectsData.length} projects created`);

    console.log('🛠️  Creating services...');
    await Service.insertMany(servicesData);
    console.log(`✅ ${servicesData.length} services created`);

    console.log('ℹ️  Creating about information...');
    await About.create(aboutData);
    console.log('✅ About information created');

    console.log('\n✨ Database seeded successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log(`   Email: ${adminData.email}`);
    console.log(`   Password: ${adminData.password}`);
    console.log('\n⚠️  Remember to change these credentials in production!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

// Run seed
seedDatabase();
