from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.schemas import EducationEntry
from typing import List
from bson import ObjectId

router = APIRouter()

@router.get("/", response_model=List[EducationEntry])
async def get_education():
    edu = await db.education.find().sort("order", 1).to_list(100)
    for e in edu:
        e["id"] = str(e.pop("_id"))
    return edu

@router.post("/")
async def create_education(entry: EducationEntry):
    result = await db.education.insert_one(entry.dict())
    return {"id": str(result.inserted_id)}

@router.put("/{entry_id}")
async def update_education(entry_id: str, entry: EducationEntry):
    if not ObjectId.is_valid(entry_id):
        raise HTTPException(status_code=400, detail="Invalid entry ID")
    await db.education.update_one({"_id": ObjectId(entry_id)}, {"$set": entry.dict()})
    return {"status": "updated"}

@router.delete("/{entry_id}")
async def delete_education(entry_id: str):
    if not ObjectId.is_valid(entry_id):
        raise HTTPException(status_code=400, detail="Invalid entry ID")
    await db.education.delete_one({"_id": ObjectId(entry_id)})
    return {"status": "deleted"}
