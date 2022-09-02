from functools import lru_cache
from src.common.config import Settings


@lru_cache()
def read_settings():
    return Settings()
