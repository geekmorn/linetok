import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from src.core.config import settings
from src.core.models import UserModel


tokenUrl = "api/auth/login"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=tokenUrl)


async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=['HS256']
        )
        value = payload.get("sub")
        user = await UserModel()._id.read(value=value)
    except:
        raise HTTPException(
            status_code=401,
            detail="Not authorized"
        )
    return user
