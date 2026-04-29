from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from routers import waitlist, sleep, users

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Endormia API",
    description="Sleep Technology Platform",
    version="1.0.0",
    root_path="/api",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(waitlist.router)
app.include_router(sleep.router)
app.include_router(users.router)


@app.get("/health")
def health():
    return {"status": "ok", "service": "endormia-api"}
