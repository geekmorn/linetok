from src.common.services.crud import create, read, update, destroy
from fastapi import APIRouter, HTTPException
from src.core.schemas.parameter import *
from src.core.models import ParameterModel
from src.common.dependencies import get_current_user

router = APIRouter(
    tags=["Parameter"]
)


@router.post("/parameter", response_model=Parameter, status_code=201)
async def create(payload: ParameterCreate):
    parameter: Parameter = await read(ParameterModel, payload.name)
    if parameter:
        raise HTTPException(409, detail="Parameter already exists")

    return await create(
        ParameterModel,
        name=payload.name
    )


@router.get("/parameter/{id}", response_model=Parameter)
async def get(id: str):
    parameter: Parameter = await read(ParameterModel, id)
    parameter_not_found = not parameter or parameter is None
    if parameter_not_found:
        raise HTTPException(404, "Parameter not found")

    return parameter


@router.put("parameter/{id}", response_model=Parameter)
async def update(id: str, payload: ParameterUpdate):
    parameter: Parameter = await read(ParameterModel, id)
    parameter_not_found = not parameter or parameter is None
    if parameter_not_found:
        raise HTTPException(404, "Parameter not found")

    return await update(
        parameter,
        value=id,
        name=payload.name
    )


@router.get("/parameters", response_model=list[Parameter])
async def get_all(): return await read(ParameterModel)


@router.delete("/parameter/{id}", response_model=Parameter)
async def delete(id: str):
    parameter: Parameter = await read(ParameterModel, id)
    parameter_not_found = not parameter or parameter is None
    if parameter_not_found:
        raise HTTPException(404, "Parameter not found")

    return await destroy(ParameterModel, id)
