from src.common.services.crud import read, create, update, destroy
from fastapi import APIRouter, HTTPException
from src.core.schemas.parameter import *
from src.core.models import ParameterModel
from src.common.dependencies import get_current_user

router = APIRouter(
    tags=["Parameter"]
)


@router.get("/parameter/{id}", response_model=Parameter)
async def get(id: str):
    parameter: Parameter | None = await read(ParameterModel, {
        "key": ParameterModel.id,
        "value": id
    })
    if parameter is None:
        raise HTTPException(404, "Parameter not found")

    return parameter


@router.get("/parameters", response_model=list[Parameter])
async def get_all(): return await read(ParameterModel)


@router.post("/parameter", response_model=Parameter, status_code=201)
async def post(payload: ParameterCreate):
    parameter: Parameter | None = await read(ParameterModel, {
        "key": ParameterModel.title,
        "value": payload.title
    })
    if parameter:
        raise HTTPException(409, "Parameter already exists")

    return await create(
        ParameterModel,
        **payload.dict()
    )


@router.put("parameter/{id}", response_model=Parameter)
async def put(id: str, payload: ParameterUpdate):
    parameter: Parameter | None = await read(ParameterModel, {
        "key": ParameterModel.id,
        "value": id
    })
    if parameter is None:
        raise HTTPException(404, "Parameter not found")

    return await update(parameter, **payload.dict())


@router.delete("/parameter/{id}", response_model=Parameter)
async def delete(id: str):
    parameter: Parameter | None = await read(ParameterModel, {
        "key": ParameterModel.id,
        "value": id
    })
    if parameter is None:
        raise HTTPException(404, "Parameter not found")

    return await destroy(parameter)
