from src.common.services.crud import create, read, update, destroy
from fastapi import APIRouter, HTTPException
from src.core.schemas.product import *
from src.core.models import ProductModel


router = APIRouter(
    tags=["Product"]
)


@router.get("/product/{id}", response_model=Product)
async def get(id: str):
    product: Product | None = await read(ProductModel, {
        "key": ProductModel.id,
        "value": id
    })
    if product is None:
        raise HTTPException(404, detail="Product not found")

    return product


@router.get("/products", response_model=list[Product])
async def get_all(): return await read(ProductModel)


@router.post("/product", response_model=Product, status_code=201)
async def post(payload: ProductCreate):
    product: Product | None = await read(ProductModel, {
        "key": ProductModel.title,
        "value": payload.title
    })
    if product:
        raise HTTPException(409, "Product already exists")

    return await create(
        ProductModel,
        **payload.dict()
    )


@router.put("/product/{id}", response_model=Product)
async def put(id: str, payload: ProductUpdate):
    product: Product | None = await read(ProductModel, {
        "key": ProductModel.id,
        "value": id
    })
    if product is None:
        raise HTTPException(404, "Product not found")
    return await update(
        product,
        **payload.dict()
    )


@router.delete("/product/{id}", response_model=Product)
async def delete(id: str):
    product: Product | None = await read(ProductModel, {
        "key": ProductModel.id,
        "value": id
    })
    if product is None:
        raise HTTPException(404, "Product not found")

    return await destroy(product)
