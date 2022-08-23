import jwt
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from src.core.schemas.user import *
from src.core.schemas.token import *
from src.core.config import settings
from src.common.utils import authenticate
from src.core.models import TokenModel


router = APIRouter(
    tags=['Auth'],
    prefix="/auth",
)


@router.post("/token", response_model=Token)
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate(form.username, form.password)
    payload = {
        "id": user.id,
        "username": user.username,
    }

    return Token(
        access_token=jwt.encode(payload, settings.JWT_SECRET),
        token_type="bearer"
    )


@router.post("/refresh")
async def refresh():
    pass
