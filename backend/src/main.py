from fastapi import FastAPI
from src.api.routers import api_router


def create_app() -> FastAPI:
    app = FastAPI(
        docs_url="/",
        title="Linetok API",
        version="1.0",
    )
    app.include_router(api_router)
    
    return app


app = create_app()
