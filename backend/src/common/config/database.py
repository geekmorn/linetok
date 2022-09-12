from .settings import settings
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()


class AsyncDatabaseSession:

    def __init__(self):
        self._session = None
        self._engine = None

    def __getattr__(self, name):
        return getattr(self._session, name)

    def create(self):
        user = settings.POSTGRES_USER
        password = settings.POSTGRES_PASSWORD
        db_host = settings.POSTGRES_HOST
        db_name = settings.POSTGRES_DB
        self._engine = create_async_engine(
            f"postgresql+asyncpg://{user}:{password}@{db_host}:5432/{db_name}",
            future=True,
            echo=False
        )
        self._session = sessionmaker(
            self._engine,
            expire_on_commit=False,
            class_=AsyncSession,
        )()

    async def create_table(self):
        async with self._engine.begin() as connection:
            await connection.run_sync(Base.metadata.create_all)


db = AsyncDatabaseSession()
