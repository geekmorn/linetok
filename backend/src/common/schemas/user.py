from .base import Base
from pydantic import BaseModel, EmailStr


class UserAuth(BaseModel):
    email: EmailStr
    password: str


class UserCreate(BaseModel):
    email: EmailStr
    name: str
    surname: str
    password: str


class UserUpdate(BaseModel):
    email: EmailStr
    name: str
    surname: str
    active: bool
    role: str
    password: str


class User(Base):
    email: EmailStr
    name: str
    surname: str
    role: str

    class Config:
        orm_mode = True
