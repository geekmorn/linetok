from src.core import Base
from passlib.hash import bcrypt
from sqlalchemy import Column, Integer, String, Boolean


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    password = Column(String(128))
    active = Column(Boolean, default=True)
    role = Column(String(10), default='moderator')

    def verify_password(self, password):
        return bcrypt.verify(password, self.password)
