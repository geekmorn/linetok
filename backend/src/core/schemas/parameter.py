from pydantic import BaseModel
from .base import Base


class ParameterCreate(BaseModel):
    title: str


class ParameterUpdate(BaseModel):
    title: str


class Parameter(Base):
    title: str

    class Config:
        orm_mode = True
