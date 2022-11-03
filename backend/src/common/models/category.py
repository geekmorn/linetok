from src.common.database import Base
from sqlalchemy import Column, String, Integer


class CategoryModel(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
