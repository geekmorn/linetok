from os import getenv
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

HOST = getenv("HOST")
PORT = int(getenv("PORT"))
DEBUG = True

ROUTE_PREFIX = getenv("ROUTE_PREFIX")
DATABASE_URL = getenv("DB_URL")
JWT_SECRET = getenv("JWT_SECRET")
DOCS_URL=getenv("DOCS_URL")
TITLE=getenv("TITLE")
VERSION=getenv("VERSION")
