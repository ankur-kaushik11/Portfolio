from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import home, about, education, experience, skills, projects, contact, freelance
import uvicorn

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://portfolio-henna-ten-71.vercel.app"], # In production, replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(home.router, prefix="/api/home", tags=["Home"])
app.include_router(about.router, prefix="/api/about", tags=["About"])
app.include_router(education.router, prefix="/api/education", tags=["Education"])
app.include_router(experience.router, prefix="/api/experience", tags=["Experience"])
app.include_router(skills.router, prefix="/api/skills", tags=["Skills"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(freelance.router, prefix="/api/freelance", tags=["Freelance"])
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Portfolio API"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
