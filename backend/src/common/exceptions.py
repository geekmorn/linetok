from fastapi import HTTPException


def not_found(message: str) -> HTTPException:
    raise HTTPException(
        status_code=404,
        detail=f"{message} not found"
    )

def unauthorized(message="You are not authorized to access this resource") -> HTTPException:
    raise HTTPException(
        status_code=401,
        detail=message
    )

def conflict(message: str) -> HTTPException:
    raise HTTPException(
        status_code=409,
        detail=message
    )
