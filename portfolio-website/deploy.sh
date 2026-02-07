#!/bin/bash

# 🚀 Portfolio Deployment Script
# This script helps you deploy your portfolio website

echo "🚀 Portfolio Website Deployment Helper"
echo "======================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Portfolio website"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "📋 Deployment Options:"
echo "1. Railway (Recommended - One URL for everything)"
echo "2. Vercel (Frontend) + Railway (Backend)"
echo "3. Render (Frontend + Backend)"
echo "4. Manual deployment"
echo ""

read -p "Choose deployment option (1-4): " option

case $option in
    1)
        echo ""
        echo "🚂 Railway Deployment"
        echo "===================="
        echo ""
        echo "Steps to deploy to Railway:"
        echo "1. Visit https://railway.app and sign up with GitHub"
        echo "2. Click 'New Project' → 'Deploy from GitHub repo'"
        echo "3. Select this repository"
        echo "4. Add environment variables:"
        echo "   - NODE_ENV=production"
        echo "   - MONGODB_URI=your_mongodb_atlas_uri"
        echo "   - JWT_SECRET=your_random_secret"
        echo "   - ADMIN_EMAIL=admin@portfolio.com"
        echo "   - ADMIN_PASSWORD=Admin@123"
        echo "5. Click Deploy!"
        echo ""
        echo "✅ Your site will be live at: https://your-app.up.railway.app"
        ;;
    2)
        echo ""
        echo "⚡ Vercel Deployment"
        echo "==================="
        echo ""
        echo "Installing Vercel CLI..."
        npm install -g vercel
        echo ""
        echo "Deploying..."
        vercel --prod
        ;;
    3)
        echo ""
        echo "🎨 Render Deployment"
        echo "==================="
        echo ""
        echo "Steps to deploy to Render:"
        echo "1. Visit https://render.com and sign up"
        echo "2. Create two web services (backend & frontend)"
        echo "3. Connect your GitHub repository"
        echo "4. Configure build commands as per DEPLOY-GUIDE.md"
        echo "5. Add environment variables"
        echo "6. Deploy!"
        ;;
    4)
        echo ""
        echo "📖 Manual Deployment"
        echo "==================="
        echo ""
        echo "Please refer to DEPLOY-GUIDE.md for detailed instructions"
        echo ""
        ;;
    *)
        echo "Invalid option. Please run the script again."
        ;;
esac

echo ""
echo "📚 Resources:"
echo "- Full deployment guide: DEPLOY-GUIDE.md"
echo "- Quick deployment: DEPLOY.md"
echo "- Setup MongoDB Atlas: https://www.mongodb.com/cloud/atlas"
echo ""
echo "Good luck with your deployment! 🚀"
