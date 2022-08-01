from .model import User, UserCreate
from fastapi import APIRouter, Depends
from sqlmodel import Session
from src.core.db import get_session
from sqlalchemy import select


router = APIRouter(
    tags=["User"],
    prefix="/user",
)


@router.get("/", response_model=list[User])
async def get(session: Session = Depends(get_session)):
    result = await session.execute(select(User))
    users = result.scalars().all()

    return users


@router.post("/", response_model=UserCreate)
async def create(user: UserCreate, session: Session = Depends(get_session)):
    user = User(**user.dict())
    session.add(user)
    await session.commit()
    await session.refresh(user)

    return user
