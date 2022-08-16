from .base import Base
from pydantic import BaseModel


class UserCreate(BaseModel):
    name: str
    password: str


class UserUpdate(BaseModel):
    pass


class User(Base):
    name: str
    active: bool
    role: str

    class Config:
        orm_mode = True
