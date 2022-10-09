from fastapi import APIRouter
from ..common.config import config
from .user import user_router
from .auth import auth_router
from .parameter import parameter_router
from .category import category_router
from .product import product_router

api_router = APIRouter(
    prefix=config.router_prefix
)


ROUTERS = {
    "/auth": auth_router,
    "/users": user_router,
    "/parameters": parameter_router,
    "/categories": category_router,
    "/products": product_router,
}

for prefix, router in ROUTERS.items():
    api_router.include_router(router=router, prefix=prefix)
