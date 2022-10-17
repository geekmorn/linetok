from inspect import Parameter
from .base import BaseModel
from src.common.database import Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class CategoryModel(Base, BaseModel):
    __tablename__ = "category"

    name = Column(String(50), unique=True, index=True)
    parameter_id = Column(String, ForeignKey("parameter.id"))

    parameter = relationship("ParameterModel", back_populates="category")
    product = relationship("ProductModel", back_populates="category")
