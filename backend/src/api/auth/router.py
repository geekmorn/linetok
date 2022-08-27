from fastapi import APIRouter, Depends, HTTPException
from src.common.dependencies import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from src.core.config import AuthConfig, Search
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
async def login(form: OAuth2PasswordRequestForm = Depends(), Authorize: AuthJWT = Depends()):
    user = await authenticate(form.username, form.password)
    if not user:
        raise HTTPException(
            status_code=401, detail="Invalid username or password")

    access_token = Authorize.create_access_token(subject=user.id)
    refresh_token = Authorize.create_refresh_token(subject=user.id)
    jwt_id = Authorize.get_jti(refresh_token)

    token = RefreshToken(
        user_id=user.id,
        refresh_token=jwt_id
    )

    refresh_token_exists = await TokenModel.read(by=Search.USER_ID, value=user.id)
    if refresh_token_exists:
        id = refresh_token_exists.id
        await TokenModel.update(id, **token.dict())
    else:
        await TokenModel.create(**token.dict())

    Authorize.set_refresh_cookies(refresh_token)
    return AccessToken(
        access_token=access_token,
        token_type="bearer"
    )


@router.post('/refresh', response_model=AccessToken)
async def refresh(Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()
    user_id = Authorize.get_jwt_subject()
    jwt_id = Authorize.get_raw_jwt()["jti"]

    refresh_token_exists = await TokenModel.read(by=Search.TOKEN_ID, value=jwt_id)
    if refresh_token_exists:
        new_access_token = Authorize.create_access_token(subject=user_id)
        new_refresh_token = Authorize.create_refresh_token(subject=user_id)
        new_jwt_id = Authorize.get_jti(new_refresh_token)

        token = RefreshToken(
            user_id=user_id,
            refresh_token=new_jwt_id
        )

        id = refresh_token_exists.id
        await TokenModel.update(id, **token.dict())
        Authorize.set_refresh_cookies(new_refresh_token)
    else:
        raise HTTPException(401, "Not authenticated")

    return AccessToken(
        access_token=new_access_token,
        token_type="bearer"
    )


@router.delete('/logout', dependencies=[Depends(get_current_user)])
async def logout(Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()
    jwt_id = Authorize.get_raw_jwt()["jti"]
    await TokenModel.destroy()
    Authorize.unset_refresh_cookies()
    return {"message": "Successfully logout"}


# @router.get('/protected')
# def protected(Authorize: AuthJWT = Depends()):
#     Authorize.jwt_required()
#     current_user = Authorize.get_jwt_subject()

#     return {"user": current_user}


# @router.get("/protected2", response_model=User)
# def protected2(user: User = Depends(get_current_user)):
#     return user
