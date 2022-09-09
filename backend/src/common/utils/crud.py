from uuid import uuid4
from sqlalchemy.future import select
from sqlalchemy import update as _update
from src.common.config import db
from sqlalchemy.exc import IntegrityError, DatabaseError
from .exceptions import not_acceptable, HTTPException
from datetime import datetime
from passlib.hash import bcrypt


async def commit_change() -> None:
    try:
        await db.commit()
    except DatabaseError:
        await db.rollback()
        raise not_acceptable()


def by(field_name, value) -> dict:
    return {
        "field_name": field_name,
        "value": value
    }


async def create(Model, type_id: str | None = None, is_user=False, **kwargs):
    id = str(uuid4()) if type_id is None else type_id
    if is_user:
        kwargs["password"] = bcrypt.hash(kwargs["password"])
    record = Model(
        id=id,
        created=datetime.now(),
        updated=datetime.now(),
        **kwargs
    )
    db.add(record)
    await commit_change()

    return record


async def read(Model, options: dict | None = None):

    async def all():
        query = select(Model)
        records = await db.execute(query)
        result = records.scalars().all()
        return result

    async def selected():
        query = select(Model).where(options["field_name"] == options["value"])
        record = await db.execute(query)
        result = record.scalars().first()
        return result

    return await (
        selected()
        if options
        else all()
    )


async def update(record, is_user=False, **kwargs):
    Model = record.__class__
    if is_user:
        kwargs["password"] = bcrypt.hash(kwargs["password"])
    try:
        await db.execute(
            _update(Model)
            .where(Model.id == record.id)
            .values(
                updated=datetime.now(),
                **kwargs
            )
        )
        await commit_change()
    except IntegrityError as e:
        await db.rollback()
        raise HTTPException(409, {
            "error": f"A {Model.__tablename__} with the unique field already exists",
            "field": str(e.orig).split(".")[1]
        })

    return record


async def destroy(record):
    await db.delete(record)
    await commit_change()
    return record
