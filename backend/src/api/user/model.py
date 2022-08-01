from sqlmodel import SQLModel, Field
from pydantic import BaseModel
from src.core.constants import ROLE


class User(SQLModel, table=True):
    id: int = Field(primary_key=True)
    username: str
    password: str
    role: str = Field(default=ROLE.USER)
    token: str = Field(default='test-token', foreign_key="token.token")


class UserCreate(BaseModel):
    username: str
    password: str
