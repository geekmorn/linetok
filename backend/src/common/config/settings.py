from dotenv import load_dotenv, find_dotenv
from pydantic import BaseSettings, BaseModel
import datetime


load_dotenv(find_dotenv())


class PostgreSQLSettings(BaseSettings):
    postgres_user: str
    postgres_password: str
    postgres_host: str
    postgres_port: str
    postgres_db: str


class AppSettings(BaseSettings):
    title: str
    version: str
    router_prefix: str
    backend_port: int
    jwt_secret: str

class Settings(
    PostgreSQLSettings,
    AppSettings
):
    pass

config = Settings()


class AuthConfig(BaseModel):
    authjwt_secret_key = config.jwt_secret
    authjwt_token_location: set = {"cookies"}
    authjwt_cookie_secure = False
    authjwt_cookie_csrf_protect = False
    authjwt_access_token_expires = datetime.timedelta(minutes=30)
    authjwt_refresh_token_expires = datetime.timedelta(days=20)
