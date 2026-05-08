from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.schemas import FreelanceService, FreelanceStat, FreelanceWork
from typing import List
from bson import ObjectId

router = APIRouter()

# Services Endpoints
@router.get("/services", response_model=List[FreelanceService])
async def get_services():
    services = await db.freelance_services.find().sort("order", 1).to_list(100)
    for s in services:
        s["id"] = str(s["_id"])
    return services

@router.post("/services")
async def create_service(service: FreelanceService):
    result = await db.freelance_services.insert_one(service.dict(exclude={"id"}))
    return {"id": str(result.inserted_id)}

@router.put("/services/{service_id}")
async def update_service(service_id: str, service: FreelanceService):
    if not ObjectId.is_valid(service_id):
        raise HTTPException(status_code=400, detail="Invalid service ID")
    await db.freelance_services.update_one({"_id": ObjectId(service_id)}, {"$set": service.dict(exclude={"id"})})
    return {"status": "updated"}

@router.delete("/services/{service_id}")
async def delete_service(service_id: str):
    if not ObjectId.is_valid(service_id):
        raise HTTPException(status_code=400, detail="Invalid service ID")
    await db.freelance_services.delete_one({"_id": ObjectId(service_id)})
    return {"status": "deleted"}

# Stats Endpoints
@router.get("/stats", response_model=List[FreelanceStat])
async def get_stats():
    stats = await db.freelance_stats.find().sort("order", 1).to_list(100)
    for s in stats:
        s["id"] = str(s["_id"])
    return stats

@router.post("/stats")
async def create_stat(stat: FreelanceStat):
    result = await db.freelance_stats.insert_one(stat.dict(exclude={"id"}))
    return {"id": str(result.inserted_id)}

@router.put("/stats/{stat_id}")
async def update_stat(stat_id: str, stat: FreelanceStat):
    if not ObjectId.is_valid(stat_id):
        raise HTTPException(status_code=400, detail="Invalid stat ID")
    await db.freelance_stats.update_one({"_id": ObjectId(stat_id)}, {"$set": stat.dict(exclude={"id"})})
    return {"status": "updated"}

@router.delete("/stats/{stat_id}")
async def delete_stat(stat_id: str):
    if not ObjectId.is_valid(stat_id):
        raise HTTPException(status_code=400, detail="Invalid stat ID")
    await db.freelance_stats.delete_one({"_id": ObjectId(stat_id)})
    return {"status": "deleted"}

# Work History Endpoints
@router.get("/work", response_model=List[FreelanceWork])
async def get_work():
    work = await db.freelance_work.find().sort("order", 1).to_list(100)
    for w in work:
        w["id"] = str(w["_id"])
    return work

@router.post("/work")
async def create_work(work: FreelanceWork):
    result = await db.freelance_work.insert_one(work.dict(exclude={"id"}))
    return {"id": str(result.inserted_id)}

@router.put("/work/{work_id}")
async def update_work(work_id: str, work: FreelanceWork):
    if not ObjectId.is_valid(work_id):
        raise HTTPException(status_code=400, detail="Invalid work ID")
    await db.freelance_work.update_one({"_id": ObjectId(work_id)}, {"$set": work.dict(exclude={"id"})})
    return {"status": "updated"}

@router.delete("/work/{work_id}")
async def delete_work(work_id: str):
    if not ObjectId.is_valid(work_id):
        raise HTTPException(status_code=400, detail="Invalid work ID")
    await db.freelance_work.delete_one({"_id": ObjectId(work_id)})
    return {"status": "deleted"}
