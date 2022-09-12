from pydantic import BaseModel
from .base import Base


class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    amount: int
    images: list[str]
    parameter_id: str
    category_id: str


class ProductUpdate(BaseModel):
    name: str
    description: str
    active: bool
    price: float
    amount: int
    images: list[str]
    parameter_id: str
    category_id: str


class Product(Base):
    name: str
    description: str
    price: float
    amount: int
    images: list[str]
    parameter_id: str
    category_id: str

    class Config:
        orm_mode = True
