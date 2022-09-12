from multiprocessing.dummy import Array
from .base import BaseModel
from src.common.config import Base
from sqlalchemy import Column, String, Float, ForeignKey, Integer, ARRAY
from sqlalchemy.orm import relationship


class ProductModel(Base, BaseModel):
    __tablename__ = "product"

    name = Column(String(200), unique=True, index=True)
    price = Column(Float, default=10)
    amount = Column(Integer, default=1)
    description = Column(String(2000), default="")
    images = Column(ARRAY(String), nullable=True, default=None)

    # TODO Add media field.

    parameter_id = Column(String, ForeignKey("parameter.id"))
    category_id = Column(String, ForeignKey("category.id"))
    parameter = relationship("ParameterModel", back_populates="product")
    category = relationship("CategoryModel", back_populates="product")
