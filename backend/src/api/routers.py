from xml.etree.ElementInclude import include
from fastapi import APIRouter
from ..core.constans import ROUTE_PREFIX
# from .category import category_router
# from .product import product_router
from .user import user_router
from .auth import auth_router

api_router = APIRouter(
    prefix=ROUTE_PREFIX
)

routers = [
    # category_router,
    # product_router,
    user_router,
    auth_router,
]

for router in routers:
    api_router.include_router(router)
