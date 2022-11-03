from ..models import CategoryModel
from ..schemas import Category
from ..database import db

# TODO Refactor this function


async def validate_category(id: int):
    category: Category | None = await db.get(
        CategoryModel,
        CategoryModel.id,
        id
    )
    return category
