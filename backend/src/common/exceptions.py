from fastapi import HTTPException


def not_found(name: str) -> HTTPException:
    raise HTTPException(
        status_code=404,
        detail=f"{name} not found"
    )


def unauthorized(message="You are not authorized to access this resource") -> HTTPException:
    raise HTTPException(
        status_code=401,
        detail=message
    )


def conflict(name: str) -> HTTPException:
    raise HTTPException(
        status_code=409,
        detail=name
    )
