from .base import Base
from pydantic import BaseModel


class UserAuth(BaseModel):
    username: str
    password: str


class UserCreate(BaseModel):
    username: str
    name: str
    surname: str
    password: str


class UserUpdate(BaseModel):
    username: str
    name: str
    surname: str
    active: bool
    role: str
    password: str


class User(Base):
    username: str
    name: str
    surname: str
    role: str

    class Config:
        orm_mode = True
