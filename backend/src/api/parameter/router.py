from src.common.utils.crud import read, create, update, destroy, by
from fastapi import APIRouter, Depends
from src.common.schemas.parameter import *
from src.common.models import ParameterModel
from src.common.dependencies import get_current_user
from src.common.utils.exceptions import not_found, conflict


router = APIRouter(
    tags=["Parameters"],
)


@router.get("/{id}", response_model=Parameter)
async def get(id: str):
    parameter: Parameter | None = await read(
        ParameterModel,
        by(ParameterModel.id, id)
    )
    if parameter is None:
        raise not_found()

    return parameter


@router.get("/", response_model=list[Parameter])
async def get_all(): return await read(ParameterModel)


@router.post("/", response_model=Parameter, status_code=201)
async def post(payload: ParameterCreate):
    parameter: Parameter | None = await read(
        ParameterModel,
        by(ParameterModel.name, payload.name)
    )
    if parameter:
        raise conflict()

    return await create(ParameterModel, **payload.dict())


@router.put("/{id}", response_model=Parameter)
async def put(id: str, payload: ParameterUpdate):
    parameter: Parameter | None = await read(
        ParameterModel,
        by(ParameterModel.id, id)
    )
    if parameter is None:
        raise not_found()

    return await update(parameter, **payload.dict())


@router.delete("/{id}", response_model=Parameter)
async def delete(id: str):
    parameter: Parameter | None = await read(
        ParameterModel,
        by(ParameterModel.id, id)
    )
    if parameter is None:
        raise not_found()

    return await destroy(parameter)
