from src.common.services.exceptions import unauthorized
from src.common.services import crud
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from src.core.config import AuthConfig
from fastapi_jwt_auth import AuthJWT
from src.core.schemas.token import *
from src.common.utils import authorize
from src.core.models import TokenModel


router = APIRouter(
    tags=['Auth'],
    prefix="/auth",
)


@AuthJWT.load_config
def get_config():
    return AuthConfig()


@router.post('/login', response_model=AccessToken)
async def login(form: OAuth2PasswordRequestForm = Depends(), authorizer: AuthJWT = Depends()):
    user = await authorize(form.username, form.password)

    refresh_token = authorizer.create_refresh_token(subject=user.id)
    access_token = authorizer.create_access_token(subject=user.id)
    jwt_id = authorizer.get_jti(refresh_token)
    authorizer.set_refresh_cookies(refresh_token)
    refresh_token = RefreshToken(
        id=jwt_id,
        user_id=user.id
    )
    token = await crud.read(TokenModel, TokenModel.user_id, user.id)
    if token:
        await crud.destroy(TokenModel, TokenModel.id, token.id)
    await TokenModel.create(**refresh_token.dict())

    return AccessToken(
        access_token=access_token,
        token_type="bearer"
    )


@router.post('/refresh', response_model=AccessToken)
async def refresh(authorizer: AuthJWT = Depends()):
    authorizer.jwt_refresh_token_required()
    user_id = authorizer.get_jwt_subject()
    jwt_id = authorizer.get_raw_jwt()["jti"]
    token_exists = await crud.read(TokenModel, TokenModel.id, jwt_id)
    if token_exists:
        new_access_token = authorizer.create_access_token(subject=user_id)
        new_refresh_token = authorizer.create_refresh_token(subject=user_id)
        new_jwt_id = authorizer.get_jti(new_refresh_token)
        authorizer.set_refresh_cookies(new_refresh_token)
        refresh_token = RefreshToken(
            id=new_jwt_id,
            user_id=user_id
        )
        await crud.destroy(TokenModel, TokenModel.id, token_exists.id)
        await TokenModel.create(**refresh_token.dict())
    else:
        return unauthorized("Invalid refresh token")

    return AccessToken(
        access_token=new_access_token,
        token_type="bearer"
    )


@router.delete('/logout')
async def logout(authorizer: AuthJWT = Depends()):
    authorizer.jwt_refresh_token_required()
    jwt_id = authorizer.get_raw_jwt()["jti"]
    authorizer.unset_refresh_cookies()
    await crud.destroy(TokenModel, TokenModel.id, jwt_id)

    return {
        "message": "Successfully logout"
    }
