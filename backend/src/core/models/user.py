from uuid import uuid4
from ..config import Base, db
from sqlalchemy.future import select
from sqlalchemy import update, delete
from passlib.hash import bcrypt
from sqlalchemy import Column, String, Boolean


class User(Base):
    __tablename__ = "user"
    id = Column(String, primary_key=True)
    username = Column(String(50), unique=True)
    password = Column(String(128))
    active = Column(Boolean, default=True)
    role = Column(String(10), default='moderator')

    def verify_password(self, password):
        return bcrypt.verify(password, self.password)

    @classmethod
    async def create(cls, **kwargs):
        user = cls(id=str(uuid4()), **kwargs,)
        db.add(user)
        try:
            await db.commit()
        except Exception:
            await db.rollback()
            raise
        return user

    @classmethod
    async def read_id(cls, id):
        query = select(cls).where(cls.id == id)
        users = await db.execute(query)
        try:
            (user,) = users.first()
            return user
        except TypeError:
            return False

    @classmethod
    async def read_username(cls, username):
        query = select(cls).where(cls.username == username)
        users = await db.execute(query)
        try:
            (user,) = users.first()
            return user
        except TypeError:
            return False

    @classmethod
    async def read_all(cls):
        query = select(cls)
        users = await db.execute(query)
        users = users.scalars().all()
        return users

    @classmethod
    async def destroy(cls, id):
        query = delete(cls).where(cls.id == id)
        await db.execute(query)
        try:
            await db.commit()
        except Exception:
            await db.rollback()
            raise

    @classmethod
    async def update(cls, id, name):
        query = (
            update(cls)
            .where(cls.id == id)
            .values(name=name)
            .execution_options(synchronize_session="fetch")
        )
        await db.execute(query)
        try:
            await db.commit()
        except Exception:
            await db.rollback()
            raise
