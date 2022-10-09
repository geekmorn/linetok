from src.common.utils.exceptions import unauthorized
from src.common.utils.crud import create, read, update, destroy, by
from fastapi import APIRouter, Depends, Form
from src.common.config import AuthConfig
from fastapi_jwt_auth import AuthJWT
from src.common.schemas.token import *
from src.common.utils.authorize import authorize
from src.common.models import TokenModel


router = APIRouter(
    tags=['Auth'],
)


@AuthJWT.load_config
def get_config():
    return AuthConfig()


@router.post('/login', response_model=AccessToken)
async def login(email: str = Form(), password: str = Form(), authorizer: AuthJWT = Depends()):
    user = await authorize(email, password)

    refresh_token = authorizer.create_refresh_token(subject=user.id)
    access_token = authorizer.create_access_token(subject=user.id)
    jwt_id = authorizer.get_jti(refresh_token)
    authorizer.set_refresh_cookies(refresh_token)

    token = await read(TokenModel, by(TokenModel.user_id, user.id))
    if token:
        await destroy(token)
    await create(TokenModel, type_id=jwt_id, user_id=user.id)

    return AccessToken(
        access_token=access_token,
        token_type="bearer"
    )


@router.post('/refresh', response_model=AccessToken)
async def refresh(authorizer: AuthJWT = Depends()):
    authorizer.jwt_refresh_token_required()
    user_id = authorizer.get_jwt_subject()
    jwt_id = authorizer.get_raw_jwt()["jti"]

    token = await read(TokenModel, by(TokenModel.id, jwt_id))
    if token:
        new_access_token = authorizer.create_access_token(subject=user_id)
        new_refresh_token = authorizer.create_refresh_token(subject=user_id)
        new_jwt_id = authorizer.get_jti(new_refresh_token)
        authorizer.set_refresh_cookies(new_refresh_token)

        await update(token, id=new_jwt_id, user_id=user_id)
    else:
        return unauthorized()

    return AccessToken(
        access_token=new_access_token,
        token_type="bearer"
    )


@router.delete('/logout')
async def logout(authorizer: AuthJWT = Depends()):
    authorizer.jwt_refresh_token_required()
    jwt_id = authorizer.get_raw_jwt()["jti"]
    authorizer.unset_refresh_cookies()

    token = await read(TokenModel, by(TokenModel.id, jwt_id))
    if token:
        await destroy(token)

    return {"message": "Successfully logout"}
