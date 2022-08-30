from .base import BaseModel
from src.core.config import Base
from src.common.services.crud import Service
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class ParameterModel(Base, Service, BaseModel):
    __tablename__ = "parameter"

    name = Column(String(50), unique=True, index=True)
    category = relationship("CategoryModel", back_populates="parameter")
    product = relationship("ProductModel", back_populates="parameter")
