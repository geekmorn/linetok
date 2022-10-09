from src.common.utils.crud import create, read, update, destroy, by
from fastapi import APIRouter, Depends
from src.common.schemas.category import *
from src.common.dependencies import get_current_user
from src.common.models import CategoryModel
from src.common.utils.exceptions import not_found, conflict


router = APIRouter(
    tags=["Category"],
)


@router.get("/{id}", response_model=Category)
async def get(id: str):
    category: Category | None = await read(
        CategoryModel,
        by(CategoryModel.id, id)
    )
    if category is None:
        raise not_found()

    return category


@router.get("/", response_model=list[Category])
async def get_all(): return await read(CategoryModel)


@router.post("/", response_model=Category, status_code=201)
async def post(payload: CategoryCreate):
    category: Category | None = await read(
        CategoryModel,
        by(CategoryModel.name, payload.name)
    )
    if category:
        raise conflict()

    return await create(CategoryModel, **payload.dict())


@router.put("/{id}", response_model=Category, dependencies=[Depends(get_current_user)])
async def put(id: str, payload: CategoryUpdate):
    category: Category | None = await read(
        CategoryModel,
        by(CategoryModel.id, id)
    )
    if category is None:
        raise not_found()

    return await update(category, **payload.dict())


@router.delete("/{id}", response_model=Category)
async def delete(id: str):
    category: Category | None = await read(
        CategoryModel,
        by(CategoryModel.id, id)
    )
    if category is None:
        raise not_found()

    return await destroy(category)
