from fastapi import APIRouter, HTTPException
from src.common.database import db
from src.common.models import ParameterModel, ProductModel
from src.common.schemas import (
    Product,
    Parameter,
    ParameterCreate,
    ParameterUpdate,
    ProductUpdate
)


router = APIRouter()


@router.get("/", response_model=list[Parameter])
async def get_all():
    parameters: list[Parameter] | None = await db.get_all(ParameterModel)
    if len(parameters) == 0:
        raise HTTPException(404, "No parameters entries found in the database")

    return parameters


@router.get("/{id}", response_model=Parameter)
async def get(id: int):
    parameter: Parameter | None = await db.get(
        ParameterModel,
        ParameterModel.id,
        id
    )
    if parameter is None:
        raise HTTPException(404, "No parameters entries found in the database")

    return parameter


@router.post("/", response_model=Parameter)
async def create(payload: ParameterCreate):
    parameter: Parameter | None = await db.get(
        ParameterModel,
        ParameterModel.name,
        payload.name
    )
    if parameter:
        raise HTTPException(409, "Parameter with this name already exist")
    return await db.post(ParameterModel, **payload.dict())


@router.put("/{id}", response_model=Parameter)
async def update(id: int, payload: ParameterUpdate):
    parameter: Parameter | None = await db.get(
        ParameterModel,
        ParameterModel.id,
        id
    )
    if parameter is None:
        raise HTTPException(404, "No parameters entries found in the database")

    products: list[Product] | None = await db.get_all(ProductModel)
    for product in products:
        parameters = product.parameters
        if str(parameter) in parameters:
            parameters[payload.name] = parameters[str(parameter)]
            del parameters[str(parameter)]
            await db.put(product, **ProductUpdate(
                parameters=parameters).dict(exclude_unset=True))

    return await db.put(parameter, **payload.dict())


@router.delete("/{id}", response_model=Parameter)
async def delete(id: int):
    parameter: Parameter | None = await db.get(
        ParameterModel,
        ParameterModel.id,
        id
    )
    if parameter is None:
        raise HTTPException(404, "No parameters entries found in the database")

    products: list[Product] | None = await db.get_all(ProductModel)
    for product in products:
        parameters = product.parameters
        if str(parameter) in parameters:
            del parameters[str(parameter)]
            await db.put(product, **ProductUpdate(
                parameters=parameters).dict(exclude_unset=True))

    return await db.delete(parameter)
