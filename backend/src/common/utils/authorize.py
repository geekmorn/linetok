from http.client import HTTPException
from src.common.services.crud import read
from src.common.services.exceptions import unauthorized
from src.common.models import UserModel
from src.common.schemas.user import *


async def authorize(username: str, password: str) -> User | HTTPException:
    user: User | None = await read(UserModel, {
        "key": UserModel.username,
        "value": username
    })
    authorized = user and user.verify_password(password)
    return (
        user
        if authorized
        else unauthorized("User with these credentials does not exist")
    )
