from fastapi import APIRouter, HTTPException
from src.common.database import db
from src.common.utils import validate_parameters, validate_category
from src.common.models import ProductModel
from src.common.schemas import (
    Product,
    ProductCreate,
    ProductUpdate
)


router = APIRouter()


@router.get("/", response_model=list[Product])
async def get_all():
    products: list[Product] | None = await db.get_all(ProductModel)
    if products is None:
        raise HTTPException(404)

    return products


@router.get("/{id}", response_model=Product)
async def get(id: int):
    product: Product | None = await db.get(ProductModel, ProductModel.id, id)
    if product is None:
        raise HTTPException(404)

    return product


@router.post("/", response_model=Product)
async def create(payload: ProductCreate):
    failed_parameters = await validate_parameters(payload.parameters)
    category = await validate_category(payload.category_id)

    if category is None and payload.category_id is not None:
        raise HTTPException(404, "Category not found")
    elif failed_parameters:
        raise HTTPException(
            409, {"Fields with these names cannot be created": failed_parameters}
        )

    return await db.post(ProductModel, **payload.dict())


@router.put("/{id}", response_model=Product)
async def update(id: int, payload: ProductUpdate):
    product: Product | None = await db.get(ProductModel, ProductModel.id, id)
    category = await validate_category(payload.category_id)
    failed_parameters = await validate_parameters(payload.parameters)

    if product is None:
        raise HTTPException(404)
    elif category is None and payload.category_id is not None:
        raise HTTPException(404, "Category not found")
    elif failed_parameters:
        raise HTTPException(
            409, {"Fields with these names cannot be updated": failed_parameters}
        )

    return await db.put(product, **payload.dict(exclude_unset=True))


@router.delete("{id}", response_model=Product)
async def delete(id: int):
    product: Product | None = await db.get(ProductModel, ProductModel.id, id)
    if product is None:
        raise HTTPException(404)

    return await db.delete(product)
