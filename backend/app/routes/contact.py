import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.schemas import ContactMessage, ContactInfo
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

def send_email(name, email, message):
    sender_email = os.getenv("EMAIL_SENDER")
    sender_password = os.getenv("EMAIL_PASSWORD")
    if sender_password:
        sender_password = sender_password.replace(" ", "") # Remove spaces from App Password
    
    receiver_email = os.getenv("RECEIVER_EMAIL")

    if not sender_email or not sender_password:
        return "Email credentials (EMAIL_SENDER/EMAIL_PASSWORD) not found in .env"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = f"Portfolio Message from {name}"

    body = f"You received a new message from your portfolio contact form:\n\nName: {name}\nEmail: {email}\n\nMessage:\n{message}"
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        return "sent"
    except Exception as e:
        return str(e)

@router.post("/")
async def submit_contact(contact: ContactMessage):
    await db.contact_messages.insert_one(contact.dict())
    
    result = send_email(contact.name, contact.email, contact.message)
    
    if result == "sent":
        return {"status": "success", "message": "Message sent successfully!"}
    else:
        return {"status": "error", "message": f"Email failed: {result}"}

@router.get("/", response_model=ContactInfo)
async def get_contact_info():
    info = await db.contact_info.find_one()
    if not info:
        return {
            "email": "ankur@example.com",
            "phone": "+91 9876543210",
            "location": "Jaipur, India",
            "social_media": [
                {"platform": "LinkedIn", "url": "#", "active": True, "order": 0},
                {"platform": "GitHub", "url": "#", "active": True, "order": 1}
            ]
        }
    return info

@router.put("/")
async def update_contact_info(info: ContactInfo):
    await db.contact_info.update_one({}, {"$set": info.dict()}, upsert=True)
    return {"status": "success"}
