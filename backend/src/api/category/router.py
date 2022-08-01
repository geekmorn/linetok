from fastapi import APIRouter, Depends
from .model import Category, CategoryCreate
from sqlmodel import Session
from sqlalchemy import select
from src.core.db import get_session

router = APIRouter(
    tags=["Category"],
    prefix="/category",
)


@router.get("/", response_model=list[Category])
async def get_all(session: Session = Depends(get_session)):
    result = await session.execute(select(Category))
    categories = result.scalars().all()

    return categories


@router.get("/{id}", response_model=Category)
async def get(id: int, session: Session = Depends(get_session)):
    result = await session.execute(
        select(Category).
        where(Category.id == id))
    category = result.scalars().first()

    return category


@router.post(
    "/",
    response_model=CategoryCreate,
    status_code=201,
)
async def create(category: CategoryCreate, session: Session = Depends(get_session)):
    category = Category(**category.dict())
    session.add(category)
    await session.commit()
    await session.refresh(category)

    return category
