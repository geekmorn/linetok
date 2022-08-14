import jwt
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from ..core import User, JWT_SECRET
from sqlalchemy.orm import Session
from ..core.db import SessionLocal
from src.common import crud, exceptions as Exception

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
            model=User
        )
    except:
        return Exception.unauthorized()

    return user
