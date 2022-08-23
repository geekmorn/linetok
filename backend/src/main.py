from fastapi import FastAPI
from .api.routers import api_router
from .core.config import settings, db
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    docs_url=settings.DOCS_URL,
    title=settings.TITLE,
    version=settings.VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.on_event("startup")
async def startup():
    db.create()
    await db.create_table()


@app.on_event("shutdown")
async def shutdown():
    await db.close()
