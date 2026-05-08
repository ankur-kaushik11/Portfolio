from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.schemas import AboutSection
from bson import ObjectId

router = APIRouter()

@router.get("/", response_model=AboutSection)
async def get_about():
    about = await db.about.find_one()
    if not about:
        return {"introduction": "", "professional_summary": ""}
    return about

@router.put("/")
async def update_about(about: AboutSection):
    await db.about.update_one({}, {"$set": about.dict()}, upsert=True)
    return {"status": "updated"}
