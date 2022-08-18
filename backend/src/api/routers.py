from fastapi import APIRouter
from ..core.config import ROUTE_PREFIX
from .user import user_router
from .auth import auth_router

api_router = APIRouter(
    prefix=ROUTE_PREFIX
)


ROUTERS = [
    user_router,
    auth_router,
]

for router in ROUTERS:
    api_router.include_router(router)
