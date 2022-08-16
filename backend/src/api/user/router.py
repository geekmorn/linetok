from fastapi import APIRouter, Depends
from src.common.schemas.user import *
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from src.common.services import crud
from src.common.models import UserModel
from src.common.services.dependencies import get_db, get_current_user

router = APIRouter(
    tags=["User"],
    prefix="/user"
)


@router.post('/', response_model=User, status_code=201)
async def create(user: UserCreate, db: Session = Depends(get_db)):
    user = UserModel(
        name=user.name,
        password=bcrypt.hash(user.password)
    )
    return crud.create(db=db, record=user, model=UserModel)


@router.get('/{id}', response_model=User, dependencies=[Depends(get_current_user)])
async def get(id: int, db: Session = Depends(get_db)):
    return crud.get(db, value=id, model=UserModel)


@router.get('s/', response_model=list[User], dependencies=[Depends(get_current_user)])
async def get_all(db: Session = Depends(get_db)):
    return crud.get_all(db, model=UserModel)


@router.delete('/{id}', response_model=User, dependencies=[Depends(get_current_user)])
async def remove(id: int, db: Session = Depends(get_db)):
    return crud.remove(db=db, id=id, model=UserModel)


@router.put('/{id}', response_model=User, dependencies=[Depends(get_current_user)])
async def update(id: int, user: UserUpdate, db: Session = Depends(get_db)):
    user = UserModel(name=user.name)
    return crud.update(db=db, id=id, record=user, model=UserModel)
