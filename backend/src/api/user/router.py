from src.common.utils.crud import create, read, update, destroy, by
from fastapi import APIRouter, Depends
from src.common.models import UserModel
from src.common.schemas.user import *
from src.common.dependencies import get_current_user
from src.common.utils.exceptions import not_found, conflict


router = APIRouter(
    tags=["User"],
    prefix="/users"
)


@router.get("/{id}", response_model=User, dependencies=[Depends(get_current_user)])
async def get(id: str):
    user: User | None = await read(
        UserModel,
        by(UserModel.id, id)
    )
    if user is None:
        raise not_found()

    return user


@router.get("/", response_model=list[User], dependencies=[Depends(get_current_user)])
async def get_all(): return await read(UserModel)


@router.post("/", response_model=User, status_code=201)
async def post(payload: UserCreate):
    user: User | None = await read(
        UserModel,
        by(UserModel.email, payload.email)
    )
    if user:
        raise conflict()

    return await create(UserModel, is_user=True, **payload.dict())


@router.put("/{id}", response_model=User, dependencies=[Depends(get_current_user)])
async def put(id: str, payload: UserUpdate):
    user: User | None = await read(
        UserModel,
        by(UserModel.id, id)
    )
    if user is None:
        raise not_found()

    return await update(user, is_user=True, **payload.dict())


@router.delete("/{id}", response_model=User, dependencies=[Depends(get_current_user)])
async def delete(id: str):
    user: User | None = await read(
        UserModel,
        by(UserModel.id, id)
    )
    if user is None:
        raise not_found()

    return await destroy(user)
