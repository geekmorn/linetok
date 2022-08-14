from sqlalchemy.orm import Session
from pydantic import BaseModel
from . import exceptions as Exception


class Record(BaseModel):
    id: int
    name: str


def get(db: Session, value, model: Record, variant: str = "id"):
    """variant can be passed as:
    - "id" - default
    - "name"
    """
    match variant:
        case "id":
            db_model = model.id
        case "name":
            db_model = model.name

    record: Record = db.query(model).filter(db_model == value).first()
    if not record:
        return Exception.not_found(f"{model.__tablename__} with {variant} {value}")
    return record


def get_all(db: Session, model: Record):
    record: list[Record] = db.query(model).all()
    return record


def create(db: Session, record: Record, model: Record):
    value = db.query(model).filter(model.name == record.name).first()
    if value:
        return Exception.conflict(
            f"{record.__tablename__} already exists"
        )

    db.add(record)
    db.commit()
    return record


def remove(db: Session, id: int, model: Record):
    record: Record = db.query(model).filter_by(id=id).first()
    if not record:
        return Exception.not_found(f"{model.__tablename__} with id {id}")
    db.delete(record)
    db.commit()
    return record


def update(db: Session, id: int, record: Record, model: Record):
    value = db.query(model).filter_by(id=id).first()
    if not value:
        return Exception.not_found(f"{model.__tablename__} with id {id}")
    value = record
    db.commit()
    return value
