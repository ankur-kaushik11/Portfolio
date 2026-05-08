from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.schemas import Project
from typing import List
from bson import ObjectId

router = APIRouter()

@router.get("/", response_model=List[Project])
async def get_projects():
    projects = await db.projects.find().sort("order", 1).to_list(100)
    # Convert ObjectId to string for each project
    for p in projects:
        p["id"] = str(p["_id"])
    return projects

@router.post("/")
async def create_project(project: Project):
    result = await db.projects.insert_one(project.dict())
    return {"id": str(result.inserted_id)}

@router.put("/{project_id}")
async def update_project(project_id: str, project: Project):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    await db.projects.update_one({"_id": ObjectId(project_id)}, {"$set": project.dict()})
    return {"status": "updated"}

@router.delete("/{project_id}")
async def delete_project(project_id: str):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    await db.projects.delete_one({"_id": ObjectId(project_id)})
    return {"status": "deleted"}
