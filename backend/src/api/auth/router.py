from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from src.core.config import AuthConfig
from fastapi_jwt_auth import AuthJWT
from src.core.schemas.user import *
from src.core.schemas.token import *
from src.common.utils import authenticate
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
    user = await authenticate(form.username, form.password)
    if not user:
        raise HTTPException(
            status_code=401, detail="Invalid username or password")

    access_token = authorizer.create_access_token(subject=user.id)
    refresh_token = authorizer.create_refresh_token(subject=user.id)
    jwt_id = authorizer.get_jti(refresh_token)

    token = RefreshToken(
        id=jwt_id,
        user_id=user.id
    )

    refresh_token_exists = await TokenModel()._user_id.read(user.id)
    if refresh_token_exists:
        id = refresh_token_exists.id
        await TokenModel()._id.delete(id)
        await TokenModel().create(**token.dict())
    else:
        await TokenModel().create(**token.dict())

    authorizer.set_refresh_cookies(refresh_token)
    return AccessToken(
        access_token=access_token,
        token_type="bearer"
    )


@router.post('/refresh', response_model=AccessToken)
async def refresh(authorizer: AuthJWT = Depends()):
    authorizer.jwt_refresh_token_required()
    user_id = authorizer.get_jwt_subject()
    jwt_id = authorizer.get_raw_jwt()["jti"]

    refresh_token_exists = await TokenModel()._id.read(jwt_id)
    if refresh_token_exists:
        new_access_token = authorizer.create_access_token(subject=user_id)
        new_refresh_token = authorizer.create_refresh_token(subject=user_id)
        new_jwt_id = authorizer.get_jti(new_refresh_token)

        token = RefreshToken(
            id=new_jwt_id,
            user_id=user_id
        )

        id = refresh_token_exists.id
        await TokenModel()._id.delete(id)
        await TokenModel().create(**token.dict())
        authorizer.set_refresh_cookies(new_refresh_token)
    else:
        raise HTTPException(401, "Not authenticated")

    return AccessToken(
        access_token=new_access_token,
        token_type="bearer"
    )


@router.delete('/logout')
async def logout(authorizer: AuthJWT = Depends()):
    authorizer.jwt_refresh_token_required()
    jwt_id = authorizer.get_raw_jwt()["jti"]
    await TokenModel()._id.delete(jwt_id)
    authorizer.unset_refresh_cookies()
    return {"message": "Successfully logout"}
