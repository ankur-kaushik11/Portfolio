# 🚀 Professional Portfolio Deployment Guide (0 to Live)

Follow these steps to deploy your full-stack portfolio for free using industry-standard tools.

---

## Phase 1: The Database (MongoDB Atlas) ✅ DONE
Your data has already been migrated to Atlas. 

1. **Connection String**: 
   `mongodb+srv://ankurkaushik672_db_user:R4x527hBtVg4VUyp@portfolio.gxsdvih.mongodb.net/?appName=Portfolio`
2. **IP Whitelist**: Ensure "Network Access" in Atlas is set to **"Allow Access from Anywhere"** (0.0.0.0/0) so Render can connect.

---

## Phase 2: The Backend (Render.com)
Render is excellent for hosting FastAPI applications for free.

1. **Create GitHub Repo**: Push your `backend` folder to a new private or public GitHub repository.
2. **Sign up for Render**: Go to [Render.com](https://render.com/) and connect your GitHub.
3. **New Web Service**: Click **"New +"** -> **"Web Service"** and select your backend repo.
4. **Configuration**:
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables**: Click the **"Environment"** tab and add these from your `.env`:
   - `MONGO_URL`: (Your Atlas connection string)
   - `DATABASE_NAME`: `portfolio_db`
   - `EMAIL_SENDER`: `ankurkaushik672@gmail.com`
   - `EMAIL_PASSWORD`: (Your Gmail App Password)
   - `RECEIVER_EMAIL`: `ankurkaushik672@gmail.com`
   - `CLOUDINARY_CLOUD_NAME`: `dm43thrry`
   - `CLOUDINARY_UPLOAD_PRESET`: `portfolio`
6. **Deploy**: Render will build and provide a URL (e.g., `https://portfolio-backend.onrender.com`). **Copy this URL!**

---

## Phase 3: The Frontend (Vercel)
Vercel is the fastest way to host React/Vite apps.

1. **Push to GitHub**: Push your `frontend` folder to a separate GitHub repository.
2. **Sign up for Vercel**: Go to [Vercel.com](https://vercel.com/) and connect your GitHub.
3. **Import Project**: Select your frontend repo.
4. **Build Settings**: Vercel usually detects Vite automatically.
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables**: Add these from your `frontend/.env`:
   - `VITE_API_URL`: (Paste your **Render URL** from Phase 2 here)
   - `VITE_ADMIN_USER`: `ankurkaushik11`
   - `VITE_ADMIN_PASS`: `Ankur@1234`
   - `VITE_CLOUDINARY_CLOUD_NAME`: `dm43thrry`
   - `VITE_CLOUDINARY_UPLOAD_PRESET`: `portfolio`
6. **Deploy**: Click **"Deploy"**. You will get a production URL (e.g., `https://my-portfolio.vercel.app`).

---

## Phase 4: Final Connection & CORS
For security, your backend needs to know it's okay to talk to your new Vercel URL.

1. Go back to your backend code in `app/main.py`.
2. Update the `origins` list in the CORS middleware (or use another env var for this):
   ```python
   allow_origins=["*"], # Change to ["https://your-portfolio.vercel.app"] for max security
   ```
3. Push this change to GitHub. Render will automatically re-deploy.

---

## Critical Tips for Free Tiers:
- **Cold Starts**: Render's free tier "sleeps" after 15 minutes of inactivity. The first visit might take ~30s to load.
- **VITE_ Prefixes**: Always ensure frontend variables start with `VITE_` or Vite will ignore them.
- **Build Logs**: If it fails, check the "Logs" tab on Vercel or Render for specific error messages.

---
**Your site is now live and synchronized! 🌐**
