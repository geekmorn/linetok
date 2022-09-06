from src.common.utils.crud import create, read, update, destroy, by
from fastapi import APIRouter, Depends
from src.common.dependencies import get_current_user
from src.common.schemas.product import *
from src.common.models import ProductModel
from src.common.utils.exceptions import not_found, conflict


router = APIRouter(
    tags=["Product"]
)


@router.get("/product/{id}", response_model=Product)
async def get(id: str):
    product: Product | None = await read(
        ProductModel,
        by(ProductModel.id, id)
    )
    if product is None:
        raise not_found("Product")

    return product


@router.get("/products", response_model=list[Product])
async def get_all(): return await read(ProductModel)


@router.post("/product", response_model=Product, status_code=201, dependencies=[Depends(get_current_user)])
async def post(payload: ProductCreate):
    product: Product | None = await read(
        ProductModel,
        by(ProductModel.title, payload.title)
    )
    if product:
        raise conflict("Product")

    return await create(ProductModel, **payload.dict())


@ router.put("/product/{id}", response_model=Product, dependencies=[Depends(get_current_user)])
async def put(id: str, payload: ProductUpdate):
    product: Product | None = await read(
        ProductModel,
        by(ProductModel.id, id))
    if product is None:
        raise not_found("Product")

    return await update(product, **payload.dict())


@ router.delete("/product/{id}", response_model=Product, dependencies=[Depends(get_current_user)])
async def delete(id: str):
    product: Product | None = await read(
        ProductModel,
        by(ProductModel.id, id)
    )
    if product is None:
        raise not_found("Product")

    return await destroy(product)
