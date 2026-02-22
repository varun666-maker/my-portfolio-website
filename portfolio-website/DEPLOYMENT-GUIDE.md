# Deployment Guide — Render (Backend) + Netlify (Frontend)

---

## Step 1: Push Code to GitHub

```bash
git add .
git commit -m "ready for deployment"
git push origin main
```

> ⚠️ Make sure `.env` is in `.gitignore` — never push secrets to GitHub.

---

## Step 2: Setup MongoDB Atlas

🔗 **Open:** [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

1. Sign up / Log in
2. **"Build a Database"** → Free Shared Cluster → Create
3. **Database Access** → Add user → save username/password
4. **Network Access** → "Allow Access from Anywhere" (`0.0.0.0/0`)
5. **Clusters** → **"Connect"** → **"Connect your application"** → Copy connection string:

```
mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## Step 3: Deploy Backend on Render

🔗 **Open:** [https://dashboard.render.com/](https://dashboard.render.com/)

1. Sign up with **GitHub**
2. **"New +"** → **"Web Service"**
3. Connect your repo → Select `my-portfolio-website`
4. Fill settings:

| Setting | What to type |
|---------|-------------|
| **Name** | `portfolio-backend` |
| **Root Directory** | `backend` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free |

5. Click **"Advanced"** → **"Add Environment Variable"** → add these **one by one**:

| Key | What to paste |
|-----|---------------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `MONGODB_URI` | Your MongoDB connection string from Step 2 |
| `JWT_SECRET` | Any long random string |
| `ADMIN_EMAIL` | `admin@portfolio.com` |
| `ADMIN_PASSWORD` | `Admin@123` |
| `CORS_ORIGIN` | `*` |

6. Click **"Create Web Service"** → Wait for build ✅
7. **Copy your backend URL** (e.g. `https://portfolio-backend-xxxx.onrender.com`)

### ✅ Test it
Open in browser: `https://YOUR-RENDER-URL/api/health`

You should see:
```json
{"status":"success","message":"Server is running"}
```

---

## Step 4: Update Your Code with Render URL

After you get your Render URL, update **two files**:

### File 1: `netlify.toml` (line 8)

```toml
to = "https://YOUR-RENDER-URL/api/:splat"
```

### File 2: `frontend/.env` (line 2)

```
VITE_API_URL=https://YOUR-RENDER-URL/api
```

> **Your current Render URL is:** `https://my-portfolio-backend-1-plkv.onrender.com`
> Both files already have this URL. Only update if Render gives you a **new** URL.

Then push the changes:
```bash
git add .
git commit -m "update backend URL"
git push origin main
```

---

## Step 5: Deploy Frontend on Netlify

🔗 **Open:** [https://app.netlify.com/](https://app.netlify.com/)

1. Sign up with **GitHub**
2. **"Add new site"** → **"Import an existing project"** → GitHub
3. Choose your `my-portfolio-website` repo
4. Fill settings:

| Setting | What to type |
|---------|-------------|
| **Base directory** | `frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | `frontend/dist` |

5. Click **"Show advanced"** → **"New variable"**:

| Key | What to paste |
|-----|---------------|
| `VITE_API_URL` | `https://YOUR-RENDER-URL/api` |

6. Click **"Deploy site"** ✅
7. Your site is live at: `https://your-site.netlify.app`

---

## Step 6: Update CORS on Render

🔗 **Go back to:** [https://dashboard.render.com/](https://dashboard.render.com/)

1. Open your `portfolio-backend` service
2. Go to **"Environment"** tab
3. Change `CORS_ORIGIN` from `*` to your Netlify URL:
```
https://your-site.netlify.app
```
4. **Save** → auto-redeploys

---

## Step 7: Seed Database

Run locally after backend is deployed:

```bash
cd backend
set MONGODB_URI=mongodb+srv://varun143877_db_user:XTdTflJpYSJhcYbw@cluster0.g8l8rq3.mongodb.net/portfolio?retryWrites=true&w=majority
npm run seed
```

---

## ✅ Final Checklist

- [ ] Backend health: `https://YOUR-RENDER-URL/api/health` returns success
- [ ] Frontend loads at Netlify URL
- [ ] Admin login works at `/admin`
- [ ] CRUD operations work
- [ ] `CORS_ORIGIN` updated to Netlify URL

---

## Where Links Go — Summary

| Link | Where to paste it |
|------|-------------------|
| **Render URL** (e.g. `https://portfolio-backend-xxxx.onrender.com`) | → `netlify.toml` line 8, → `frontend/.env` line 2, → Netlify env var `VITE_API_URL` |
| **Netlify URL** (e.g. `https://your-site.netlify.app`) | → Render env var `CORS_ORIGIN` |
| **MongoDB URI** | → Render env var `MONGODB_URI` |

---

## Quick Links

| Dashboard | URL |
|-----------|-----|
| MongoDB Atlas | [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) |
| Render | [dashboard.render.com](https://dashboard.render.com/) |
| Netlify | [app.netlify.com](https://app.netlify.com/) |
