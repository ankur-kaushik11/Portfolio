from fastapi import APIRouter, HTTPException, Depends
from app.database import db
from app.models.schemas import HomeSection
from typing import Optional

router = APIRouter()

@router.get("/", response_model=HomeSection)
async def get_home():
    home = await db.home_section.find_one()
    if not home:
        # Return default if not found
        return {
            "name": "Your Name",
            "profile_photo_url": "",
            "objective": "Objective statement here",
            "resume_url": "#",
            "why_hire_me": []
        }
    return home

@router.put("/")
async def update_home(data: HomeSection):
    result = await db.home_section.update_one(
        {}, 
        {"$set": data.dict()},
        upsert=True
    )
    return {"status": "success"}
