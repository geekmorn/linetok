from .base import BaseModel
from src.common.config import Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class ParameterModel(Base, BaseModel):
    __tablename__ = "parameter"

    title = Column(String(50), unique=True, index=True)

    category = relationship("CategoryModel", back_populates="parameter")
    product = relationship("ProductModel", back_populates="parameter")
