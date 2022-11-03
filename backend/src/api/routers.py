from fastapi import APIRouter
from ..common.config import config
from .products import products_router
from .categories import categories_router
from .parameters import parameters_router


api_router = APIRouter(
    prefix=config.router_prefix
)


ROUTERS = (
    (parameters_router, "/parameters", "Parameters"),
    (categories_router, "/categories", "Categories"),
    (products_router, "/products", "Products")
)


for router in ROUTERS:
    api_router.include_router(
        router=router[0], prefix=router[1], tags=[router[2]]
    )
