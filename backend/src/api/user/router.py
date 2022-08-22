from fastapi import APIRouter, HTTPException, Depends
from src.core.models import UserModel
from src.core.schemas.user import *
from passlib.hash import bcrypt
from src.common.dependencies import get_current_user
from src.core.config import Search


router = APIRouter(
    tags=["User"],
)


@router.post("/user", response_model=User, status_code=201)
async def create(new_user: UserCreate):
    user = await UserModel.read(by=Search.USERNAME, value=new_user.username)
    if user:
        raise HTTPException(status_code=409, detail="User already exists")
    return await UserModel.create(
        username=new_user.username,
        password=bcrypt.hash(new_user.password)
    )


@router.get("/user/{id}", response_model=User)
async def read_id(id: str):
    user = await UserModel.read(by=Search.ID, value=id)
    if not user:
        raise HTTPException(404, detail="User not found")
    return user


@router.get("/users", response_model=list[User])
async def read_all():
    users: list[User] = await UserModel.read()
    return users


@router.delete("/user/{id}", response_model=User)
async def delete(id: str):
    user: User = await UserModel.read(by=Search.ID, value=id)
    if not user:
        raise HTTPException(404, detail="User not found")
    await UserModel.destroy(id)
    return user


@router.put("/user/{id}", response_model=User)
async def update(id: str, new_user: UserUpdate):
    user: User = await UserModel.read(by=Search.ID, value=id)
    if not user:
        raise HTTPException(404, detail="User not found")
    await UserModel.update(
        id=id,
        username=new_user.username
    )
    return user
