from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, AsyncEngine
from sqlalchemy.orm import sessionmaker, declarative_base


Base = declarative_base()


class PostgresqlConnector:
    """Implements PostgreSQL database connector.

    Args:
        username (str): username of a user
        password (str): password of a user
        host (str): host of a database
        port (int): port of a database
        name (str): name of a database
    """

    def __init__(self, username: str, password: str, host: str, port: int, name: str):
        self.path = f"postgresql+asyncpg://{username}:{password}@{host}:{port}/{name}"
        self._engine: AsyncEngine = create_async_engine(
            self.path,
            future=True,
            echo=False
        )
        self._session: AsyncSession = sessionmaker(
            self._engine,
            expire_on_commit=False,
            class_=AsyncSession,
        )()

    @property
    def session(self):
        return self._session

    @property
    def engine(self):
        return self._engine

    def __getattr__(self, name):
        return getattr(self.session, name)

    async def open_connection(self):
        async with self.engine.begin() as connection:
            # TODO remove
            # await connection.run_sync(Base.metadata.drop_all)
            await connection.run_sync(Base.metadata.create_all)
