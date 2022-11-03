from typing import List, Dict, Optional
from pydantic import BaseModel, condecimal, HttpUrl, Field


ALIASES = {"is_active": "isActive"}


def alias_generator(name: str) -> str:
    return ALIASES.get(name, name)


class BaseProduct(BaseModel):
    name: str
    price: condecimal(max_digits=20, decimal_places=2)
    description: str = Field(default="")
    amount: int = Field(default=1)
    is_active: bool = Field(default=True, alias="isActive")
    images: Optional[List[HttpUrl]] = Field(default=[])
    parameters: Dict = Field(default={})
    category_id: Optional[int] = Field(alias="categoruId")

    class Config:
        allow_population_by_field_name = True
        alias_generator = alias_generator


class ProductCreate(BaseProduct):
    pass


class ProductUpdate(BaseProduct):
    name: Optional[str]
    price: Optional[condecimal(max_digits=20, decimal_places=2)]


class Product(BaseProduct):
    id: int

    class Config:
        orm_mode = True
