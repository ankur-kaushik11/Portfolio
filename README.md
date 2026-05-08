# Modern Portfolio Website with Admin Dashboard

A premium, fully responsive portfolio website featuring real-time content management, glassmorphism design, and advanced animations.

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, React Router, React Icons.
- **Backend**: FastAPI (REST API), Python Django (Auth/Admin).
- **Database**: MongoDB (Motor for async operations).
- **Animations**: Framer Motion for smooth scroll-triggered and hover effects.

## 📁 Project Structure

```text
MY_PORTFOLIO/
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # UI Components & Sections
│   │   ├── pages/        # Main pages (Home, Login, Dashboard)
│   │   └── styles/       # Global CSS & Tailwind
│   └── ...
└── backend/              # Python application
    ├── app/              # FastAPI application (Core API)
    │   ├── routes/       # API endpoints per section
    │   ├── models/       # Pydantic schemas
    │   └── database.py   # MongoDB connection
    ├── django_project/   # Django application (Auth/Admin)
    └── requirements.txt  # Python dependencies
```

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v16+)
- Python (v3.10+)
- MongoDB (Running locally or via Atlas)

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Create a `.env` file in the `backend` folder:
   ```env
   MONGO_URL=mongodb://localhost:27017
   DATABASE_NAME=portfolio_db
   ```
4. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```
5. (Optional) Run Django for the admin panel:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver 8001
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## ✨ Features

- **Glassmorphism UI**: Semi-transparent, blurred backgrounds for a premium feel.
- **Dynamic Timelines**: Vertical and horizontal timelines for Education and Experience.
- **Real-time Admin**: Manage your portfolio content without touching the code.
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewports.
- **Advanced Animations**: Staggered fade-ins, hover scales, and parallax effects.

## 🔐 Admin Access
- Navigate to `/login` to access the dashboard.
- Default simulation allows access by clicking "Access Dashboard".
- Connect the frontend to backend auth endpoints in `Login.jsx` for production security.
