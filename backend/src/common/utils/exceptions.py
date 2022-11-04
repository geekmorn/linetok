from fastapi import HTTPException


def not_found(name: str, many=False) -> HTTPException:
    if many:
        message = f"No {name} entries found in the database"
    else:
        message = f"Instance of given {name} doesn't exist in the database"
    raise HTTPException(
        status_code=404,
        detail=message
    )


def unauthorized(message="You are not authorized to access this resource") -> HTTPException:
    raise HTTPException(
        status_code=401,
        detail=message
    )


def already_exist(name: str) -> HTTPException:
    raise HTTPException(
        status_code=409,
        detail=f"{name.title()} with this name already exist"
    )


def not_acceptable() -> HTTPException:
    raise HTTPException(
        status_code=406,
        detail="Not acceptable"
    )
