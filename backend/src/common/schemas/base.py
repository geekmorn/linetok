from pydantic import BaseModel
from uuid import UUID
from datetime import date


class Base(BaseModel):
    id: UUID
    active: bool
    created: date
    updated: date
