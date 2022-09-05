from src.common.utils.crud import create, read, update, destroy, by
from fastapi import APIRouter, Depends
from src.common.models import UserModel
from src.common.schemas.user import *
from src.common.dependencies import get_current_user
from src.common.utils.exceptions import not_found, conflict


router = APIRouter(
    tags=["User"],
)


@router.get("/user/{id}", response_model=User)
async def get(id: str):
    user: User | None = await read(
        UserModel,
        by(UserModel.id, id)
    )
    if user is None:
        raise not_found("User")

    return user


@router.get("/users", response_model=list[User])
async def get_all(): return await read(UserModel)


@router.post("/user", response_model=User, status_code=201)
async def post(payload: UserCreate):
    user: User | None = await read(
        UserModel,
        by(UserModel.username, payload.username)
    )
    if user:
        raise conflict("User")

    return await create(UserModel, is_user=True, **payload.dict())


@router.put("/user/{id}", response_model=User)
async def put(id: str, payload: UserUpdate):
    user: User | None = await read(
        UserModel,
        by(UserModel.id, id)
    )
    if user is None:
        raise not_found("User")

    return await update(user, is_user=True, **payload.dict())


@router.delete("/user/{id}", response_model=User)
async def delete(id: str):
    user: User | None = await read(
        UserModel,
        by(UserModel.id, id)
    )
    if user is None:
        raise not_found("User")

    return await destroy(user)
