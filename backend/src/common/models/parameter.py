from src.common.database import Base
from sqlalchemy import Column, String, Integer


class ParameterModel(Base):
    __tablename__ = "parameter"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)

    def __repr__(self):
        return self.name
