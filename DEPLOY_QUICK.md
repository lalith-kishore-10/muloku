# 🚀 Quick Deployment Guide

## Fastest Way to Deploy Muloku Online

### Prerequisites

- GitHub account
- Render account (for backend): https://render.com
- Vercel account (for frontend): https://vercel.com

---

## 📦 Step 1: Push to GitHub

```bash
# In f:\Github\Muloku directory
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/muloku.git
git branch -M main
git push -u origin main
```

---

## 🖥️ Step 2: Deploy Backend (Render)

1. Go to https://render.com
2. New → Web Service
3. Connect GitHub → Select `muloku` repo
4. Settings:
   - **Name**: `muloku-server`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Environment Variables:
   - `NODE_ENV` = `production`
   - `CLIENT_URL` = (leave blank for now)
6. Create Service
7. **Copy your backend URL**: `https://muloku-server.onrender.com`

---

## 🌐 Step 3: Deploy Frontend (Vercel)

1. Go to https://vercel.com
2. New Project → Import from GitHub → Select `muloku` repo
3. Settings:
   - **Framework**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Environment Variables:
   - `VITE_SOCKET_URL` = `https://muloku-server.onrender.com` (your backend URL)
5. Deploy
6. **Copy your frontend URL**: `https://muloku.vercel.app`

---

## 🔗 Step 4: Connect Backend to Frontend

1. Go back to **Render**
2. Open `muloku-server` service
3. Environment tab
4. Update `CLIENT_URL` = `https://muloku.vercel.app` (your frontend URL)
5. Save (auto redeploys)

---

## ✅ Done!

Your game is live at: `https://muloku.vercel.app`

**Test it**:

1. Open the URL
2. Create a room
3. Open in another browser/device
4. Join with the room code
5. Play! 🎮

---

## ⚠️ Important Notes

- **First load**: Render free tier spins down after 15 min. First request takes 30-60s
- **Always on**: Upgrade Render plan or use Railway for no spin-down
- **Free limits**: 750 hours/month on Render, 100GB bandwidth on Vercel

---

## 📖 Full Documentation

See **DEPLOYMENT.md** for:

- Detailed step-by-step guide
- Alternative deployment options
- Troubleshooting
- Custom domains
- Environment variables

---

## 🆘 Troubleshooting

**CORS Error**: Check CLIENT_URL matches frontend URL exactly

**Connection Failed**: Ensure VITE_SOCKET_URL points to backend

**Build Failed**: Check build logs in dashboard

**Slow first load**: Free tier on Render - wait 30-60s for wake up

---

**Need help?** Open an issue or check DEPLOYMENT.md

**Happy deploying! 🎉**
