from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone

from database import Base


class WaitlistEntry(Base):
    __tablename__ = "waitlist_entries"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    source = Column(String, default="website")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    preferences = Column(Text, default="{}")  # JSON string
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    sleep_sessions = relationship("SleepSession", back_populates="user")


class SleepSession(Base):
    __tablename__ = "sleep_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    date = Column(String, nullable=False)  # ISO date string
    duration = Column(Float, nullable=False)  # hours
    quality_score = Column(Float, nullable=True)  # 0-100
    stages = Column(Text, default="{}")  # JSON: {"light": min, "deep": min, "rem": min, "awake": min}
    environment = Column(Text, default="{}")  # JSON: {"temperature": C, "humidity": %, "noise": dB, "light": lux}
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="sleep_sessions")
