from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import json

from database import get_db
from models import SleepSession
from schemas import SleepSessionCreate, SleepSessionUpdate, SleepSessionResponse

router = APIRouter(prefix="/sleep", tags=["sleep"])


@router.post("/", response_model=SleepSessionResponse)
def create_sleep_session(session: SleepSessionCreate, db: Session = Depends(get_db)):
    db_session = SleepSession(
        user_id=session.user_id,
        date=session.date,
        duration=session.duration,
        quality_score=session.quality_score,
        stages=json.dumps(session.stages),
        environment=json.dumps(session.environment),
    )
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session


@router.get("/", response_model=List[SleepSessionResponse])
def list_sleep_sessions(user_id: int = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    query = db.query(SleepSession)
    if user_id is not None:
        query = query.filter(SleepSession.user_id == user_id)
    return query.order_by(SleepSession.date.desc()).offset(skip).limit(limit).all()


@router.get("/{session_id}", response_model=SleepSessionResponse)
def get_sleep_session(session_id: int, db: Session = Depends(get_db)):
    session = db.query(SleepSession).filter(SleepSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Sleep session not found")
    return session


@router.put("/{session_id}", response_model=SleepSessionResponse)
def update_sleep_session(session_id: int, update: SleepSessionUpdate, db: Session = Depends(get_db)):
    session = db.query(SleepSession).filter(SleepSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Sleep session not found")

    if update.duration is not None:
        session.duration = update.duration
    if update.quality_score is not None:
        session.quality_score = update.quality_score
    if update.stages is not None:
        session.stages = json.dumps(update.stages)
    if update.environment is not None:
        session.environment = json.dumps(update.environment)

    db.commit()
    db.refresh(session)
    return session


@router.delete("/{session_id}")
def delete_sleep_session(session_id: int, db: Session = Depends(get_db)):
    session = db.query(SleepSession).filter(SleepSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Sleep session not found")
    db.delete(session)
    db.commit()
    return {"detail": "Deleted"}
