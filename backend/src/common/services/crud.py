from sqlalchemy.orm import Session
from pydantic import BaseModel
from . import exceptions as Exception


class Record(BaseModel):
    id: int
    name: str


def exists(db, model, value):  # TODO move to /utils
    found = db.query(model).filter(model == value).first()
    print(db.query(model).filter(model == value).first())
    return found if found else False


def get(db: Session, value: str, model: Record, by="id"):
    """Get a record by value, which can be either an id or a name.

    Args:
        db (Session): database session.
        value (str): name or id of the record.
        by (str): setting for the search. Default is "id".

    Returns:
        (Record): record with the given value.
    """
    match by:
        case "id":
            db_model = model.id
        case "name":
            db_model = model.name

    record: Record = db.query(model).filter(db_model == value).first()
    if not record:
        return Exception.not_found(f"{model.__tablename__.title()} with given {by} {value}")
    return record


def get_all(db: Session, model: Record):
    """ TODO: describe this function.
    """
    record: list[Record] = db.query(model).all()
    return record


def create(db: Session, record: Record, model: Record):
    """ TODO: describe this function.
    """
    if exists(db, model.name, record.name):
        return Exception.conflict(
            f"{record.__tablename__} already exists"
        )
    db.add(record)
    db.commit()
    return record


def remove(db: Session, id: int, model: Record):
    """ TODO: describe this function.
    """
    record: Record = db.query(model).filter_by(id=id).first()
    if not record:
        return Exception.not_found(f"{model.__tablename__} with id {id}")
    db.delete(record)
    db.commit()
    return record


def update(db: Session, id: int, record: Record, model: Record):
    """ TODO: describe this function.
    """
    value = db.query(model).filter_by(id=id).first()
    if not value:
        return Exception.not_found(f"{model.__tablename__} with id {id}")
    value = record
    db.commit()
    return value
