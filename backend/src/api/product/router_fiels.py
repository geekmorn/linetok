from dataclasses import Field
from fastapi import APIRouter, UploadFile, File


router = APIRouter(
    tags=["Product fiels"]
)


@router.post("/fiel")
async def test(fiel: UploadFile = File()):
    return fiel
