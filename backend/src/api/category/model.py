from sqlmodel import SQLModel, Field
from pydantic import BaseModel


class Category(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str


class CategoryCreate(BaseModel):
    name: str
