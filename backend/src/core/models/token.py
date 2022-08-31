from src.core.config import Base, db
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class TokenModel(Base):
    __tablename__ = "refresh_token"

    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("user.id"), index=True)

    user = relationship(
        "UserModel",
        back_populates="refresh_token",
        uselist=False
    )

    @classmethod
    async def create(Model,  **kwargs):
        record = Model(**kwargs)
        db.add(record)
        await db.commit()
        return record
