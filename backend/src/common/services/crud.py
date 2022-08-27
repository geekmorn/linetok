from sqlalchemy.future import select
from sqlalchemy import delete, update
from src.core.config import db, Search
from uuid import uuid4


class Service:

    @classmethod
    async def read(Model, by=Search.ALL, value: str | None = None):
        match by:
            case Search.ALL:
                query = select(Model)
            case Search.ID:
                field = Model.id
            case Search.USERNAME:
                field = Model.username
            case Search.NAME:
                field = Model.name
            case Search.USER_ID:
                field = Model.user_id

        if value:
            query = select(Model).where(field == value)
        records = await db.execute(query)
        return records.scalars().first() if value else records.scalars().all()

    @classmethod
    async def create(Model, **kwargs):
        record = Model(**kwargs)
        record = Model(id=str(uuid4()), **kwargs)
        db.add(record)
        await db.commit()
        return record

    @classmethod
    async def destroy(Model, id: str):
        query = delete(Model).where(Model.id == id)
        await db.execute(query)
        await db.commit()

    @classmethod
    async def update(Model, id: str, **kwargs):
        query = (
            update(Model)
            .where(Model.id == id)
            .values(**kwargs)
            .execution_options(synchronize_session="fetch")
        )
        await db.execute(query)
        await db.commit()
