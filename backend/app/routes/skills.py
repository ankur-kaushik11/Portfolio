from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.schemas import Skill
from typing import List
from bson import ObjectId

router = APIRouter()

@router.get("/", response_model=List[Skill])
async def get_skills():
    skills = await db.skills.find().sort("order", 1).to_list(100)
    # Convert _id to id for frontend
    for s in skills:
        s["id"] = str(s.pop("_id"))
    return skills

@router.post("/")
async def create_skill(skill: Skill):
    result = await db.skills.insert_one(skill.dict())
    return {"id": str(result.inserted_id)}

@router.put("/{skill_id}")
async def update_skill(skill_id: str, skill: Skill):
    if not ObjectId.is_valid(skill_id):
        raise HTTPException(status_code=400, detail="Invalid skill ID")
    await db.skills.update_one({"_id": ObjectId(skill_id)}, {"$set": skill.dict()})
    return {"status": "updated"}

@router.delete("/{skill_id}")
async def delete_skill(skill_id: str):
    if not ObjectId.is_valid(skill_id):
        raise HTTPException(status_code=400, detail="Invalid skill ID")
    await db.skills.delete_one({"_id": ObjectId(skill_id)})
    return {"status": "deleted"}
