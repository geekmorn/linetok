import uvicorn
from src.common.config import Settings


def start_app():
    uvicorn.run(
        "src.main:app",
        host=Settings().HOST,
        port=Settings().PORT,
        reload=Settings().DEGUG
    )


if __name__ == "__main__":
    start_app()
