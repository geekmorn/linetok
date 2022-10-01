from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from src.common.config import settings
from src.common.models import UserModel
from src.common.utils.crud import read, by
from fastapi_jwt_auth.auth_jwt import jwt


tokenUrl = "api/auth/login"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=tokenUrl)

# TODO Fix exceptions

async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = jwt.decode(
        token,
        settings.JWT_SECRET,
        algorithms=['HS256']
    )
    id = payload.get("sub")
    user = await read(UserModel, by(UserModel.id, id))
    return user
