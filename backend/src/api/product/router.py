from src.common.services.crud import create, read, update, destroy
from fastapi import APIRouter, HTTPException
from src.core.schemas.product import *
from src.core.models import ProductModel


router = APIRouter(
    tags=["Product"]
)


@router.post("/product", response_model=Product)
async def create(payload: ProductCreate):
    product: Product = await read(ProductModel, payload.name)
    product_not_found = not product or product is None
    if product_not_found:
        raise HTTPException(409, detail="Product already exists")

    return await create(ProductModel,
                        name=payload.name,
                        parameter_id=payload.parameter_id,
                        category_id=payload.category_id
                        )


@router.get("/product/{id}", response_model=Product)
async def get(id: str):
    product: Product = await read(ProductModel, id)
    product_not_found = not product or product is None
    if product_not_found:
        raise HTTPException(404, detail="Product not found")

    return product


@router.get("/products", response_model=list[Product])
async def get_all(): return await read(ProductModel)


@router.put("/product/{id}", response_model=Product)
async def update(id: str, payload: ProductUpdate):
    product: Product = await read(ProductModel, id)
    product_not_found = not product or product is None
    if product_not_found:
        raise HTTPException(404, "Product not found")

    return await update(product,
                        value=id,
                        name=payload.name,
                        parameter_id=payload.parameter_id,
                        category_id=payload.category_id
                        )


@router.delete("/product/{id}", response_model=Product)
async def delete(id: str):
    product: Product = await read(ProductModel, id)
    product_not_found = not product or product is None
    if product_not_found:
        raise HTTPException(404, "Product not found")

    return await destroy(ProductModel, id)
