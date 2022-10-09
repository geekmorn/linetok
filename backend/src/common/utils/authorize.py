from http.client import HTTPException
from src.common.utils.crud import read, by
from src.common.utils.exceptions import unauthorized
from src.common.models import UserModel
from src.common.schemas.user import *


async def authorize(email: str, password: str) -> User:
    user: User = await read(
        UserModel,
        by(UserModel.email, email)
    )
    authorized = user and user.verify_password(password)
    if not authorized: raise unauthorized()
    return user
