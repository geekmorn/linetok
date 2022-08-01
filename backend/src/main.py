from fastapi import FastAPI
from .core.db import connection_db


def create_app() -> FastAPI:
    app = FastAPI(
        docs_url="/",
    )

    _include_routers(app)
    return app


def _include_routers(app_: FastAPI):
    """Include one router which include all need routers"""

    from src.api.routers import api_router

    app_.include_router(api_router)


app = create_app()


@app.on_event("startup")
async def on_startup():
    await connection_db()
