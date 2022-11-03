from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from .api.routers import api_router
from .common.config import config
from .common.database import db
from fastapi.middleware.cors import CORSMiddleware
from fastapi_jwt_auth.exceptions import AuthJWTException


app = FastAPI(
    docs_url="/",
    title=config.title,
    version=config.version,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.on_event("startup")
async def startup():
    await db.open_connection()


@app.on_event("shutdown")
async def shutdown():
    await db.session.close()


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )
