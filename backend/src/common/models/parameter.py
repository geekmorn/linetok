from .base import BaseModel
from src.common.database import Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class ParameterModel(Base, BaseModel):
    __tablename__ = "parameter"

    name = Column(String(50), unique=True, index=True)

    category = relationship("CategoryModel", back_populates="parameter")
    product = relationship("ProductModel", back_populates="parameter")
