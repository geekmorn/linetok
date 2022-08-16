import jwt
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from src.core import JWT_SECRET
from src.common.models import UserModel
from sqlalchemy.orm import Session
from src.common.services.dependencies import get_db
from src.common.services import crud, exceptions as Exception
from src.common.schemas.user import *
from src.common.schemas.token import *


router = APIRouter(
    tags=['Auth'],
    prefix="/auth",
)


async def authenticate(db: Session, name: str, password: str):
    user: User = crud.get(
        db,
        by="name",
        value=name,
        model=UserModel
    )
    authenticated = user and user.verify_password(password)
    if not authenticated:
        return Exception.unauthorized("Incorrect name or password")
    return user


@router.post("/token", response_model=Token)
async def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = await authenticate(db, form.username, form.password)

    payload = {
        "id": user.id,
        "name": user.name,
    }

    return Token(
        access_token=jwt.encode(payload, JWT_SECRET),
        token_type="bearer"
    )
