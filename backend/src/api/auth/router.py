import jwt
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from src.core import JWT_SECRET, User
from sqlalchemy.orm import Session
from src.common.dependencies import get_db
from src.common import crud, exceptions as Exception
from .schemas import Token
from ..user.schemas import User as _User


router = APIRouter(
    tags=['Auth'],
    prefix="/auth",
)


async def authenticate(db: Session, name: str, password: str):
    user: _User = crud.get(
        db,
        variant="name",
        value=name,
        model=User
    )
    is_authenticated = user and user.verify_password(password)
    if not is_authenticated:
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
