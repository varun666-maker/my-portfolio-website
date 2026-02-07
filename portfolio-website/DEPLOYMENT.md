# Deployment Guide

Complete guide for deploying your portfolio website to production.

## 🌐 Recommended Platforms

### Backend
- **Railway** (Recommended) - Free tier, easy setup
- **Render** - Free tier available
- **Heroku** - Paid (no free tier)
- **DigitalOcean** - VPS option

### Frontend
- **Vercel** (Recommended) - Free, automatic deployments
- **Netlify** - Free tier, great for React apps
- **GitHub Pages** - Free but requires configuration

### Database
- **MongoDB Atlas** (Recommended) - Free 512MB cluster
- **Railway MongoDB** - Easy integration

---

## 📦 Part 1: Database Deployment (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new project (e.g., "Portfolio")

### Step 2: Create Database Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select cloud provider (AWS recommended)
4. Choose region closest to you
5. Name cluster: `portfolio-cluster`
6. Click "Create"

### Step 3: Setup Database Access

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `portfolio_admin`
5. Generate strong password (SAVE THIS!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Setup Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for now)
4. Or add your deployment platform's IP addresses
5. Click "Confirm"

### Step 5: Get Connection String

1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `myFirstDatabase` with `portfolio`

Example:
```
mongodb+srv://portfolio_admin:YOUR_PASSWORD@portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

✅ **Save this connection string!** You'll need it for backend deployment.

---

## 🚀 Part 2: Backend Deployment (Railway)

### Step 1: Prepare Backend

1. Make sure your backend code is ready
2. Ensure `package.json` has correct start script:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

### Step 2: Create Railway Account

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select your repository (or choose "Empty project" to upload)

### Step 3: Deploy Backend

1. If using GitHub: Select the repository
2. Railway will auto-detect Node.js
3. Select root path or specify `backend` folder

### Step 4: Add Environment Variables

1. Go to your project
2. Click "Variables" tab
3. Add these variables:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://portfolio_admin:YOUR_PASSWORD@portfolio-cluster.xxxxx.mongodb.net/portfolio
JWT_SECRET=<generate-random-secret>
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=<your-secure-password>
CORS_ORIGIN=*
```

**Generate JWT Secret:**
```bash
# In terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Deploy

1. Railway will automatically deploy
2. Wait for deployment to complete
3. Click "Generate Domain" to get your backend URL
4. Your API URL: `https://your-app.railway.app/api`

### Step 6: Seed Database

Option A - Use Railway CLI:
```bash
railway login
railway link
railway run npm run seed
```

Option B - Create one-time endpoint (temporary):
Add to `server.js`:
```javascript
// Temporary seed endpoint (REMOVE AFTER USE!)
app.get('/api/seed-once', async (req, res) => {
  // Copy seed logic here
  // Run once, then remove this endpoint
});
```

✅ **Save your backend URL!** Example: `https://portfolio-api.railway.app`

---

## 🎨 Part 3: Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

1. Update `.env` with your backend URL:
```env
VITE_API_URL=https://your-backend.railway.app/api
```

2. Test build locally:
```bash
npm run build
npm run preview
```

### Step 2: Deploy to Vercel

#### Method A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend folder
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel
```

#### Method B: Vercel Dashboard
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your repository
5. Select `frontend` folder as root directory
6. Framework Preset: Vite
7. Build command: `npm run build`
8. Output directory: `dist`

### Step 3: Configure Environment Variables

1. In Vercel project settings
2. Go to "Environment Variables"
3. Add:
```
Name: VITE_API_URL
Value: https://your-backend.railway.app/api
```

4. Deploy again for changes to take effect

### Step 4: Configure Domain (Optional)

1. In Vercel project settings
2. Go to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

✅ **Your site is live!** Example: `https://your-portfolio.vercel.app`

---

## 🔧 Part 4: Post-Deployment Configuration

### Update CORS in Backend

1. Go to Railway project
2. Update `CORS_ORIGIN` variable:
```env
CORS_ORIGIN=https://your-portfolio.vercel.app
```

