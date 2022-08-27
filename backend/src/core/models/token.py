from src.core.config import Base
from src.common.services.crud import Service
from .base import BaseModel
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from src.core.config import db


class TokenModel(Base, Service):
    __tablename__ = "refresh_token"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("user.id"))

    user = relationship(
        "UserModel",
        back_populates="refresh_token",
        uselist=False
    )

    @classmethod
    async def create(model,  **kwargs):
        record = model(**kwargs)
        db.add(record)
        await db.commit()
        return record
