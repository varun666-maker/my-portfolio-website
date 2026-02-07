# 🚀 Deployment Guide - Portfolio Website

This guide will help you deploy your portfolio website to production with **one single URL**.

---

## 📋 Prerequisites

- GitHub account
- MongoDB Atlas account (free tier)
- Choose ONE deployment platform (recommended: Vercel or Railway)

---

## ⚡ Quick Deploy (5 Minutes) - RECOMMENDED

### Option 1: Vercel (Easiest - One Click Deploy)

**Step 1: Setup MongoDB Atlas (Cloud Database)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create free account → Create cluster (free tier)
3. Database Access → Add Database User (username + password)
4. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
5. Click "Connect" → Choose "Connect your application"
6. Copy your connection string (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/portfolio`)

**Step 2: Push to GitHub**
```bash
cd "c:\Users\91903\Downloads\SQL\portfolio-website"
git init
git add .
git commit -m "Initial commit - Portfolio website"
git branch -M main
# Create new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
git push -u origin main
```

**Step 3: Deploy to Vercel**
1. Go to [Vercel](https://vercel.com) → Sign up with GitHub
2. Click "Add New Project" → Import your GitHub repository
3. **Framework Preset**: Select "Vite"
4. **Root Directory**: Select `frontend`
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. Click "Environment Variables" and add:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```
8. Click "Deploy"

**Step 4: Deploy Backend to Vercel**
1. In Vercel, click "Add New Project" again
2. Import same repository
3. **Root Directory**: Select `backend`
4. **Build Command**: `npm install`
5. **Output Directory**: `.`
6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_random_string_min_32_chars
   ADMIN_EMAIL=admin@portfolio.com
   ADMIN_PASSWORD=Admin@123
   ```
7. Click "Deploy"
8. Copy the deployed backend URL (e.g., `https://portfolio-backend-xyz.vercel.app`)

**Step 5: Update Frontend with Backend URL**
1. Go to your frontend Vercel project
2. Settings → Environment Variables
3. Update `VITE_API_URL` to your backend URL
4. Redeploy frontend

**Step 6: Seed Database**
```bash
# In your local terminal
cd backend
# Update .env with MongoDB Atlas connection string
npm run seed
```

**✅ Done! Your portfolio is live at: `https://your-portfolio.vercel.app`**

---

### Option 2: Railway (Full Stack in One Project)

**Step 1: Setup MongoDB Atlas** (same as above)

**Step 2: Deploy to Railway**
1. Go to [Railway](https://railway.app) → Sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will detect both frontend and backend

**Step 3: Configure Services**
1. Add environment variables for backend:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_random_string
   ADMIN_EMAIL=admin@portfolio.com
   ADMIN_PASSWORD=Admin@123
   ```

2. Add environment variables for frontend:
   ```
   VITE_API_URL=https://portfolio-backend.up.railway.app/api
   ```

3. Click "Deploy"

**✅ Done! Access at: `https://your-app.up.railway.app`**

---

### Option 3: Render (Free Tier Available)

**Step 1: Setup MongoDB Atlas** (same as above)

**Step 2: Deploy Backend**
1. Go to [Render](https://render.com) → Sign up
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name**: portfolio-backend
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables (same as Railway)
6. Click "Create Web Service"
7. Copy the service URL (e.g., `https://portfolio-backend.onrender.com`)

**Step 3: Deploy Frontend**
1. Click "New +" → "Static Site"
2. Connect same repository
3. Configure:
   - **Name**: portfolio-frontend
   - **Root Directory**: frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add Environment Variable:
   ```
   VITE_API_URL=https://portfolio-backend.onrender.com/api
   ```
5. Click "Create Static Site"

**✅ Done! Access at: `https://portfolio-frontend.onrender.com`**

---

## 🔐 Security - IMPORTANT!

After deployment, immediately:

1. **Change Admin Password**
   - Login to your admin dashboard
   - Change default password from Admin@123

2. **Update JWT Secret**
   - Generate random string: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Update in your deployment platform's environment variables

3. **Restrict MongoDB Access**
   - In MongoDB Atlas, restrict IP addresses if possible
   - Use strong database password

---

## 🌐 Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `www.yourname.com`)
3. Update DNS records as instructed

### Railway / Render
1. Project Settings → Custom Domain
2. Follow DNS configuration instructions

---

## 📊 Seed Production Database

After deployment, seed your database:

```bash
# Method 1: From local terminal
cd backend
# Update .env with production MongoDB URI
npm run seed

# Method 2: Via deployed backend
# Create a temporary endpoint in your deployed backend:
# POST https://your-backend.com/api/admin/seed (one-time use)
```

---

## 🐛 Troubleshooting

### Login not working?
- Check if backend is running: Visit `https://your-backend-url.com/api/health`
- Verify MongoDB connection in deployment logs
- Ensure `VITE_API_URL` in frontend points to correct backend URL
- Check browser console for CORS errors

### Projects not showing?
- Run seed script on production database
- Check API endpoint: `https://your-backend-url.com/api/projects`

### Build errors?
- Clear node_modules and package-lock.json
- Reinstall: `npm install`
- Check Node.js version matches (use v18 or v20)

---

## 📱 Testing Your Deployed Site

1. **Homepage**: Should load with hero section
2. **Portfolio**: Should show your 6 projects
3. **Login**: Test at `/login` with admin credentials
4. **Admin Dashboard**: Verify you can add/edit projects
5. **Contact Form**: Submit test message

---

## 🎯 Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All images display properly
- [ ] Login works
- [ ] Projects are visible
- [ ] Contact form submits
- [ ] Mobile responsive
- [ ] Changed default admin password
- [ ] Updated social media links
- [ ] Added custom domain (optional)
- [ ] Set up analytics (Google Analytics)

---

## 💡 Quick Links

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas

---

**Need help?** Check deployment platform logs or backend terminal for error messages.

**Your portfolio is production-ready!** 🚀
