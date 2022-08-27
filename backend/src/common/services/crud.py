from sqlalchemy.future import select
from sqlalchemy import delete, update
from src.core.config import db, Search
from uuid import uuid4


class Service:

    @classmethod
    async def read(model, by=Search.ALL, value: str | None = None):
        match by:
            case Search.ALL:
                query = select(model)
            case Search.ID:
                field = model.id
            case Search.USERNAME:
                field = model.username
            case Search.NAME:
                field = model.name
            case Search.USER_ID:
                field = model.user_id
            case Search.TOKEN_ID:
                field = model.jwt_id

        if value:
            query = select(model).where(field == value)
        records = await db.execute(query)
        return records.scalars().first() if value else records.scalars().all()

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
        await db.commit()
