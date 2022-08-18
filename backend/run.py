import uvicorn
from src.core.config.constants import HOST, PORT, DEBUG


def start_app():
    uvicorn.run(
        "src.main:app",
        host=HOST,
        port=PORT,
        reload=DEBUG
    )


if __name__ == "__main__":
    start_app()
