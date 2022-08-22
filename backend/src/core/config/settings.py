from dotenv import load_dotenv, find_dotenv
from pydantic import BaseSettings

load_dotenv(find_dotenv())


class Settings(BaseSettings):
    HOST: str
    PORT: int
    DEGUG = True
    ROUTE_PREFIX: str
    DB_URL: str
    JWT_SECRET: str
    DOCS_URL: str
    TITLE: str
    VERSION: str


settings = Settings()


class Search:
    ALL = "all"
    ID = "id"
    NAME = "name"
    USERNAME = "username"
