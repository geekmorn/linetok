from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.sql import func


class BaseModel:
    id = Column(String(50), primary_key=True)
    active = Column(Boolean, default=True)
    created = Column(DateTime(timezone=True), default=func.now())
    updated = Column(DateTime(timezone=True),
                     default=func.now(), onupdate=func.now())
