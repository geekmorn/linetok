import uvicorn
from src.common.config import settings


def start_app():
    uvicorn.run(
        "src.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEGUG
    )


if __name__ == "__main__":
    start_app()
