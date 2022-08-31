from fastapi import APIRouter, HTTPException
from src.core.schemas.parameter import *
from src.core.models import ParameterModel
from src.common.dependencies import get_current_user

router = APIRouter(
    tags=["Parameter"]
)


@router.post("/parameter", response_model=Parameter, status_code=201)
async def create(new_parameter: ParameterCreate):
    parameter: Parameter = await ParameterModel()._name.read(new_parameter.name)
    if parameter:
        raise HTTPException(409, detail="Parameter already exists")

    return await ParameterModel().create(
        name=new_parameter.name
    )


@router.get("/parameter/{id}", response_model=Parameter)
async def read_id(id: str):
    parameter: Parameter = await ParameterModel()._id.read(id)
    if not parameter:
        raise HTTPException(401, detail="Parameter not found")

    return parameter


@router.get("/parametrs", response_model=list[Parameter])
async def read_all():
    return await ParameterModel().read()


@router.delete("/parameter/{id}", response_model=Parameter)
async def delete(id: str):
    parameter: Parameter = await ParameterModel()._id.read(id)
    if not parameter:
        raise HTTPException(404, detail="Parameter not found")
    await ParameterModel()._id.delete(id)

    return parameter


@router.put("parameter/{id}", response_model=Parameter)
async def update(id: str, new_parameter: ParameterUpdate):
    parameter: Parameter = await ParameterModel()._id.read(id)
    if not parameter:
        raise HTTPException(404, detail="Parameter not found")
    try:
        await ParameterModel()._id.update(
            value=id,
            name=new_parameter.name
        )
    except:
        raise HTTPException(409, detail="Conflict")

    return parameter
