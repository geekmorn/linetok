import jwt
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from src.core.config import settings
from src.common.utils import authenticate


router = APIRouter(
    tags=['Auth'],
    prefix="/auth",
)


@router.post("/token")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate(form.username, form.password)
    if not user:
        raise HTTPException(401, "Bad username or password")

    payload = {
        "id": user.id,
        "username": user.username,
    }

    return {
        "access_token": jwt.encode(payload, settings.JWT_SECRET),
        "token_type": "bearer"
    }
