# 🚀 ONE-CLICK DEPLOYMENT

Deploy your portfolio to **ONE URL** in 5 minutes!

---

## ⚡ FASTEST DEPLOYMENT (Railway - Recommended)

Railway gives you ONE URL for everything!

### Step 1: Setup MongoDB Atlas (2 minutes)
1. Visit https://www.mongodb.com/cloud/atlas/register
2. Create FREE account
3. Create free cluster
4. **Database Access** → Add user (save username & password)
5. **Network Access** → Add IP: `0.0.0.0/0` (Allow all)
6. Click **Connect** → **Connect your application**
7. Copy connection string: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`

### Step 2: Deploy to Railway (3 minutes)
1. Visit https://railway.app
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Connect your GitHub account
5. Select `portfolio-website` repository
6. Railway auto-detects Node.js project!

### Step 3: Add Environment Variables
Click on your deployed project → **Variables** → Add these:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=change-this-to-random-32-character-string
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin@123
VITE_API_URL=/api
```

### Step 4: Deploy!
Click **Deploy** → Wait 2 minutes → Done! 

**✅ Your portfolio is LIVE at: `https://your-app.up.railway.app`**

### Step 5: Seed Database
Open your deployed URL and add `/api/seed` to run seeding (create this endpoint once)

OR run locally:
```bash
cd backend
# Update .env with MongoDB Atlas URI
npm run seed
```

---

## 🎯 ALTERNATIVE: Vercel + MongoDB Atlas

### Deploy Backend
```bash
# Push to GitHub first
git init
git add .
git commit -m "Portfolio website"
git push origin main

# Deploy
vercel --prod
```

### Deploy Frontend
```bash
cd frontend
vercel --prod
```

---

## 🔗 Custom Domain (Optional)

### Railway:
1. Project Settings → **Domains**
2. Add your domain (e.g., `portfolio.com`)
3. Update DNS: CNAME record pointing to Railway

### Vercel:
1. Project Settings → **Domains**  
2. Add domain → Follow DNS instructions

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas setup complete
- [ ] GitHub repository created & pushed
- [ ] Deployed to Railway/Vercel
- [ ] Environment variables added
- [ ] Database seeded with sample data
- [ ] Website accessible at deployment URL
- [ ] Login works with admin credentials
- [ ] Projects display correctly
- [ ] Contact form submits successfully

---

## 🐛 Troubleshooting

**Site not loading?**
- Check deployment logs in Railway/Vercel dashboard
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

**Login fails?**
- Verify backend is deployed and accessible
- Check `/api/health` endpoint
- Ensure database is seeded

**Projects not showing?**
- Run seed script on production database
- Check `/api/projects` endpoint returns data

---

## 🌐 Access Your Live Site

**Your portfolio URL:** `https://your-app.up.railway.app`

**Admin login:** `https://your-app.up.railway.app/login`
- Email: `admin@portfolio.com`
- Password: `Admin@123`

**⚠️ IMPORTANT:** Change admin password after first login!

---

## 📊 Post-Deployment

1. **Login** to admin dashboard
2. **Update** About section with your info
3. **Edit** projects with real data
4. **Change** admin password
5. **Update** social media links
6. **Add** your profile images
7. **Test** contact form

---

**Need help?** Check [DEPLOY-GUIDE.md](./DEPLOY-GUIDE.md) for detailed instructions!

**Your portfolio is PRODUCTION-READY!** 🎉
