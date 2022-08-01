from sqlmodel import SQLModel, Field
from pydantic import BaseModel


class Product(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name:  str
    category_id: int = Field(
        default=None,
        nullable=True,
        foreign_key="category.id"
    )


class ProductCreate(BaseModel):
    name: str
    category_id: int
