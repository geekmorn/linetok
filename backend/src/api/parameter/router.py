from src.common.services import crud
from fastapi import APIRouter, HTTPException
from src.core.schemas.parameter import *
from src.core.models import ParameterModel
from src.common.dependencies import get_current_user

router = APIRouter(
    tags=["Parameter"]
)


@router.post("/parameter", response_model=Parameter, status_code=201)
async def create(payload: ParameterCreate):
    parameter: Parameter = await crud.read(ParameterModel, ParameterModel.name, payload.name)
    if parameter:
        raise HTTPException(409, detail="Parameter already exists")
    return await crud.create(
        ParameterModel,
        name=payload.name
    )


@router.get("/parameter/{id}", response_model=Parameter)
async def get(id: str):
    parameter: Parameter = await crud.read(ParameterModel, ParameterModel.id, id)
    parameter_not_found = not parameter or parameter is None
    if parameter_not_found:
        raise HTTPException(404, "Parameter not found")
    return parameter


@router.put("parameter/{id}", response_model=Parameter)
async def update(id: str, payload: ParameterUpdate):
    parameter: Parameter = await crud.read(ParameterModel, ParameterModel.id, id)
    parameter_not_found = not parameter or parameter is None
    if parameter_not_found:
        raise HTTPException(404, "Parameter not found")
    await crud.update(
        ParameterModel,
        value=id,
        name=payload.name
    )
    return parameter


@router.get("/parameters", response_model=list[Parameter])
async def get_all(): return await crud.read(ParameterModel)


@router.delete("/parameter/{id}", response_model=Parameter)
async def delete(id: str):
    parameter: Parameter = await crud.read(ParameterModel, ParameterModel.id, id)
    parameter_not_found = not parameter or parameter is None
    if parameter_not_found:
        raise HTTPException(404, "Parameter not found")
    await crud.destroy(ParameterModel, ParameterModel.id, id)
    return parameter
