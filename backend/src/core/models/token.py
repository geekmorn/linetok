from src.core.config import Base
from src.common.services.crud import Service
from .base import BaseModel
from sqlalchemy import Column, String


class TokenModel(Base, BaseModel, Service):
    __tablename__ = "token"

    user_id = Column(String)
