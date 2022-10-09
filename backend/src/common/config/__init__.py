from .database import Base, PostgresqlManager
from .settings import config, AuthConfig


db = PostgresqlManager(
    username=config.postgres_user,
    password=config.postgres_password,
    host=config.postgres_host,
    port=config.postgres_port,
    name=config.postgres_db
)
