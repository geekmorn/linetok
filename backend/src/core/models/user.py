from ..config import Base
from passlib.hash import bcrypt
from sqlalchemy import Column, String
from .base import BaseModel
from sqlalchemy.orm import relationship


class UserModel(Base, BaseModel):
    __tablename__ = "user"

    username = Column(String(50), unique=True, index=True)
    password = Column(String(128))
    role = Column(String(10), default='moderator')
    refresh_token = relationship("TokenModel", back_populates="user")

    def verify_password(self, password):
        return bcrypt.verify(password, self.password)

    def __repr__(self):
        return f"{self.username}"
