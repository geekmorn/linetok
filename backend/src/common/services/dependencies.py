import jwt
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from src.core.config import JWT_SECRET
from src.core.models import UserModel
from src.core.models import UserModel
from . import exceptions as Exception


tokenUrl = "api/auth/token"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=tokenUrl)


async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        user = await UserModel.read_id(payload.get("id"))
    except:
        return Exception.unauthorized(message="Invalid token")
        # TODO:
        # raise or return Exception(variant="unauthorized", message="Invalid token")

    return user
