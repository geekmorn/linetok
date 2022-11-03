from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import DatabaseError
from sqlmodel import update, select


class PostgreSQLService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def _commit_change(self) -> None:
        try:
            await self.session.commit()
        except DatabaseError:
            await self.session.rollback()
            raise HTTPException(406)

    async def get_all(self, model):
        query = select(model)
        records = await self.session.execute(query)
        result = records.scalars().all()
        return result

    async def get(self, model, field_name, value):
        query = select(model).where(field_name == value)
        record = await self.session.execute(query)
        return record.scalar_one_or_none()

    async def post(self, model, **kwargs):
        record = model(**kwargs)
        self.session.add(record)
        await self._commit_change()
        return record

    async def put(self, record, **kwargs):
        model = record.__class__
        await self.session.execute(
            update(model)
            .where(model.id == record.id)
            .values(**kwargs)
        )
        await self._commit_change()
        return record

    async def delete(self, record):
        await self.session.delete(record)
        await self._commit_change()
        return record
