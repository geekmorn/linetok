from typing import Literal
from src.core.models import UserModel
from src.core.schemas.user import *
from src.core.config import Search


async def authenticate(username: str, password: str):
    user: User = await UserModel.read(by=Search.USERNAME, value=username)
    authenticated = user and user.verify_password(password)
    return user if authenticated else False
