from fastapi import FastAPI
from .api.routers import api_router
from .core.config import settings, db

db.create()

app = FastAPI(
    docs_url=settings.DOCS_URL,
    title=settings.TITLE,
    version=settings.VERSION,
)

app.include_router(api_router)


@app.on_event("startup")
async def startup():
    await db.create_table()


@app.on_event("shutdown")
async def shutdown():
    await db.close()
