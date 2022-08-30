from typing import Literal
from src.core.models import UserModel
from src.core.schemas.user import *


async def authenticate(username: str, password: str):
    user: User = await UserModel()._username.read(username)
    authenticated = user and user.verify_password(password)
    return user if authenticated else False
