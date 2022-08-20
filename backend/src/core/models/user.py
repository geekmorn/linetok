from ..config import Base, db
from sqlalchemy.future import select
from passlib.hash import bcrypt
from sqlalchemy import Column, String, Boolean
from src.common.services.crud import Service


class User(Base, Service):
    __tablename__ = "user"
    username = Column(String(50), unique=True)
    password = Column(String(128))
    active = Column(Boolean, default=True)
    role = Column(String(10), default='moderator')

    def verify_password(self, password):
        return bcrypt.verify(password, self.password)

    @classmethod
    async def read_username(cls, username: str):
        query = select(cls).where(cls.username == username)
        users = await db.execute(query)
        return users.scalars().first()
