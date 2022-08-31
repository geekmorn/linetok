from src.common.services.crud import create, read, update, destroy
from fastapi import APIRouter, HTTPException
from src.core.schemas.category import *
from src.core.models import CategoryModel


router = APIRouter(
    tags=["Category"]
)


@router.post("/category", response_model=Category)
async def create(payload: CategoryCreate):
    category: Category = await read(CategoryModel, payload.name)
    if category:
        raise HTTPException(409, detail="Category already exists")

    return await create(CategoryModel,
                        name=payload.name,
                        parameter_id=payload.parameter_id
                        )


@router.get("/category/{id}", response_model=Category)
async def get(id: str):
    category: Category = await read(CategoryModel, id)
    category_not_found = not category or category is None
    if category_not_found:
        raise HTTPException(404, "Category not found")

    return category


@router.get("/categories", response_model=list[Category])
async def get_all(): return await read(CategoryModel)


@router.put("/category/{id}", response_model=Category)
async def update(id: str, payload: CategoryUpdate):
    category: Category = await read(CategoryModel, id)
    category_not_found = not category or category is None
    if category_not_found:
        raise HTTPException(404, "Category not found")

    return await update(category,
                        value=id,
                        name=payload.name,
                        parameter_id=payload.parameter_id
                        )


@router.delete("/category/{id}", response_model=Category)
async def delete(id: str):
    category: Category = await read(CategoryModel, id)
    category_not_found = not category or category is None
    if category_not_found:
        raise HTTPException(404, "Category not found")

    return await destroy(CategoryModel, id)
