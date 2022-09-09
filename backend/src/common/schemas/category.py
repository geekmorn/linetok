from pydantic import BaseModel
from .base import Base


class CategoryCreate(BaseModel):
    name: str
    parameter_id: str


class CategoryUpdate(BaseModel):
    name: str
    parameter_id: str
    active: bool


class Category(Base):
    name: str
    parameter_id: str

    class Config:
        orm_mode = True
