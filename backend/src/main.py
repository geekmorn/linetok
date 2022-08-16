from fastapi import FastAPI
from .api.routers import api_router
from .core.constants import TITLE, VERSION, DOCS_URL


def create_app() -> FastAPI:
    app = FastAPI(
        docs_url=DOCS_URL,
        title=TITLE,
        version=VERSION,
    )
    app.include_router(api_router)
    
    return app


app = create_app()
