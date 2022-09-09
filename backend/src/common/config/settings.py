from dotenv import load_dotenv, find_dotenv
from pydantic import BaseSettings, BaseModel
import datetime


load_dotenv(find_dotenv())


class Settings(BaseSettings):
    HOST: str
    PORT: int
    DEGUG = True
    ROUTE_PREFIX: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    JWT_SECRET: str
    DOCS_URL: str
    TITLE: str
    VERSION: str


class AuthConfig(BaseModel):
    authjwt_secret_key = Settings().JWT_SECRET
    authjwt_token_location: set = {"cookies"}
    authjwt_cookie_secure = False
    authjwt_cookie_csrf_protect = False
    authjwt_access_token_expires = datetime.timedelta(minutes=30)
    authjwt_refresh_token_expires = datetime.timedelta(days=20)
