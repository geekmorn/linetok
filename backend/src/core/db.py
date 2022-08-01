from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from .constans import DATABASE_URL


engine = create_async_engine(
    DATABASE_URL, echo=False, future=True)


async def connection_db():
    async with engine.begin() as connection:
        await connection.run_sync(SQLModel.metadata.create_all)


async def get_session() -> AsyncSession:
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    async with async_session() as session:
        yield session
