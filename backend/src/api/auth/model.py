from sqlmodel import SQLModel, Field


class Token(SQLModel, table=True):
    token: str = Field(primary_key=True)
