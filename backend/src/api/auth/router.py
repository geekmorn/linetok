import jwt
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from src.core.models import UserModel
from src.common.services import exceptions as Exception
from src.core.schemas.user import *
from src.core.schemas.token import *
from src.core.config import Search, settings


router = APIRouter(
    tags=['Auth'],
    prefix="/auth",
)


async def authenticate(username: str, password: str):
    user: User = await UserModel.read(by=Search.USERNAME, value=username)
    authenticated = user and user.verify_password(password)
    if not authenticated:
        return Exception.unauthorized("Incorrect name or password")
    return user


@router.post("/token", response_model=Token)
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate(form.username, form.password)

    payload = {
        "id": user.id,
        "username": user.username,
    }

    return Token(
        access_token=jwt.encode(payload, settings.jwt_secret),
        token_type="bearer"
    )
