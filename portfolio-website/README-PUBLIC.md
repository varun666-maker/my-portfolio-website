# 🎨 Portfolio Website - Public Version

A beautiful, modern portfolio website built with React, Vite, Tailwind CSS, Node.js, Express, and MongoDB.

## ✨ Features

- 🏠 **Home Page** - Hero section with introduction and call-to-action
- 👤 **About Page** - Professional background and skills showcase
- 💼 **Portfolio Page** - Project gallery with filtering by category
- 🛠️ **Services Page** - Services offered with detailed descriptions
- 📬 **Contact Page** - Contact form for inquiries
- 📱 **Responsive Design** - Mobile-friendly across all devices
- 🎭 **Smooth Animations** - Framer Motion animations
- 🎨 **Modern UI** - Tailwind CSS styling

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   npm run seed  # Seed sample data
   npm run dev   # Start backend server
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev   # Start frontend server
   ```

4. **Access the website**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## 📁 Project Structure

```
portfolio-website/
├── backend/          # Node.js + Express API
│   ├── config/       # Database configuration
│   ├── controllers/  # Route controllers
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── middleware/   # Custom middleware
│   ├── scripts/      # Database seeding
│   └── server.js     # Entry point
├── frontend/         # React + Vite application
│   ├── public/       # Static assets
│   └── src/
│       ├── components/  # Reusable components
│       ├── pages/       # Page components
│       ├── utils/       # Utility functions
│       └── App.jsx      # Main app component
└── README.md
```

## 🎯 Available Pages

- **/** - Home page with hero section
- **/about** - About page with skills and experience
- **/portfolio** - Portfolio with project filtering
- **/services** - Services offered
- **/contact** - Contact form

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- React Toastify
- React Icons

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Helmet (Security)
- CORS
- Express Rate Limit

## 📝 Customization

### Update Projects
Edit `backend/scripts/seed.js` to add your own projects, then run:
```bash
cd backend
npm run seed
```

### Update Content
- **Projects**: Edit data in `backend/scripts/seed.js`
- **Services**: Modify services data in seed file
- **About Section**: Update about information in seed file
- **Colors**: Customize in `frontend/tailwind.config.js`
- **Contact Info**: Update in `frontend/src/pages/Contact.jsx`

### Change Social Links
Update social media links in:
- `frontend/src/components/layout/Footer.jsx`
- `frontend/src/pages/Home.jsx`

## 🚀 Deployment

See [DEPLOY-GUIDE.md](./DEPLOY-GUIDE.md) for detailed deployment instructions.

### Quick Deploy Options:
- **Railway** (Recommended - One URL)
- **Vercel** (Frontend + Backend)
- **Render** (Free tier available)
- **Netlify** (Frontend) + **Railway** (Backend)

## 📊 Sample Data

The seed script includes:
- 6 Portfolio Projects
  - Weed Detection (Full Stack)
  - AI-Interview Assistant (Full Stack)
  - Event Hub (Mobile App)
  - + 3 UI/UX Design projects
- 6 Services
- Complete About section

## 🔧 Development Scripts

### Backend
```bash
npm run dev    # Start development server with nodemon
npm start      # Start production server
npm run seed   # Seed database with sample data
```

### Frontend
```bash
npm run dev    # Start Vite dev server
npm run build  # Build for production
npm run preview # Preview production build
```

## 🌐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📱 Features Details

### Portfolio Filtering
- Filter by: All, Web Development, Mobile App, UI/UX Design, Full Stack
- Animated transitions between filters
- Project detail view with technologies used

### Contact Form
- Form validation
- Email notifications (backend configured)
- Success/error toast messages
- Message storage in database

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly navigation
- Optimized images

## 🎨 Color Scheme

Primary colors defined in `tailwind.config.js`:
- Primary: Blue gradient (50-900)
- Secondary: Purple gradient (50-900)
- Dark: Slate gradient (50-900)

## 📄 License

MIT License - feel free to use this project for your portfolio!

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize!

## 📧 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ using React, Node.js, and MongoDB**
