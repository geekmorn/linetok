from .postgresql_connector import PostgresqlConnector, Base
from sqlalchemy.ext.asyncio import AsyncSession
from ..config import config


db: AsyncSession = PostgresqlConnector(
    username=config.postgres_user,
    password=config.postgres_password,
    host=config.postgres_host,
    port=config.postgres_port,
    name=config.postgres_db
)
