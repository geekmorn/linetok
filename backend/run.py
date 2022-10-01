import uvicorn
from src.common.config import settings


def start_app():
    uvicorn.run(
        "src.main:app",
        host="0.0.0.0",
        port=settings.BACKEND_PORT,
        reload=True
    )


if __name__ == "__main__":
    start_app()
