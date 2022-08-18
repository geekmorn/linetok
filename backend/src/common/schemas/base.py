from pydantic import BaseModel
from typing import NewType

UUID = NewType('UUID', str)


class Base(BaseModel):
    id: UUID
