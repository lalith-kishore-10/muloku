# 🚀 Netlify Deployment Guide for Muloku

## Overview
This guide shows you how to deploy Muloku to Netlify (Frontend) and Render (Backend).

---

## Part 1: Deploy Backend to Render (3 minutes)

### Step 1: Sign Up on Render
1. Go to https://render.com/register
2. Sign up with GitHub (lalith-kishore-10)

### Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect GitHub and select `muloku` repository
3. Configure:
   ```
   Name: muloku-server
   Region: Choose closest region
   Branch: master
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

### Step 3: Add Environment Variables
1. Click "Advanced" → "Add Environment Variable"
2. Add:
   ```
   NODE_ENV = production
   CLIENT_URL = (leave blank for now)
   ```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. **Copy your backend URL**: `https://muloku-server-xxxx.onrender.com`

---

## Part 2: Deploy Frontend to Netlify (2 minutes)

### Step 1: Sign Up on Netlify
1. Go to https://app.netlify.com/signup
2. Sign up with GitHub

### Step 2: Import Project
1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Authorize Netlify to access your GitHub
4. Select the `muloku` repository

### Step 3: Configure Build Settings
Netlify should auto-detect Vite, but verify these settings:
```
Base directory: client
Build command: npm run build
Publish directory: client/dist
```

### Step 4: Add Environment Variable
1. Before deploying, click **"Add environment variables"**
2. Add:
   ```
   Key: VITE_SOCKET_URL
   Value: https://muloku-server-xxxx.onrender.com
   ```
   (Use your Render backend URL from Part 1)

### Step 5: Deploy
1. Click **"Deploy site"**
2. Wait 1-2 minutes
3. **Copy your Netlify URL**: `https://amazing-name-xxxxx.netlify.app`

### Step 6: (Optional) Custom Domain
1. Go to **"Domain settings"**
2. Click **"Add custom domain"**
3. You can use a free subdomain like: `muloku-game.netlify.app`

---

## Part 3: Connect Backend to Frontend (1 minute)

### Update Render Environment Variable
1. Go back to **Render dashboard**
2. Open your `muloku-server` service
3. Go to **"Environment"** tab
4. Update `CLIENT_URL`:
   ```
   CLIENT_URL = https://amazing-name-xxxxx.netlify.app
   ```
   (Use your Netlify URL)
5. Click **"Save"** (auto-redeploys in ~30 seconds)

---

## ✅ You're Live!

Your game is now deployed at: **https://amazing-name-xxxxx.netlify.app**

### Test It:
1. Open your Netlify URL
2. Click "Create Room"
3. Share room code with a friend (or open in incognito)
4. Play Sudoku together! 🎮

---

## 🔄 Auto-Deploy on Git Push

Both Render and Netlify automatically redeploy when you push to GitHub:

```bash
# Make changes, then:
git add .
git commit -m "Your changes"
git push

# Both services rebuild automatically!
```

---

## 🆓 Free Tier Details

### Netlify (Frontend)
- ✅ 100 GB bandwidth/month
- ✅ Unlimited sites
- ✅ Automatic HTTPS
- ✅ Always on (no spin-down)
- ✅ Instant cache invalidation

### Render (Backend)
- ✅ 750 hours/month free
- ✅ WebSocket support
- ✅ Automatic HTTPS
- ⚠️ Spins down after 15 min inactivity
- ⚠️ 30-60s wake-up time on first request

---

## 🔧 Troubleshooting

### Frontend Build Fails
**Check**:
1. Go to Netlify dashboard → Site → Deploys
2. Click on the failed deploy
3. Check build logs for errors
4. Ensure `client/package.json` has correct build script

**Fix**: Usually missing environment variable
```
VITE_SOCKET_URL = https://your-backend.onrender.com
```

### Backend Connection Failed
**Symptoms**: Game loads but can't create/join rooms

**Check**:
1. Open browser console (F12)
2. Look for WebSocket errors

**Fix**:
1. Verify VITE_SOCKET_URL points to correct backend
2. Wait 60 seconds if backend is waking up (Render free tier)
3. Check Render logs for errors

### CORS Error
**Symptoms**: "CORS policy blocked" in console

**Fix**:
1. Check CLIENT_URL in Render matches Netlify URL exactly
2. Don't include trailing slash
3. Use the full URL: `https://your-site.netlify.app`

---

## 📊 Netlify Dashboard Features

### Deploy Settings
- **Site settings** → Change site name
- **Domain settings** → Add custom domain
- **Environment variables** → Update VITE_SOCKET_URL

### Deploy Previews
- Each git branch gets a preview URL
- Great for testing before merging

### Analytics (Optional Paid)
- Visitor stats
- Page views
- Performance metrics

---

## 🎨 Custom Subdomain on Netlify

1. Go to **Site settings** → **Domain management**
2. Click **"Options"** → **"Edit site name"**
3. Change to: `muloku-game` or `sudoku-multiplayer`
4. Your URL becomes: `https://muloku-game.netlify.app`

---

## 💡 Performance Tips

### Netlify (Frontend)
- ✅ Already optimized with CDN
- ✅ Auto-minifies assets
- ✅ Compresses images

### Render (Backend)
- First request is slow (free tier spin-up)
- Consider upgrading to $7/month for always-on
- Or use Railway.app (no spin-down on free tier)

---

## 🔐 Environment Variables Reference

### Netlify (Frontend)
```
VITE_SOCKET_URL = https://muloku-server-xxxx.onrender.com
```

### Render (Backend)
```
NODE_ENV = production
CLIENT_URL = https://your-site.netlify.app
```

---

## 📱 Share Your Game

Send your Netlify URL to friends:
- `https://your-site.netlify.app`

They can:
1. Open the link
2. Create or join a room
3. Play together in real-time!

No complicated setup needed! 🎉

---

## 🆘 Need Help?

- **Netlify Docs**: https://docs.netlify.com
- **Render Docs**: https://render.com/docs
- **Build Logs**: Check in respective dashboards
- **GitHub Issues**: Open an issue in your repo

---

**Total Time**: ~6 minutes
**Total Cost**: $0/month
**Your URL**: https://your-site.netlify.app

**Happy deploying! 🚀**
