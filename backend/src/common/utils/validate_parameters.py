from ..models import ParameterModel
from ..schemas import Parameter
from ..database import db


async def validate_parameters(parameters: dict):
    allowed_parameters: list[Parameter] | None = [
        str(parameter) for parameter in await db.get_all(ParameterModel)
    ]

    failed_parameters = []
    for parameter, _ in parameters.items():
        if parameter not in allowed_parameters:
            failed_parameters.append(parameter)

    return failed_parameters
