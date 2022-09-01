from pydantic import BaseModel
from .base import Base


class CategoryCreate(BaseModel):
    title: str
    parameter_id: str


class CategoryUpdate(BaseModel):
    title: str
    parameter_id: str


class Category(Base):
    title: str
    parameter_id: str

    class Config:
        orm_mode = True
