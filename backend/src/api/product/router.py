from src.common.utils.crud import create, read, update, destroy, by
from fastapi import APIRouter, Depends
from src.common.dependencies import get_current_user
from src.common.schemas.product import *
from src.common.models import ProductModel
from src.common.utils.exceptions import not_found, conflict


router = APIRouter(
    tags=["Product"],
    prefix="/products"
)


@router.get("/{id}", response_model=Product)
async def get(id: str):
    product: Product | None = await read(
        ProductModel,
        by(ProductModel.id, id)
    )
    if product is None:
        raise not_found()

    return product


@router.get("/", response_model=list[Product])
async def get_all(): return await read(ProductModel)


@router.post("/", response_model=Product, status_code=201)
async def post(payload: ProductCreate):
    product: Product | None = await read(
        ProductModel,
        by(ProductModel.name, payload.name)
    )
    if product:
        raise conflict()

    return await create(ProductModel, **payload.dict())


@router.put("/{id}", response_model=Product, dependencies=[Depends(get_current_user)])
async def put(id: str, payload: ProductUpdate):
    product: Product | None = await read(
        ProductModel,
        by(ProductModel.id, id))
    if product is None:
        raise not_found()

    return await update(product, **payload.dict())


@router.delete("/{id}", response_model=Product, dependencies=[Depends(get_current_user)])
async def delete(id: str):
    product: Product | None = await read(
        ProductModel,
        by(ProductModel.id, id)
    )
    if product is None:
        raise not_found()

    return await destroy(product)
