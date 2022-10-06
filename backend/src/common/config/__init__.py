from .database import Base, AsyncDatabaseSession
from .settings import settings, AuthConfig


db = AsyncDatabaseSession()
