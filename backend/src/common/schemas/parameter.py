from pydantic import BaseModel, validator
from .base import Base
from fastapi import HTTPException


class ParameterCreate(BaseModel):
    name: str

    @validator("name")
    def is_null(cls, value):
        if value == "":
            raise HTTPException(400, "Name cannot be empty")
        return value

class ParameterUpdate(BaseModel):
    name: str
    active: bool = True


class Parameter(Base):
    name: str

    class Config:
        orm_mode = True
