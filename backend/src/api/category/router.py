from fastapi import APIRouter, HTTPException
from src.core.schemas.category import *
from src.core.models import CategoryModel


router = APIRouter(
    tags=["Category"]
)


@router.post("/category", response_model=Category)
async def create(new_category: CategoryCreate):
    category: Category = await CategoryModel()._name.read(new_category.name)
    if category:
        raise HTTPException(409, detail="Category already exists")

    return await CategoryModel().create(
        name=new_category.name,
        parameter_id=new_category.parameter_id
    )


@router.get("/category/{id}", response_model=Category)
async def read_id(id: str):
    category: Category = await CategoryModel()._id.read(id)
    if not category:
        raise HTTPException(404, detail="Category not found")

    return category


@router.get("/categories", response_model=list[Category])
async def read_all():
    return await CategoryModel().read()


@router.delete("/category/{id}", response_model=Category)
async def delete(id: str):
    category: Category = await CategoryModel()._id.read(id)
    if not category:
        raise HTTPException(404, "Category not found")
    await CategoryModel()._id.delete(id)

    return category


@router.put("/category/{id}", response_model=Category)
async def update(id: str, new_category: CategoryUpdate):
    category: Category = await CategoryModel()._id.read(id)
    if not category:
        raise HTTPException(404, "Category not found")
    try:
        await CategoryModel()._id.update(
            value=id,
            name=new_category.name,
            parameter_id=new_category.parameter_id
        )
    except:
        raise HTTPException(409, detail="Conflict")

    return category
