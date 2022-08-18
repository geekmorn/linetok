from fastapi import FastAPI
from .api.routers import api_router
from .core.config import db
from .core.config import TITLE, VERSION, DOCS_URL

db.create()

app = FastAPI(
    docs_url=DOCS_URL,
    title=TITLE,
    version=VERSION,
)

app.include_router(api_router)


@app.on_event("startup")
async def startup():
    await db.create_table()


@app.on_event("shutdown")
async def shutdown():
    await db.close()
