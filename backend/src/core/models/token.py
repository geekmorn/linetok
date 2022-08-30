from src.core.config import Base, db
from src.common.services.crud import Service
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class TokenModel(Base, Service):
    __tablename__ = "refresh_token"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("user.id"), index=True)

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
