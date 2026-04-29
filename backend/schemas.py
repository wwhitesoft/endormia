from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# --- Waitlist ---

class WaitlistCreate(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    source: Optional[str] = "website"


class WaitlistResponse(BaseModel):
    id: int
    email: str
    name: Optional[str]
    source: str
    created_at: datetime

    model_config = {"from_attributes": True}


# --- User ---

class UserCreate(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    preferences: Optional[dict] = {}


class UserUpdate(BaseModel):
    name: Optional[str] = None
    preferences: Optional[dict] = None


class UserResponse(BaseModel):
    id: int
    email: str
    name: Optional[str]
    preferences: str
    created_at: datetime

    model_config = {"from_attributes": True}


# --- Sleep Session ---

class SleepSessionCreate(BaseModel):
    user_id: int
    date: str
    duration: float
    quality_score: Optional[float] = None
    stages: Optional[dict] = {}
    environment: Optional[dict] = {}


class SleepSessionUpdate(BaseModel):
    duration: Optional[float] = None
    quality_score: Optional[float] = None
    stages: Optional[dict] = None
    environment: Optional[dict] = None


class SleepSessionResponse(BaseModel):
    id: int
    user_id: int
    date: str
    duration: float
    quality_score: Optional[float]
    stages: str
    environment: str
    created_at: datetime

    model_config = {"from_attributes": True}
