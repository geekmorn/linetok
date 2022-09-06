import jwt
from jwt.exceptions import DecodeError, ExpiredSignatureError
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from src.common.config import Settings
from src.common.models import UserModel
from src.common.utils.crud import read, by
from src.common.utils.exceptions import unauthorized


tokenUrl = "api/auth/login"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=tokenUrl)


async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(
            token,
            Settings().JWT_SECRET,
            algorithms=['HS256']
        )
        id = payload.get("sub")
        user = await read(UserModel, by(UserModel.id, id))
    except ExpiredSignatureError:
        raise unauthorized()
    except DecodeError:
        raise unauthorized()
    return user
