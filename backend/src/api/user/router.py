from fastapi import APIRouter, HTTPException, Depends
from src.core.models import UserModel
from src.common.schemas.user import *
from passlib.hash import bcrypt
from src.common.services.dependencies import get_current_user


router = APIRouter(
    tags=["User"],
)


@router.post("/user", response_model=User, status_code=201)
async def create(user: UserCreate):
    user = await UserModel.create(
        username=user.username,
        password=bcrypt.hash(user.password)
    )
    return user


@router.get("/user/{id}", response_model=User, dependencies=[Depends(get_current_user)])
async def read_id(id: str):
    user: User = await UserModel.read_id(id)
    if not user:
        raise HTTPException(404, detail="User not found")
    return user


@router.get("/users", response_model=list[User], dependencies=[Depends(get_current_user)])
async def read_all():
    users = await UserModel.read_all()
    return users


@router.delete("/user/{id}", response_model=User, dependencies=[Depends(get_current_user)])
async def delete(id: str):
    user: User = await UserModel.read_id(id)
    if not user:
        raise HTTPException(404, detail="User not found")
    await UserModel.destroy(id)
    return user


@router.put("/user/", deprecated=True)
async def update():
    return {"status": "in progress..."}
