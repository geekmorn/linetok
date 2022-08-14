from fastapi import APIRouter, Depends
from . import schemas
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from src.common import crud
from src.core import User
from src.common.dependencies import get_db, get_current_user

router = APIRouter(
    tags=["User"],
    prefix="/user"
)


@router.post('/', response_model=schemas.User, status_code=201)
async def create(user: schemas.UserCreate, db: Session = Depends(get_db)):
    user = User(
        name=user.name,
        password=bcrypt.hash(user.password)
    )
    return crud.create(db=db, record=user, model=User)


@router.get('/{id}', response_model=schemas.User, dependencies=[Depends(get_current_user)])
async def get(id: int, db: Session = Depends(get_db)):
    return crud.get(db, value=id, model=User)


@router.get('/', response_model=list[schemas.User], dependencies=[Depends(get_current_user)])
async def get_all(db: Session = Depends(get_db)):
    return crud.get_all(db, model=User)


@router.delete('/{id}', response_model=schemas.User, dependencies=[Depends(get_current_user)])
async def remove(id: int, db: Session = Depends(get_db)):
    return crud.remove(db=db, id=id, model=User)


@router.put('/{id}', response_model=schemas.User, dependencies=[Depends(get_current_user)])
async def update(id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
    user = User(
        name=user.name
    )
    return crud.update(db=db, id=id, record=user, model=User)
