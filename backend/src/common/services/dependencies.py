import jwt
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from src.core import JWT_SECRET
from src.common.models import UserModel
from sqlalchemy.orm import Session
from src.core.database import SessionLocal
from . import crud
from . import exceptions as Exception


tokenUrl = "api/auth/token"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=tokenUrl)


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        user = crud.get(
            db,
            value=payload.get("id"),
            model=UserModel
        )
    except:
        return Exception.unauthorized(message="Invalid token")
        # TODO:
        # raise or return Exception(variant="unauthorized", message="Invalid token")

    return user
