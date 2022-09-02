from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from .api.routers import api_router
from .common.config import Settings, db
from fastapi.middleware.cors import CORSMiddleware
from fastapi_jwt_auth.exceptions import AuthJWTException


app = FastAPI(
    docs_url=Settings().DOCS_URL,
    title=Settings().TITLE,
    version=Settings().VERSION,
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
    db.create()
    await db.create_table()


@app.on_event("shutdown")
async def shutdown():
    await db.close()


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )
