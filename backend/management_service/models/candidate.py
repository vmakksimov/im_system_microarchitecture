from db import db
from sqlalchemy import Enum as SQLAlchemyEnum
from utils.enums import RoleEnum, StageEnum

class CandidateModel(db.Model):
    __tablename__ = "candidates"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    full_name = db.Column(db.String, nullable=False)
    date_for_interview =db.Column(db.Date(), nullable=False)
    stage = db.Column(db.Integer, nullable=False)
    role = db.Column(SQLAlchemyEnum(RoleEnum), nullable=False)
    status = db.Column(SQLAlchemyEnum(StageEnum), default=StageEnum.FIRST, nullable=False)