3. Or allow multiple origins:
```env
CORS_ORIGIN=https://your-portfolio.vercel.app,https://www.your-domain.com
```

### Seed Production Database

1. Login to admin panel: `https://your-portfolio.vercel.app/login`
2. Use your production admin credentials
3. Manually add initial projects, services, and content

### Test Everything

- ✅ Visit your website
- ✅ Try all public pages
- ✅ Submit contact form
- ✅ Login to admin panel
- ✅ Create a test project
- ✅ Edit about information
- ✅ Check messages inbox

---

## 🔒 Security Checklist

Before going live:

- [ ] Change default admin credentials
- [ ] Use strong JWT secret (32+ characters)
- [ ] Update CORS to allow only your domain
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Remove any console.logs with sensitive data
- [ ] Test rate limiting is working
- [ ] Verify authentication on all protected routes
- [ ] Update MongoDB Network Access (optional: restrict IPs)

---

## 🎯 Alternative Deployments

### Backend on Render

1. Create account on [Render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables
8. Create Web Service

### Frontend on Netlify

1. Create account on [Netlify.com](https://netlify.com)
2. New site from Git
3. Connect repository
4. Base directory: `frontend`
5. Build command: `npm run build`
6. Publish directory: `frontend/dist`
7. Add environment variables
8. Deploy

---

## 🐛 Common Deployment Issues

### Issue: "Module not found"
**Solution:** Ensure all dependencies are in `dependencies`, not `devDependencies`

### Issue: "Cannot connect to MongoDB"
**Solution:** 
- Check MongoDB Atlas Network Access allows all IPs
- Verify connection string is correct
- Ensure password doesn't contain special characters (or URL encode them)

### Issue: "CORS Error"
**Solution:**
- Update `CORS_ORIGIN` in backend environment variables
- Add your frontend URL

### Issue: "API calls failing"
**Solution:**
- Check `VITE_API_URL` in frontend environment variables
- Ensure backend is running and accessible
- Check browser console for exact error

### Issue: "Build fails on Vercel"
**Solution:**
- Test build locally first: `npm run build`
- Check all imports are correct (case-sensitive)
- Ensure no TypeScript errors

---

## 📊 Monitoring & Maintenance

### Monitor Your Application

**Railway Dashboard:**
- View logs
- Monitor resource usage
- Check deployment status

**Vercel Dashboard:**
- View deployment logs
- Check build times
- Monitor function usage

**MongoDB Atlas:**
- Monitor database performance
- Check connection count
- View slow queries

### Regular Maintenance

1. **Update Dependencies:**
```bash
npm outdated
npm update
```

2. **Security Audits:**
```bash
npm audit
npm audit fix
```

3. **Backup Database:**
- Use MongoDB Atlas automated backups
- Or set up manual exports

4. **Monitor Logs:**
- Check for errors regularly
- Set up error tracking (Sentry, etc.)

---

## 💰 Cost Breakdown

### Free Tier (Perfect for Portfolio)

**MongoDB Atlas:**
- 512MB storage - FREE
- Shared RAM - FREE
- Upgrade: Starts at $9/month for 2GB

**Railway:**
- $5 monthly credit - FREE
- Pay for usage after
- ~$2-5/month for small app

**Vercel:**
- Unlimited projects - FREE
- 100GB bandwidth/month - FREE
- Custom domains - FREE
- Upgrade: $20/month for Pro

**Total: ~$0-7/month** for a full production portfolio!

---

## 🚀 You're Live!

Your portfolio website is now:
- ✅ Globally accessible
- ✅ Running on production servers
- ✅ Connected to cloud database
- ✅ Secured with HTTPS
- ✅ Fully functional admin panel

**Share your portfolio:** `https://your-portfolio.vercel.app`

---

## 📞 Need Help?

Common resources:
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Stack Overflow: Tag your questions appropriately

**Congratulations on deploying your portfolio! 🎉**
