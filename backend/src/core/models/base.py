from sqlalchemy import Column, String, Boolean


class BaseModel:
    id = Column(String(50), primary_key=True)
    # created_at = Column(String(50))
