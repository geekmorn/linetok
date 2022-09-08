from pydantic import BaseModel
from .base import Base


class ParameterCreate(BaseModel):
    name: str


class ParameterUpdate(BaseModel):
    name: str


class Parameter(Base):
    name: str

    class Config:
        orm_mode = True
