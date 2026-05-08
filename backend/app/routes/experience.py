from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.schemas import WorkExperienceEntry
from typing import List
from bson import ObjectId

router = APIRouter()

@router.get("/", response_model=List[WorkExperienceEntry])
async def get_experience():
    exp = await db.experience.find().sort("order", 1).to_list(100)
    for e in exp:
        e["id"] = str(e.pop("_id"))
    return exp

@router.post("/")
async def create_experience(entry: WorkExperienceEntry):
    result = await db.experience.insert_one(entry.dict())
    return {"id": str(result.inserted_id)}

@router.put("/{entry_id}")
async def update_experience(entry_id: str, entry: WorkExperienceEntry):
    if not ObjectId.is_valid(entry_id):
        raise HTTPException(status_code=400, detail="Invalid entry ID")
    await db.experience.update_one({"_id": ObjectId(entry_id)}, {"$set": entry.dict()})
    return {"status": "updated"}

@router.delete("/{entry_id}")
async def delete_experience(entry_id: str):
    if not ObjectId.is_valid(entry_id):
        raise HTTPException(status_code=400, detail="Invalid entry ID")
    await db.experience.delete_one({"_id": ObjectId(entry_id)})
    return {"status": "deleted"}
