from pydantic import BaseModel


class AccessToken(BaseModel):
    access_token: str
    token_type: str


class RefreshToken(BaseModel):
    id: str
    user_id: str
