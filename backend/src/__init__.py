import uvicorn
from src.common.config import config


def start_app():
    uvicorn.run(
        "src.main:app",
        host="0.0.0.0",
        port=config.backend_port,
        reload=True
    )


if __name__ == "__main__":
    start_app()
