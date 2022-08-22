from functools import lru_cache
from src.core.config import Settings


@lru_cache()
async def get_settings():
    return Settings()
