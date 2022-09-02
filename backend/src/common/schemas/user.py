from .base import Base
from pydantic import BaseModel


class UserAuth(BaseModel):
    username: str
    password: str


class UserCreate(BaseModel):
    username: str
    password: str


class UserUpdate(BaseModel):
    username: str


class User(Base):
    username: str
    active: bool
    role: str

    class Config:
        orm_mode = True
