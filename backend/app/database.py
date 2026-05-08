
import motor.motor_asyncio
import os

from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/portfolio")
DATABASE_NAME = os.getenv("DATABASE_NAME", "portfolio_db")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client[DATABASE_NAME]

def get_database():
    return db
