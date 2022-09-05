from src.common.utils.crud import create, read, update, destroy, by
from fastapi import APIRouter
from src.common.schemas.category import *
from src.common.models import CategoryModel
from src.common.utils.exceptions import not_found, conflict


router = APIRouter(
    tags=["Category"]
)


@router.get("/category/{id}", response_model=Category)
async def get(id: str):
    category: Category | None = await read(
        CategoryModel,
        by(CategoryModel.id, id)
    )
    if category is None:
        raise not_found("Category")

    return category


@router.get("/categories", response_model=list[Category])
async def get_all(): return await read(CategoryModel)


@router.post("/category", response_model=Category, status_code=201)
async def post(payload: CategoryCreate):
    category: Category | None = await read(
        CategoryModel,
        by(Category.title, payload.title)
    )
    if category:
        raise conflict("Category")

    return await create(CategoryModel, **payload.dict())


@router.put("/category/{id}", response_model=Category)
async def put(id: str, payload: CategoryUpdate):
    category: Category | None = await read(
        CategoryModel,
        by(CategoryModel.id, id)
    )
    if category is None:
        raise not_found("Category")

    return await update(category, **payload.dict())


@router.delete("/category/{id}", response_model=Category)
async def delete(id: str):
    category: Category | None = await read(
        CategoryModel,
        by(CategoryModel.id, id)
    )
    if category is None:
        raise not_found("Category")

    return await destroy(category)
