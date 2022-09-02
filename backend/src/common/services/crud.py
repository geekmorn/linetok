from sqlalchemy.future import select
from sqlalchemy import update as _update
from src.core.config import db
from ..utils.generate_id import generate_id


async def create(Model, type: str | None = None, **kwargs):
    record = Model(id=generate_id(type), **kwargs)
    db.add(record)
    await db.commit()
    return record


async def read(Model, options: dict | None = None):

    async def all():
        query = select(Model)
        records = await db.execute(query)
        result = records.scalars().all()
        return result

    async def selected():
        query = select(Model).where(options["key"] == options["value"])
        record = await db.execute(query)
        result = record.scalars().first()
        return result

    return await (
        selected()
        if options
        else all()
    )


async def update(record, **kwargs):
    Model = record.__class__
    await db.execute(
        _update(Model)
        .where(Model.id == record.id)
        .values(**kwargs)
    )
    await db.commit()
    return record


async def destroy(record):
    await db.delete(record)
    await db.commit()
    return record
