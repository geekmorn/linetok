from src.core.config import Base
from src.common.services.crud import Service
from .base import BaseModel
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class TokenModel(Base, BaseModel, Service):
    __tablename__ = "refresh_token"

    user_id = Column(String, ForeignKey("user.id"))
    refresh_token = Column(String, index=True)
    user = relationship(
        "UserModel", back_populates="refresh_token", uselist=False)
