from sqlalchemy.future import select
from sqlalchemy import delete, update
from src.core.config import db
from uuid import uuid4


async def create(Model, **kwargs):
    record = Model(id=str(uuid4()), **kwargs)
    db.add(record)
    await db.commit()
    return record


async def read(Model, parameter=None):

    async def all():
        query = select(Model)
        records = await db.execute(query)
        result = records.scalars().all()
        return result

    async def selected():
        query = select(Model).where(Model[parameter] == parameter)
        record = await db.execute(query)
        result = record.scalars().first()
        return result

    return (
        await selected()
        if parameter
        else await all()
    )


async def update(Model, parameter: str, **kwargs):
    query = (
        update(Model)
        .where(Model[parameter] == parameter)
        .values(**kwargs)
        .execution_options(synchronize_session="fetch")
    )
    await db.execute(query)
    await db.commit()


async def destroy(Model, parameter: str):
    query = delete(Model).where(Model[parameter] == parameter)
    await db.execute(query)
    await db.commit()
