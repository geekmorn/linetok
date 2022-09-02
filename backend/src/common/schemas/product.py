from pydantic import BaseModel
from .base import Base


class ProductCreate(BaseModel):
    title: str
    parameter_id: str
    category_id: str


class ProductUpdate(BaseModel):
    title: str
    parameter_id: str
    category_id: str


class Product(Base):
    title: str
    parameter_id: str
    category_id: str

    class Config:
        orm_mode = True
