from pydantic import BaseModel
from .base import Base


class ProductCreate(BaseModel):
    name: str
    parameter_id: str
    category_id: str


class ProductUpdate(BaseModel):
    name: str
    parameter_id: str
    category_id: str


class Product(Base):
    name: str
    parameter_id: str
    category_id: str

    class Config:
        orm_mode = True
