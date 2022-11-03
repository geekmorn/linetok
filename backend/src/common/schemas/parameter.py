from pydantic import BaseModel


class BaseParameter(BaseModel):
    name: str


class ParameterCreate(BaseParameter):
    pass


class ParameterUpdate(BaseParameter):
    pass


class Parameter(BaseParameter):
    id: int

    class Config:
        orm_mode = True
