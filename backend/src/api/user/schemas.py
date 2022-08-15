from pydantic import BaseModel


class UserBase(BaseModel):
    name: str


class UserCreate(UserBase):
    password: str


class UserUpdate(UserBase):
    pass


class User(UserBase):
    id: int
    active: bool
    role: str

    class Config:
        orm_mode = True
