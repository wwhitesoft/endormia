from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import WaitlistEntry
from schemas import WaitlistCreate, WaitlistResponse

router = APIRouter(prefix="/waitlist", tags=["waitlist"])


@router.post("/", response_model=WaitlistResponse)
def signup_waitlist(entry: WaitlistCreate, db: Session = Depends(get_db)):
    existing = db.query(WaitlistEntry).filter(WaitlistEntry.email == entry.email).first()
    if existing:
        raise HTTPException(status_code=409, detail="Email already on waitlist")

    db_entry = WaitlistEntry(
        email=entry.email,
        name=entry.name,
        source=entry.source,
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry


@router.get("/", response_model=List[WaitlistResponse])
def list_waitlist(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(WaitlistEntry).offset(skip).limit(limit).all()
