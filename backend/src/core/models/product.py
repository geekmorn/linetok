from .base import BaseModel
from src.core.config import Base
from sqlalchemy import Column, String, Float, ForeignKey
from sqlalchemy.orm import relationship


class ProductModel(Base, BaseModel):
    __tablename__ = "product"

    name = Column(String(200), unique=True, index=True)
    price = Column(Float, default=10)

    parameter_id = Column(String, ForeignKey("parameter.id"))
    category_id = Column(String, ForeignKey("category.id"))
    parameter = relationship("ParameterModel", back_populates="product")
    category = relationship("CategoryModel", back_populates="product")
