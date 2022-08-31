from fastapi import APIRouter, HTTPException
from src.core.schemas.product import *
from src.core.models import ProductModel


router = APIRouter(
    tags=["Product"]
)


@router.post("/product", response_model=Product)
async def create(new_product: ProductCreate):
    product: Product = await ProductModel()._name.read(new_product.name)
    if product:
        raise HTTPException(409, detail="Product already exists")

    return await ProductModel().create(
        name=new_product.name,
        parameter_id=new_product.parameter_id,
        category_id=new_product.category_id
    )


@router.get("/product/{id}", response_model=Product)
async def read_id(id: str):
    product: Product = await ProductModel()._id.read(id)
    if not product:
        raise HTTPException(404, detail="Product not found")

    return product


@router.get("/products", response_model=list[Product])
async def read_all():
    return await ProductModel().read()


@router.delete("/product/{id}", response_model=Product)
async def delete(id: str):
    product: Product = await ProductModel()._id.read(id)
    if not product:
        raise HTTPException(404, "Product not found")
    await ProductModel()._id.delete(id)

    return product


@router.put("/product/{id}", response_model=Product)
async def update(id: str, new_product: ProductUpdate):
    product: Product = await ProductModel()._id.read(id)
    if not product:
        raise HTTPException(404, "Product not found")
    try:
        await ProductModel()._id.update(
            value=id,
            name=new_product.name,
            parameter_id=new_product.parameter_id,
            category_id=new_product.category_id
        )
    except:
        raise HTTPException(409, detail="Conflict")

    return product
