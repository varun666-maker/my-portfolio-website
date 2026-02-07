# Portfolio Website - Full Stack Application

A modern, full-featured portfolio website with admin management, built with React, Node.js, Express, and MongoDB.

## 🌟 Features

### Frontend
- **Modern UI/UX** - Built with React, Vite, and Tailwind CSS
- **Smooth Animations** - Framer Motion animations throughout
- **Responsive Design** - Mobile-first, works on all devices
- **SEO Optimized** - Meta tags and semantic HTML
- **Performance** - Fast loading with Vite bundler

### Backend
- **RESTful API** - Clean, well-documented endpoints
- **JWT Authentication** - Secure admin authentication
- **MongoDB Database** - NoSQL database with Mongoose ODM
- **Security** - Helmet, CORS, rate limiting
- **Validation** - Input validation with express-validator

### Admin Dashboard
- **Project Management** - Add, edit, delete portfolio projects
- **Service Management** - Manage services offered
- **Message Inbox** - View and manage contact form submissions
- **About Me Editor** - Update profile and skills
- **Real-time Stats** - Dashboard with analytics

## 📁 Project Structure

```
portfolio-website/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── project.controller.js
│   │   ├── service.controller.js
│   │   ├── contact.controller.js
│   │   └── about.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── validation.middleware.js
│   ├── models/
│   │   ├── Admin.model.js
│   │   ├── Project.model.js
│   │   ├── Service.model.js
│   │   ├── Message.model.js
│   │   └── About.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   ├── service.routes.js
│   │   ├── contact.routes.js
│   │   └── about.routes.js
│   ├── scripts/
│   │   └── seed.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Navbar.jsx
    │   │   │   └── Footer.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── admin/
    │   │   │   ├── Dashboard.jsx
    │   │   │   ├── DashboardHome.jsx
    │   │   │   ├── ManageProjects.jsx
    │   │   │   ├── ManageServices.jsx
    │   │   │   ├── ManageMessages.jsx
    │   │   │   └── ManageAbout.jsx
    │   │   ├── Home.jsx
    │   │   ├── About.jsx
    │   │   ├── Portfolio.jsx
    │   │   ├── Services.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Login.jsx
    │   │   └── NotFound.jsx
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env.example
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher) - [Download MongoDB](https://www.mongodb.com/try/download/community)
- npm or yarn package manager

### Installation

#### 1. Clone the repository or navigate to the project folder

```bash
cd portfolio-website
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file with your configuration
# Update MongoDB URI, JWT secret, and admin credentials
```

**Backend .env Configuration:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin@123
CORS_ORIGIN=http://localhost:5173
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd ../frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env
```

**Frontend .env Configuration:**
```env
VITE_API_URL=http://localhost:5000/api
```

### 🗄️ Database Setup

#### 1. Start MongoDB

**Windows:**
```bash
# Start MongoDB service
net start MongoDB
```

**Mac/Linux:**
```bash
# Start MongoDB
mongod
```

#### 2. Seed the Database

```bash
# From the backend directory
cd backend
npm run seed
```

This will create:
- Admin user (admin@portfolio.com / Admin@123)
- Sample projects
- Sample services
- About information

### 🏃‍♂️ Running the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

#### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 🔐 Admin Access

After seeding the database, you can login to the admin panel:

- **URL:** `http://localhost:5173/login`
- **Email:** `admin@portfolio.com`
- **Password:** `Admin@123`

⚠️ **Important:** Change these credentials in production!

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin (Protected)
- `POST /api/auth/change-password` - Change password (Protected)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Protected)
- `PUT /api/projects/:id` - Update project (Protected)
- `DELETE /api/projects/:id` - Delete project (Protected)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (Protected)
- `PUT /api/services/:id` - Update service (Protected)
- `DELETE /api/services/:id` - Delete service (Protected)

### Contact Messages
- `POST /api/contact` - Submit contact form
- `GET /api/contact/messages` - Get all messages (Protected)
- `PATCH /api/contact/messages/:id/read` - Mark as read (Protected)
- `DELETE /api/contact/messages/:id` - Delete message (Protected)

### About
- `GET /api/about` - Get about information
- `PUT /api/about` - Update about information (Protected)

## 🎨 Customization

### Color Scheme

Edit `frontend/tailwind.config.js` to change colors:

```javascript
colors: {
  primary: {
    // Your primary color shades
  },
  secondary: {
    // Your secondary color shades
  }
}
```

### Content

1. **Profile Information:** Login to admin dashboard and edit in "About Me" section
2. **Projects:** Add/Edit projects in "Manage Projects"
3. **Services:** Add/Edit services in "Manage Services"
4. **Social Links:** Edit in `frontend/src/components/layout/Footer.jsx` and `frontend/src/pages/Home.jsx`

## 🚢 Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)

1. Create account on deployment platform
2. Create new app
3. Set environment variables from `.env` file
4. Connect MongoDB (use MongoDB Atlas for production)
5. Deploy backend code

**MongoDB Atlas:**
- Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create cluster and database
- Get connection string
- Update `MONGODB_URI` in environment variables

### Frontend Deployment (e.g., Vercel, Netlify)

1. Create account on deployment platform
2. Connect your repository or upload build
3. Set environment variable: `VITE_API_URL` to your backend URL
4. Deploy

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
dist
```

### Environment Variables for Production

**Backend:**
```env
NODE_ENV=production
MONGODB_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<generate-secure-random-string>
ADMIN_EMAIL=<your-admin-email>
ADMIN_PASSWORD=<secure-password>
CORS_ORIGIN=<your-frontend-url>
PORT=5000
```

**Frontend:**
```env
VITE_API_URL=<your-backend-api-url>
```

## 🔧 Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running
mongosh

# If connection fails, check MongoDB service status
# Windows: services.msc (look for MongoDB)
# Linux/Mac: sudo systemctl status mongod
```

### Port Already in Use

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <process-id> /F
```

### CORS Errors

- Ensure `CORS_ORIGIN` in backend `.env` matches your frontend URL
- Check that backend is running on correct port

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📦 Dependencies

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT authentication
- bcryptjs - Password hashing
- cors - Cross-origin resource sharing
- helmet - Security headers
- dotenv - Environment variables
- express-rate-limit - Rate limiting
- express-validator - Input validation

### Frontend
- react - UI library
- react-router-dom - Routing
- axios - HTTP client
- framer-motion - Animations
- react-icons - Icon library
- react-toastify - Notifications
- tailwindcss - CSS framework
- vite - Build tool

## 📝 Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🔒 Security Best Practices

1. **Change default admin credentials** immediately in production
2. **Use strong JWT secret** - Generate using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. **Enable HTTPS** in production
4. **Use environment variables** for all sensitive data
5. **Keep dependencies updated** - Run `npm audit` regularly
6. **Implement rate limiting** - Already configured in backend
7. **Sanitize user inputs** - Already implemented with validation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: your-email@example.com

## 🎯 Roadmap

- [ ] Image upload functionality
- [ ] Blog section
- [ ] Testimonials management
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Social media integration

---

Made with ❤️ by Your Name
