from src.common.services.crud import create, read, update, destroy
from fastapi import APIRouter, HTTPException
from src.core.schemas.category import *
from src.core.models import CategoryModel


router = APIRouter(
    tags=["Category"]
)


@router.get("/category/{id}", response_model=Category)
async def get(id: str):
    category: Category | None = await read(CategoryModel, {
        "key": CategoryModel.id,
        "value": id
    })
    if category is None:
        raise HTTPException(404, "Category not found")

    return category


@router.get("/categories", response_model=list[Category])
async def get_all(): return await read(CategoryModel)


@router.post("/category", response_model=Category)
async def post(payload: CategoryCreate):
    category: Category | None = await read(CategoryModel, {
        "key": CategoryModel.title,
        "value": payload.title
    })
    if category:
        raise HTTPException(409, "Category already exists")

    return await create(
        CategoryModel,
        **payload.dict()
    )


@router.put("/category/{id}", response_model=Category)
async def put(id: str, payload: CategoryUpdate):
    category: Category | None = await read(CategoryModel, {
        "key": CategoryModel.id,
        "value": id
    })
    if category is None:
        raise HTTPException(404, "Category not found")

    return await update(
        category,
        **payload.dict()
    )


@router.delete("/category/{id}", response_model=Category)
async def delete(id: str):
    category: Category | None = await read(CategoryModel, {
        "key": CategoryModel.id,
        "value": id
    })
    if category is None:
        raise HTTPException(404, detail="Category not found")

    return await destroy(category)
