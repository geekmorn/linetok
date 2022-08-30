from sqlalchemy.future import select
from sqlalchemy import delete, update
from src.core.config import db
from uuid import uuid4


class Service:
    @property
    def _id(self):
        self.field = self.__class__.id
        return self

    @property
    def _username(self):
        self.field = self.__class__.username
        return self

    @property
    def _name(self):
        self.field = self.__class__.name
        return self

    @property
    def _user_id(self):
        self.field = self.__class__.user_id
        return self

    async def create(self, **kwargs):
        record = self.__class__(id=str(uuid4()), **kwargs)
        db.add(record)
        await db.commit()
        return record

    async def read(self, value: str = None):
        try:
            query = select(self.__class__).where(self.field == value)
            records = await db.execute(query)
            result = records.scalars().first()
        except AttributeError:
            query = select(self.__class__)
            records = await db.execute(query)
            result = records.scalars().all()
        return result

    async def update(self, value: str, **kwargs):
        query = (
            update(self.__class__)
            .where(self.field == value)
            .values(**kwargs)
            .execution_options(synchronize_session="fetch")
        )
        await db.execute(query)
        await db.commit()

    async def delete(self, value: str):
        query = delete(self.__class__).where(self.field == value)
        await db.execute(query)
        await db.commit()
