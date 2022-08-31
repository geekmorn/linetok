from functools import lru_cache
from src.core.config import Settings


@lru_cache()
def read_settings():
    return Settings()
