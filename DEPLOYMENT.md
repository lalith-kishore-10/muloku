# 🚀 Muloku Deployment Guide

This guide will help you deploy Muloku online using free hosting services.

## 📋 Table of Contents
1. [Recommended Setup](#recommended-setup)
2. [Deploy Backend to Render](#deploy-backend-to-render)
3. [Deploy Frontend to Vercel](#deploy-frontend-to-vercel)
4. [Alternative Deployments](#alternative-deployments)
5. [Environment Variables](#environment-variables)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Recommended Setup

**Backend**: Render.com (Free tier)
**Frontend**: Vercel (Free tier)

This combination provides:
- ✅ Free hosting
- ✅ Automatic deployments
- ✅ HTTPS by default
- ✅ WebSocket support
- ✅ Custom domains

---

## 🖥️ Deploy Backend to Render

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   cd f:\Github\Muloku
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**:
   - Create a new repository on GitHub
   - Run:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/muloku.git
     git branch -M main
     git push -u origin main
     ```

### Step 2: Deploy to Render

1. **Go to [Render.com](https://render.com)** and sign up/login

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `muloku` repository

3. **Configure the Service**:
   ```
   Name: muloku-server
   Region: Choose closest to you
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Set Environment Variables**:
   - Click "Advanced" → "Add Environment Variable"
   - Add:
     ```
     NODE_ENV=production
     CLIENT_URL=https://your-frontend-url.vercel.app
     ```
   - Note: You'll update CLIENT_URL after deploying frontend

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy your backend URL: `https://muloku-server.onrender.com`

### Step 3: Update Server Package.json

The server `package.json` should have:
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  }
}
```

---

## 🌐 Deploy Frontend to Vercel

### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 2: Deploy via Vercel Dashboard

1. **Go to [Vercel.com](https://vercel.com)** and sign up/login

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select `muloku` repository

3. **Configure Project**:
   ```
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Set Environment Variables**:
   - Go to "Settings" → "Environment Variables"
   - Add:
     ```
     Name: VITE_SOCKET_URL
     Value: https://muloku-server.onrender.com
     ```
   - Use your Render backend URL from Step 2

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment (1-2 minutes)
   - Copy your frontend URL: `https://muloku.vercel.app`

### Step 3: Update Backend CORS

1. Go back to **Render Dashboard**
2. Open your `muloku-server` service
3. Go to "Environment" tab
4. Update `CLIENT_URL` to your Vercel URL:
   ```
   CLIENT_URL=https://muloku.vercel.app
   ```
5. Save and redeploy

---

## 🔄 Alternative Deployments

### Option 1: Both on Render

**Backend**: Web Service (as above)
**Frontend**: Static Site

1. Create a new Static Site on Render
2. Configure:
   ```
   Build Command: cd client && npm install && npm run build
   Publish Directory: client/dist
   ```
3. Add environment variable:
   ```
   VITE_SOCKET_URL=https://muloku-server.onrender.com
   ```

### Option 2: Railway.app

1. Go to [Railway.app](https://railway.app)
2. Create new project from GitHub
3. Railway auto-detects Node.js
4. Add environment variables in dashboard
5. Get deployment URL

### Option 3: Fly.io

1. Install Fly CLI: `https://fly.io/docs/hands-on/install-flyctl/`
2. In server directory:
   ```bash
   flyctl launch
   flyctl deploy
   ```
3. In client directory, deploy to Vercel

---

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=3000
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.vercel.app
```

### Frontend (.env)
```env
VITE_SOCKET_URL=https://your-backend-url.onrender.com
```

**Important**: 
- Never commit `.env` files to Git
- Use `.env.example` as templates
- Set environment variables in hosting dashboard

---

## 🐛 Troubleshooting

### Issue: "CORS Error"

**Solution**: Ensure CLIENT_URL matches your frontend URL exactly
```javascript
// In Render environment variables
CLIENT_URL=https://muloku.vercel.app
```

### Issue: "WebSocket Connection Failed"

**Solution**: 
1. Check backend is deployed and running
2. Visit `/health` endpoint: `https://muloku-server.onrender.com/health`
3. Ensure VITE_SOCKET_URL is set correctly in Vercel

### Issue: "Service Unavailable on Render"

**Solution**: Free tier on Render spins down after 15 minutes of inactivity
- First request may take 30-60 seconds to wake up
- Consider upgrading to paid tier for always-on service
- Or deploy backend to Railway (no spin-down on free tier)

### Issue: "Build Failed on Vercel"

**Solution**:
1. Check build logs in Vercel dashboard
2. Ensure `client/package.json` has correct build script:
   ```json
   "scripts": {
     "build": "vite build"
   }
   ```
3. Verify all dependencies are in `package.json`

### Issue: "Environment Variables Not Working"

**Solution**:
1. Redeploy after adding environment variables
2. For Vercel: Variables must start with `VITE_`
3. For Render: Restart service after updating

---

## ✅ Deployment Checklist

### Before Deploying:
- [ ] Code committed to Git
- [ ] Repository pushed to GitHub
- [ ] `.gitignore` includes `node_modules/`, `.env`
- [ ] Both `package.json` files have correct scripts

### Backend Deployment:
- [ ] Render account created
- [ ] Web service created and deployed
- [ ] Backend URL copied
- [ ] `/health` endpoint responds
- [ ] Environment variables set

### Frontend Deployment:
- [ ] Vercel account created
- [ ] Project imported and deployed
- [ ] Frontend URL copied
- [ ] VITE_SOCKET_URL environment variable set
- [ ] Site loads in browser

### Final Steps:
- [ ] Update backend CLIENT_URL with frontend URL
- [ ] Backend redeployed
- [ ] Test: Create room on frontend
- [ ] Test: Join room from another device
- [ ] Test: Play game end-to-end

---

## 🔗 Quick Links After Deployment

**Frontend**: `https://muloku.vercel.app`
**Backend**: `https://muloku-server.onrender.com`
**Health Check**: `https://muloku-server.onrender.com/health`

---

## 💰 Cost Breakdown

### Free Tier Limits:

**Render**:
- ✅ 750 hours/month free
- ✅ Spins down after 15 min inactivity
- ✅ Unlimited bandwidth
- ⚠️ 30-60s wake-up time on first request

**Vercel**:
- ✅ 100 GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Always on (no spin-down)
- ✅ Automatic HTTPS

**Total**: $0/month for hobby use!

---

## 🚀 Continuous Deployment

Both Render and Vercel support automatic deployments:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update feature"
   git push
   ```

2. **Automatic Deploy**:
   - Render rebuilds backend automatically
   - Vercel rebuilds frontend automatically
   - Changes live in 2-3 minutes

---

## 📱 Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to Project → Settings → Domains
2. Add your domain (e.g., `muloku.com`)
3. Update DNS records as instructed

### For Render (Backend):
1. Go to Service → Settings → Custom Domain
2. Add your API domain (e.g., `api.muloku.com`)
3. Update DNS records

**Note**: Custom domains are free on both platforms!

---

## 🎉 You're Done!

Your Muloku game is now live and accessible worldwide!

Share your URL with friends and start playing! 🎮

**Need help?** Check the troubleshooting section or open an issue on GitHub.

---

**Created**: November 24, 2025
**Version**: 1.0.0
**License**: MIT
