import os
import uvicorn
from src.common.config import config


def start_app():
    uvicorn.run(
        "src.main:app",
        host="0.0.0.0",
        port=config.backend_port,
        reload=True
    )

def run_tests():
    return os.system("pytest -s -v")
