from fastapi import APIRouter
from ..common.config import settings
from .user import user_router
from .auth import auth_router
from .parameter import parameter_router
from .category import category_router
from .product import product_router

api_router = APIRouter(
    prefix=settings.ROUTE_PREFIX
)


ROUTERS = {
    "user": user_router,
    "auth": auth_router,
    "parameters": parameter_router,
    "category": category_router,
    "product": product_router,
}

for name, router in ROUTERS.items():
    api_router.include_router(router)
