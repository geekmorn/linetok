from dotenv import load_dotenv, find_dotenv
from pydantic import BaseSettings, BaseModel
import datetime


load_dotenv(find_dotenv())


class Settings(BaseSettings):
    BACKEND_PORT: int
    ROUTE_PREFIX: str
    TITLE: str
    VERSION: str
    JWT_SECRET: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_HOST: str
    POSTGRES_DB: str


settings = Settings()


class AuthConfig(BaseModel):
    authjwt_secret_key = settings.JWT_SECRET
    authjwt_token_location: set = {"cookies"}
    authjwt_cookie_secure = False
    authjwt_cookie_csrf_protect = False
    authjwt_access_token_expires = datetime.timedelta(minutes=30)
    authjwt_refresh_token_expires = datetime.timedelta(days=20)
