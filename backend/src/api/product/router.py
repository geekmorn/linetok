from src.common.services import crud
from fastapi import APIRouter, HTTPException
from src.core.schemas.product import *
from src.core.models import ProductModel


router = APIRouter(
    tags=["Product"]
)


@router.post("/product", response_model=Product, status_code=201)
async def create(payload: ProductCreate):
    product: Product = await crud.read(ProductModel, ProductModel.title, payload.title)
    if product:
        raise HTTPException(409, detail="Product already exists")
    return await crud.create(
        ProductModel,
        title=payload.title,
        parameter_id=payload.parameter_id,
        category_id=payload.category_id
    )


@router.get("/product/{id}", response_model=Product)
async def get(id: str):
    product: Product = await crud.read(ProductModel, ProductModel.id, id)
    product_not_found = not product or product is None
    if product_not_found:
        raise HTTPException(404, detail="Product not found")
    return product


@router.get("/products", response_model=list[Product])
async def get_all(): return await crud.read(ProductModel)


@router.put("/product/{id}", response_model=Product)
async def update(id: str, payload: ProductUpdate):
    product: Product = await crud.read(ProductModel, ProductModel.id, id)
    product_not_found = not product or product is None
    if product_not_found:
        raise HTTPException(404, "Product not found")
    await crud.update(
        ProductModel,
        value=id,
        title=payload.title,
        parameter_id=payload.parameter_id,
        category_id=payload.category_id
    )
    return product


@router.delete("/product/{id}", response_model=Product)
async def delete(id: str):
    product: Product = await crud.read(ProductModel, ProductModel.id, id)
    product_not_found = not product or product is None
    if product_not_found:
        raise HTTPException(404, "Product not found")
    await crud.destroy(ProductModel, ProductModel.id, id)
    return product
