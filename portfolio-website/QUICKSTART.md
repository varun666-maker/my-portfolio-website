# Quick Start Guide

Get your portfolio website running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (v16+): Run `node --version`
- ✅ MongoDB installed: Run `mongod --version`
- ✅ npm or yarn: Run `npm --version`

## 🚀 Quick Setup (Windows)

### Step 1: Start MongoDB

```powershell
# Start MongoDB service
net start MongoDB

# Or if installed without service:
# Navigate to MongoDB bin folder and run:
# mongod
```

### Step 2: Setup Backend

```powershell
# Navigate to backend folder
cd backend

# Install packages
npm install

# Copy environment file
copy .env.example .env

# Seed database with sample data
npm run seed

# Start backend server
npm run dev
```

✅ Backend running on http://localhost:5000

### Step 3: Setup Frontend

```powershell
# Open NEW terminal/command prompt
# Navigate to frontend folder
cd frontend

# Install packages
npm install

# Copy environment file
copy .env.example .env

# Start frontend server
npm run dev
```

✅ Frontend running on http://localhost:5173

## 🎯 Access Your Portfolio

### Public Website
Open browser: **http://localhost:5173**

### Admin Panel
1. Go to: **http://localhost:5173/login**
2. Login with:
   - Email: `admin@portfolio.com`
   - Password: `Admin@123`
3. Manage your portfolio content!

## 📝 What's Next?

### Customize Your Portfolio

1. **Login to Admin Dashboard**
   - Update "About Me" section
   - Add your own projects
   - Customize services
   - View contact messages

2. **Personalize Design**
   - Edit colors in `frontend/tailwind.config.js`
   - Update social links in Footer and Home page
   - Change profile images

3. **Add Your Content**
   - Replace sample projects with your own
   - Update skills and experience
   - Add resume link

## ⚠️ Common Issues

### MongoDB not starting?
```powershell
# Check if MongoDB service exists
sc query MongoDB

# If not, start manually:
# Navigate to MongoDB bin directory
cd "C:\Program Files\MongoDB\Server\7.0\bin"
mongod
```

### Port already in use?
```powershell
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill the process (use PID from above)
taskkill /PID <PID> /F
```

### Dependencies installation fails?
```powershell
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 🛠️ Development Commands

### Backend
```powershell
npm run dev      # Start with auto-reload
npm start        # Start production mode
npm run seed     # Re-seed database
```

### Frontend
```powershell
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📚 Learn More

- Full documentation: See `README.md` in root folder
- API documentation: See `backend/README.md`
- Frontend guide: See `frontend/README.md`

## 🎉 You're All Set!

Your portfolio website is now running locally. Start customizing it to make it your own!

Need help? Check the main README.md for detailed documentation.
