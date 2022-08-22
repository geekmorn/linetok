import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from src.core.config import settings
from src.core.models import UserModel
from src.core.config.settings import Search


tokenUrl = "api/auth/token"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=tokenUrl)


async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=['HS256']
        )
        value = payload.get(Search.ID)
        user = await UserModel.read(
            by=Search.ID,
            value=value
        )
    except:
        raise HTTPException(
            status_code=409,
            detail="Invalid token"
        )
    return user
