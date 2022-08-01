from fastapi import APIRouter, Depends, Request
from .model import Token


async def oauth2_scheme(request: Request):
    request.state.user_id = "foo"

router = APIRouter(
    tags=["Auth"],
    prefix="/auth",
)


@router .get("/")
async def hello(request: Request):
    print(request.state)
