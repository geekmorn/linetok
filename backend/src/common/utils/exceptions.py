from fastapi import HTTPException


def not_found() -> HTTPException:
    raise HTTPException(
        status_code=404,
        detail=f"Not not found"
    )


def unauthorized(message="You are not authorized to access this resource") -> HTTPException:
    raise HTTPException(
        status_code=401,
        detail=message
    )


def conflict() -> HTTPException:
    raise HTTPException(
        status_code=409,
        detail=f"Already exists"
    )


def not_acceptable() -> HTTPException:
    raise HTTPException(
        status_code=406,
        detail="Not acceptable"
    )
