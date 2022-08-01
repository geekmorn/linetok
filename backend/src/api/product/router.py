from fastapi import APIRouter, Depends
from .model import Product, ProductCreate
from sqlmodel import Session
from sqlalchemy import select
from src.core.db import get_session

router = APIRouter(
    tags=["Product"],
    prefix="/product",
)


@router.get("/", response_model=list[Product])
async def get_all(session: Session = Depends(get_session)):
    result = await session.execute(select(Product))
    categories = result.scalars().all()

    return categories


@router.post("/", response_model=ProductCreate)
async def create(product: ProductCreate, session: Session = Depends(get_session)):
    product = Product(**product.dict())
    session.add(product)
    await session.commit()
    await session.refresh(product)

    return product


@router.get("/{id}", response_model=Product)
async def get(id: int, session: Session = Depends(get_session)):
    result = await session.execute(
        select(Product).
        where(Product.id == id))
    product = result.scalars().first()

    return product
