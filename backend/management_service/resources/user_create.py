from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from schemas import PlainCandidateSchema
from models import CandidateModel
from token_decorator import token_required 
from db import db
from log import app_logger

blp = Blueprint("Create Candidates", __name__, description="Operations for Create candidates")


@blp.route("/candidates")
class CandidatesCreate(MethodView):

    decorators = [token_required]
    @blp.arguments(PlainCandidateSchema)
    @blp.response(201, PlainCandidateSchema)
    def post(self, request_data):
        candidate = CandidateModel(**request_data)

        try:
            db.session.add(candidate)
            db.session.commit()
        except SQLAlchemyError as e:
            abort(500, message=f"Error: {str(e)}")

        return candidate

