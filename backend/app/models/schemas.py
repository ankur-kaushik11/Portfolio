from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class HomeSection(BaseModel):
    name: str
    profile_photo_url: Optional[str] = "#"
    objective: Optional[str] = ""
    resume_url: Optional[str] = "#"
    why_hire_me: List[str] = []
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class HireReason(BaseModel):
    title: str
    description: str

class AboutSection(BaseModel):
    introduction: str
    professional_summary: str
    years_exp: str = "0"
    projects_count: str = "0"
    why_hire_me: List[HireReason] = []
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class EducationEntry(BaseModel):
    id: Optional[str] = None
    institution: str
    degree: str
    logo_url: Optional[str] = "#"
    field_of_study: Optional[str] = ""
    start_date: Optional[str] = ""
    end_date: Optional[str] = ""
    cgpa: Optional[str] = ""
    subjects: List[str] = []
    achievements: Optional[str] = ""
    description: Optional[str] = ""
    order: Optional[int] = 0

class WorkExperienceEntry(BaseModel):
    id: Optional[str] = None
    company: str
    position: str
    logo_url: Optional[str] = "#"
    employment_type: Optional[str] = ""
    start_date: Optional[str] = ""
    end_date: Optional[str] = ""
    technologies: List[str] = []
    responsibilities: List[str] = []
    description: Optional[str] = ""
    achievements: Optional[str] = ""
    order: Optional[int] = 0

class Skill(BaseModel):
    id: Optional[str] = None
    name: str
    category: Optional[str] = "General"
    proficiency: Optional[int] = 80 # 1-100
    icon_url: Optional[str] = "#"
    order: Optional[int] = 0

class ProjectContributor(BaseModel):
    name: str
    role: str
    avatar_url: Optional[str] = "#"
    profile_url: Optional[str] = "#"

class Project(BaseModel):
    id: Optional[str] = None
    name: str
    category: Optional[str] = "Full Stack"
    short_description: Optional[str] = ""
    full_description: Optional[str] = ""
    idea_source: Optional[str] = ""
    start_date: Optional[str] = ""
    end_date: Optional[str] = ""
    tech_stack: List[str] = []
    screenshots: List[str] = []
    live_demo_url: Optional[str] = "#"
    github_url: Optional[str] = "#"
    contributors: List[ProjectContributor] = []
    challenges: Optional[str] = ""
    learnings: Optional[str] = ""
    future_enhancements: Optional[str] = ""
    order: Optional[int] = 0

class SocialMedia(BaseModel):
    platform: str
    url: str
    active: Optional[bool] = True
    order: Optional[int] = 0

class ContactInfo(BaseModel):
    social_media: List[SocialMedia] = []
    email: Optional[str] = ""
    phone: Optional[str] = ""
    location: Optional[str] = ""

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class FreelanceService(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    icon: Optional[str] = "FaLaptopCode"
    color: Optional[str] = "from-secondary to-blue-600"
    order: Optional[int] = 0

class FreelanceStat(BaseModel):
    id: Optional[str] = None
    label: str
    value: str
    order: Optional[int] = 0

class FreelanceWork(BaseModel):
    id: Optional[str] = None
    client_name: str
    project_title: str
    description: str
    outcome: str
    tech_used: List[str] = []
    link: Optional[str] = "#"
    order: Optional[int] = 0
