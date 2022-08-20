from sqlalchemy import Column, String
from sqlalchemy.future import select
from sqlalchemy import delete, update
from src.core.config import db
from uuid import uuid4


class Service:
    id = Column(String, primary_key=True)

    @classmethod
    async def read_all(model):
        query = select(model)
        records = await db.execute(query)
        record = records.scalars().all()
        return record

    @classmethod
    async def read_id(model, id):
        query = select(model).where(model.id == id)
        record = await db.execute(query)
        return record.scalars().first()

    @classmethod
    async def create(model, **kwargs):
        record = model(**kwargs)
        record = model(id=str(uuid4()), **kwargs)
        db.add(record)
        await db.commit()
        return record

    @classmethod
    async def destroy(model, id):
        query = delete(model).where(model.id == id)
        await db.execute(query)
        await db.commit()

    @classmethod
    async def update(cls, id: str, **kwargs):
        query = (
            update(cls)
            .where(cls.id == id)
            .values(**kwargs)
            .execution_options(synchronize_session="fetch")
        )
        await db.execute(query)
        try:
            await db.commit()
        except Exception:
            await db.rollback()
            raise
