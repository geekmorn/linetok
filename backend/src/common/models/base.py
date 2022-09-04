from sqlalchemy import Column, String, Boolean, DateTime


class BaseModel:
    id = Column(String(50), primary_key=True, index=True)
    active = Column(Boolean, default=True)
    created = Column(DateTime)
    updated = Column(DateTime)
