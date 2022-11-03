from src.common.database import Base
from sqlalchemy import (
    Column,
    String,
    Float,
    ForeignKey,
    Integer,
    ARRAY,
    JSON,
    Boolean
)


class ProductModel(Base):
    __tablename__ = "product"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    price = Column(Float)
    description = Column(String(2000))
    amount = Column(Integer)
    is_active = Column(Boolean)
    images = Column(ARRAY(String))
    parameters = Column(JSON)
    category_id = Column(Integer, ForeignKey("category.id"), nullable=True)
