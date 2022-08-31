from src.common.services.crud import create, read, update, destroy
from fastapi import APIRouter, HTTPException, Depends
from src.core.models import UserModel
from src.core.schemas.user import *
from passlib.hash import bcrypt
from src.common.dependencies import get_current_user


router = APIRouter(
    tags=["User"],
)


@router.post("/user", response_model=User, status_code=201)
async def create(payload: UserCreate):
    user: User = await read(UserModel, payload.username)
    if user:
        raise HTTPException(status_code=409, detail="User already exists")

    return await create(UserModel,
                        username=payload.username,
                        password=bcrypt.hash(payload.password)
                        )


@router.get("/user/{id}", response_model=User)
async def get(id: str):
    user: User = await read(UserModel, id)
    user_not_found = not user or user is None
    if user_not_found:
        raise HTTPException(404, "User not found")

    return user


@router.get("/users", response_model=list[User])
async def get_all(): return await read(UserModel)


@router.put("/user/{id}", response_model=User)
async def update(id: str, payload: UserUpdate):
    user: User = await read(UserModel, id)
    user_not_found = not user or user is None
    if user_not_found:
        raise HTTPException(404, "User not found")

    return await update(
        user,
        value=id,
        username=payload.username
    )


@router.delete("/user/{id}", response_model=User)
async def delete(id: str):
    user: User = await read(UserModel, id)
    user_not_found = not user or user is None
    if user_not_found:
        raise HTTPException(404, "User not found")

    return await destroy(UserModel, id)
